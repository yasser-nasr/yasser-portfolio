// Targeted HTTP output comparison, not a browser, build or test runner.
import fs from 'node:fs';
import crypto from 'node:crypto';
const dir='reports/restructure-2026-10-24',base='http://127.0.0.1:3000';
const phase=process.argv.includes('--after')?'after':'before';
const hash=text=>crypto.createHash('sha256').update(text).digest('hex');
const decode=s=>s.replaceAll('&amp;','&');
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));
const routes=['/','/work','/motion-video','/about','/capabilities','/contact','/resume',...[...fs.readFileSync('src/data/projects.ts','utf8').matchAll(/(?:\bslug|"slug")\s*:\s*"([^"]+)"/g)].map(m=>'/work/'+m[1])];
const pages=[],assets=new Set();
function asset(raw){if(!raw||raw.startsWith('data:'))return;const u=new URL(raw,'https://yassernasr.com');if(!['yassernasr.com','www.yassernasr.com'].includes(u.hostname))return;if(u.pathname==='/_next/image')return asset(u.searchParams.get('url'));if(!u.pathname.startsWith('/_next/'))assets.add(u.pathname);}
for(const route of routes){
 const response=await fetch(base+route,{signal:AbortSignal.timeout(90000)}),html=await response.text();
 const main=html.match(/<main\b[\s\S]*?<\/main>/)?.[0]??html;
 const stable=main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<link\b[^>]*>/g,'');
 const images=[...html.matchAll(/<img\b[^>]*>/g)].map(m=>attrs(m[0]));
 const metadata=[...html.matchAll(/<(?:title|meta)\b[^>]*>(?:[^<]*<\/title>)?/g)].map(m=>m[0]);
 const schema=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
 const canonical=[...html.matchAll(/<link\b[^>]*>/g)].map(m=>attrs(m[0])).find(l=>l.rel==='canonical');
 const videos=[...html.matchAll(/<(?:video|source)\b[^>]*>/g)].map(m=>m[0]);
 pages.push({route,status:response.status,layoutHash:hash(stable),images,metadata,schema,canonical,videos});
 for(const m of html.matchAll(/\b(?:src|srcset|srcSet|poster)="([^"]+)"/g))for(const part of decode(m[1]).split(/,\s+(?=\/|https?:)/))asset(part.replace(/\s+\d+[wx]$/,''));
 for(const m of html.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/g))asset(decode(m[1]));
 console.log(`${phase} ${response.status} ${route}`);
}
fs.writeFileSync(`${dir}/pages-${phase}.json`,JSON.stringify({pages,assets:[...assets]},null,2));
if(phase==='after'){
 const before=JSON.parse(fs.readFileSync(`${dir}/pages-before.json`,'utf8'));
 const fields=['layoutHash','images','metadata','schema','canonical','videos'];
 const differences=pages.flatMap(page=>{const old=before.pages.find(p=>p.route===page.route);const changed=fields.filter(k=>JSON.stringify(old[k])!==JSON.stringify(page[k]));return changed.length||page.status!==200?[{route:page.route,status:page.status,changed}]:[];});
 fs.writeFileSync(`${dir}/page-comparison.json`,JSON.stringify({pages:pages.length,differences},null,2));console.log(JSON.stringify({pages:pages.length,differences},null,2));
}
