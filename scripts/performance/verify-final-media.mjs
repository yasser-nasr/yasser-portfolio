// Read-only integrity checks for the final performance snapshot.
import fs from 'node:fs';
import crypto from 'node:crypto';
import ts from 'typescript';
const root='reports/performance-fixes-2026-10-24';
const fixture='D:/Personal/Branding/yasser-portfolio-performance-review-2026-10-24/media-after-app';
const base='http://localhost:3022';
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):[`${dir}/${e.name}`]);
const source=walk('src').map(file=>({file,hash:hash(file),fixtureHash:fs.existsSync(`${fixture}/${file}`)?hash(`${fixture}/${file}`):null}));
const checkpoint=JSON.parse(fs.readFileSync(`${root}/source-before.json`));
const old=new Map(checkpoint.map(r=>[r.Path.replaceAll('\\','/'),r.Hash.toLowerCase()]));
const sourceChanges=source.filter(r=>r.hash!==old.get(r.file)).map(r=>({file:r.file,status:old.has(r.file)?'modified':'added'}));
const routes=JSON.parse(fs.readFileSync('performance-reports/2026-10-24/2026-10-24T18-56-27-716Z/discovery.json')).pages.map(p=>new URL(p.url).pathname);
const urls=new Set(),pages=[];
function add(raw){
 if(!raw||raw.startsWith('data:')||raw.startsWith('blob:'))return;
 const url=new URL(raw.replaceAll('&amp;','&'),'https://yassernasr.com');
 if(!['yassernasr.com','www.yassernasr.com'].includes(url.hostname))return;
 if(url.pathname==='/_next/image')return add(url.searchParams.get('url'));
 if(!url.pathname.startsWith('/_next/'))urls.add(url.pathname);
}
for(const route of routes){
 const response=await fetch(base+route),body=await response.text();pages.push({route,status:response.status});
 for(const m of body.matchAll(/\b(?:src|srcset|poster)="([^"]+)"/g))for(const part of m[1].split(/,\s+(?=\/|https?:)/))add(part.replace(/\s+\d+[wx]$/,''));
 for(const m of body.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/g))add(m[1]);
}
const manifest=ts.createSourceFile('manifest.ts',fs.readFileSync('src/lib/optimized-media-manifest.ts','utf8'),ts.ScriptTarget.Latest,true),declarations={};
function visit(node){if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name))declarations[node.name.text]=node.initializer;ts.forEachChild(node,visit)}visit(manifest);
const object=node=>Object.fromEntries(node.properties.map(p=>[p.name.text,p.initializer.text]));
const overrides=object(declarations.optimizedImageOverrides),videos=Object.values(object(declarations.optimizedVideoPaths));
for(const item of declarations.optimizedImagePaths.arguments[0].elements)add('/projects/'+(overrides[item.text]??item.text));
videos.forEach(add);
const checks=[],pending=[...urls];
await Promise.all(Array.from({length:4},async()=>{while(pending.length){const url=pending.shift();const response=await fetch(base+url,{method:'HEAD',signal:AbortSignal.timeout(30000)});checks.push({url,status:response.status,type:response.headers.get('content-type')});}}));
const videoChecks=[];
for(const url of videos){const response=await fetch(base+url,{headers:{Range:'bytes=0-1023'},signal:AbortSignal.timeout(30000)});videoChecks.push({url,status:response.status,type:response.headers.get('content-type'),bytes:(await response.arrayBuffer()).byteLength});}
const mergePlan=JSON.parse(fs.readFileSync('reports/media-merge-2026-10-24/plan.json'));
const media=mergePlan.moves.map(r=>({file:r.target,unchanged:fs.existsSync(r.target)&&hash(r.target)===r.sha256}));
const conflicts=new Set(mergePlan.moves.filter(r=>r.action==='conflict').map(r=>r.target));
const retainedOriginals=mergePlan.media.filter(r=>!r.file.startsWith('public/projects-optimized/')&&!r.file.startsWith('public/videos-optimized/')&&!conflicts.has(r.file)).map(r=>({file:r.file,unchanged:fs.existsSync(r.file)&&hash(r.file)===r.sha256}));
const result={createdAt:new Date().toISOString(),fixture,buildId:fs.readFileSync(`${fixture}/.next/BUILD_ID`,'utf8').trim(),source,sourceMismatches:source.filter(r=>r.hash!==r.fixtureHash),sourceChanges,pages,checks,failedReferences:checks.filter(r=>r.status!==200),videoChecks,failedVideoRanges:videoChecks.filter(r=>r.status!==206||r.bytes!==1024||r.type!=='video/mp4'),media,retainedOriginals,changedMedia:[...media,...retainedOriginals].filter(r=>!r.unchanged)};
fs.writeFileSync(`${root}/media-followup/integrity.json`,JSON.stringify(result,null,2));
console.log(JSON.stringify({sourceFiles:source.length,sourceMismatches:result.sourceMismatches,pages:pages.length,failedPages:pages.filter(r=>r.status!==200),assetChecks:checks.length,failedReferences:result.failedReferences,videoChecks:videoChecks.length,failedVideoRanges:result.failedVideoRanges,activeMediaHashed:media.length,retainedOriginalsHashed:retainedOriginals.length,changedMedia:result.changedMedia},null,2));
if(result.sourceMismatches.length||result.failedReferences.length||result.failedVideoRanges.length||result.changedMedia.length||pages.some(r=>r.status!==200))process.exitCode=1;
