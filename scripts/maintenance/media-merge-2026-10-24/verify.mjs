// Focused bytes/HTTP compatibility verification; no build/test runner or media encoder.
import fs from 'node:fs';
import crypto from 'node:crypto';
const dir='reports/media-merge-2026-10-24',plan=JSON.parse(fs.readFileSync(`${dir}/plan.json`,'utf8')),base='http://127.0.0.1:3000';
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const issues=[];
for(const entry of plan.moves){
 if(!fs.existsSync(entry.target)||hash(entry.target)!==entry.sha256)issues.push({file:entry.target,reason:'Active optimized bytes differ'});
 if(entry.action==='identical'&&(!fs.existsSync(entry.recovery)||hash(entry.recovery)!==entry.sha256))issues.push({file:entry.recovery,reason:'Duplicate recovery mismatch'});
 if(entry.action==='conflict'&&(!fs.existsSync(entry.recovery)||hash(entry.recovery)!==entry.existing.sha256))issues.push({file:entry.recovery,reason:'Original version recovery mismatch'});
}
const conflicts=new Set(plan.moves.filter(m=>m.action==='conflict').map(m=>m.target));
for(const file of plan.media.filter(f=>!f.file.startsWith('public/projects-optimized/')&&!f.file.startsWith('public/videos-optimized/')&&!conflicts.has(f.file)))if(!fs.existsSync(file.file)||hash(file.file)!==file.sha256)issues.push({file:file.file,reason:'Retained original/brand/font bytes changed'});
const checks=[],pending=[...new Set([...plan.moves.flatMap(m=>['/'+m.target.slice(7),'/'+m.file.slice(7)]),...plan.media.filter(f=>!f.file.startsWith('public/projects-optimized/')&&!f.file.startsWith('public/videos-optimized/')).map(f=>'/'+f.file.slice(7))])];
await Promise.all(Array.from({length:5},async()=>{while(pending.length){const url=pending.shift();try{const response=await fetch(base+url,{method:'HEAD',signal:AbortSignal.timeout(60000)});checks.push({url,status:response.status,type:response.headers.get('content-type')});}catch(error){checks.push({url,error:error.message});}}}));
const videos=[];
for(const move of plan.moves.filter(m=>m.file.endsWith('.mp4')))for(const file of [move.file,move.target]){
 const url='/'+file.slice(7),response=await fetch(base+url,{headers:{Range:'bytes=0-1023'},signal:AbortSignal.timeout(30000)}),bytes=Buffer.from(await response.arrayBuffer());
 videos.push({url,status:response.status,type:response.headers.get('content-type'),bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
}
const imageSamples=[];
for(const move of [plan.moves.find(m=>m.file.endsWith('.webp')),plan.moves.find(m=>m.file.endsWith('.avif'))])for(const file of [move.file,move.target]){
 const media='/'+file.slice(7),url=`/_next/image?url=${encodeURIComponent(media)}&w=96&q=75`;
 const response=await fetch(base+url,{headers:{Accept:'image/webp'},signal:AbortSignal.timeout(60000)});
 imageSamples.push({url,status:response.status,type:response.headers.get('content-type'),bytes:(await response.arrayBuffer()).byteLength});
}
const sourceAllowed=new Set(['src/lib/optimized-media.ts','src/lib/optimized-media-manifest.ts']);
const sourceChanges=plan.originals.filter(f=>f.file.startsWith('src/')&&!sourceAllowed.has(f.file)&&hash(f.file)!==f.sha256).map(f=>f.file);
const remainingFolderFiles={};
function countFiles(folder){return fs.readdirSync(folder,{withFileTypes:true}).reduce((n,e)=>n+(e.isDirectory()?countFiles(folder+'/'+e.name):1),0);}
for(const folder of ['public/projects-optimized','public/videos-optimized'])remainingFolderFiles[folder]=fs.existsSync(folder)?countFiles(folder):null;
const videoPairMismatches=[];for(let index=0;index<videos.length;index+=2)if(videos[index].sha256!==videos[index+1].sha256)videoPairMismatches.push([videos[index].url,videos[index+1].url]);
const result={createdAt:new Date().toISOString(),activeFilesVerified:plan.moves.length,issues,checks,failedChecks:checks.filter(c=>c.error||c.status!==200),videos,failedVideos:videos.filter(v=>v.status!==206||v.type!=='video/mp4'||v.bytes!==1024),videoPairMismatches,imageSamples,failedImageSamples:imageSamples.filter(i=>i.status!==200||!i.type?.startsWith('image/')),sourceChanges,remainingFolderFiles};
fs.writeFileSync(`${dir}/validation.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({activeFilesVerified:plan.moves.length,issues,urlChecks:checks.length,failedChecks:result.failedChecks,videoChecks:videos.length,failedVideos:result.failedVideos,videoPairMismatches,imageSamples,sourceChanges,remainingFolderFiles},null,2));
