// Focused read-only cleanup audit and before/after hashes. No build or type-check.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import ts from 'typescript';
const root=process.cwd(),dir='reports/organization-2026-10-24/final-cleanup';
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function files(directory){return fs.readdirSync(directory,{withFileTypes:true}).flatMap(e=>{const file=path.join(directory,e.name);if(e.isSymbolicLink())return[];return e.isDirectory()?files(file):[{file:path.relative(root,file).replaceAll('\\','/'),bytes:fs.statSync(file).size}];});}
function sizes(){const buckets={};for(const e of fs.readdirSync(root,{withFileTypes:true})){if(e.isSymbolicLink())continue;const f=path.join(root,e.name),list=e.isDirectory()?files(f):[{file:e.name,bytes:fs.statSync(f).size}];buckets[e.name]={files:list.length,bytes:list.reduce((n,f)=>n+f.bytes,0)};}return {buckets,files:Object.values(buckets).reduce((n,b)=>n+b.files,0),bytes:Object.values(buckets).reduce((n,b)=>n+b.bytes,0)};}
const mode=process.argv.includes('--after')?'after':'before';
const size=sizes();
if(mode==='before'){
  const protectedFiles=[...files('src'),...files('public'),...['package.json','package-lock.json','next.config.ts','tsconfig.json','.env.local','.env.example','AGENTS.md','CLAUDE.md'].map(file=>({file,bytes:fs.statSync(file).size}))].map(f=>({...f,sha256:hash(f.file)}));
  const tree=ts.createSourceFile('manifest.ts',fs.readFileSync('src/lib/optimized-media-manifest.ts','utf8'),ts.ScriptTarget.Latest,true),values={};
  function visit(n){if(ts.isVariableDeclaration(n)&&ts.isIdentifier(n.name))values[n.name.text]=n.initializer;ts.forEachChild(n,visit)}visit(tree);
  const object=n=>Object.fromEntries(n.properties.map(p=>[p.name.text,p.initializer.text]));
  const overrides=object(values.optimizedImageOverrides),videoMap=object(values.optimizedVideoPaths);
  const mappings=[...values.optimizedImagePaths.arguments[0].elements.map(e=>({original:'public/projects/'+e.text,target:'public/projects-optimized/'+(overrides[e.text]??e.text)})),...Object.entries(videoMap).map(([a,b])=>({original:'public'+a,target:'public'+b}))];
  const groups=new Map();for(const f of files('public')){const h=hash(f.file),group=groups.get(h)??[];group.push(f);groups.set(h,group);}
  const duplicates=[...groups.values()].filter(g=>g.length>1).map(group=>({files:group,decision:'Retain distinct public URLs; no URL consolidation authorized/proven safe'}));
  const originalReview=files('public/projects').map(f=>{
    const replacement=mappings.find(m=>m.original===f.file)?.target;
    let reason;
    if(/\.(ttf|otf|woff2?)$/.test(f.file))reason='Required next/font specimen file';
    else if(/\.svg$/.test(f.file))reason='Brand/vector identity URL retained';
    else if(/\.(pdf|docx|md)$/.test(f.file)||/source-page-0[78]\.webp$/.test(f.file))reason='Unique authoring/source asset, no verified external copy established; retain for approval';
    else reason='Existing identity/OG/original public URL; keep alongside replacement without URL consolidation';
    return {...f,replacement,replacementExists:replacement?fs.existsSync(replacement):null,reason,decision:'keep'};
  });
  const objects=execFileSync('git',['rev-list','--objects','--all'],{encoding:'utf8',maxBuffer:32e6});
  const batch=execFileSync('git',['cat-file','--batch-check=%(objectname) %(objecttype) %(objectsize) %(rest)'],{input:objects,encoding:'utf8',maxBuffer:32e6});
  const blobs=batch.split('\n').map(line=>line.match(/^([a-f0-9]+) blob (\d+) ?(.*)$/)).filter(Boolean).map(m=>({oid:m[1],bytes:Number(m[2]),path:m[3]})).sort((a,b)=>b.bytes-a.bytes);
  const gitMedia=blobs.filter(b=>/\.(mp4|mov|webm|png|jpe?g|webp|avif|psd|pdf)$/i.test(b.path));
  const result={createdAt:new Date().toISOString(),root,size,protectedFiles,mappings,originalReview,duplicates,git:{countObjects:execFileSync('git',['count-objects','-v'],{encoding:'utf8'}),reachableBlobs:blobs.length,reachableBlobBytes:blobs.reduce((n,b)=>n+b.bytes,0),mediaBlobs:gitMedia.length,uncompressedHistoricalMediaBytes:gitMedia.reduce((n,b)=>n+b.bytes,0),largest:blobs.slice(0,30),statusBefore:execFileSync('git',['status','--porcelain=v1','-z','--untracked-files=all'],{encoding:'utf8'})},reportFiles:files('reports')};
  fs.writeFileSync(`${dir}/before.json`,JSON.stringify(result,null,2),{flag:'wx'});
  console.log(JSON.stringify({size:size.bytes,buckets:size.buckets,originals:originalReview.length,duplicateGroups:duplicates.length,optimizedTargets:mappings.length,git:result.git.largest.slice(0,8)},null,2));
}else{
  const before=JSON.parse(fs.readFileSync(`${dir}/before.json`,'utf8'));
  const unexpectedChanges=before.protectedFiles.filter(f=>!fs.existsSync(f.file)||hash(f.file)!==f.sha256).map(f=>f.file);
  const result={createdAt:new Date().toISOString(),size,netProjectBytesSaved:before.size.bytes-size.bytes,unexpectedChanges,missingTargets:before.mappings.filter(m=>!fs.existsSync(m.target)),statusAfter:execFileSync('git',['status','--porcelain=v1','-z','--untracked-files=all'],{encoding:'utf8'})};
  fs.writeFileSync(`${dir}/after.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({size:size.bytes,netProjectBytesSaved:result.netProjectBytesSaved,unexpectedChanges,missingTargets:result.missingTargets},null,2));
}
