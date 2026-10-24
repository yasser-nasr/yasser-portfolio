import fs from 'node:fs';
import path from 'node:path';
const dir='reports/restructure-2026-10-24',plan=JSON.parse(fs.readFileSync(`${dir}/plan.json`,'utf8'));
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name]);
const files=[...walk('scripts'),...walk('docs'),...walk('reports'),'README.md','CLAUDE.md'].filter(f=>/\.(mjs|md|ps1)$/.test(f)&&!f.endsWith('/make-reference-patch.mjs'));
const pairs=[...plan.mappings,...(plan.maintenanceMoves??[])].map(m=>[m.from,m.to]).sort((a,b)=>b[0].length-a[0].length);
let patch='*** Begin Patch\n';const changes=[];
for(const file of files){
 const text=fs.readFileSync(file,'utf8');let next=text.replaceAll('performance-reports','reports');
 for(const [oldPath,newPath]of pairs)next=next.replaceAll(oldPath,newPath);
 if(next===text)continue;
 const before=text.replaceAll('\r\n','\n').split('\n'),after=next.replaceAll('\r\n','\n').split('\n');
 if(before.length!==after.length)throw Error('Unexpected non-mechanical edit');
 patch+=`*** Update File: ${path.resolve(file).replaceAll('\\','/')}\n`;
 for(let index=0;index<before.length;index++)if(before[index]!==after[index])patch+='@@\n-'+before[index]+'\n+'+after[index]+'\n';
 changes.push(file);
}
patch+='*** End Patch\n';fs.writeFileSync(`${dir}/references.patch`,patch);fs.writeFileSync(`${dir}/reference-edits.json`,JSON.stringify(changes,null,2));console.log({files:changes.length,patchBytes:Buffer.byteLength(patch)});
