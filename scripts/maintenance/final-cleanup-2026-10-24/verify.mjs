// Focused dev-server route/reference checks after cache regeneration; no build/test runner.
import fs from 'node:fs';
import crypto from 'node:crypto';
const dir='reports/organization-2026-10-24/final-cleanup',base='http://127.0.0.1:3000';
const before=JSON.parse(fs.readFileSync(`${dir}/before.json`,'utf8'));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const routes=['/','/work','/motion-video','/about','/capabilities','/contact','/resume',...[...fs.readFileSync('src/data/projects.ts','utf8').matchAll(/(?:\bslug|"slug")\s*:\s*"([^"]+)"/g)].map(m=>'/work/'+m[1])];
const assets=new Set(),links=new Set(),pages=[];
function asset(raw){
  if(!raw||raw.startsWith('data:'))return;
  const url=new URL(raw.replaceAll('&amp;','&'),'https://yassernasr.com');
  if(!['yassernasr.com','www.yassernasr.com'].includes(url.hostname))return;
  if(url.pathname==='/_next/image')return asset(url.searchParams.get('url'));
  if(!url.pathname.startsWith('/_next/'))assets.add(url.pathname);
}
for(const route of routes){
  const response=await fetch(base+route,{signal:AbortSignal.timeout(90000)}),html=await response.text();
  const canonical=html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1];
  const schema=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  const page={route,status:response.status,title:html.match(/<title>(.*?)<\/title>/s)?.[1],canonical,h1:(html.match(/<h1\b/g)??[]).length,schemas:schema.length,canonicalCorrect:canonical==='https://yassernasr.com'+(route==='/'?'':route)};
  pages.push(page);console.log(`${page.status} ${route}`);
  for(const m of html.matchAll(/\b(?:src|srcset|srcSet|poster)="([^"]+)"/g))for(const part of m[1].split(/,\s+(?=\/|https?:)/))asset(part.replace(/\s+\d+[wx]$/,''));
  for(const m of html.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/g))asset(m[1]);
  for(const m of html.matchAll(/\bhref="([^"]+)"/g))if(m[1].startsWith('/')&&!m[1].startsWith('/_next/'))links.add(new URL(m[1].replaceAll('&amp;','&'),base).pathname);
  function images(value,key=''){if(typeof value==='string'&&['image','logo','thumbnailUrl','contentUrl'].includes(key))asset(value);else if(Array.isArray(value))value.forEach(v=>images(v,key));else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>images(v,k));}
  schema.forEach(v=>images(v));
}
before.mappings.forEach(m=>asset('/'+m.target.replace(/^public\//,'')));
const checks=[],pending=[...new Set([...assets,...links,'/sitemap.xml','/robots.txt','/opengraph-image','/manifest.webmanifest'])];
await Promise.all(Array.from({length:4},async()=>{
  while(pending.length){const url=pending.shift();try{const r=await fetch(base+url,{method:'HEAD',signal:AbortSignal.timeout(60000)});checks.push({url,status:r.status});}catch(error){checks.push({url,error:error.message});}}
}));
const videoChecks=[];
for(const map of before.mappings.filter(m=>m.target.endsWith('.mp4'))){const url='/'+map.target.replace(/^public\//,''),r=await fetch(base+url,{headers:{Range:'bytes=0-1023'},signal:AbortSignal.timeout(30000)});videoChecks.push({url,status:r.status,type:r.headers.get('content-type'),bytes:(await r.arrayBuffer()).byteLength});}
const originalReview=before.originalReview.map(f=>({...f,currentlyServedOriginalUrlReferenced:assets.has('/'+f.file.replace(/^public\//,'')),sourceBasenameMentioned:fs.readdirSync('src').length>0}));
// Exact source basename presence is supplementary; fonts and dynamic logical IDs are handled separately.
function sourceText(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?sourceText(dir+'/'+e.name):/\.(tsx?|css)$/.test(e.name)?[fs.readFileSync(dir+'/'+e.name,'utf8')]:[]).join('\n');}
const source=sourceText('src');for(const file of originalReview)file.sourceBasenameMentioned=source.includes(file.file.split('/').at(-1));
const sitemap=await(await fetch(base+'/sitemap.xml')).text();
const result={createdAt:new Date().toISOString(),scope:'Focused HTTP/metadata/media/hash checks on restarted Next dev server, not production-build or visual/playback certification',pages,checks,videoChecks,originalReview,failedPages:pages.filter(p=>p.status!==200||!p.title||p.h1!==1||!p.schemas||!p.canonicalCorrect),failedAssets:checks.filter(c=>c.error||c.status!==200),failedVideos:videoChecks.filter(v=>v.status!==206||v.type!=='video/mp4'||v.bytes!==1024),missingSitemapRoutes:routes.filter(r=>!sitemap.includes('<loc>https://yassernasr.com'+(r==='/'?'':r)+'</loc>')),unexpectedProtectedChanges:before.protectedFiles.filter(f=>!fs.existsSync(f.file)||hash(f.file)!==f.sha256).map(f=>f.file)};
fs.writeFileSync(`${dir}/validation.json`,JSON.stringify(result,null,2));
const csvCell=v=>'"'+String(v??'').replaceAll('"','""')+'"';
const columns=['file','bytes','currentlyServedOriginalUrlReferenced','sourceBasenameMentioned','replacement','replacementExists','decision','reason'];
fs.writeFileSync(`${dir}/original-review.csv`,[columns.join(','),...originalReview.map(row=>columns.map(k=>csvCell(row[k])).join(','))].join('\n')+'\n');
console.log(JSON.stringify({pages:pages.length,assets:checks.length,videos:videoChecks.length,originals:originalReview.length,failedPages:result.failedPages,failedAssets:result.failedAssets,failedVideos:result.failedVideos,missingSitemapRoutes:result.missingSitemapRoutes,unexpectedProtectedChanges:result.unexpectedProtectedChanges},null,2));
