// Read-only inventory and conservative reference audit; no deletion, build or type-check.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import ts from 'typescript';

const root=process.cwd(),output='reports/organization-2026-10-24';
fs.mkdirSync(output,{recursive:true});
const excluded=new Set(['.git','node_modules','.next']);
const files=[],directories=[],emptyDirectories=[],skippedLinks=[];
function walk(dir){
  const entries=fs.readdirSync(dir,{withFileTypes:true});
  if(!entries.length)emptyDirectories.push(path.relative(root,dir).replaceAll('\\','/'));
  for(const entry of entries){
    const file=path.join(dir,entry.name),relative=path.relative(root,file).replaceAll('\\','/');
    if(entry.isSymbolicLink()){skippedLinks.push(relative);continue;}
    if(entry.isDirectory()){directories.push(relative);if(!excluded.has(entry.name))walk(file);}
    else files.push({file:relative,bytes:fs.statSync(file).size});
  }
}
walk(root);
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const tracked=new Set(execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean));
const status=execFileSync('git',['status','--porcelain=v1','-z','--untracked-files=all'],{encoding:'utf8'}).split('\0').filter(Boolean);
const sourceFiles=files.filter(f=>f.file.startsWith('src/')&&/\.(tsx?|jsx?|css)$/.test(f.file));
const sources=new Map(sourceFiles.map(f=>[f.file,fs.readFileSync(f.file,'utf8')]));
const edges=new Map(),unresolvedImports=[],dynamicImports=[],importCandidates=[],externalPackages=new Set();
const moduleFile=(from,spec)=>{
  const base=spec.startsWith('@/')?path.join(root,'src',spec.slice(2)):spec.startsWith('.')?path.resolve(path.dirname(path.join(root,from)),spec):null;
  if(!base)return null;
  return [base,...['.ts','.tsx','.js','.jsx','.mjs','.css','/index.ts','/index.tsx'].map(ext=>base+ext)].find(p=>fs.existsSync(p)&&fs.statSync(p).isFile());
};
for(const [file,text]of sources){
  const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS),specs=[],names=[],identifiers=new Map();
  function visit(node){
    if(ts.isIdentifier(node))identifiers.set(node.text,(identifiers.get(node.text)??0)+1);
    if((ts.isImportDeclaration(node)||ts.isExportDeclaration(node))&&node.moduleSpecifier&&ts.isStringLiteral(node.moduleSpecifier)){
      specs.push(node.moduleSpecifier.text);
      if(ts.isImportDeclaration(node)&&node.importClause){
        const clause=node.importClause;if(clause.name)names.push(clause.name.text);
        if(clause.namedBindings){if(ts.isNamespaceImport(clause.namedBindings))names.push(clause.namedBindings.name.text);else names.push(...clause.namedBindings.elements.map(e=>e.name.text));}
      }
    }
    if(ts.isCallExpression(node)&&(node.expression.kind===ts.SyntaxKind.ImportKeyword||(ts.isIdentifier(node.expression)&&node.expression.text==='require'))){
      if(node.arguments[0]&&ts.isStringLiteral(node.arguments[0]))specs.push(node.arguments[0].text);else dynamicImports.push({file,expression:node.getText(ast)});
    }
    ts.forEachChild(node,visit);
  }visit(ast);
  const resolved=[];
  for(const spec of specs){
    if(spec.startsWith('@/')||spec.startsWith('.')){const target=moduleFile(file,spec);if(target)resolved.push(path.relative(root,target).replaceAll('\\','/'));else unresolvedImports.push({file,spec});}
    else if(!spec.startsWith('node:'))externalPackages.add(spec.startsWith('@')?spec.split('/').slice(0,2).join('/'):spec.split('/')[0]);
  }
  edges.set(file,resolved);
  for(const name of names)if(identifiers.get(name)===1)importCandidates.push({file,name,reason:'Only declaration identifier seen; manual review required, not proof'});
}
const reachable=new Set();function mark(file){if(reachable.has(file))return;reachable.add(file);for(const target of edges.get(file)??[])mark(target);}
for(const file of sources.keys())if(file.startsWith('src/app/'))mark(file);
const unreachable=[...sources.keys()].filter(f=>!reachable.has(f));
const groups=new Map();
for(const f of files.filter(f=>f.file.startsWith('public/'))){f.sha256=hash(f.file);const group=groups.get(f.sha256)??[];group.push(f);groups.set(f.sha256,group);}
const duplicatePublicAssets=[...groups.values()].filter(g=>g.length>1).map(g=>({bytesEach:g[0].bytes,files:g.map(f=>f.file)}));
const buckets={};for(const f of files){const bucket=f.file.includes('/')?f.file.split('/')[0]:'(root files)';const b=buckets[bucket]??={files:0,bytes:0};b.files++;b.bytes+=f.bytes;}
const packageJson=JSON.parse(fs.readFileSync('package.json','utf8'));
const result={createdAt:new Date().toISOString(),root,exclusions:[...excluded],buckets,files:files.map(f=>({...f,tracked:tracked.has(f.file)})),directories,emptyDirectories,skippedLinks,gitStatus:status,sourceFiles:sourceFiles.length,reachableSourceFiles:reachable.size,unreachableSourceFiles:unreachable,unresolvedImports,dynamicImports,unusedImportCandidates:importCandidates,sourcePackages:[...externalPackages].sort(),declaredDependencies:packageJson.dependencies,declaredDevDependencies:packageJson.devDependencies,duplicatePublicAssets,remainingOriginalFiles:files.filter(f=>f.file.startsWith('public/projects/'))};
const phase=process.argv.includes('--after')?'after':'before';
fs.writeFileSync(`${output}/inventory-${phase}.json`,JSON.stringify(result,null,2));
console.log(JSON.stringify({phase,buckets,sourceFiles:sourceFiles.length,unreachableSourceFiles:unreachable,unresolvedImports,dynamicImports,unusedImportCandidates:importCandidates,duplicateGroups:duplicatePublicAssets.length,emptyDirectories:emptyDirectories.length,remainingOriginalFiles:result.remainingOriginalFiles.length,statusCounts:status.reduce((a,s)=>(a[s.slice(0,2)]=(a[s.slice(0,2)]??0)+1,a),{})},null,2));
