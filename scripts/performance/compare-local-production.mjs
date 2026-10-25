// Explicitly local production benchmarks; never presented as deployed-site results.
import fs from 'node:fs';
import path from 'node:path';
import {execFile} from 'node:child_process';
import {extract, summarize} from './audit-live-site.mjs';
const [phase, origin] = process.argv.slice(2);
if (!['before','after'].includes(phase) || !/^http:\/\/(?:localhost|127\.0\.0\.1):\d+$/.test(origin ?? '')) throw new Error('Usage: node --import tsx scripts/performance/compare-local-production.mjs before|after http://localhost:PORT');
const root=process.cwd();
const dir=path.join(root,'reports/performance-fixes-2026-10-24',phase);
fs.mkdirSync(dir,{recursive:true});
const live=JSON.parse(fs.readFileSync('performance-reports/2026-10-24/2026-10-24T18-56-27-716Z/discovery.json','utf8'));
const discovery={...live,pages:live.pages.map(p=>({...p,url:origin+new URL(p.url).pathname})),warnings:['LOCAL production benchmark; not a live production measurement. Same Lighthouse mobile/desktop settings as original collection.']};
fs.writeFileSync(path.join(dir,'discovery.json'),JSON.stringify(discovery,null,2));
const results=[];
for(const device of ['mobile','desktop']) for(const {url}of discovery.pages) for(let run=1;run<=3;run++){
 const relative=`${device}/${new URL(url).pathname.slice(1).replaceAll('/','__')||'home'}/run-${run}`;
 const output=path.join(dir,relative);fs.mkdirSync(path.dirname(output),{recursive:true});
 if(fs.existsSync(`${output}.json`)&&fs.existsSync(`${output}.html`)){
  const row=extract(JSON.parse(fs.readFileSync(`${output}.json`,'utf8')),device,run,relative);
  if(!row.runtimeError&&typeof row.score==='number'){results.push(row);continue;}
 }
 console.log(`${phase} ${device} ${new URL(url).pathname} ${run}/3`);
 try{
  await new Promise((resolve,reject)=>execFile(process.execPath,['scripts/performance/audit-lighthouse-worker.mjs',url,device,output,process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'],{cwd:root,windowsHide:true,timeout:240000,maxBuffer:2097152},(error,stdout,stderr)=>error?reject(new Error(stderr||error.message)):resolve()));
  results.push(extract(JSON.parse(fs.readFileSync(`${output}.json`,'utf8')),device,run,relative));
 }catch(e){results.push({url,device,run,report:relative,score:null,runtimeError:{message:e.message},warnings:[],requests:[],diagnostics:[],lcpElement:null,lcpTimingBreakdown:null});console.error(e.message);}
 summarize(dir,results,discovery);
}
summarize(dir,results,discovery);
console.log(`${phase}: ${results.filter(r=>!r.runtimeError).length}/120 successful. ${dir}`);
if(results.some(r=>r.runtimeError))process.exitCode=1;
