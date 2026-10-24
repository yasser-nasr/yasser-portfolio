// Prepare a lossless, reversible physical media merge. No encoders or runtime edits.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=process.cwd(),dir='reports/media-merge-2026-10-24';
const checkpoint='D:/Personal/Branding/yasser-portfolio-organization-archive-2026-10-24/media-merge-2026-10-24';
if(fs.existsSync(checkpoint))throw Error('Checkpoint exists; refusing overwrite');
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(checkpoint,{recursive:true});
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{if(e.isSymbolicLink())throw Error('Unexpected link');const file=d+'/'+e.name;return e.isDirectory()?walk(file):[file]});
const editedFiles=[...walk('src'),...walk('scripts'),...walk('docs'),'README.md','next.config.ts','AGENTS.md','.gitignore','.vercelignore','package.json','package-lock.json','tsconfig.json'];
const originals=[];
for(const file of editedFiles){const copy=path.join(checkpoint,'files',file);fs.mkdirSync(path.dirname(copy),{recursive:true});fs.copyFileSync(file,copy,fs.constants.COPYFILE_EXCL);if(hash(file)!==hash(copy))throw Error('Checkpoint mismatch');originals.push({file,checkpoint:copy,sha256:hash(file)});}
const media=walk('public').map(file=>({file,sha256:hash(file),bytes:fs.statSync(file).size}));
const moves=[];
for(const folder of ['projects-optimized','videos-optimized'])for(const file of walk('public/'+folder)){
 const target=file.replace('public/'+folder+'/','public/projects/');
 const existing=media.find(m=>m.file===target),entry=media.find(m=>m.file===file);
 const action=!existing?'move':existing.sha256===entry.sha256?'identical':'conflict';
 const recovery=action==='move'?null:path.join(checkpoint,action==='identical'?'duplicate-copies':'original-conflicts',action==='identical'?file:target);
 moves.push({...entry,target,action,recovery,existing});
}
const plan={root,checkpoint,originals,media,moves,gitStatus:execFileSync('git',['status','--porcelain=v1','-z','--untracked-files=all'],{encoding:'utf8'})};
fs.writeFileSync(`${dir}/plan.json`,JSON.stringify(plan,null,2),{flag:'wx'});fs.copyFileSync(`${dir}/plan.json`,path.join(checkpoint,'plan.json'),fs.constants.COPYFILE_EXCL);
console.log(JSON.stringify({optimizedFiles:moves.length,actions:moves.reduce((a,m)=>(a[m.action]=(a[m.action]??0)+1,a),{}),checkpoint},null,2));
