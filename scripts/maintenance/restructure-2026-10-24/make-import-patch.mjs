import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const dir='reports/restructure-2026-10-24';
const plan=JSON.parse(fs.readFileSync(`${dir}/plan.json`,'utf8'));
const mapped=new Map(plan.mappings.map(m=>[m.from,m.to]));
const normalized=file=>file.replaceAll('\\','/');
function resolve(from,spec){
 const base=spec.startsWith('@/')?path.resolve('src',spec.slice(2)):spec.startsWith('.')?path.resolve(path.dirname(from),spec):null;
 if(!base)return null;
 return [base,...['.ts','.tsx','.js','.jsx','.mjs','.css','/index.ts','/index.tsx'].map(e=>base+e)].find(f=>fs.existsSync(f)&&fs.statSync(f).isFile());
}
let patch='*** Begin Patch\n';const changed=[];
for(const original of plan.originals.filter(o=>o.file.startsWith('src/')&&/\.tsx?$/.test(o.file))){
 const oldFile=original.file,newFile=mapped.get(oldFile)??oldFile,text=fs.readFileSync(oldFile,'utf8');
 const ast=ts.createSourceFile(oldFile,text,ts.ScriptTarget.Latest,true,oldFile.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS),edits=[];
 function module(node){
  const spec=node.text,target=resolve(oldFile,spec);if(!target)return;
  const oldTarget=normalized(path.relative(process.cwd(),target)),newTarget=mapped.get(oldTarget)??oldTarget;
  const explicitExtension=/\.[a-z]+$/.test(spec);
  let next;
  if(spec.startsWith('@/'))next='@/'+newTarget.slice(4);
  else {next=normalized(path.relative(path.dirname(newFile),newTarget));if(!next.startsWith('.'))next='./'+next;}
  if(!explicitExtension)next=next.replace(/\.(tsx?|jsx?|mjs)$/,'');
  if(next!==spec)edits.push({start:node.getStart(ast)+1,end:node.end-1,text:next});
 }
 function visit(node){
  if((ts.isImportDeclaration(node)||ts.isExportDeclaration(node))&&node.moduleSpecifier&&ts.isStringLiteral(node.moduleSpecifier))module(node.moduleSpecifier);
  if(ts.isCallExpression(node)&&(node.expression.kind===ts.SyntaxKind.ImportKeyword||(ts.isIdentifier(node.expression)&&node.expression.text==='require'))&&node.arguments[0]&&ts.isStringLiteral(node.arguments[0]))module(node.arguments[0]);
  ts.forEachChild(node,visit);
 }visit(ast);
 if(!edits.length)continue;
 let result=text;for(const edit of edits.sort((a,b)=>b.start-a.start))result=result.slice(0,edit.start)+edit.text+result.slice(edit.end);
 const before=text.replaceAll('\r\n','\n').split('\n'),after=result.replaceAll('\r\n','\n').split('\n');
 if(before.length!==after.length)throw Error('Unexpected non-mechanical edit');
 patch+=`*** Update File: ${normalized(path.resolve(newFile))}\n`;
 for(let index=0;index<before.length;index++)if(before[index]!==after[index])patch+='@@\n-'+before[index]+'\n+'+after[index]+'\n';
 changed.push({before:oldFile,after:newFile,moduleSpecifiers:edits.length});
}
patch+='*** End Patch\n';fs.writeFileSync(`${dir}/imports.patch`,patch);fs.writeFileSync(`${dir}/import-edits.json`,JSON.stringify(changed,null,2));console.log(JSON.stringify({files:changed.length,moduleSpecifiers:changed.reduce((n,f)=>n+f.moduleSpecifiers,0),patchBytes:Buffer.byteLength(patch)},null,2));
