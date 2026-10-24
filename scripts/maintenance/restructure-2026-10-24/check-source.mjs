// Parse module edges and compare non-import source bytes; not a type-check/test suite.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';
const dir='reports/restructure-2026-10-24',plan=JSON.parse(fs.readFileSync(`${dir}/plan.json`,'utf8'));
const mapped=new Map(plan.mappings.map(m=>[m.from,m.to])),inverse=new Map(plan.mappings.map(m=>[m.to,m.from]));
const originalPaths=new Set(plan.originals.map(f=>f.file));
const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
const normalize=file=>file.replaceAll('\\','/');
function parse(file,text){
 const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS),nodes=[];
 function visit(n){
  if((ts.isImportDeclaration(n)||ts.isExportDeclaration(n))&&n.moduleSpecifier&&ts.isStringLiteral(n.moduleSpecifier))nodes.push(n.moduleSpecifier);
  if(ts.isCallExpression(n)&&(n.expression.kind===ts.SyntaxKind.ImportKeyword||(ts.isIdentifier(n.expression)&&n.expression.text==='require'))&&n.arguments[0]&&ts.isStringLiteral(n.arguments[0]))nodes.push(n.arguments[0]);
  ts.forEachChild(n,visit);
 }visit(ast);
 let masked=text;for(const n of [...nodes].sort((a,b)=>b.getStart(ast)-a.getStart(ast)))masked=masked.slice(0,n.getStart(ast)+1)+'__MODULE__'+masked.slice(n.end-1);
 return {specs:nodes.map(n=>n.text),masked:masked.replaceAll('\r\n','\n')};
}
function resolve(file,spec,before){
 if(!spec.startsWith('@/')&&!spec.startsWith('.'))return 'external:'+spec;
 const base=spec.startsWith('@/')?path.resolve('src',spec.slice(2)):path.resolve(path.dirname(file),spec);
 const candidates=[base,...['.ts','.tsx','.js','.jsx','.mjs','.css','/index.ts','/index.tsx'].map(e=>base+e)].map(f=>normalize(path.relative(process.cwd(),f)));
 return candidates.find(f=>before?originalPaths.has(f):fs.existsSync(f)&&fs.statSync(f).isFile());
}
const sourceResults=[],problems=[];
for(const original of plan.originals.filter(f=>f.file.startsWith('src/'))){
 const target=mapped.get(original.file)??original.file;
 if(!fs.existsSync(target)){problems.push({file:target,reason:'missing source'});continue;}
 if(!/\.tsx?$/.test(original.file)){
  const same=hash(fs.readFileSync(target))===original.sha256;sourceResults.push({before:original.file,after:target,sameNonImportContent:same});if(!same)problems.push({file:target,reason:'Changed CSS/font/non-TS source'});continue;
 }
 const old=parse(original.file,fs.readFileSync(original.checkpoint,'utf8')),current=parse(target,fs.readFileSync(target,'utf8'));
 const beforeEdges=old.specs.map(spec=>resolve(original.file,spec,true));
 const afterEdges=current.specs.map(spec=>{const edge=resolve(target,spec,false);return inverse.get(edge)??edge;});
 const sameNonImportContent=old.masked===current.masked,sameModuleTargets=JSON.stringify(beforeEdges)===JSON.stringify(afterEdges),unresolved=current.specs.filter((s,i)=>!afterEdges[i]);
 sourceResults.push({before:original.file,after:target,sameNonImportContent,sameModuleTargets,unresolved});
 if(!sameNonImportContent||!sameModuleTargets||unresolved.length)problems.push({file:target,sameNonImportContent,sameModuleTargets,unresolved,beforeEdges,afterEdges});
}
const protectedChanges=plan.protectedFiles.filter(f=>!fs.existsSync(f.file)||hash(fs.readFileSync(f.file))!==f.sha256).map(f=>f.file);
const essentialConfig=['package.json','package-lock.json','next.config.ts','tsconfig.json','postcss.config.mjs','eslint.config.mjs'];
const configChanges=plan.originals.filter(f=>essentialConfig.includes(f.file)&&hash(fs.readFileSync(f.file))!==f.sha256).map(f=>f.file);
const result={sourceFiles:sourceResults.length,sourceResults,problems,protectedFiles:plan.protectedFiles.length,protectedChanges,configChanges};
fs.writeFileSync(`${dir}/source-integrity.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({sourceFiles:result.sourceFiles,problems,protectedFiles:result.protectedFiles,protectedChanges,configChanges},null,2));
