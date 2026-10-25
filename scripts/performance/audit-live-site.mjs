// Local-only production navigation audits. No PageSpeed API or report uploads.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import * as launcher from 'chrome-launcher';
import localSitemap from '../../src/app/sitemap.ts';
import {projects, publishedProjects} from '../../src/data/projects.ts';

const root = fileURLToPath(new URL('../../', import.meta.url));
const origin = 'https://yassernasr.com';
const base = path.join(root, 'performance-reports');
const args = process.argv.slice(2);
const json = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2));
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m => [m[1].toLowerCase(), decode(m[2])]));
const normalize = input => {
  const u = new URL(input, origin);
  if (u.origin !== origin || u.search || /\.(?:xml|pdf|json|png|webp|avif|mp4)$/i.test(u.pathname)) return null;
  u.hash = '';
  u.pathname = u.pathname.replace(/\/+$/, '') || '/';
  return u.href;
};
async function get(url) {
  const response = await fetch(url, {signal: AbortSignal.timeout(45000), headers: {'user-agent': 'PortfolioLocalAudit/1.0'}, redirect: 'follow'});
  return {response, text: await response.text()};
}
function files(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(e => e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}
async function discover() {
  const candidates = new Map();
  const warnings = [];
  function add(url, source) {
    const n = normalize(url);
    if (!n) return;
    if (!candidates.has(n)) candidates.set(n, new Set());
    candidates.get(n).add(source);
  }
  const seen = new Set();
  async function sitemap(url) {
    if (seen.has(url)) return;
    if (seen.size >= 100) throw new Error('Sitemap index exceeded 100 documents. Review discovery.');
    seen.add(url);
    const {response, text} = await get(url);
    if (!response.ok || !/<(?:urlset|sitemapindex)\b/.test(text)) throw new Error(`Invalid sitemap: ${url} (${response.status})`);
    const locs = [...text.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/g)].map(m => decode(m[1]));
    for (const loc of locs) {
      if (new URL(loc).origin !== origin) continue;
      if (/<sitemapindex\b/.test(text)) await sitemap(loc);
      else add(loc, 'live sitemap');
    }
  }
  try { await sitemap(`${origin}/sitemap.xml`); } catch (e) { warnings.push(e.message); }
  const sitemapFunction = typeof localSitemap === 'function' ? localSitemap : localSitemap.default;
  for (const entry of await sitemapFunction()) add(entry.url, 'local sitemap + published project data');
  const published = new Set(publishedProjects.map(p => p.slug));
  const unpublished = new Set(projects.filter(p => !published.has(p.slug)).map(p => `/work/${p.slug}`));
  for (const file of files(path.join(root, 'src/app'))) {
    if (!/[/\\]page\.(tsx?|jsx?)$/.test(file)) continue;
    const segments = path.relative(path.join(root, 'src/app'), path.dirname(file)).split(path.sep).filter(Boolean);
    if (segments.some(s => s.startsWith('_') || s.startsWith('@') || s.includes('[') || s === 'api')) continue;
    const route = '/' + segments.filter(s => !s.startsWith('(')).join('/');
    if (!unpublished.has(route)) add(route, 'Next.js static page');
  }
  const pages = new Map(), excluded = [];
  // Canonical targets can add a candidate; Map iteration includes those additions.
  for (const [url, sources] of candidates) {
    try {
      if (unpublished.has(new URL(url).pathname)) { excluded.push({url, reason: 'Unpublished local project'}); continue; }
      const {response, text} = await get(url);
      if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) { excluded.push({url, reason: `HTTP ${response.status} or non-HTML`}); continue; }
      const metas = [...text.matchAll(/<meta\b[^>]*>/gi)].map(m => attrs(m[0]));
      if (/noindex|none/i.test(response.headers.get('x-robots-tag') ?? '') || metas.some(m => /^(robots|googlebot)$/.test(m.name ?? '') && /noindex|none/i.test(m.content ?? ''))) { excluded.push({url, reason: 'noindex'}); continue; }
      const canonical = [...text.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0])).find(a => a.rel?.split(/\s+/).includes('canonical'))?.href;
      const target = normalize(canonical ? new URL(canonical, response.url).href : response.url);
      if (!target) { excluded.push({url, reason: 'Canonical outside production origin'}); continue; }
      if (target !== url) { add(target, `canonical from ${url}`); excluded.push({url, reason: `Alias of ${target}`}); continue; }
      pages.set(target, {url: target, sources: [...sources], finalUrl: response.url});
    } catch (e) { excluded.push({url, reason: e.message, retryNeeded: true}); }
  }
  if (!pages.size) throw new Error('No verified public pages. Check network/sitemap; no audits started.');
  return {createdAt: new Date().toISOString(), pages: [...pages.values()].sort((a,b) => a.url.localeCompare(b.url)), excluded, warnings};
}

