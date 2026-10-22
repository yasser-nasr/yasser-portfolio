import fs from 'node:fs';
import crypto from 'node:crypto';
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const images=JSON.parse(fs.readFileSync('image-optimization-review/comparison-report.json','utf8')).images;
const videos=JSON.parse(fs.readFileSync('video-optimization-review/comparison-report.json','utf8')).videos;
const imagePaths=[],overrides={},videoPaths={},mapping=[],fallbacks=[];
for(const image of images){
 const source='/projects/'+image.originalFilename,target='/projects-optimized/'+image.optimizedFilename;
 if(!fs.existsSync('public'+target)||hash('public'+target)!==image.optimizedSha256){fallbacks.push({source,target,reason:'Missing or modified optimized image; original retained'});continue;}
 imagePaths.push(image.originalFilename);
 if(image.originalFilename!==image.optimizedFilename)overrides[image.originalFilename]=image.optimizedFilename;
 mapping.push({source,target,kind:'image',originalBytes:image.originalBytes,optimizedBytes:image.optimizedBytes,status:image.status,width:image.optimizedWidth,height:image.optimizedHeight});
}
for(const video of videos){
 const source=video.originalFilename.replace(/^public/,''),target=video.optimizedFilename.replace(/^public/,'');
 if(!fs.existsSync('public'+target)||hash('public'+target)!==video.optimizedSha256){fallbacks.push({source,target,reason:'Missing or modified optimized primary video; original retained'});continue;}
 videoPaths[source]=target;
 mapping.push({source,target,kind:'video',originalBytes:video.originalBytes,optimizedBytes:video.optimizedBytes,status:video.status,width:video.optimized.width,height:video.optimized.height});
}
fs.writeFileSync('media-switch-review/mapping.json',JSON.stringify({mapping,fallbacks},null,2));
const code=`// Generated from verified optimization reports by media-switch-review/prepare-manifest.mjs.\n// Exact availability allowlist: unknown/new media stays on its original URL.\nexport const optimizedImagePaths = new Set([\n${imagePaths.map(p=>'  '+JSON.stringify(p)+',').join('\n')}\n]);\n\nexport const optimizedImageOverrides: Readonly<Record<string, string>> = ${JSON.stringify(overrides,null,2)};\n\n// Select report-approved primary MP4s, including the two higher-quality Pillars copies.\nexport const optimizedVideoPaths: Readonly<Record<string, string>> = ${JSON.stringify(videoPaths,null,2)};\n`;
console.log('*** Begin Patch\n*** Add File: src/lib/optimized-media-manifest.ts\n'+code.trimEnd().split('\n').map(line=>'+'+line).join('\n')+'\n*** End Patch');
