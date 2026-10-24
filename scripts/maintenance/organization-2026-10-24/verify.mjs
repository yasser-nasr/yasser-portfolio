// Focused integrity verification for this organization plan, not a build/test suite.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import ts from 'typescript';

const directory='reports/organization-2026-10-24',base='http://127.0.0.1:3014';
const plan=JSON.parse(fs.readFileSync(`${directory}/plan.json`,'utf8'));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const movedFile=file=>{
  for(const move of plan.moves)if(file===move.from||file.startsWith(move.from+'/'))return path.join(move.external?plan.archiveRoot:process.cwd(),move.to,file.slice(move.from.length).replace(/^\//,''));
  return file;
};
const sourceAndPublicChanges=plan.protectedFiles.filter(f=>!fs.existsSync(movedFile(f.file))||hash(movedFile(f.file))!==f.sha256).map(f=>f.file);
const archiveIssues=[];
for(const file of plan.trackedArchives){
  const archive=path.join(plan.archiveRoot,'source-artwork',file.file);
  if(fs.existsSync(file.file)||!fs.existsSync(archive)||hash(archive)!==file.sha256)archiveIssues.push(file.file);
}
for(const move of plan.moves)for(const file of move.files){
  const copy=path.join(plan.archiveRoot,'recovery-copies',file.file),target=movedFile(file.file);
  if(!fs.existsSync(copy)||hash(copy)!==file.sha256||!fs.existsSync(target)||hash(target)!==file.sha256)archiveIssues.push(file.file);
}
const cachedBuildAudit=JSON.parse(execFileSync(process.execPath,['scripts/audit/audit-site.mjs'],{encoding:'utf8',maxBuffer:8e6}));
const files=new Set(),links=new Set(),pages=[],decode=s=>s.replaceAll('&amp;','&');
function asset(raw){
  if(!raw||raw.startsWith('data:'))return;
  const u=new URL(decode(raw),'https://yassernasr.com');
  if(!['yassernasr.com','www.yassernasr.com'].includes(u.hostname))return;
  if(u.pathname==='/_next/image')return asset(u.searchParams.get('url'));
  if(!u.pathname.startsWith('/_next/'))files.add(u.pathname);
}
for(const {route}of cachedBuildAudit.pages){
  const response=await fetch(base+route,{signal:AbortSignal.timeout(60000)}),html=await response.text();
  pages.push({route,status:response.status});
  for(const m of html.matchAll(/\b(?:src|srcset|srcSet|poster)="([^"]+)"/g))for(const part of m[1].split(/,\s+(?=\/|https?:)/))asset(part.replace(/\s+\d+[wx]$/,''));
  for(const m of html.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/g))asset(m[1]);
  for(const m of html.matchAll(/\bhref="([^"]+)"/g))if(m[1].startsWith('/')&&!m[1].startsWith('/_next/'))links.add(new URL(decode(m[1]),base).pathname);
  for(const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)){
    function images(value,key=''){
      if(typeof value==='string'&&['image','logo','thumbnailUrl','contentUrl'].includes(key))asset(value);
      else if(Array.isArray(value))value.forEach(v=>images(v,key));
      else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>images(v,k));
    }images(JSON.parse(match[1]));
  }
}
const manifest=ts.createSourceFile('manifest.ts',fs.readFileSync('src/lib/optimized-media-manifest.ts','utf8'),ts.ScriptTarget.Latest,true),declarations={};
function visit(node){if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name))declarations[node.name.text]=node.initializer;ts.forEachChild(node,visit)}visit(manifest);
const object=node=>Object.fromEntries(node.properties.map(p=>[p.name.text,p.initializer.text]));
const overrides=object(declarations.optimizedImageOverrides),videoUrls=Object.values(object(declarations.optimizedVideoPaths));
const imageUrls=declarations.optimizedImagePaths.arguments[0].elements.map(p=>'/projects-optimized/'+(overrides[p.text]??p.text));
[...imageUrls,...videoUrls].forEach(asset);
const checks=[],pending=[...new Set([...files,...links,'/sitemap.xml','/robots.txt','/manifest.webmanifest','/opengraph-image'])];
await Promise.all(Array.from({length:4},async()=>{
  while(pending.length){const url=pending.shift();try{const response=await fetch(base+url,{method:'HEAD',signal:AbortSignal.timeout(60000)});checks.push({url,status:response.status});}catch(error){checks.push({url,error:error.message});}}
}));
const rangeChecks=[];
for(const url of videoUrls){const response=await fetch(base+url,{headers:{Range:'bytes=0-1023'},signal:AbortSignal.timeout(30000)});rangeChecks.push({url,status:response.status,type:response.headers.get('content-type'),bytes:(await response.arrayBuffer()).byteLength});}
const oldReportResponse=await fetch(base+'/yassernasr.com-20261022T231215.json',{method:'HEAD'});
const movedReportPath='reports/lighthouse/yassernasr.com-20261022T231215.json';
const result={createdAt:new Date().toISOString(),scope:'Current source/public/archive hashes plus existing-build HTTP/static declarations. No new build, browser visual or interaction certification.',sourceAndPublicChanges,archiveIssues,protectedSourceFiles:plan.protectedFiles.filter(f=>f.file.startsWith('src/')).length,retainedPublicFiles:plan.protectedFiles.filter(f=>f.file.startsWith('public/')&&!f.file.endsWith('.json')).length,lighthousePreserved:hash(movedReportPath)===plan.protectedFiles.find(f=>f.file==='public/yassernasr.com-20261022T231215.json').sha256,cachedBuildAudit,pages,manifestImages:imageUrls.length,manifestVideos:videoUrls.length,checks,failedChecks:checks.filter(c=>c.error||c.status!==200),rangeChecks,failedRangeChecks:rangeChecks.filter(c=>c.status!==206||c.bytes!==1024||c.type!=='video/mp4'),oldLighthousePublicUrlStatus:oldReportResponse.status};
fs.writeFileSync(`${directory}/validation.json`,JSON.stringify(result,null,2));
const csvCell=value=>'"'+String(value).replaceAll('"','""')+'"';
const csv=(columns,rows)=>[columns.join(','),...rows.map(row=>row.map(csvCell).join(','))].join('\n')+'\n';
fs.writeFileSync(`${directory}/archived-files.csv`,csv(['original','bytes','sha256','recovery'],plan.trackedArchives.map(f=>[f.file,f.bytes,f.sha256,path.join(plan.archiveRoot,'source-artwork',f.file)])));
const inventory=JSON.parse(fs.readFileSync(`${directory}/inventory-before.json`,'utf8'));
function retainedReason(file){
  if(/\.(ttf|otf|woff2?)$/.test(file))return 'Required project specimen font; keep next/font paths';
  if(/source-page-0[78]\.webp$/.test(file))return 'No verified optimized replacement; manual review';
  if(/\.(pdf|docx|md)$/.test(file))return 'Authoring/source document; possible historical public URL; manual review';
  if(/(logo|og\.|monogram|icon)/i.test(file))return 'Identity or social-sharing asset; historical/public URL protection';
  return 'Retained original; uncertain usage/public URL protection';
}
fs.writeFileSync(`${directory}/retained-originals.csv`,csv(['file','bytes','reason'],inventory.remainingOriginalFiles.map(f=>[f.file,f.bytes,retainedReason(f.file)])));
console.log(JSON.stringify({sourceAndPublicChanges,archiveIssues,protectedSourceFiles:result.protectedSourceFiles,retainedPublicFiles:result.retainedPublicFiles,lighthousePreserved:result.lighthousePreserved,staticAuditIssues:cachedBuildAudit.issues,pages:pages.length,pageFailures:pages.filter(p=>p.status!==200),checkedUrls:checks.length,failedChecks:result.failedChecks,manifestImages:imageUrls.length,manifestVideos:videoUrls.length,failedRangeChecks:result.failedRangeChecks,oldLighthousePublicUrlStatus:oldReportResponse.status},null,2));