function extract(lhr, device, run, report) {
  const audits = lhr.audits;
  const value = id => audits[id]?.numericValue ?? null;
  const elementAudit = audits['largest-contentful-paint-element'] ?? audits['lcp-breakdown-insight'] ?? audits['lcp-discovery-insight'];
  const nodes = [];
  function findNodes(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (obj.type === 'node') nodes.push({selector: obj.selector, snippet: obj.snippet, label: obj.nodeLabel});
    for (const v of Object.values(obj)) if (v && typeof v === 'object') findNodes(v);
  }
  findNodes(elementAudit?.details);
  if (!nodes.length) findNodes(audits['lcp-discovery-insight']?.details);
  const breakdown = audits['lcp-breakdown-insight'] ?? audits['lcp-breakdown'];
  // Insight schema varies across Lighthouse releases. Keep full raw details.
  const requests = (audits['network-requests']?.details?.items ?? []).map(r => ({url:r.url, resourceType:r.resourceType, transferBytes:r.transferSize ?? null, resourceBytes:r.resourceSize ?? null, durationMs: typeof r.networkEndTime === 'number' && typeof r.networkRequestTime === 'number' ? r.networkEndTime-r.networkRequestTime : null, status:r.statusCode}));
  const refs = lhr.categories.performance?.auditRefs ?? [];
  const metrics = new Set(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index','interactive']);
  const diagnostics = Object.entries(audits).filter(([id,a]) => !metrics.has(id) && typeof a.score === 'number' && a.score < 0.9 && (refs.some(r => r.id === id) || /insight$/.test(id))).map(([id,a]) => ({id, title:a.title, description:a.description, displayValue:a.displayValue, score:a.score, savingsMs:a.metricSavings?.LCP ?? a.details?.overallSavingsMs ?? null, details:a.details}));
  return {url:lhr.requestedUrl, finalUrl:lhr.finalDisplayedUrl ?? lhr.finalUrl, device, run, report, fetchTime:lhr.fetchTime, lighthouseVersion:lhr.lighthouseVersion, runtimeError:lhr.runtimeError ?? null, warnings:lhr.runWarnings ?? [], score:typeof lhr.categories.performance?.score === 'number' ? lhr.categories.performance.score*100 : null, fcpMs:value('first-contentful-paint'), lcpMs:value('largest-contentful-paint'), tbtMs:value('total-blocking-time'), cls:value('cumulative-layout-shift'), speedIndexMs:value('speed-index'), lcpElement:nodes.length ? nodes : null, lcpTimingBreakdown:breakdown?.details ?? null, inpMs:null, inpSource:'Unavailable: local navigation Lighthouse has no real-user field data', requests, diagnostics, environment:lhr.environment, config:lhr.configSettings};
}
const median = values => {
  const a = values.filter(v => typeof v === 'number' && Number.isFinite(v)).sort((a,b)=>a-b);
  return a.length ? (a[Math.floor((a.length-1)/2)] + a[Math.ceil((a.length-1)/2)])/2 : null;
};
const csv = values => values.map(v => '"'+String(v ?? '').replaceAll('"','""')+'"').join(',');
function advice(id) {
  if (/font/.test(id)) return 'Inspect critical font requests, preload coverage and font-display behavior while preserving typography.';
  if (/image|offscreen/.test(id)) return 'Match the reported image to its rendered size, priority and loading timing; preserve artwork quality.';
  if (/javascript|bootup|mainthread|long-task/.test(id)) return 'Inspect first-party script evaluation and long tasks; separate extension/third-party work before considering code splitting.';
  if (/render-blocking|css/.test(id)) return 'Inspect critical CSS and its dependency chain before deferring any stylesheet.';
  if (/lcp|priorit/.test(id)) return 'Use the actual LCP node and timing subparts to distinguish discovery/load delay from element render delay.';
  if (/server|document-latency|redirect/.test(id)) return 'Compare document TTFB, redirects and cache headers before changing server rendering or Vercel settings.';
  if (/cache/.test(id)) return 'Inspect cache headers for the listed resources; distinguish repeat visits from this cold-cache audit.';
  if (/layout|cls/.test(id)) return 'Inspect reported shifting elements and reserved media dimensions without changing layout.';
  return 'Review the listed resource/node evidence in the original HTML audit before selecting a fix.';
}
function summarize(dir, results, discovery) {
  json(path.join(dir,'results.json'), results);
  const columns = ['url','device','run','score','fcpMs','lcpMs','tbtMs','cls','speedIndexMs','lcpElement','lcpTimingBreakdown','inpMs','inpSource','diagnostics','report','runtimeError'];
  fs.writeFileSync(path.join(dir,'summary.csv'), '\ufeff'+[csv(columns), ...results.map(r=>csv(columns.map(c => typeof r[c] === 'object' && r[c] !== null ? JSON.stringify(r[c]) : r[c])))].join('\r\n'));
  const groups = new Map();
  for (const r of results) { const key = `${r.device} ${r.url}`; if (!groups.has(key)) groups.set(key,[]); groups.get(key).push(r); }
  const ranks = [...groups.values()].map(rows => {
    const valid = rows.filter(r=>!r.runtimeError && r.score !== null);
    const out = {url:rows[0].url, device:rows[0].device, successfulRuns:valid.length};
    for (const k of ['score','fcpMs','lcpMs','tbtMs','cls','speedIndexMs']) out[k] = median(valid.map(r=>r[k]));
    return out;
  }).sort((a,b)=>a.device.localeCompare(b.device) || (b.lcpMs ?? -1)-(a.lcpMs ?? -1));
  json(path.join(dir,'medians.json'),ranks);
  const recurring = new Map();
  for (const r of results.filter(r=>!r.runtimeError)) for (const d of r.diagnostics) {
    if (!recurring.has(d.id)) recurring.set(d.id,{id:d.id,title:d.title,urls:new Set(),savings:[]});
    const item=recurring.get(d.id); item.urls.add(r.url); item.savings.push(d.savingsMs);
  }
  const issues=[...recurring.values()].sort((a,b)=>b.urls.size-a.urls.size || median(b.savings)-median(a.savings));
  const ms = v => v === null ? 'unavailable' : Math.round(v).toLocaleString('en-US');
  const lines = ['# Live portfolio Lighthouse analysis','',`Generated: ${new Date().toISOString()}`, '', `Validated pages: ${discovery.pages.length}. Expected measurements: ${discovery.pages.length*6}. Recorded attempts: ${results.length}. Successful: ${results.filter(r=>!r.runtimeError && r.score !== null).length}.`, '', '## Slowest to fastest (median LCP, separately by device)', '', '|Device|Page|Runs / 3|Score|FCP ms|LCP ms|TBT ms|CLS|Speed Index ms|','|---|---|---:|---:|---:|---:|---:|---:|---:|', ...ranks.map(r=>`|${r.device}|${r.url}|${r.successfulRuns}|${r.score?.toFixed(1) ?? 'unavailable'}|${ms(r.fcpMs)}|${ms(r.lcpMs)}|${ms(r.tbtMs)}|${r.cls ?? 'unavailable'}|${ms(r.speedIndexMs)}|`), '', '## Mobile pages needing attention','', ...ranks.filter(r=>r.device==='mobile' && (r.score !== null && r.score<90 || r.lcpMs>2500 || r.tbtMs>200 || r.cls>0.1)).map(r=>`- ${r.url}: score ${r.score?.toFixed(1)}, LCP ${ms(r.lcpMs)} ms, TBT ${ms(r.tbtMs)} ms, CLS ${r.cls}.`), '', '## Recurring and page-specific diagnostics','', ...issues.map(i=>`- **${i.title}** (${i.id}): ${i.urls.size} distinct pages; ${i.urls.size>1?'shared symptom (shared root cause requires review)':'page-specific observation'}. Median reported LCP/opportunity saving ${ms(median(i.savings))} ms. Pages: ${[...i.urls].join(', ')}.`), '', '## Review order by reported potential impact','', ...[...issues].sort((a,b)=>median(b.savings)-median(a.savings)).slice(0,12).map(i=>`- Review **${i.title}**: reported median saving ${ms(median(i.savings))} ms across ${i.urls.size} pages. Inspect the HTML audit and request evidence before changing code; savings are estimates, not additive or guaranteed.`), '', '## LCP and request evidence for each run',''];
  lines.push('## Recommended checks, ordered by reported potential saving', '', ...[...issues].sort((a,b)=>median(b.savings)-median(a.savings)).slice(0,12).map(i=>`- **${i.title}**: ${advice(i.id)}`), '', '## Per-run evidence', '');
  for (const r of results) {
    const resourceTypes = new Map();
    for (const request of r.requests) {
      const type = request.resourceType ?? 'Other';
      if (!resourceTypes.has(type)) resourceTypes.set(type, {count:0, transferBytes:0, resourceBytes:0});
      const group = resourceTypes.get(type);
      group.count++; group.transferBytes += request.transferBytes ?? 0; group.resourceBytes += request.resourceBytes ?? 0;
    }
    lines.push(`Resource categories for ${r.device} run ${r.run} ${r.url}: ${JSON.stringify(Object.fromEntries(resourceTypes))}. Totals sum available byte fields only. Video requests may be classified as Media.`, '');
    lines.push(`### ${r.device} run ${r.run}: ${r.url}`, '', `Report: [HTML](${r.report}.html) / [JSON](${r.report}.json)`, '', `LCP element: ${r.lcpElement ? JSON.stringify(r.lcpElement) : 'Unavailable in this Lighthouse report; do not infer from the largest image.'}`, '', `LCP timing breakdown: ${r.lcpTimingBreakdown ? JSON.stringify(r.lcpTimingBreakdown) : 'Unavailable in this report.'}`, '', `Warnings/errors: ${JSON.stringify([r.runtimeError,...r.warnings].filter(Boolean))}`, '', 'Largest transferred requests (transfer bytes and resource bytes are separate):','', ...[...r.requests].sort((a,b)=>(b.transferBytes??0)-(a.transferBytes??0)).slice(0,8).map(q=>`- ${q.resourceType}: ${q.url} — transfer ${q.transferBytes ?? 'unavailable'} B; resource ${q.resourceBytes ?? 'unavailable'} B; request duration ${ms(q.durationMs)} ms.`), '', 'Slowest measured requests:', '', ...r.requests.filter(q=>q.durationMs!==null).sort((a,b)=>b.durationMs-a.durationMs).slice(0,5).map(q=>`- ${q.url}: ${ms(q.durationMs)} ms.`), '');
  }
  lines.push('## Limits and reproducibility','', 'Navigation lab measurements, not real-user field data. INP is unavailable; TBT is a separate lab metric. Mobile uses Lighthouse default simulated mobile throttling; desktop uses the official desktop preset. Browser storage is reset each run; each audit launches a fresh isolated Chrome profile without extensions. CDN/server caches are not flushed. Network finish time is not LCP. Compare the same device, Lighthouse/Chrome version and machine conditions. Medians are calculated separately per metric; retain all three reports to inspect variability. Failed/partial runs are excluded from medians and never fabricated.', '', 'Full request lists, diagnostics, environment, raw LCP details, warnings and configurations are in results.json and each original Lighthouse JSON. No changes or uploads are performed.', '', 'Discovery exclusions/warnings:', '', '```json', JSON.stringify({warnings:discovery.warnings,excluded:discovery.excluded},null,2),'```');
  fs.writeFileSync(path.join(dir,'ANALYSIS.md'),lines.join('\n'));
}

async function main() {
  if (args.includes('--analyze')) {
    const dir=path.resolve(root,args[args.indexOf('--analyze')+1] ?? '');
    if (!dir.startsWith(base+path.sep)) throw new Error('Analysis directory must be inside performance-reports/.');
    summarize(dir, JSON.parse(fs.readFileSync(path.join(dir,'results.json'))), JSON.parse(fs.readFileSync(path.join(dir,'discovery.json'))));
    console.log(`Analysis regenerated: ${dir}`); return;
  }
  const chromePath=process.env.CHROME_PATH || launcher.Launcher.getInstallations()[0];
  if (!chromePath || !fs.existsSync(chromePath)) throw new Error('Google Chrome not found. Install Chrome or set $env:CHROME_PATH to chrome.exe.');
  console.log(`Node ${process.version}; Chrome ${chromePath}`);
  const resumeArg=args.includes('--resume') ? args[args.indexOf('--resume')+1] : null;
  const resumeDir=resumeArg ? path.resolve(root,resumeArg) : null;
  if (resumeDir && !resumeDir.startsWith(base+path.sep)) throw new Error('Resume directory must be inside performance-reports/.');
  const discovery=resumeDir ? JSON.parse(fs.readFileSync(path.join(resumeDir,'discovery.json'),'utf8')) : await discover();
  const stamp=new Date().toISOString().replace(/[:.]/g,'-');
  const dir=resumeDir ?? path.join(base, stamp.slice(0,10), stamp);
  fs.mkdirSync(dir,{recursive:true}); json(path.join(dir,'discovery.json'),discovery);
  console.log(`Verified ${discovery.pages.length} pages; exclusions ${discovery.excluded.length}. ${dir}`);
  if (args.includes('--discover-only')) { console.log('Discovery only; no Lighthouse measurements run.'); return; }
  const results=[];
  let interrupted=false;
  process.once('SIGINT',()=>{interrupted=true; console.log('Stopping after current audit; partial reports preserved.');});
  try {
    for (const device of ['mobile','desktop']) {
      for (const {url} of discovery.pages) {
        for (let run=1; run<=3; run++) {
          if (interrupted) return;
          const slug=new URL(url).pathname.slice(1).replaceAll('/','__') || 'home';
          const relative=`${device}/${slug}/run-${run}`;
          const output=path.join(dir,relative);
          fs.mkdirSync(path.dirname(output),{recursive:true});
          if (resumeDir && fs.existsSync(`${output}.json`) && fs.existsSync(`${output}.html`)) {
            try {
              const saved=JSON.parse(fs.readFileSync(`${output}.json`,'utf8'));
              const row=extract(saved,device,run,relative);
              if (!row.runtimeError && typeof row.score==='number' && normalize(row.url)===url && normalize(row.finalUrl)===url && saved.configSettings?.formFactor===device) {
                results.push(row);
                console.log(`Keeping ${device} ${url} (${run}/3)`);
                continue;
              }
            } catch { /* Invalid/partial reports are preserved below before retry. */ }
          }
          for (const extension of ['json','html','error.json']) {
            if (fs.existsSync(`${output}.${extension}`)) fs.copyFileSync(`${output}.${extension}`,`${output}.previous-${stamp}.${extension}`,fs.constants.COPYFILE_EXCL);
          }
          console.log(`${device} ${url} (${run}/3)`);
          try {
            await new Promise((resolve,reject)=>{
              execFile(process.execPath,[path.join(root,'scripts/performance/audit-lighthouse-worker.mjs'),url,device,output,chromePath],{windowsHide:true,timeout:240000,maxBuffer:2*1024*1024},(error,stdout,stderr)=>{
                if (error) {
                  const nativeCode=typeof error.code==='number' && error.code<0 ? ` (Windows 0x${(error.code>>>0).toString(16)})` : '';
                  reject(new Error(`Audit worker failed: ${error.code ?? error.signal}${nativeCode}. ${stderr || error.message}`));
                } else resolve();
              });
            });
            const row=extract(JSON.parse(fs.readFileSync(`${output}.json`,'utf8')),device,run,relative);
            if (normalize(row.finalUrl)!==url) row.runtimeError={code:'UNEXPECTED_FINAL_URL',message:`Navigation ended at ${row.finalUrl}`};
            results.push(row);
          } catch (e) {
            const failure={url,device,run,report:relative,score:null,runtimeError:{message:e.message},warnings:[],requests:[],diagnostics:[],lcpElement:null,lcpTimingBreakdown:null};
            results.push(failure); json(`${output}.error.json`,failure);
            console.error(`Failed: ${e.message}`);
          } finally {
            summarize(dir,results,discovery);
          }
        }
      }
    }
  } finally {
    summarize(dir,results,discovery);
    console.log(`Reports saved: ${dir}`);
    const failed=results.filter(r=>r.runtimeError);
    console.log(`Audit summary: ${results.length-failed.length}/${discovery.pages.length*6} successful measurements; ${failed.length} failed attempts.${interrupted?' Interrupted by user.':''}`);
    for (const r of failed) console.error(`${r.device} run ${r.run} ${r.url}: ${r.runtimeError.message ?? r.runtimeError.code}`);
    for (const e of discovery.excluded.filter(e=>e.retryNeeded)) console.error(`Discovery needs retry: ${e.url}: ${e.reason}`);
    if (interrupted || results.some(r=>r.runtimeError) || results.length!==discovery.pages.length*6 || discovery.excluded.some(e=>e.retryNeeded)) process.exitCode=1;
  }
}
export {extract, summarize, discover};
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(e=>{console.error(e.stack);process.exitCode=1;});
}
