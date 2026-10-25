// Focused browser/HTML verification against two LOCAL production servers.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import * as launcher from 'chrome-launcher';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
const root='reports/performance-fixes-2026-10-24';
const dir=`${root}/verification`;fs.mkdirSync(dir,{recursive:true});
const origins={before:process.env.PERF_BEFORE_ORIGIN??'http://localhost:3020',after:process.env.PERF_AFTER_ORIGIN??'http://localhost:3021'};
const live=JSON.parse(fs.readFileSync('performance-reports/2026-10-24/2026-10-24T18-56-27-716Z/discovery.json'));
const routes=live.pages.map(p=>new URL(p.url).pathname);
const errors=[],html=[];
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
function semantic(body){
 const main=body.match(/<main\b[\s\S]*?<\/main>/)?.[0]??'';
 const text=main.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/g,'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
 return {text:hash(text),head:hash([...body.matchAll(/<(?:meta|title|link\b[^>]*rel="canonical")[^>]*>(?:[^<]*<\/title>)?/g)].map(m=>m[0]).filter(t=>!t.includes('next-size-adjust')).join('')),schemas:hash([...body.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join(''))};
}
for(const route of routes){
 const bodies={};for(const [phase,origin]of Object.entries(origins)){
  const response=await fetch(origin+route);const body=await response.text();
  if(response.status!==200)errors.push(`${phase} ${route}: HTTP ${response.status}`);
  bodies[phase]=semantic(body);
 }
 const item={route,...bodies,textEqual:bodies.before.text===bodies.after.text,metadataEqual:bodies.before.head===bodies.after.head,schemasEqual:bodies.before.schemas===bodies.after.schemas};html.push(item);
 if(!item.textEqual||!item.metadataEqual||!item.schemasEqual)errors.push(`Semantic mismatch ${route}: ${JSON.stringify(item)}`);
}
const chrome=await launcher.launch({chromeFlags:['--headless=new','--disable-extensions'],handleSIGINT:false,logLevel:'silent'});
const browser=await puppeteer.connect({browserURL:`http://127.0.0.1:${chrome.port}`});
const snapshots=[],interactions=[];
const widths=(process.env.PERF_VERIFY_WIDTHS??'412,1440').split(',').map(Number);
const theme=process.env.PERF_VERIFY_THEME??'dark';
const variant=process.env.PERF_VERIFY_LABEL?`-${process.env.PERF_VERIFY_LABEL}`:process.env.PERF_VERIFY_WIDTHS?`-${theme}-${widths.join('-')}`:'';
const selected=process.env.PERF_VERIFY_ROUTES?process.env.PERF_VERIFY_ROUTES.split(','):['/','/about','/motion-video','/work/social-media-campaign-design','/work/renovofix-brand-digital-design','/work/mena-law-reporters','/work/pillars-pr-brand-communication-design','/work/presentations-pitch-decks-reports'];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
 for(const width of widths)for(const route of selected){
  const name=(route.slice(1).replaceAll('/','__')||'home')+'-'+width+variant;
  const pair={route,width};
  for(const [phase,origin]of Object.entries(origins)){
   const page=await browser.newPage();await page.setViewport({width,height:900,deviceScaleFactor:1});
   await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:theme}]);
   page.on('pageerror',e=>errors.push(`${phase} ${route}: ${e.message}`));
   await page.goto(origin+route,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);await sleep(1300);
   await page.screenshot({path:`${dir}/${phase}-${name}.png`});
   pair[phase]=await page.evaluate(()=>({
    overflow:document.documentElement.scrollWidth>innerWidth,
    boxes:[...document.querySelectorAll('main h1,main h2,main p,main img,main video')].filter(e=>{const r=e.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0&&r.width>0&&r.height>0}).map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,text:e.tagName==='IMG'?e.getAttribute('alt'):e.textContent?.trim(),x:r.x,y:r.y,width:r.width,height:r.height};}),
    brokenImages:[...document.querySelectorAll('main img')].filter(e=>{const r=e.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0&&!e.src.startsWith('data:')&&e.complete&&e.naturalWidth===0}).map(e=>e.src),
   }));
   if(pair[phase].overflow||pair[phase].brokenImages.length)errors.push(`${phase} ${route} ${width}: overflow/broken visible images`);
   if(phase==='after'&&width===412){
    const critical=await page.evaluate(()=>{const e=document.querySelector('main h1');if(!e)return false;let n=e;while(n&&n!==document.body){const s=getComputedStyle(n);if(+s.opacity===0||s.visibility==='hidden')return false;n=n.parentElement;}return true;});
    if(!critical)errors.push(`Critical heading invisible after load: ${route}`);
   }
   await page.close();
  }
  const b=await sharp(`${dir}/before-${name}.png`).raw().toBuffer({resolveWithObject:true});
  const a=await sharp(`${dir}/after-${name}.png`).raw().toBuffer({resolveWithObject:true});
  let changed=0;for(let i=0;i<b.data.length;i+=b.info.channels){if([0,1,2].some(c=>Math.abs(b.data[i+c]-a.data[i+c])>12))changed++;}
  pair.changedPixelPercent=100*changed/(b.info.width*b.info.height);
  pair.geometryEqual=JSON.stringify(pair.before.boxes)===JSON.stringify(pair.after.boxes);
  snapshots.push(pair);console.log(`${route} ${width}: changed pixels ${pair.changedPixelPercent.toFixed(3)}%; exact geometry ${pair.geometryEqual}`);
 }
 const page=await browser.newPage();await page.setViewport({width:412,height:823});
 await page.goto(origins.after+'/work/social-media-campaign-design',{waitUntil:'load'});
 const tile=await page.waitForSelector('button[aria-label^="Open design:"]');await tile.scrollIntoView();await sleep(600);await tile.click();
 await page.waitForSelector('[role="dialog"] img');await sleep(500);
 const gallery=await page.$eval('[role="dialog"] img',e=>({src:e.src,loaded:e.complete&&e.naturalWidth>0}));
 await page.keyboard.press('Escape');await page.waitForSelector('[role="dialog"]',{hidden:true});
 interactions.push({name:'Social gallery open / image / Escape close',...gallery});if(!gallery.loaded)errors.push('Social lightbox image failed');
 await page.goto(origins.after+'/motion-video',{waitUntil:'load'});
 const video=await page.waitForSelector('video');await video.scrollIntoView();await sleep(700);await video.click();
 const playback=await page.$eval('video',async e=>{await e.play();return {duration:e.duration,paused:e.paused,preload:e.preload,controls:e.controls,playsInline:e.playsInline,poster:e.poster,source:e.querySelector('source')?.src};});
 interactions.push({name:'Video playback',...playback});if(playback.paused||!Number.isFinite(playback.duration))errors.push('Video playback did not start');
 await page.$eval('video',e=>e.pause());
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await page.goto(origins.after,{waitUntil:'load'});
 const reduced=await page.$eval('.pixel-reveal-grid',e=>getComputedStyle(e).display==='none');interactions.push({name:'Reduced-motion pixel grid hidden',passed:reduced});if(!reduced)errors.push('Reduced motion pixel grid');
 await page.setJavaScriptEnabled(false);
 for(const route of ['/work','/motion-video','/work/mena-law-reporters']){
  await page.goto(origins.after+route,{waitUntil:'load'});
  const visible=await page.$eval('main h1',e=>{let n=e;while(n&&n!==document.body){if(+getComputedStyle(n).opacity===0||getComputedStyle(n).clipPath==='inset(100% 0% 0% 0%)')return false;n=n.parentElement;}return true;});
  interactions.push({name:'Server-visible heading without JavaScript',route,passed:visible});if(!visible)errors.push(`Hidden no-JS heading ${route}`);
 }
 await page.close();
}catch(e){errors.push(`Verification interrupted: ${e.stack ?? e.message}`);}
finally{await browser.disconnect();await chrome.kill();}
fs.writeFileSync(`${dir}/results${variant}.json`,JSON.stringify({html,snapshots,interactions,errors},null,2));
console.log(JSON.stringify({htmlPages:html.length,screenshotPairs:snapshots.length,errors}));
if(errors.length)process.exitCode=1;
