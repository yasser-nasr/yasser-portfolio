// Secondary diagnostics for two mixed simulated results. Never merges with the
// primary 120-run simulated collection or substitutes for its reported medians.
import fs from 'node:fs';
import path from 'node:path';
import {execFile} from 'node:child_process';
const dir=path.resolve('reports/performance-fixes-2026-10-24/applied-throttling');
const rows=[];
for(const route of ['/work/social-media-campaign-design','/work/orin'])for(const [phase,port]of [['before',3020],['after',3021]])for(let run=1;run<=3;run++){
 const output=path.join(dir,phase,route.slice(1).replaceAll('/','__'),`run-${run}`);fs.mkdirSync(path.dirname(output),{recursive:true});
 console.log(`Applied mobile throttle: ${phase} ${route} ${run}/3`);
 await new Promise((resolve,reject)=>execFile(process.execPath,['scripts/performance/audit-lighthouse-worker.mjs',`http://localhost:${port}${route}`,'mobile',output,'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe','devtools'],{windowsHide:true,timeout:240000,maxBuffer:2097152},(error,stdout,stderr)=>error?reject(new Error(stderr||error.message)):resolve()));
 const raw=JSON.parse(fs.readFileSync(`${output}.json`));
 if(raw.runtimeError)throw new Error(JSON.stringify(raw.runtimeError));
 rows.push({phase,route,run,method:raw.configSettings.throttlingMethod,lcpMs:raw.audits['largest-contentful-paint'].numericValue,tbtMs:raw.audits['total-blocking-time'].numericValue,score:raw.categories.performance.score*100,cls:raw.audits['cumulative-layout-shift'].numericValue,throttling:raw.configSettings.throttling});
 fs.writeFileSync(path.join(dir,'results.json'),JSON.stringify(rows,null,2));
}
const median=a=>a.sort((a,b)=>a-b)[Math.floor(a.length/2)];
const medians=[...Map.groupBy(rows,r=>r.phase+' '+r.route).values()].map(r=>({phase:r[0].phase,route:r[0].route,runs:r.length,lcpMs:median(r.map(x=>x.lcpMs)),tbtMs:median(r.map(x=>x.tbtMs)),score:median(r.map(x=>x.score)),cls:median(r.map(x=>x.cls))}));
fs.writeFileSync(path.join(dir,'medians.json'),JSON.stringify(medians,null,2));console.log(JSON.stringify(medians,null,2));
