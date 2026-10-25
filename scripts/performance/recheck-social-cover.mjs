// Rerun only the page changed after the complete batch. Other 19 pages have
// byte-identical loading declarations (cover-tuning-integrity.json).
import fs from 'node:fs';
import path from 'node:path';
import {execFile} from 'node:child_process';
import {extract,summarize} from './audit-live-site.mjs';
const root='reports/performance-fixes-2026-10-24';
const route='/work/social-media-campaign-design';
const primary=JSON.parse(fs.readFileSync(`${root}/after/results.json`));
const applied=JSON.parse(fs.readFileSync(`${root}/applied-throttling/results.json`));
fs.copyFileSync(`${root}/after/results.json`,`${root}/after/results-before-cover-preload.json`,fs.constants.COPYFILE_EXCL);
fs.copyFileSync(`${root}/applied-throttling/results.json`,`${root}/applied-throttling/results-before-cover-preload.json`,fs.constants.COPYFILE_EXCL);
const checks=[];
for(const [method,devices]of [['simulate',['mobile','desktop']],['devtools',['mobile']]])for(const device of devices)for(let run=1;run<=3;run++){
 const relative=method==='simulate'?`${device}/work__social-media-campaign-design/run-${run}-cover-preload`:`after/work__social-media-campaign-design/run-${run}-cover-preload`;
 const directory=method==='simulate'?`${root}/after`:`${root}/applied-throttling`;
 const output=path.resolve(directory,relative);fs.mkdirSync(path.dirname(output),{recursive:true});
 console.log(`Social cover recheck: ${method} ${device} ${run}/3`);
 await new Promise((resolve,reject)=>execFile(process.execPath,['scripts/performance/audit-lighthouse-worker.mjs','http://localhost:3021'+route,device,output,'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',method],{windowsHide:true,timeout:240000,maxBuffer:2097152},(error,stdout,stderr)=>error?reject(new Error(stderr||error.message)):resolve()));
 const raw=JSON.parse(fs.readFileSync(output+'.json'));
 if(raw.runtimeError)throw new Error(JSON.stringify(raw.runtimeError));
 const coverRequests=raw.audits['network-requests'].details.items.filter(r=>r.url.includes('cover%2Fsocial-media-campaign-design-cover'));
 if(coverRequests.length!==1)throw new Error(`Expected one responsive cover request, got ${coverRequests.length}`);
 checks.push({method,device,run,coverRequests:coverRequests.length,url:coverRequests[0].url});
 if(method==='simulate'){
  const row=extract(raw,device,run,relative);
  const index=primary.findIndex(r=>r.device===device&&r.run===run&&new URL(r.url).pathname===route);
  if(index<0)throw new Error('Missing original primary row');primary[index]=row;
  summarize(path.resolve(`${root}/after`),primary,JSON.parse(fs.readFileSync(`${root}/after/discovery.json`)));
 }else{
  const index=applied.findIndex(r=>r.phase==='after'&&r.run===run&&r.route===route);
  if(index<0)throw new Error('Missing original applied row');
  applied[index]={phase:'after',route,run,report:relative,method:raw.configSettings.throttlingMethod,lcpMs:raw.audits['largest-contentful-paint'].numericValue,tbtMs:raw.audits['total-blocking-time'].numericValue,score:raw.categories.performance.score*100,cls:raw.audits['cumulative-layout-shift'].numericValue,throttling:raw.configSettings.throttling};
  fs.writeFileSync(`${root}/applied-throttling/results.json`,JSON.stringify(applied,null,2));
 }
}
const median=a=>a.sort((a,b)=>a-b)[Math.floor(a.length/2)];
const medians=[...Map.groupBy(applied,r=>r.phase+' '+r.route).values()].map(r=>({phase:r[0].phase,route:r[0].route,runs:r.length,lcpMs:median(r.map(x=>x.lcpMs)),tbtMs:median(r.map(x=>x.tbtMs)),score:median(r.map(x=>x.score)),cls:median(r.map(x=>x.cls))}));
fs.writeFileSync(`${root}/applied-throttling/medians.json`,JSON.stringify(medians,null,2));
fs.writeFileSync(`${root}/cover-preload-request-checks.json`,JSON.stringify(checks,null,2));
console.log(JSON.stringify({appliedMedians:medians,duplicateCoverRequests:checks.some(x=>x.coverRequests!==1)},null,2));
