// Production HTTP/resource diagnostics only. No build, test runner, or browser timing claims.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const dir='reports/site-2026-10-22';fs.mkdirSync(dir,{recursive:true});
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const slugs=[...fs.readFileSync('src/data/projects.ts','utf8').matchAll(/(?:\bslug|"slug")\s*:\s*"([^"]+)"/g)].map(m=>m[1]);
const routes=['/','/work','/motion-video','/about','/capabilities','/contact','/resume',...slugs.map(s=>'/work/'+s)];
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"');
function inspect(html,route,headerLinks=''){
 const links=[...html.matchAll(/<link\b[^>]*>/g)].map(m=>Object.fromEntries([...m[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])])));
 const fonts=[...links.filter(l=>l.as==='font').map(l=>l.href),...[...headerLinks.matchAll(/<([^>]+)>;\s*rel=preload;\s*as="font"/g)].map(m=>m[1])];
 const scripts=[...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>decode(m[1])))];
 const css=links.filter(l=>l.rel==='stylesheet').map(l=>l.href);
 const images=[...html.matchAll(/<img\b[^>]*>/g)].map(m=>Object.fromEntries([...m[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])])));
 const videos=[...html.matchAll(/<video\b[^>]*>/g)].map(m=>m[0]);
 const visible=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g,'');
 const main=visible.match(/<main\b[\s\S]*?<\/main>/)?.[0]??visible;
 const mainText=main.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
 return {route,htmlBytes:Buffer.byteLength(html),fontPreloads:[...new Set(fonts)],imagePreloads:links.filter(l=>l.as==='image'),scripts,stylesheets:css,images,videos:videos.length,videoPreloadNone:videos.filter(t=>t.includes('preload="none"')).length,autoPlayVideos:videos.filter(t=>/autoplay/i.test(t)).length,title:html.match(/<title>(.*?)<\/title>/s)?.[1],mainTextHash:crypto.createHash('sha256').update(mainText).digest('hex'),canonical:links.find(l=>l.rel==='canonical')?.href,social:[...html.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/g)].map(m=>decode(m[1])),videoPosters:[...html.matchAll(/\bposter="([^"]+)"/g)].map(m=>decode(m[1])),videoSources:[...html.matchAll(/<source[^>]+src="([^"]+)"/g)].map(m=>decode(m[1]))};
}
function curl(url,agent){const data=execFileSync('curl.exe',['-sS','-L','--compressed','--max-time','45','-A',agent,'-w','\n__CURL_METRICS__%{json}',url],{maxBuffer:24e6,windowsHide:true});const index=data.lastIndexOf(Buffer.from('\n__CURL_METRICS__'));return {body:data.subarray(0,index).toString('utf8'),decodedBytes:index,metrics:JSON.parse(data.subarray(index+17).toString('utf8'))};}

