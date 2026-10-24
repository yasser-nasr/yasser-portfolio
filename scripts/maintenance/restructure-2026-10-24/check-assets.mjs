import fs from 'node:fs';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
const dir='reports/restructure-2026-10-24',base='http://127.0.0.1:3000';
const plan=JSON.parse(fs.readFileSync(`${dir}/plan.json`,'utf8'));
const prior=JSON.parse(fs.readFileSync('reports/organization-2026-10-24/final-cleanup/validation.json','utf8'));
const checks=[],pending=[...new Set(prior.checks.map(c=>c.url))];
await Promise.all(Array.from({length:4},async()=>{while(pending.length){const url=pending.shift();try{const response=await fetch(base+url,{method:'HEAD',signal:AbortSignal.timeout(60000)});checks.push({url,status:response.status});}catch(error){checks.push({url,error:error.message});}}}));
const videos=[];for(const video of prior.videoChecks){const response=await fetch(base+video.url,{headers:{Range:'bytes=0-1023'},signal:AbortSignal.timeout(30000)});videos.push({url:video.url,status:response.status,type:response.headers.get('content-type'),bytes:(await response.arrayBuffer()).byteLength});}
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const rawReportFiles=plan.reportFiles.filter(f=>/\.(json|csv)$/.test(f.file));
const changedRawReports=rawReportFiles.filter(f=>{const target=plan.reportMove.to+f.file.slice(plan.reportMove.from.length);return !fs.existsSync(target)||hash(target)!==f.sha256;}).map(f=>f.file);
const ignore=spawnSync('git',['check-ignore','--stdin'],{input:plan.mappings.map(m=>m.to).join('\n')+'\n',encoding:'utf8'});
const unexpectedIgnoredSources=ignore.stdout.trim().split('\n').filter(Boolean);
const agents=plan.originals.find(f=>f.file==='AGENTS.md');
const sitemap=await(await fetch(base+'/sitemap.xml')).text(),robots=await(await fetch(base+'/robots.txt')).text();
const result={checkedUrls:checks.length,checks,failedChecks:checks.filter(c=>c.error||c.status!==200),videos,failedVideos:videos.filter(v=>v.status!==206||v.type!=='video/mp4'||v.bytes!==1024),rawReportFilesChecked:rawReportFiles.length,changedRawReports,unexpectedIgnoredSources,agentsUnchanged:hash('AGENTS.md')===agents.sha256,sitemapEntries:(sitemap.match(/<loc>/g)??[]).length,robotsHasSitemap:robots.includes('https://yassernasr.com/sitemap.xml')};
fs.writeFileSync(`${dir}/asset-integrity.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({checkedUrls:result.checkedUrls,failedChecks:result.failedChecks,videos:videos.length,failedVideos:result.failedVideos,rawReportFilesChecked:rawReportFiles.length,changedRawReports,unexpectedIgnoredSources,agentsUnchanged:result.agentsUnchanged,sitemapEntries:result.sitemapEntries,robotsHasSitemap:result.robotsHasSitemap},null,2));
