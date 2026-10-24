import fs from 'node:fs';
import crypto from 'node:crypto';
const dir='reports/media-merge-2026-10-24',base='http://127.0.0.1:3000',phase=process.argv.includes('--after')?'after':'before';
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
const canonical=value=>value.replaceAll('/projects-optimized/','/projects/').replaceAll('/videos-optimized/','/projects/').replace(/%2fprojects-optimized%2f/gi,'%2Fprojects%2F').replace(/%2fvideos-optimized%2f/gi,'%2Fprojects%2F');
const routes=['/','/work','/motion-video','/about','/capabilities','/contact','/resume',...[...fs.readFileSync('src/data/projects.ts','utf8').matchAll(/(?:\bslug|"slug")\s*:\s*"([^"]+)"/g)].map(m=>'/work/'+m[1])],pages=[];
for(const route of routes){
 const response=await fetch(base+route,{signal:AbortSignal.timeout(90000)}),html=await response.text();
 const main=(html.match(/<main\b[\s\S]*?<\/main>/)?.[0]??html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<link\b[^>]*>/g,'');
 const metadata=[...html.matchAll(/<(?:title|meta)\b[^>]*>(?:[^<]*<\/title>)?/g)].map(m=>m[0]);
 const schemas=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
 pages.push({route,status:response.status,normalizedLayoutHash:hash(canonical(main)),normalizedMetadata:canonical(JSON.stringify(metadata)),normalizedSchemas:canonical(JSON.stringify(schemas)),images:(html.match(/<img\b/g)??[]).length,videos:(html.match(/<video\b/g)??[]).length});
 console.log(`${phase} ${response.status} ${route}`);
}
fs.writeFileSync(`${dir}/pages-${phase}.json`,JSON.stringify(pages,null,2));
if(phase==='after'){
 const before=JSON.parse(fs.readFileSync(`${dir}/pages-before.json`,'utf8'));
 const differences=pages.flatMap(page=>{const old=before.find(p=>p.route===page.route),changed=Object.keys(page).filter(k=>JSON.stringify(page[k])!==JSON.stringify(old[k]));return changed.length?[{route:page.route,changed}]:[];});
 fs.writeFileSync(`${dir}/page-comparison.json`,JSON.stringify({pages:pages.length,differences},null,2));console.log(JSON.stringify({pages:pages.length,differences},null,2));
}
