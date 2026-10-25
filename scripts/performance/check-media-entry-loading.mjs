// Single-run entry spot checks for the media follow-up, kept separate from the
// prior three-run all-page collection. Do not interpret small timing deltas.
import fs from 'node:fs';
import path from 'node:path';
import {execFile} from 'node:child_process';
const dir='reports/performance-fixes-2026-10-24/media-followup/entry';
const rows=[];
for(const route of ['/motion-video','/work/social-media-campaign-design','/work/presentations-pitch-decks-reports'])for(const device of ['mobile','desktop'])for(const [phase,port]of [['before',3021],['after',3022]]){
 const output=path.resolve(dir,phase,route.slice(1).replaceAll('/','__'),device);fs.mkdirSync(path.dirname(output),{recursive:true});
 console.log(`${phase} ${device} ${route}`);
 await new Promise((resolve,reject)=>execFile(process.execPath,['scripts/performance/audit-lighthouse-worker.mjs',`http://localhost:${port}${route}`,device,output,'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'],{windowsHide:true,timeout:240000,maxBuffer:2097152},(error,stdout,stderr)=>error?reject(new Error(stderr||error.message)):resolve()));
 const raw=JSON.parse(fs.readFileSync(`${output}.json`));if(raw.runtimeError)throw new Error(JSON.stringify(raw.runtimeError));
 const requests=raw.audits['network-requests'].details.items;
 const row={phase,route,device,score:raw.categories.performance.score*100,lcpMs:raw.audits['largest-contentful-paint'].numericValue,tbtMs:raw.audits['total-blocking-time'].numericValue,cls:raw.audits['cumulative-layout-shift'].numericValue,transferBytes:requests.reduce((s,r)=>s+(r.transferSize??0),0),mediaRequests:requests.filter(r=>r.resourceType==='Media').map(r=>({url:r.url,bytes:r.transferSize})),imageBytes:requests.filter(r=>r.resourceType==='Image').reduce((s,r)=>s+(r.transferSize??0),0)};
 rows.push(row);fs.writeFileSync(`${dir}/results.json`,JSON.stringify(rows,null,2));console.log(JSON.stringify(row));
}
