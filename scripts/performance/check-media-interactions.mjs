// Focused interaction timings, not Lighthouse scores or real-user field data.
import fs from 'node:fs';
import * as launcher from 'chrome-launcher';
import puppeteer from 'puppeteer-core';
const dir='reports/performance-fixes-2026-10-24/media-followup';
fs.mkdirSync(dir,{recursive:true});
const rows=[];
const suffix=process.env.MEDIA_LABEL?`-${process.env.MEDIA_LABEL}`:'';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const chrome=await launcher.launch({chromeFlags:['--headless=new','--disable-extensions','--autoplay-policy=no-user-gesture-required'],handleSIGINT:false,logLevel:'silent'});
const browser=await puppeteer.connect({browserURL:`http://127.0.0.1:${chrome.port}`});
try {
 for(const kind of (process.env.MEDIA_KINDS??'video,gallery,deck').split(','))for(let run=1;run<=3;run++)for(const [phase,port]of [['before',3021],['after',3022]]){
  const context=await browser.createBrowserContext();
  const page=await context.newPage();await page.setViewport({width:412,height:823,deviceScaleFactor:1.75});
  const cdp=await page.createCDPSession();await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1_600_000/8,uploadThroughput:750_000/8});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  const resources=new Map(),errors=[];
  cdp.on('Network.responseReceived',e=>resources.set(e.requestId,{url:e.response.url,type:e.type,status:e.response.status,bytes:0}));
  cdp.on('Network.dataReceived',e=>{const r=resources.get(e.requestId);if(r)r.bytes+=e.encodedDataLength;});
  page.on('pageerror',e=>errors.push(e.message));
  const route=kind==='video'?'/motion-video':kind==='gallery'?'/work/social-media-campaign-design':'/work/presentations-pitch-decks-reports';
  await page.goto(`http://localhost:${port}${route}`,{waitUntil:'load'});await sleep(1500);
  let result;
  if(kind==='video'){
   const video=await page.$('main video');await video.scrollIntoView();await sleep(6000);
   const beforeClick=await video.evaluate(v=>({readyState:v.readyState,preload:v.preload,source:v.currentSrc,duration:Number.isFinite(v.duration)?v.duration:null,paused:v.paused}));
   const bytesBeforePlay=[...resources.values()].filter(r=>r.type==='Media').reduce((s,r)=>s+r.bytes,0);
   const elapsed=await video.evaluate(v=>new Promise(async(resolve,reject)=>{const start=performance.now();const timeout=setTimeout(()=>reject(new Error('Video frame timeout')),30000);v.requestVideoFrameCallback(()=>{clearTimeout(timeout);resolve(performance.now()-start);});try{await v.play();}catch(e){clearTimeout(timeout);reject(e);}}));
   const afterPlay=await video.evaluate(v=>({currentTime:v.currentTime,width:v.videoWidth,height:v.videoHeight,muted:v.muted,controls:v.controls,playsInline:v.playsInline}));
   await video.evaluate(v=>v.pause());
   result={beforeClick,bytesBeforePlay,clickToFirstFrameMs:elapsed,afterPlay};
  }else if(kind==='gallery'){
   const tile=await page.$('button[aria-label^="Open design:"]');await tile.scrollIntoView();await sleep(1000);
   await tile.focus();await sleep(1800);
   const start=performance.now();await tile.click();
   await page.waitForFunction(()=>{const i=document.querySelector('[role="dialog"] img');return i?.complete&&i.naturalWidth>0;},{timeout:30000});
   const elapsed=performance.now()-start;
   const image=await page.$eval('[role="dialog"] img',i=>({src:i.currentSrc,width:i.naturalWidth,height:i.naturalHeight}));
   await page.keyboard.press('Escape');
   result={focusLeadMs:1800,clickToImageMs:elapsed,image,escapeClosed:!(await page.$('[role="dialog"]'))};
  }else{
   const deck=await page.$('[aria-roledescription="carousel"]');await deck.scrollIntoView();await sleep(1500);
   const button=await deck.$('button[aria-label="Show next slide"]');await button.click();
   await page.waitForFunction(()=>{const i=document.querySelector('[aria-roledescription="carousel"] button[aria-label^="Open slide 2 "] img');return i?.complete&&i.naturalWidth>0;},{timeout:30000});
   await sleep(1800);
   const start=performance.now();await button.click();
   await page.waitForFunction(()=>{const i=document.querySelector('[aria-roledescription="carousel"] button[aria-label^="Open slide 3 "] img');return i?.complete&&i.naturalWidth>0;},{timeout:30000});
   const image=await deck.$eval('button[aria-label^="Open slide 3 "] img',i=>({src:i.currentSrc,width:i.naturalWidth,height:i.naturalHeight}));
   result={nextSlideLeadMs:1800,clickToImageMs:performance.now()-start,image};
  }
  const row={kind,run,phase,route,...result,resources:[...resources.values()].filter(r=>['Image','Media'].includes(r.type)),errors};rows.push(row);
  fs.writeFileSync(`${dir}/interactions${suffix}.json`,JSON.stringify(rows,null,2));
  console.log(JSON.stringify({kind,run,phase,...result,errors}));await context.close();
 }
}finally{await browser.close();await chrome.kill();}
const median=a=>a.sort((a,b)=>a-b)[Math.floor(a.length/2)];
const medians=[...Map.groupBy(rows,r=>r.kind+' '+r.phase).values()].map(rs=>({kind:rs[0].kind,phase:rs[0].phase,runs:rs.length,medianMs:median(rs.map(r=>r.clickToFirstFrameMs??r.clickToImageMs)),medianBytesBeforePlay:rs[0].kind==='video'?median(rs.map(r=>r.bytesBeforePlay)):undefined}));
fs.writeFileSync(`${dir}/medians${suffix}.json`,JSON.stringify(medians,null,2));console.log(JSON.stringify(medians,null,2));
