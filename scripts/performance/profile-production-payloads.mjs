// Local production HTTP payload comparison, not browser rendering or a test suite.
import fs from 'node:fs';
import http from 'node:http';
import crypto from 'node:crypto';
import {gunzipSync, brotliDecompressSync, inflateSync} from 'node:zlib';
import {performance} from 'node:perf_hooks';

const phase=process.argv.includes('--after')?'after':'before';
const directory='reports/site-2026-10-22/continuation';
const base='http://127.0.0.1:3010';
const hash=text=>crypto.createHash('sha256').update(text).digest('hex');
const routes=['/','/work','/motion-video','/about','/capabilities','/contact','/resume',...[...fs.readFileSync('src/data/projects.ts','utf8').matchAll(/(?:\bslug|"slug")\s*:\s*"([^"]+)"/g)].map(m=>'/work/'+m[1])];
function request(url,headers={}) {
  return new Promise((resolve,reject)=>{
    const start=performance.now();
    const req=http.get(new URL(url,base),{headers:{'Accept-Encoding':'gzip',...headers}},res=>{
      const ttfbMs=performance.now()-start,chunks=[];
      res.on('data',data=>chunks.push(data));
      res.on('end',()=>{
        const raw=Buffer.concat(chunks);
        const decoded=res.headers['content-encoding']==='gzip'?gunzipSync(raw):res.headers['content-encoding']==='br'?brotliDecompressSync(raw):res.headers['content-encoding']==='deflate'?inflateSync(raw):raw;
        resolve({status:res.statusCode,headers:res.headers,body:decoded.toString('utf8'),transferredBytes:raw.length,decodedBytes:decoded.length,ttfbMs,totalMs:performance.now()-start});
      });
    });
    req.setTimeout(60000,()=>req.destroy(new Error('HTTP timeout')));req.on('error',reject);
  });
}
const decode=value=>value.replaceAll('&amp;','&').replaceAll('&quot;','"');
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));
const result={createdAt:new Date().toISOString(),phase,scope:'Local next start production HTTP, gzip requested in both passes. No viewport, CPU/network throttling, JavaScript execution, paint, navigation or CWV measurement. Byte counts exclude HTTP headers.',pages:[],resources:[]};
for(const route of routes){
  const runs=[];let html,headers;
  for(let run=0;run<3;run++){
    const response=await request(route);html=response.body;headers=response.headers;
    runs.push({status:response.status,ttfbMs:response.ttfbMs,totalMs:response.totalMs,transferredBytes:response.transferredBytes,decodedBytes:response.decodedBytes});
  }
  const scripts=[...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>decode(m[1])))];
  const links=[...html.matchAll(/<link\b[^>]*>/g)].map(m=>attrs(m[0]));
  const images=[...html.matchAll(/<img\b[^>]*>/g)].map(m=>attrs(m[0]));
  const videoTags=[...html.matchAll(/<(?:video|source)\b[^>]*>/g)].map(m=>m[0]);
  const text=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g,'');
  const main=text.match(/<main\b[\s\S]*?<\/main>/)?.[0]??text;
  const textHash=hash(main.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
  const metadata=[...html.matchAll(/<(?:title|meta)\b[^>]*>(?:[^<]*<\/title>)?/g)].map(m=>m[0]);
  const schema=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
  const htmlFontLinks=links.filter(l=>l.as==='font').map(l=>l.href);
  const headerFontLinks=[...(headers.link??'').matchAll(/<([^>]+)>;\s*rel=preload;\s*as="font"/g)].map(m=>m[1]);
  const page={route,runs,scripts,stylesheets:links.filter(l=>l.rel==='stylesheet').map(l=>l.href),fontPreloads:[...new Set([...htmlFontLinks,...headerFontLinks])],imagePreloads:links.filter(l=>l.as==='image'),images,videoTags,textHash,metadata,schema,canonical:links.find(l=>l.rel==='canonical'),cacheControl:headers['cache-control']};
  result.pages.push(page);
  console.log(`${phase} ${route}: ${scripts.length} scripts, ${page.fontPreloads.length} font preloads, ${images.length} image tags`);
}
const resources=[...new Set(result.pages.flatMap(p=>[...p.scripts,...p.stylesheets,...p.fontPreloads]))];
for(const url of resources){
  const response=await request(url);
  result.resources.push({url,status:response.status,transferredBytes:response.transferredBytes,decodedBytes:response.decodedBytes,encoding:response.headers['content-encoding']??'identity',sha256:hash(response.body)});
}
for(const page of result.pages){
  for(const [type,urls]of Object.entries({js:page.scripts,css:page.stylesheets,fonts:page.fontPreloads})){
    const files=urls.map(url=>result.resources.find(r=>r.url===url));
    page[type+'TransferredBytes']=files.reduce((n,r)=>n+r.transferredBytes,0);
    page[type+'DecodedBytes']=files.reduce((n,r)=>n+r.decodedBytes,0);
  }
}
fs.writeFileSync(`${directory}/production-${phase}.json`,JSON.stringify(result,null,2));
if(phase==='after'){
  const previous=JSON.parse(fs.readFileSync(`${directory}/production-before.json`,'utf8'));
  const fields=['textHash','images','videoTags','metadata','schema','canonical'];
  const comparison=result.pages.map(page=>{
    const before=previous.pages.find(p=>p.route===page.route);
    return {route:page.route,jsBefore:before.jsTransferredBytes,jsAfter:page.jsTransferredBytes,jsBytesSaved:before.jsTransferredBytes-page.jsTransferredBytes,jsDecodedBefore:before.jsDecodedBytes,jsDecodedAfter:page.jsDecodedBytes,scriptCountBefore:before.scripts.length,scriptCountAfter:page.scripts.length,cssBefore:before.cssTransferredBytes,cssAfter:page.cssTransferredBytes,fontCountBefore:before.fontPreloads.length,fontCountAfter:page.fontPreloads.length,invariantDifferences:fields.filter(f=>JSON.stringify(before[f])!==JSON.stringify(page[f]))};
  });
  fs.writeFileSync(`${directory}/comparison.json`,JSON.stringify(comparison,null,2));
  console.log(JSON.stringify(comparison,null,2));
}
