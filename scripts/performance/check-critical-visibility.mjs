import fs from 'node:fs';
import * as launcher from 'chrome-launcher';
import puppeteer from 'puppeteer-core';
const baseline=JSON.parse(fs.readFileSync('performance-reports/2026-10-24/2026-10-24T18-56-27-716Z/results.json'));
const representatives=[...Map.groupBy(baseline,r=>r.device+' '+r.url).values()].map(r=>r[1]);
const chrome=await launcher.launch({chromeFlags:['--headless=new','--disable-extensions'],handleSIGINT:false,logLevel:'silent'});
const browser=await puppeteer.connect({browserURL:`http://127.0.0.1:${chrome.port}`});
const checks=[];
try{
 const page=await browser.newPage();await page.setJavaScriptEnabled(false);
 for(const row of representatives){
  const config=row.config.screenEmulation;
  await page.setViewport({width:config.width,height:config.height,deviceScaleFactor:config.deviceScaleFactor});
  const route=new URL(row.url).pathname;
  await page.goto('http://localhost:3021'+route,{waitUntil:'load'});
  const node=row.lcpElement?.[0];
  const result=await page.evaluate(node=>{
   if(!node?.selector)return {available:false};
   const norm=s=>(s??'').replace(/\s+/g,'').slice(0,35);
   const matches=[...document.querySelectorAll(node.selector)];
   const element=matches.find(e=>norm(e.getAttribute('alt')??e.getAttribute('aria-label')??e.textContent).startsWith(norm(node.label)))??matches[0];
   if(!element)return {available:false,selector:node.selector};
   const hidden=[];let n=element;
   while(n&&n!==document.documentElement){const s=getComputedStyle(n);if(+s.opacity===0||s.visibility==='hidden'||s.display==='none'||s.clipPath.includes('100%'))hidden.push({tag:n.tagName,className:n.className,opacity:s.opacity,clipPath:s.clipPath});n=n.parentElement;}
   const posterPreload=element.tagName==='VIDEO'?[...document.querySelectorAll('link[rel="preload"][as="image"]')].find(link=>link.href===element.poster&&(!link.media||matchMedia(link.media).matches)):null;
   return {available:true,visible:!hidden.length,hidden,selector:node.selector,tag:element.tagName,fetchPriority:element.getAttribute('fetchpriority'),loading:element.getAttribute('loading'),posterPriority:posterPreload?.getAttribute('fetchpriority')??null};
  },node);
  checks.push({route,device:row.device,...result});
 }
 await page.close();
}finally{await browser.disconnect();await chrome.kill();}
fs.writeFileSync('reports/performance-fixes-2026-10-24/verification/critical-visibility.json',JSON.stringify(checks,null,2));
console.log(JSON.stringify({checks:checks.length,issues:checks.filter(r=>!r.available||!r.visible),imagePriorityIssues:checks.filter(r=>r.tag==='IMG'&&r.fetchPriority!=='high'),posterPriorityIssues:checks.filter(r=>r.tag==='VIDEO'&&r.device==='desktop'&&r.posterPriority!=='high')},null,2));
if(checks.some(r=>!r.available||!r.visible))process.exitCode=1;
