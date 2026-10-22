import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const base='http://localhost:3000';
const baseline=JSON.parse(fs.readFileSync('media-switch-review/baseline.json','utf8'));
const {mapping,fallbacks}=JSON.parse(fs.readFileSync('media-switch-review/mapping.json','utf8'));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const changedProtected=baseline.protectedFiles.filter(f=>!fs.existsSync(f.file)||hash(f.file)!==f.sha256);
const changedSource=baseline.sourceFiles.filter(f=>fs.readFileSync(f.file,'utf8')!==f.text).map(f=>f.file);
const data=fs.readFileSync('src/data/projects.ts','utf8');
const slugs=[...data.matchAll(/(?:\bslug|"slug")\s*:\s*"([^"]+)"/g)].map(m=>m[1]);
const routes=['/','/work','/motion-video',...slugs.map(s=>'/work/'+s)];
const pages=[],assets=new Set(),issues=[];
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"');
for(const route of routes){
 try{
  const response=await fetch(base+route,{signal:AbortSignal.timeout(90000)}),html=await response.text();
  const actual=[];
  for(const match of html.matchAll(/\b(?:src|srcSet|srcset|poster)="([^"]*)"/g)){
   for(const part of decode(match[1]).split(/,\s+(?=\/|https?:)/)){
    const raw=part.trim().replace(/\s+\d+[wx]$/,'');if(!raw)continue;
    let url;try{url=new URL(raw,base)}catch{continue}
    if(url.pathname==='/_next/image'){const image=url.searchParams.get('url');if(image?.startsWith('/')){assets.add(image);actual.push(image);assets.add(url.pathname+url.search);}}
    else if(/^\/(projects(?:-optimized)?|videos-optimized)\//.test(url.pathname)){assets.add(url.pathname);actual.push(url.pathname)}
   }
  }
  const meta=[...html.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/g)].map(m=>decode(m[1]));
  for(const image of meta){const url=new URL(image,base);if(url.pathname.startsWith('/projects'))assets.add(url.pathname)}
  const original=[...new Set(actual.filter(p=>p.startsWith('/projects/')))];
  const missed=original.filter(p=>mapping.some(m=>m.source===p));
  const page={route,status:response.status,title:html.match(/<title>(.*?)<\/title>/s)?.[1],renderedMedia:[...new Set(actual)],originalMedia:original,missedOptimized:missed,ogImages:meta};
  pages.push(page);if(response.status!==200||missed.length)issues.push({route,status:response.status,missed});
  console.log(`${route}: ${response.status}; ${page.renderedMedia.length} rendered media; ${missed.length} missed matches`);
 }catch(error){pages.push({route,error:error.message});issues.push({route,error:error.message});console.log(route+': '+error.message)}
}
// Asset-serving diagnostics: HEAD reads no full payload; video range reads only 1 KiB.
for(const m of mapping)assets.add(m.target);
const assetResults=[];
// Do not generate every responsive width of every gallery image merely to audit paths.
// Check every direct target, plus a representative Image-API derivative per project/format.
const responsive=new Map();
for(const asset of assets){if(!asset.startsWith('/_next/image?'))continue;const u=new URL(asset,base),src=u.searchParams.get('url'),width=Number(u.searchParams.get('w'));const previous=responsive.get(src);if(!previous||width<previous.width)responsive.set(src,{asset,width});}
const responsiveSources=new Set([...pages.flatMap(p=>(p.renderedMedia??[]).filter(a=>a.startsWith('/projects-optimized/')).slice(0,2)),...mapping.filter(m=>m.target.endsWith('.avif')).map(m=>m.target)]);
let pending=[...[...assets].filter(a=>!a.startsWith('/_next/image?')),...[...responsiveSources].map(src=>responsive.get(src)?.asset).filter(Boolean)];
async function worker(){while(pending.length){const asset=pending.shift();try{const response=await fetch(base+asset,{method:'HEAD',signal:AbortSignal.timeout(30000)});const row={asset,status:response.status,type:response.headers.get('content-type'),cache:response.headers.get('cache-control')};assetResults.push(row);if(response.status!==200)issues.push(row);}catch(e){assetResults.push({asset,error:e.message});issues.push({asset,error:e.message});}}}
await Promise.all(Array.from({length:3},worker));
const ranges=[];
for(const m of mapping.filter(m=>m.kind==='video')){const response=await fetch(base+m.target,{headers:{Range:'bytes=0-1023'},signal:AbortSignal.timeout(30000)});const row={asset:m.target,status:response.status,type:response.headers.get('content-type'),contentRange:response.headers.get('content-range'),bytes:(await response.arrayBuffer()).byteLength};ranges.push(row);if(row.status!==206||row.bytes!==1024||!row.type?.startsWith('video/mp4'))issues.push(row);}
const dimensions=[];
for(const m of mapping.filter(m=>m.kind==='image')){const meta=await sharp('public'+m.target).metadata();if(meta.width!==m.width||meta.height!==m.height)issues.push({asset:m.target,reason:'Dimensions differ from approved report'});dimensions.push({asset:m.target,width:meta.width,height:meta.height});}
const originalFallbacks=[...new Set(pages.flatMap(p=>p.originalMedia??[]))].map(source=>({source,exists:fs.existsSync('public'+decodeURIComponent(source)),reason:source.endsWith('.svg')?'SVG vector: no raster optimized counterpart':'No verified optimized match'}));
const report={generatedAt:new Date().toISOString(),routes:pages,assetResults,ranges,dimensions,changedProtected,protectedFiles:baseline.protectedFiles.length,changedSource,preparedFallbacks:fallbacks,originalFallbacks,issues,browserReview:'Unavailable: no enabled browser surfaces; IAB creation returned Browser is not available. HTTP/asset diagnostics cannot establish visible quality, browser playback, or lightbox interaction.'};
fs.writeFileSync('media-switch-review/diagnostics.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({routes:pages.length,assets:assetResults.length,rangeChecks:ranges.length,unchangedProtectedFiles:baseline.protectedFiles.length-changedProtected.length,changedProtected,originalFallbacks,issues},null,2));
