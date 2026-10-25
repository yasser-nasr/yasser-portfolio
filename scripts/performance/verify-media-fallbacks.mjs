import fs from 'node:fs';
import * as launcher from 'chrome-launcher';
import puppeteer from 'puppeteer-core';
const chrome=await launcher.launch({chromeFlags:['--headless=new','--disable-extensions'],handleSIGINT:false,logLevel:'silent'});
const browser=await puppeteer.connect({browserURL:`http://127.0.0.1:${chrome.port}`});
const checks=[],errors=[];const base='http://localhost:3022';
try{
 const page=await browser.newPage();await page.setViewport({width:412,height:823});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/motion-video',{waitUntil:'load'});
 await new Promise(r=>setTimeout(r,1500));
 checks.push({name:'Offscreen videos do not warm automatically',passed:await page.$$eval('main video',videos=>videos.every(v=>v.preload==='none'&&v.readyState===0))});
 const video=await page.$('main video');await video.scrollIntoView();await new Promise(r=>setTimeout(r,1600));
 // Chrome's bottom row is the seek bar; Play is in the row above it.
 const box=await video.boundingBox();await page.mouse.click(box.x+24,box.y+box.height-48);
 await page.waitForFunction(()=>{const v=document.querySelector('main video');return !v.paused&&v.currentTime>0;},{timeout:15000});
 checks.push({name:'Native play control starts playback without a scripted play call',passed:true});await video.evaluate(v=>v.pause());
 await page.goto(base+'/work/print-editorial-design',{waitUntil:'load'});
 const tile=await page.$('button[aria-label^="Open high-resolution view:"]');await tile.scrollIntoView();await tile.focus();await new Promise(r=>setTimeout(r,500));await tile.click();
 await page.waitForFunction(()=>{const i=document.querySelector('[role="dialog"] img');return i?.complete&&i.naturalWidth>0;});
 await page.keyboard.press('Escape');checks.push({name:'Print high-resolution view loads and Escape closes it',passed:!(await page.$('[role="dialog"]'))});
 await page.goto(base+'/work/presentations-pitch-decks-reports',{waitUntil:'load'});
 const slide=await page.$('button[aria-label^="Open slide 1 "]');await slide.scrollIntoView();await slide.click();
 await page.waitForSelector('[role="dialog"]');await page.keyboard.press('ArrowRight');
 await page.waitForFunction(()=>document.querySelector('[role="dialog"] [aria-live="polite"]')?.textContent?.includes('02 /'));
 await page.keyboard.press('Escape');checks.push({name:'Presentation full-screen keyboard navigation and Escape',passed:!(await page.$('[role="dialog"]'))});
 await page.close();
 for(const connection of [{saveData:true,effectiveType:'4g'},{saveData:false,effectiveType:'2g'}]){
  const context=await browser.createBrowserContext(),page=await context.newPage();await page.setViewport({width:412,height:823});
  await page.evaluateOnNewDocument(connection=>Object.defineProperty(navigator,'connection',{value:connection,configurable:true}),connection);
  await page.goto(base+'/motion-video',{waitUntil:'load'});const video=await page.$('main video');await video.scrollIntoView();await video.focus();await new Promise(r=>setTimeout(r,1300));
  checks.push({name:`Speculative video fetching skipped: ${JSON.stringify(connection)}`,passed:await video.evaluate(v=>v.preload==='none'&&v.readyState===0)});
  await context.close();
 }
}catch(e){errors.push(e.stack??e.message);}finally{await browser.close();await chrome.kill();}
fs.writeFileSync('reports/performance-fixes-2026-10-24/media-followup/fallbacks.json',JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({checks,errors},null,2));
if(errors.length||checks.some(c=>!c.passed))process.exitCode=1;
