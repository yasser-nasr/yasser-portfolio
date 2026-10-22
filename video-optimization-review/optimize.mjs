import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawn} from 'node:child_process';
import {root,review,output,walk,hash,ffmpeg,probe,facts} from './inventory.mjs';

const manifest=JSON.parse(fs.readFileSync(path.join(review,'source-manifest.json'),'utf8'));
const resume=process.argv.includes('--resume');
if(fs.existsSync(output)&&!resume)throw Error('Output exists; refusing overwrite');
fs.mkdirSync(output,{recursive:true});
fs.mkdirSync(path.join(review,'metrics'),{recursive:true});
const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'yasser-video-candidates-'));
const journal=path.join(review,'results-progress.json');
const rows=resume?JSON.parse(fs.readFileSync(journal,'utf8')):[];
if(resume)for(const r of rows){if(hash(path.join(root,r.optimizedFilename))!==r.optimizedSha256)throw Error('Experimental copy changed');if(r.alternative&&hash(path.join(root,r.alternative.filename))!==r.alternative.sha256)throw Error('Experimental alternative changed');}
const pct=(a,b)=>+(100*(1-b/a)).toFixed(2);
const rel=f=>path.relative(root,f).replaceAll('\\','/');
const ff=async(args)=>new Promise((resolve,reject)=>{
 const p=spawn(ffmpeg,['-hide_banner','-nostdin','-nostats','-loglevel','warning',...args],{cwd:review,windowsHide:true});
 let log='';p.stderr.on('data',b=>{log=(log+b).slice(-16000)});
 p.on('error',reject);p.on('close',code=>code===0?resolve(log):reject(Error(`FFmpeg exited ${code}: ${log}`)));
});
const colors=v=>['color_range','colorspace','color_primaries','color_trc'].flatMap((key,i)=>{
 const value=[v.colorRange,v.colorSpace,v.colorPrimaries,v.colorTransfer][i];
 return value&&value!=='unknown'?['-'+key,value]:[];
});
async function encode(source,target,v,{crf=18,webm=false,start,duration,audio=true}={}){
 const input=[...(start!==undefined?['-ss',String(start)]:[]),'-threads','4','-i',source,...(duration?['-t',String(duration)]:[])];
 const args=[...input,'-map','0:v:0',...(audio?['-map','0:a?']:[]),'-map_metadata','0','-map_chapters','-1',
  ...(webm?['-c:v','libvpx-vp9','-crf',String(crf),'-b:v','0','-deadline','good','-cpu-used','2','-row-mt','1']:['-c:v','libx264','-crf',String(crf),'-preset','slow']),
  '-threads','4','-pix_fmt',v.pixelFormat==='yuv420p10le'&&webm?'yuv420p10le':'yuv420p','-fps_mode','passthrough',...colors(v)];
 if(audio&&v.audio.length)args.push(...(webm?['-c:a','libopus','-b:a','192k']:v.audio.every(a=>a.codec==='aac')?['-c:a','copy']:['-c:a','aac','-b:a','192k']));
 else args.push('-an');
 if(!webm)args.push('-movflags','+faststart');
 args.push('-n',target);await ff(args);
}
async function metric(source,candidate,label,{start,duration}={}){
 const log=`metrics/${label}.json`;
 await ff([...(start!==undefined?['-ss',String(start)]:[]),'-threads','4','-i',source,'-threads','4','-i',candidate,
  ...(duration?['-t',String(duration)]:[]),'-filter_complex_threads','4','-filter_complex',
  `[0:v:0]setpts=PTS-STARTPTS,format=yuv420p[ref];[1:v:0]setpts=PTS-STARTPTS,format=yuv420p[dist];[dist][ref]libvmaf=log_path=${log}:log_fmt=json:n_threads=4:n_subsample=5`,
  '-an','-f','null','-']);
 const m=JSON.parse(fs.readFileSync(path.join(review,log),'utf8'));
 const scores=m.frames.map(f=>f.metrics.vmaf).sort((a,b)=>a-b);
 return {mean:m.pooled_metrics.vmaf.mean,p5:scores[Math.floor((scores.length-1)*.05)],minimum:scores[0],framesMeasured:scores.length,log};
}
const acceptable=m=>m.mean>=97&&m.p5>=93;
function atomOrder(file){
 const fd=fs.openSync(file,'r'),size=fs.statSync(file).size,atoms=[];let offset=0;
 try{while(offset+8<=size){const b=Buffer.alloc(16);fs.readSync(fd,b,0,Math.min(16,size-offset),offset);let n=b.readUInt32BE(0);const type=b.toString('ascii',4,8);if(n===1)n=Number(b.readBigUInt64BE(8));if(n===0)n=size-offset;if(n<8)break;atoms.push({type,offset,bytes:n});offset+=n;}}finally{fs.closeSync(fd)}
 return {faststart:atoms.find(a=>a.type==='moov')?.offset<atoms.find(a=>a.type==='mdat')?.offset,atoms};
}
for(let i=0;i<manifest.videos.length;i++){
 const v=manifest.videos[i],source=path.join(root,v.file),name=String(i+1).padStart(2,'0');
 if(rows.some(r=>r.originalFilename===v.file))continue;
 const relative=v.file.replace(/^public\/projects\//,'').replace(/^public\//,'').replace(/\.[^.]+$/,'.mp4');
 const target=path.join(output,relative);fs.mkdirSync(path.dirname(target),{recursive:true});
 console.log(`[${i+1}/${manifest.videos.length}] H.264 ${relative}`);
 const attempts=[];let selected,quality;
 if(v.pixelFormat!=='yuv420p'||v.rotation!==0||v.streamTypes.some(t=>!['video','audio','data'].includes(t)))throw Error(`Special source requires manual handling: ${v.file}`);
 for(const crf of [18,16,14]){
  const candidate=path.join(scratch,`${name}-h264-${crf}.mp4`);
  await encode(source,candidate,v,{crf});
  const metrics=await metric(source,candidate,`${name}-h264-${crf}`),bytes=fs.statSync(candidate).size;
  attempts.push({crf,bytes,...metrics});
  console.log(`  CRF ${crf}: ${bytes} bytes, VMAF ${metrics.mean.toFixed(3)}, p5 ${metrics.p5.toFixed(3)}`);
  if(acceptable(metrics)){selected=candidate;quality=metrics;break;}
 }
 let status='optimized-h264',crf=attempts.at(-1).crf;
 if(!selected||fs.statSync(selected).size>=v.bytes){
  const remux=path.join(scratch,`${name}-remux.mp4`);
  await ff(['-i',source,'-map','0:v:0','-map','0:a?','-map_metadata','0','-c','copy','-movflags','+faststart','-n',remux]);
  selected=remux;quality=null;crf=null;status='lossless-remux';
 }
 fs.copyFileSync(selected,target,fs.constants.COPYFILE_EXCL);
 const result=facts(probe(target));
 if(result.width!==v.width||result.height!==v.height||result.frames!==v.frames||result.frameRate!==v.frameRate||Math.abs(result.duration-v.duration)>.06||result.audio.length!==v.audio.length)throw Error(`Timing/stream validation mismatch: ${v.file}`);
 const concerns=['Visual review pending: check fine text, gradients, texture, motion, audio sync, and joins. VMAF is a screening proxy, not perceptual certification.'];
 if(status==='lossless-remux')concerns.push('Already efficient or no smaller candidate passed screening: encoded video/audio streams retained without generation loss; MP4 remux only.');
 if(quality&&quality.minimum<85)concerns.push(`At least one sampled frame has VMAF below 85 (${quality.minimum.toFixed(2)}); inspect transitions closely.`);
 const row={originalFilename:v.file,optimizedFilename:rel(target),originalBytes:v.bytes,optimizedBytes:fs.statSync(target).size,savedPercent:pct(v.bytes,fs.statSync(target).size),original:v,optimized:result,status,crf,quality,attempts,originalFaststart:atomOrder(source).faststart,optimizedFaststart:atomOrder(target).faststart,optimizedSha256:hash(target),audioPolicy:v.audio.length?'AAC audio stream copied unchanged':'No source audio; none added',concerns,vp9Trials:[],alternative:null};
 rows.push(row);fs.writeFileSync(journal,JSON.stringify(rows,null,2));
 // Representative beginning/middle/end samples, with no audio, screen VP9 savings.
 let candidateCRF=24,matched=false;const sampleLength=Math.min(1.5,v.duration/4);
 for(const q of [24,20]){
  const trials=[];
  for(let k=0;k<3;k++){
   const start=Math.max(0,Math.min(v.duration-sampleLength,[.1,.5,.85][k]*v.duration));
   const h=path.join(scratch,`${name}-sample-h264-${q}-${k}.mp4`),w=path.join(scratch,`${name}-sample-vp9-${q}-${k}.webm`);
   await encode(source,h,v,{crf:crf??18,start,duration:sampleLength,audio:false});
   await encode(source,w,v,{crf:q,webm:true,start,duration:sampleLength,audio:false});
   const hm=await metric(source,h,`${name}-sample-h264-${q}-${k}`,{start,duration:sampleLength});
   const wm=await metric(source,w,`${name}-sample-vp9-${q}-${k}`,{start,duration:sampleLength});
   trials.push({start,duration:sampleLength,h264Bytes:fs.statSync(h).size,vp9Bytes:fs.statSync(w).size,h264:hm,vp9:wm});
  }
  const hbytes=trials.reduce((s,t)=>s+t.h264Bytes,0),wbytes=trials.reduce((s,t)=>s+t.vp9Bytes,0);
  const similar=trials.every(t=>acceptable(t.vp9)&&t.vp9.mean>=t.h264.mean-.5&&t.vp9.p5>=t.h264.p5-1);
  row.vp9Trials.push({crf:q,sampleSavingsPercent:pct(hbytes,wbytes),similarScreeningQuality:similar,trials});
  if(similar&&wbytes<hbytes*.85){candidateCRF=q;matched=true;break;}
  if(wbytes>=hbytes*.85)break;
 }
 if(matched){
  console.log(`  VP9 sample qualifies; encoding full alternative CRF ${candidateCRF}`);
  const candidate=path.join(scratch,`${name}-alternative.webm`);
  await encode(source,candidate,v,{webm:true,crf:candidateCRF});
  const metrics=await metric(source,candidate,`${name}-vp9-full`),bytes=fs.statSync(candidate).size;
  const equivalent=quality?metrics.mean>=quality.mean-.5&&metrics.p5>=quality.p5-1:metrics.mean>=99&&metrics.p5>=97;
  if(bytes<row.optimizedBytes*.85&&acceptable(metrics)&&equivalent){
   const destination=target.replace(/\.mp4$/,'.webm');fs.copyFileSync(candidate,destination,fs.constants.COPYFILE_EXCL);
   const alternate=facts(probe(destination));
   if(alternate.width!==v.width||alternate.height!==v.height||alternate.frames!==v.frames||Math.abs(alternate.duration-v.duration)>.08)throw Error(`VP9 timing mismatch: ${v.file}`);
   row.alternative={filename:rel(destination),bytes,savedVersusOriginalPercent:pct(v.bytes,bytes),savedVersusMp4Percent:pct(row.optimizedBytes,bytes),crf:candidateCRF,...alternate,quality:metrics,sha256:hash(destination),audioPolicy:v.audio.length?'Audio re-encoded to Opus 192 kb/s; listening review required':'No audio'};
  }else row.vp9RejectedFull={bytes,quality:metrics,reason:'Full file did not meet equivalent-quality and >=15% savings screens'};
 }
 fs.writeFileSync(journal,JSON.stringify(rows,null,2));
 // Delete only newly created, explicitly enumerated scratch candidates for this item.
 for(const f of fs.readdirSync(scratch).filter(f=>f.startsWith(name+'-')))fs.unlinkSync(path.join(scratch,f));
 console.log(`  Done: ${row.savedPercent}% MP4 saving${row.alternative?'; VP9 alternative retained':''}`);
}
const changed=manifest.protectedFiles.filter(f=>!fs.existsSync(path.join(root,f.file))||hash(path.join(root,f.file))!==f.sha256);
if(changed.length)throw Error(`Protected files changed: ${changed.map(f=>f.file).join(', ')}`);
const sum=key=>rows.reduce((s,r)=>s+r[key],0);
const summary={generatedAt:new Date().toISOString(),count:rows.length,originalBytes:sum('originalBytes'),mp4Bytes:sum('optimizedBytes'),savedPercent:pct(sum('originalBytes'),sum('optimizedBytes')),webmAlternatives:rows.filter(r=>r.alternative).length,alternativeBytes:rows.reduce((s,r)=>s+(r.alternative?.bytes??0),0),losslessRemuxes:rows.filter(r=>r.status==='lossless-remux').length,protectedFilesVerified:manifest.protectedFiles.length,integrity:'All original media, existing optimized images, image review files, and captured website files unchanged.',manualReview:rows.length};
fs.writeFileSync(path.join(review,'comparison-report.json'),JSON.stringify({summary,videos:rows},null,2));
fs.writeFileSync(path.join(review,'manual-review.json'),JSON.stringify(rows.map(r=>({originalFilename:r.originalFilename,optimizedFilename:r.optimizedFilename,concerns:r.concerns,quality:r.quality,alternative:r.alternative?.filename})),null,2));
const csv=x=>'"'+String(x??'').replaceAll('"','""')+'"';
const columns=['originalFilename','optimizedFilename','originalBytes','optimizedBytes','savedPercent','resolution','frameRate','duration','originalCodec','optimizedCodec','status','crf','vmafMean','vmafP5','qualityConcerns','webmAlternative'];
fs.writeFileSync(path.join(review,'comparison-report.csv'),'\ufeff'+[columns.map(csv).join(','),...rows.map(r=>[r.originalFilename,r.optimizedFilename,r.originalBytes,r.optimizedBytes,r.savedPercent,`${r.original.width}x${r.original.height}`,r.original.frameRate,r.original.duration,r.original.codec,r.optimized.codec,r.status,r.crf,r.quality?.mean,r.quality?.p5,r.concerns.join(' '),r.alternative?.filename].map(csv).join(','))].join('\r\n'));
const template=fs.readFileSync(path.join(review,'comparison-template.html'),'utf8');
fs.writeFileSync(path.join(review,'index.html'),template.replace('/*REPORT_DATA*/null',JSON.stringify({summary,videos:rows}).replaceAll('<','\\u003c')));
console.log(JSON.stringify(summary,null,2));
