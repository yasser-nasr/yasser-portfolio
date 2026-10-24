import fs from 'node:fs';
const file='src/lib/optimized-media-manifest.ts',text=fs.readFileSync(file,'utf8');
const next=text.replaceAll('"/videos-optimized/','"/projects/');
const before=text.replaceAll('\r\n','\n').split('\n'),after=next.replaceAll('\r\n','\n').split('\n');
let patch='*** Begin Patch\n*** Update File: '+process.cwd().replaceAll('\\','/')+'/'+file+'\n';
for(let index=0;index<before.length;index++)if(before[index]!==after[index])patch+='@@\n-'+before[index]+'\n+'+after[index]+'\n';
patch+='*** End Patch\n';fs.writeFileSync('reports/media-merge-2026-10-24/manifest.patch',patch);
