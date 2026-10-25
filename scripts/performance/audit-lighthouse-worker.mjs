// One short-lived process per measurement isolates Lighthouse/native memory state.
import fs from 'node:fs';
import lighthouse from 'lighthouse';
import * as launcher from 'chrome-launcher';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
const [url, device, output, chromePath, throttlingMethod = 'simulate'] = process.argv.slice(2);
if (!['simulate','devtools'].includes(throttlingMethod)) throw new Error('Unsupported throttling method');
let chrome;
try {
  chrome = await launcher.launch({chromePath, chromeFlags:['--headless=new','--disable-extensions','--no-first-run'], logLevel:'silent', handleSIGINT:false});
  const settings={onlyCategories:['performance'],throttlingMethod,locale:'en-US',maxWaitForLoad:45000};
  const config=device==='desktop' ? {...desktopConfig,settings:{...desktopConfig.settings,...settings}} : {extends:'lighthouse:default',settings};
  const result=await lighthouse(url,{port:chrome.port,output:['json','html'],logLevel:'error'},config);
  if (!result) throw new Error('Lighthouse returned no result');
  fs.writeFileSync(`${output}.json`,result.report[0]);
  fs.writeFileSync(`${output}.html`,result.report[1]);
} catch(e) {
  console.error(e.stack ?? e.message);
  process.exitCode=1;
} finally {
  if (chrome) {
    try { await chrome.kill(); } catch(e) { console.error(`Chrome cleanup: ${e.message}`); }
  }
}
