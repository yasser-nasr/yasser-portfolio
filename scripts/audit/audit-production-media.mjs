// Read-only production route/media integrity diagnostics. Does not execute browser code.
import fs from 'node:fs';
import crypto from 'node:crypto';
import ts from 'typescript';

const directory='reports/site-2026-10-22/continuation',base='http://127.0.0.1:3010';
const before=JSON.parse(fs.readFileSync(`${directory}/source-before.json`,'utf8'));
const pages=JSON.parse(fs.readFileSync(`${directory}/production-after.json`,'utf8')).pages;
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name]);
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const files=walk('src'),known=new Set(before.files.map(f=>f.file));
const changedFiles=before.files.filter(f=>!fs.existsSync(f.file)||hash(f.file)!==f.hash).map(f=>({file:f.file,exists:fs.existsSync(f.file)}));
const addedSourceFiles=files.filter(f=>!known.has(f));
const changedMedia=before.media.filter(f=>!fs.existsSync(f.file)||hash(f.file)!==f.hash).map(f=>f.file);
const urls=new Set(),links=new Set(),routeResults=[];
const add=raw=>{
  if(!raw||raw.startsWith('data:'))return;
  const url=new URL(raw.replaceAll('&amp;','&'),'https://yassernasr.com');
  if(!['yassernasr.com','www.yassernasr.com','127.0.0.1'].includes(url.hostname))return;
  if(url.pathname==='/_next/image')return add(url.searchParams.get('url'));
  if(!url.pathname.startsWith('/_next/'))urls.add(url.pathname);
};
for(const page of pages){
  const response=await fetch(base+page.route),html=await response.text();
  routeResults.push({route:page.route,status:response.status});
  for(const m of html.matchAll(/\b(?:src|srcset|srcSet|poster)="([^"]+)"/g)){
    for(const part of m[1].split(/,\s+(?=\/|https?:)/))add(part.replace(/\s+\d+[wx]$/,''));
  }
  for(const src of [...html.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/g)])add(src[1]);
  for(const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)){
    function images(value,key=''){
      if(typeof value==='string'&&['image','logo','thumbnailUrl','contentUrl'].includes(key))add(value);
      else if(Array.isArray(value))value.forEach(v=>images(v,key));
      else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>images(v,k));
    }
    images(JSON.parse(m[1]));
  }
  for(const m of html.matchAll(/\bhref="([^"]+)"/g)){
    if(!m[1].startsWith('/')||m[1].startsWith('/_next/'))continue;
    const u=new URL(m[1].replaceAll('&amp;','&'),base);links.add(u.pathname+u.search);
  }
}
const manifest=ts.createSourceFile('manifest.ts',fs.readFileSync('src/lib/optimized-media-manifest.ts','utf8'),ts.ScriptTarget.Latest,true),declarations={};
function visit(node){if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name))declarations[node.name.text]=node.initializer;ts.forEachChild(node,visit)}visit(manifest);
const object=node=>Object.fromEntries(node.properties.map(p=>[p.name.text,p.initializer.text]));
const overrides=object(declarations.optimizedImageOverrides),videoPaths=Object.values(object(declarations.optimizedVideoPaths));
for(const item of declarations.optimizedImagePaths.arguments[0].elements)add('/projects/'+(overrides[item.text]??item.text));
videoPaths.forEach(add);
const assetChecks=[];
const pending=[...new Set([...urls,...links,'/sitemap.xml','/robots.txt','/opengraph-image','/manifest.webmanifest'])];
await Promise.all(Array.from({length:6},async()=>{
  while(pending.length){
    const url=pending.shift();
    try{const response=await fetch(base+url,{method:'HEAD',signal:AbortSignal.timeout(60000)});assetChecks.push({url,status:response.status,type:response.headers.get('content-type')});}
    catch(error){assetChecks.push({url,error:error.message});}
  }
}));
const videos=[];
for(const url of videoPaths){
  const file='public'+decodeURIComponent(url),fd=fs.openSync(file,'r'),bytes=fs.statSync(file).size,atoms=[];
  try{
    let offset=0;
    while(offset+8<=bytes&&atoms.length<1000){
      const header=Buffer.alloc(16);fs.readSync(fd,header,0,Math.min(16,bytes-offset),offset);
      let size=header.readUInt32BE(0);const type=header.toString('ascii',4,8);
      if(size===1)size=Number(header.readBigUInt64BE(8));else if(size===0)size=bytes-offset;
      if(size<8||offset+size>bytes)break;
      atoms.push({type,offset,size});offset+=size;
    }
  }finally{fs.closeSync(fd)}
  const moov=atoms.find(a=>a.type==='moov'),mdat=atoms.find(a=>a.type==='mdat');
  const response=await fetch(base+url,{headers:{Range:'bytes=0-1023'},signal:AbortSignal.timeout(30000)});
  const range=await response.arrayBuffer();
  videos.push({url,fileBytes:bytes,faststart:!!moov&&!!mdat&&moov.offset<mdat.offset,atoms,status:response.status,rangeBytes:range.byteLength,contentType:response.headers.get('content-type')});
}
const sitemap=await(await fetch(base+'/sitemap.xml')).text();
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const unknown=await fetch(base+'/work/not-a-real-project-performance-check');
const result={createdAt:new Date().toISOString(),changedFiles,addedSourceFiles,mediaFilesVerified:before.media.length,changedMedia,routeResults,assetChecks,assetFailures:assetChecks.filter(c=>c.error||c.status!==200),videos,sitemapUrls,missingSitemapRoutes:pages.filter(p=>!sitemapUrls.includes('https://yassernasr.com'+(p.route==='/'?'':p.route))).map(p=>p.route),unknownProjectStatus:unknown.status};
fs.writeFileSync(`${directory}/integrity.json`,JSON.stringify(result,null,2));
console.log(JSON.stringify({changedFiles,addedSourceFiles,mediaFilesVerified:before.media.length,changedMedia,routes:routeResults.length,checkedUrls:assetChecks.length,assetFailures:result.assetFailures,videos:videos.length,rangeFailures:videos.filter(v=>v.status!==206||v.rangeBytes!==1024),faststartExceptions:videos.filter(v=>!v.faststart).map(v=>v.url),sitemapUrls:sitemapUrls.length,missingSitemapRoutes:result.missingSitemapRoutes,unknownProjectStatus:unknown.status},null,2));
