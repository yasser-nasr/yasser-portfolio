// Narrow Lighthouse analysis and production HTTP declarations; not a browser benchmark.
import fs from 'node:fs';
import http from 'node:http';
import crypto from 'node:crypto';
import {gunzipSync} from 'node:zlib';

const directory='reports/site-2026-10-22/presentations-lighthouse';
const reportFile='reports/lighthouse/yassernasr.com-20261022T231215.json';
const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"');
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));
const sum=(items,key)=>items.reduce((n,item)=>n+(item[key]??0),0);
if(process.argv.includes('--analyze')){
  const r=JSON.parse(fs.readFileSync(reportFile,'utf8'));
  const network=r.audits['network-requests'].details.items;
  const duration=row=>row.networkEndTime-row.networkRequestTime;
  const compact=row=>({url:row.url,type:row.resourceType,priority:row.priority,preload:row.isLinkPreload??false,transferredBytes:row.transferSize,resourceBytes:row.resourceSize,startMs:row.networkRequestTime,endMs:row.networkEndTime,durationMs:duration(row)});
  const https=network.filter(n=>n.url.startsWith('https:'));
  const groups=Object.fromEntries(['Document','Font','Stylesheet','Script','Image','Media','Fetch'].map(type=>{
    const rows=https.filter(n=>n.resourceType===type);
    return [type,{count:rows.length,preloads:rows.filter(r=>r.isLinkPreload).length,transferredBytes:sum(rows,'transferSize'),resourceBytes:sum(rows,'resourceSize')}];
  }));
  const longTasks=r.audits['long-tasks'].details.items;
  const extensions=longTasks.filter(t=>t.url.startsWith('chrome-extension:'));
  const result={reportFile,reportSha256:hash(fs.readFileSync(reportFile)),fetchTime:r.fetchTime,url:r.finalDisplayedUrl??r.finalUrl,lighthouseVersion:r.lighthouseVersion,config:r.configSettings,warnings:r.runWarnings,scores:Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,v.score])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','interactive','speed-index'].map(k=>[k,r.audits[k].numericValue])),observedAndSimulatedMetrics:r.audits.metrics.details.items,lcp:r.audits['lcp-breakdown-insight'].details,groups,largestHttpsRequests:[...https].sort((a,b)=>b.transferSize-a.transferSize).slice(0,20).map(compact),longestHttpsRequests:[...https].sort((a,b)=>duration(b)-duration(a)).slice(0,15).map(compact),stylesheets:https.filter(n=>n.resourceType==='Stylesheet').map(compact),imagePreloads:https.filter(n=>n.resourceType==='Image'&&n.isLinkPreload).map(compact),networkEndMs:Math.max(...network.map(n=>n.networkEndTime)),longTasks,extensionLongTasks:{count:extensions.length,totalDurationMs:sum(extensions,'duration'),durationOver50Ms:extensions.reduce((n,t)=>n+Math.max(0,t.duration-50),0)},mainThread:r.audits['mainthread-work-breakdown'].details,bootup:r.audits['bootup-time'].details,imageDelivery:r.audits['image-delivery-insight'].details,unusedJavaScript:r.audits['unused-javascript'].details,network:network.map(compact)};
  result.networkEndMs=Math.max(...network.map(n=>n.networkEndTime).filter(Number.isFinite));
  fs.writeFileSync(`${directory}/lighthouse-analysis.json`,JSON.stringify(result,null,2));
  console.log(JSON.stringify({metrics:result.metrics,lcp:result.lcp,groups,extensionLongTasks:result.extensionLongTasks,networkEndMs:result.networkEndMs},null,2));
}
function request(url,headers={}){
  return new Promise((resolve,reject)=>{
    const req=http.get(new URL(url,'http://127.0.0.1:3011'),{headers:{'Accept-Encoding':'gzip',...headers}},res=>{
      const parts=[];res.on('data',b=>parts.push(b));res.on('end',()=>{
        const raw=Buffer.concat(parts),body=res.headers['content-encoding']==='gzip'?gunzipSync(raw):raw;
        resolve({status:res.statusCode,headers:res.headers,body,transferredBytes:raw.length,resourceBytes:body.length});
      });
    });req.setTimeout(60000,()=>req.destroy(new Error('HTTP timeout')));req.on('error',reject);
  });
}
if(process.argv.includes('--before')||process.argv.includes('--after')){
  const phase=process.argv.includes('--before')?'before':'after';
  const pages=[];
  for(const route of ['/work/presentations-pitch-decks-reports','/','/work','/work/print-editorial-design']){
    const response=await request(route),html=response.body.toString('utf8');
    const images=[...html.matchAll(/<img\b[^>]*>/g)].map(m=>attrs(m[0]));
    const links=[...html.matchAll(/<link\b[^>]*>/g)].map(m=>attrs(m[0]));
    const main=html.match(/<main\b[\s\S]*?<\/main>/)?.[0]??html;
    // Retain layout/content/style/accessible attributes; allow only image delivery hints to differ.
    const layout=main.replace(/<img\b[^>]*>/g,tag=>JSON.stringify(Object.fromEntries(Object.entries(attrs(tag)).filter(([k])=>!['src','srcSet','srcset','sizes','loading','fetchPriority'].includes(k)))));
    const metadata=[...html.matchAll(/<(?:title|meta)\b[^>]*>(?:[^<]*<\/title>)?/g)].map(m=>m[0]);
    const schema=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
    const scripts=[...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>decode(m[1])))];
    const headers=response.headers.link??'';
    const fonts=[...new Set([...links.filter(l=>l.as==='font').map(l=>l.href),...[...headers.matchAll(/<([^>]+)>;\s*rel=preload;\s*as="font"/g)].map(m=>m[1])])];
    const stylesheets=links.filter(l=>l.rel==='stylesheet').map(l=>l.href);
    pages.push({route,status:response.status,htmlTransferredBytes:response.transferredBytes,htmlResourceBytes:response.resourceBytes,images,layoutHash:hash(layout),metadata,schema,canonical:links.find(l=>l.rel==='canonical'),imagePreloads:links.filter(l=>l.as==='image'),headerImagePreloads:[...headers.matchAll(/<([^>]+)>;\s*rel=preload;\s*as="image"/g)].map(m=>m[1]),fontPreloads:fonts,scripts,stylesheets});
  }
  const resources=[];
  for(const url of new Set(pages.flatMap(p=>[...p.scripts,...p.stylesheets,...p.fontPreloads]))){
    const r=await request(url);resources.push({url,status:r.status,transferredBytes:r.transferredBytes,resourceBytes:r.resourceBytes});
  }
  for(const page of pages)for(const [type,urls]of Object.entries({js:page.scripts,css:page.stylesheets,fonts:page.fontPreloads})){
    page[type+'TransferredBytes']=sum(urls.map(url=>resources.find(r=>r.url===url)),'transferredBytes');
    page[type+'ResourceBytes']=sum(urls.map(url=>resources.find(r=>r.url===url)),'resourceBytes');
  }
  fs.writeFileSync(`${directory}/production-${phase}.json`,JSON.stringify({phase,scope:'Local production HTTP and SSR declarations, not browser timings',pages,resources},null,2));
  console.log(pages.map(p=>({route:p.route,status:p.status,fontPreloads:p.fontPreloads.length,imagePreloads:p.imagePreloads.length,lazyImages:p.images.filter(i=>i.loading==='lazy').length,images:p.images.length,jsTransferredBytes:p.jsTransferredBytes})));
  if(phase==='after'){
    const before=JSON.parse(fs.readFileSync(`${directory}/production-before.json`,'utf8'));
    const comparison=pages.map(p=>{
      const b=before.pages.find(b=>b.route===p.route);
      return {route:p.route,invariantDifferences:['layoutHash','metadata','schema','canonical'].filter(k=>JSON.stringify(b[k])!==JSON.stringify(p[k])),imagePreloadsBefore:b.imagePreloads.length,imagePreloadsAfter:p.imagePreloads.length,lazyImagesBefore:b.images.filter(i=>i.loading==='lazy').length,lazyImagesAfter:p.images.filter(i=>i.loading==='lazy').length,jsTransferredBefore:b.jsTransferredBytes,jsTransferredAfter:p.jsTransferredBytes,jsResourceBefore:b.jsResourceBytes,jsResourceAfter:p.jsResourceBytes,cssTransferredBefore:b.cssTransferredBytes,cssTransferredAfter:p.cssTransferredBytes};
    });
    fs.writeFileSync(`${directory}/comparison.json`,JSON.stringify(comparison,null,2));console.log(JSON.stringify(comparison,null,2));
    const snapshot=JSON.parse(fs.readFileSync(`${directory}/source-before.json`,'utf8'));
    const changed=snapshot.filter(f=>!fs.existsSync(f.file)||hash(fs.readFileSync(f.file))!==f.sha256).map(f=>f.file);
    fs.writeFileSync(`${directory}/integrity.json`,JSON.stringify({filesVerified:snapshot.length,publicFilesVerified:snapshot.filter(f=>f.file.startsWith('public/')).length,changedFiles:changed},null,2));
    console.log('Changed files:',changed);
  }
}
if(process.argv.includes('--image-samples')){
  const before=JSON.parse(fs.readFileSync(`${directory}/production-before.json`,'utf8')).pages[0];
  const after=JSON.parse(fs.readFileSync(`${directory}/production-after.json`,'utf8')).pages[0];
  const thumbnail=after.images.find(i=>i.alt===''&&i.src.includes('happy-tenant')&&i.src.includes('page-01'));
  const source=new URL(thumbnail.src,'http://127.0.0.1:3011').searchParams.get('url');
  const samples=[];
  for(const width of [128,256]){
    const url=`/_next/image?url=${encodeURIComponent(source)}&w=${width}&q=75`;
    const r=await request(url,{Accept:'image/webp'});
    samples.push({url,width,status:r.status,contentType:r.headers['content-type'],transferredBytes:r.transferredBytes,resourceBytes:r.resourceBytes});
  }
  const b=before.images.find(i=>i.alt===''&&i.src.includes('happy-tenant')&&i.src.includes('page-01'));
  const result={scope:'Actual local production endpoint byte sizes. At the report\'s configured DPR 1.75, 60 CSS pixels require 105 raster pixels; the new width srcset offers 128px. Browser selection has not been rerun.',thumbnailBefore:b,thumbnailAfter:thumbnail,samples};
  fs.writeFileSync(`${directory}/thumbnail-samples.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}
