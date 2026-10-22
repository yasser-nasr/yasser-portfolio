import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

export const root = process.cwd();
export const review = path.join(root, 'video-optimization-review');
export const output = path.join(root, 'public/videos-optimized');
export const walk = dir => fs.existsSync(dir) ? fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]) : [];
export const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
export const ffmpeg = walk(path.join(os.tmpdir(),'yasser-video-optimization-tools')).find(f => path.basename(f)==='ffmpeg.exe');
export const ffprobe = ffmpeg && path.join(path.dirname(ffmpeg),'ffprobe.exe');
export const probe = file => JSON.parse(execFileSync(ffprobe,['-v','error','-show_format','-show_streams','-count_frames','-of','json',file],{encoding:'utf8',maxBuffer:8e6,windowsHide:true}));
export function facts(p) {
 const v=p.streams.find(s=>s.codec_type==='video');
 return {width:v.width,height:v.height,displayAspectRatio:v.display_aspect_ratio,sampleAspectRatio:v.sample_aspect_ratio,frameRate:v.avg_frame_rate,nominalFrameRate:v.r_frame_rate,frames:Number(v.nb_read_frames ?? v.nb_frames),duration:Number(p.format.duration),videoDuration:Number(v.duration ?? p.format.duration),codec:v.codec_name,pixelFormat:v.pix_fmt,colorSpace:v.color_space,colorTransfer:v.color_transfer,colorPrimaries:v.color_primaries,colorRange:v.color_range,rotation:v.side_data_list?.find(s=>s.rotation)?.rotation ?? 0,audio:p.streams.filter(s=>s.codec_type==='audio').map(s=>({codec:s.codec_name,channels:s.channels,sampleRate:s.sample_rate,duration:s.duration,channelLayout:s.channel_layout})),streamTypes:p.streams.map(s=>s.codec_type)};
}

if (process.argv.includes('--capture')) {
 if (!ffmpeg) throw Error('Portable encoder not found');
 if (fs.existsSync(path.join(review,'source-manifest.json')) || fs.existsSync(output)) throw Error('Existing experiment; refusing overwrite');
 const files=walk(path.join(root,'public')).filter(f=>/\.(mp4|mov|webm|m4v|mkv|avi|ogv|mpeg|mpg)$/i.test(f));
 const videos=files.map(file=>({file:path.relative(root,file).replaceAll('\\','/'),bytes:fs.statSync(file).size,sha256:hash(file),...facts(probe(file))}));
 const protectedFiles=[...walk(path.join(root,'src')),...walk(path.join(root,'public')),...walk(path.join(root,'docs')),...walk(path.join(root,'scripts')),...walk(path.join(root,'image-optimization-review')),...fs.readdirSync(root,{withFileTypes:true}).filter(e=>e.isFile()).map(e=>path.join(root,e.name))].map(file=>({file:path.relative(root,file).replaceAll('\\','/'),bytes:fs.statSync(file).size,sha256:hash(file)}));
 fs.writeFileSync(path.join(review,'source-manifest.json'),JSON.stringify({capturedAt:new Date().toISOString(),ffmpeg,version:execFileSync(ffmpeg,['-version'],{encoding:'utf8',windowsHide:true}).split('\n')[0],videos,protectedFiles},null,2),{flag:'wx'});
 console.log(JSON.stringify(videos,null,2));
}