if(process.argv.includes('--snapshot')){
 const files=[...walk('src'),'next.config.ts','package.json','package-lock.json'];
 fs.writeFileSync(`${dir}/source-before.json`,JSON.stringify({createdAt:new Date().toISOString(),files:files.map(file=>({file:file.replaceAll('\\','/'),sha256:hash(file),text:/\.(tsx?|css)$/.test(file)?fs.readFileSync(file,'utf8'):null})),media:walk('public').map(file=>({file:file.replaceAll('\\','/'),sha256:hash(file),bytes:fs.statSync(file).size}))},null,2),{flag:'wx'});
 console.log('Source/media baseline saved.');
}
if(process.argv.includes('--local-before')||process.argv.includes('--local-after')){
 const phase=process.argv.includes('--local-before')?'before':'after',pages=[];
 for(const route of routes){const response=await fetch('http://localhost:3000'+route,{signal:AbortSignal.timeout(60000)});const html=await response.text();pages.push({status:response.status,...inspect(html,route,response.headers.get('link')??'')});console.log(`${phase} ${route}: ${response.status}, ${pages.at(-1).fontPreloads.length} font preloads`);}
 const fonts=new Map();for(const page of pages)for(const url of page.fontPreloads){const file=path.join('.next/dev/static',decodeURIComponent(url.replace(/^\/_next\/static\//,'')));if(fs.existsSync(file))fonts.set(url,fs.statSync(file).size);}
 for(const page of pages)page.preloadedFontFileBytes=page.fontPreloads.reduce((s,f)=>s+(fonts.get(f)??0),0);
 fs.writeFileSync(`${dir}/local-${phase}.json`,JSON.stringify({mode:'development SSR declaration/resource-identity diagnostics only; not production performance timings',pages,fontFiles:Object.fromEntries(fonts)},null,2));
}
if(process.argv.includes('--production-http')){
 const agents={desktop:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',mobile:'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 Chrome/131.0.0.0 Mobile Safari/537.36'};
 const result={createdAt:new Date().toISOString(),scope:'Deployed-site HTTP only, not browser rendering/emulation; user-agent changes do not measure mobile/desktop CWV',pages:[],resources:[],limitations:{FCP:null,LCP:null,TBT:null,CLS:null,INP:null,clientNavigation:null,reason:'No enabled browser surfaces. IAB unavailable. PageSpeed Insights API HTTP 429 quota exhausted; no Lighthouse/CrUX data returned.'}};
 for(const route of routes){
  let first;const trials=[];
  for(const [profile,agent]of Object.entries(agents))for(let run=1;run<=3;run++){
   try{const r=curl('https://yassernasr.com'+route,agent);if(!first)first=inspect(r.body,route);trials.push({profile,run,status:r.metrics.http_code,ttfbMs:r.metrics.time_starttransfer*1000,totalMs:r.metrics.time_total*1000,transferredBytes:r.metrics.size_download,effectiveUrl:r.metrics.url_effective});}catch(e){trials.push({profile,run,error:e.message.slice(0,200)});}
  }
  result.pages.push({...first,route,trials});fs.writeFileSync(`${dir}/production-http-baseline.json`,JSON.stringify(result,null,2));console.log(`production ${route}: ${trials.filter(t=>t.status===200).length}/6 successful HTTP runs`);
 }
 const urls=[...new Set(result.pages.flatMap(p=>[...(p.scripts??[]),...(p.stylesheets??[]),...(p.fontPreloads??[])]))];
 for(const url of urls){try{const r=curl(new URL(url,'https://yassernasr.com').toString(),agents.desktop);result.resources.push({url,status:r.metrics.http_code,decodedBytes:r.decodedBytes,transferredBytes:r.metrics.size_download,ttfbMs:r.metrics.time_starttransfer*1000});}catch(e){result.resources.push({url,error:e.message.slice(0,200)})}}
 fs.writeFileSync(`${dir}/production-http-baseline.json`,JSON.stringify(result,null,2));
 console.log(`Production HTTP baseline complete: ${result.pages.length} routes; ${urls.length} declared JS/CSS/font resources.`);
}
if(process.argv.includes('--production-font-headers')){
 const file=`${dir}/production-http-baseline.json`,result=JSON.parse(fs.readFileSync(file,'utf8'));
 for(const page of result.pages){const headers=execFileSync('curl.exe',['-sS','-I','-L','--max-time','30','https://yassernasr.com'+page.route],{encoding:'utf8',windowsHide:true});const body=curl('https://yassernasr.com'+page.route,'Mozilla/5.0');page.fontPreloads=inspect(body.body,page.route,headers).fontPreloads;console.log(`production headers ${page.route}: ${page.fontPreloads.length} font preloads`);}
 const existing=new Set(result.resources.map(r=>r.url));
 for(const url of new Set(result.pages.flatMap(p=>p.fontPreloads))){const r=curl(new URL(url,'https://yassernasr.com').toString(),'Mozilla/5.0');const resource={url,status:r.metrics.http_code,decodedBytes:r.decodedBytes,transferredBytes:r.metrics.size_download,ttfbMs:r.metrics.time_starttransfer*1000};const index=result.resources.findIndex(r=>r.url===url);if(index<0)result.resources.push(resource);else result.resources[index]=resource;}
 fs.writeFileSync(file,JSON.stringify(result,null,2));
}
if(process.argv.includes('--production-images')){
 const baseline=JSON.parse(fs.readFileSync(`${dir}/production-http-baseline.json`,'utf8'));
 const samples=[];
 for(const route of ['/','/work','/work/presentations-pitch-decks-reports','/work/dolato-warm-winter-marvels']){
  const image=baseline.pages.find(p=>p.route===route).images.find(i=>i.src.startsWith('/_next/image'));
  for(const width of [640,1920]){
   const url=new URL(image.src,'https://yassernasr.com');url.searchParams.set('w',String(width));
   const response=curl(url.toString(),'Mozilla/5.0');
   samples.push({route,width,url:url.toString(),status:response.metrics.http_code,transferredBytes:response.metrics.size_download,contentType:response.metrics.content_type,ttfbMs:response.metrics.time_starttransfer*1000});
   console.log(`${route}, ${width}px: ${response.metrics.size_download} bytes, HTTP ${response.metrics.http_code}`);
  }
 }
 fs.writeFileSync(`${dir}/production-image-samples.json`,JSON.stringify({scope:'Selected real image HTTP responses only. Widths are diagnostic samples, not browser-selected resources or LCP identification. No before/after media changes.',samples},null,2));
}
