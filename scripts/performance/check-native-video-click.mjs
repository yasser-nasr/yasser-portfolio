import fs from 'node:fs';
import * as launcher from 'chrome-launcher';
import puppeteer from 'puppeteer-core';
const chrome=await launcher.launch({chromeFlags:['--headless=new','--disable-extensions'],handleSIGINT:false,logLevel:'silent'});
const browser=await puppeteer.connect({browserURL:`http://127.0.0.1:${chrome.port}`});const rows=[];
try{for(const port of [3021,3022]){
 const context=await browser.createBrowserContext(),page=await context.newPage();await page.setViewport({width:412,height:823});
 await page.goto(`http://localhost:${port}/motion-video`,{waitUntil:'load'});const video=await page.$('main video');await video.scrollIntoView();await new Promise(r=>setTimeout(r,2000));
 const box=await video.boundingBox();const state=()=>video.evaluate(v=>({paused:v.paused,currentTime:v.currentTime,readyState:v.readyState,error:v.error?.message,preload:v.preload}));
 const before=await state();await page.mouse.click(box.x+20,box.y+box.height-20);await new Promise(r=>setTimeout(r,1200));const corner=await state();
 await page.screenshot({path:`reports/performance-fixes-2026-10-24/media-followup/video-click-${port}.png`});
 await video.click();await new Promise(r=>setTimeout(r,1200));const center=await state();rows.push({port,box,before,corner,center});await context.close();
}}finally{await browser.close();await chrome.kill();}
fs.writeFileSync('reports/performance-fixes-2026-10-24/media-followup/native-click.json',JSON.stringify(rows,null,2));console.log(JSON.stringify(rows,null,2));
