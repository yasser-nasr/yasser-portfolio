import fs from 'node:fs';
import * as launcher from 'chrome-launcher';
import puppeteer from 'puppeteer-core';
const chrome=await launcher.launch({chromeFlags:['--headless=new','--disable-extensions'],handleSIGINT:false,logLevel:'silent'});
const browser=await puppeteer.connect({browserURL:`http://127.0.0.1:${chrome.port}`});
const results=[];
try{
 for(const port of [3021,3022]){
  const context=await browser.createBrowserContext(),page=await context.newPage();
  await page.setViewport({width:412,height:823,deviceScaleFactor:1.75});
  const cdp=await page.createCDPSession();await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1_600_000/8,uploadThroughput:750_000/8});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  const events=[];
  page.on('request',r=>{if(r.url().includes('saudi-national'))events.push({event:'request',url:r.url(),time:Date.now()});});
  page.on('requestfinished',r=>{if(r.url().includes('saudi-national'))events.push({event:'finished',url:r.url(),time:Date.now()});});
  await page.goto(`http://localhost:${port}/work/social-media-campaign-design`,{waitUntil:'load'});await new Promise(r=>setTimeout(r,1500));
  const tile=await page.$('button[aria-label^="Open design:"]');await tile.scrollIntoView();await new Promise(r=>setTimeout(r,1000));
  const connection=await page.evaluate(()=>({type:navigator.connection?.effectiveType,saveData:navigator.connection?.saveData}));
  const focusAt=Date.now();await tile.focus();await new Promise(r=>setTimeout(r,1800));
  const clickAt=Date.now();await tile.click();await page.waitForFunction(()=>{const i=document.querySelector('[role="dialog"] img');return i?.complete&&i.naturalWidth>0;});
  results.push({port,connection,focusAt,clickAt,events});await context.close();
 }
}finally{await browser.close();await chrome.kill();}
fs.writeFileSync('reports/performance-fixes-2026-10-24/media-followup/gallery-trace.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
