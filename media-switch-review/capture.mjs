import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const protectedFiles=[...walk('public'),...walk('image-optimization-review'),...walk('video-optimization-review')].map(file=>({file:file.replaceAll('\\','/'),bytes:fs.statSync(file).size,sha256:hash(file)}));
const sourceFiles=[...walk('src'),'next.config.ts'].map(file=>({file:file.replaceAll('\\','/'),text:fs.readFileSync(file,'utf8')}));
fs.writeFileSync('media-switch-review/baseline.json',JSON.stringify({capturedAt:new Date().toISOString(),protectedFiles,sourceFiles},null,2),{flag:'wx'});
console.log(`Captured ${protectedFiles.length} media/review files and ${sourceFiles.length} source/config files.`);
