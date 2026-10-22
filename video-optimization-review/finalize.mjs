import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import sharp from 'sharp';
import {root,review,output,walk,hash,ffmpeg} from './inventory.mjs';

const report=JSON.parse(fs.readFileSync(path.join(review,'comparison-report.json'),'utf8'));
const {summary:s,videos}=report;
const mb=b=>(b/1e6).toFixed(2)+' MB';
const cell=v=>String(v??'—').replaceAll('|','\\|');
const source=JSON.parse(fs.readFileSync(path.join(review,'source-manifest.json'),'utf8'));
const posters=[];
const audioChecks=[];
const losslessVideoChecks=[];
function audioHash(file){return execFileSync(ffmpeg,['-v','error','-i',file,'-map','0:a:0','-c','copy','-f','hash','-hash','sha256','-'],{encoding:'utf8',windowsHide:true}).trim();}
function isFaststart(file){const b=fs.readFileSync(file);let i=0,moov,mdat;while(i+8<=b.length){let n=b.readUInt32BE(i);const type=b.toString('ascii',i+4,i+8);if(n===1)n=Number(b.readBigUInt64BE(i+8));if(n===0)n=b.length-i;if(n<8)break;if(type==='moov')moov=i;if(type==='mdat')mdat=i;i+=n;}return moov<mdat;}
for(const r of videos){
 if(r.savedPercent>0&&r.savedPercent<5&&r.status!=='lossless-remux'&&!r.concerns.some(c=>c.startsWith('Marginal byte saving')))r.concerns.push('Marginal byte saving (<5%): this re-encode may not justify any generation loss. Prefer the original unless visual review supports using the copy.');
 let poster=r.originalFilename.replace(/\.mp4$/,'-cover.webp');
 if(r.originalFilename.includes('/videos-reels/memo-'))poster=r.originalFilename.replace(/\.mp4$/,'-poster.webp');
 if(r.originalFilename.includes('multicultural-center-'))poster='public/projects/videos-reels/multicultural-center-takeya-kitchen-houston-campaign-video-poster.webp';
 if(r.originalFilename.includes('pillars-pr-logo-animation-intro'))poster=r.originalFilename.replace('pillars-pr-logo-animation-intro.mp4','pillars-pr-ppr-logo-animation-intro-cover.webp');
 if(r.originalFilename.includes('pillars-pr-uses-of-public-relations'))poster=r.originalFilename.replace('pillars-pr-uses-of-public-relations-video.mp4','pillars-pr-public-relations-video-cover.webp');
 if(r.originalFilename.includes('x-factor-interior-design-dubai-residential'))poster=r.originalFilename.replace('x-factor-interior-design-dubai-residential-reel.mp4','x-factor-interior-design-dubai-penthouse-reel-cover.webp');
 const exists=fs.existsSync(path.join(root,poster));const m=exists?await sharp(path.join(root,poster)).metadata():{};
 posters.push({video:r.originalFilename,poster,exists,bytes:exists?fs.statSync(path.join(root,poster)).size:null,width:m.width,height:m.height});
 if(hash(path.join(root,r.originalFilename))!==r.original.sha256||hash(path.join(root,r.optimizedFilename))!==r.optimizedSha256)throw Error('Media hash mismatch');
 if(!isFaststart(path.join(root,r.optimizedFilename)))throw Error('Faststart missing');
 if(r.original.audio.length){const a=audioHash(path.join(root,r.originalFilename)),b=audioHash(path.join(root,r.optimizedFilename));if(a!==b)throw Error('AAC packets changed');audioChecks.push({video:r.originalFilename,originalAudioHash:a,optimizedAudioHash:b,identical:true});}
 if(r.status==='lossless-remux'){
  const videoHash=file=>execFileSync(ffmpeg,['-v','error','-i',file,'-map','0:v:0','-c','copy','-f','hash','-hash','sha256','-'],{encoding:'utf8',windowsHide:true}).trim();
  const a=videoHash(path.join(root,r.originalFilename)),b=videoHash(path.join(root,r.optimizedFilename));
  if(a!==b)throw Error('Lossless video packets changed');
  losslessVideoChecks.push({video:r.originalFilename,originalVideoHash:a,optimizedVideoHash:b,identical:true});
 }
 if(r.alternative&&hash(path.join(root,r.alternative.filename))!==r.alternative.sha256)throw Error('WebM hash mismatch');
 if(r.standardCandidate&&hash(path.join(root,r.standardCandidate.filename))!==r.standardCandidate.sha256)throw Error('Standard candidate hash mismatch');
}
const changed=source.protectedFiles.filter(f=>!fs.existsSync(path.join(root,f.file))||hash(path.join(root,f.file))!==f.sha256);
if(changed.length)throw Error('Protected file changed: '+changed.map(f=>f.file));
const expectedBytes=s.mp4Bytes+s.alternativeBytes+(s.standardCandidateBytes??0);
const actualBytes=walk(output).reduce((total,file)=>total+fs.statSync(file).size,0);
if(expectedBytes!==actualBytes)throw Error('Experimental directory total differs from report');
fs.writeFileSync(path.join(review,'comparison-report.json'),JSON.stringify(report,null,2));
fs.writeFileSync(path.join(review,'manual-review.json'),JSON.stringify(videos.map(r=>({originalFilename:r.originalFilename,optimizedFilename:r.optimizedFilename,concerns:r.concerns,quality:r.quality,alternative:r.alternative?.filename})),null,2));
fs.writeFileSync(path.join(review,'index.html'),fs.readFileSync(path.join(review,'comparison-template.html'),'utf8').replace('/*REPORT_DATA*/null',JSON.stringify(report).replaceAll('<','\\u003c')));
const csv=v=>'"'+String(v??'').replaceAll('"','""')+'"';
const columns=['originalFilename','optimizedFilename','originalBytes','optimizedBytes','savedPercent','originalResolution','optimizedResolution','originalFrameRate','optimizedFrameRate','originalDuration','optimizedDuration','originalFrames','optimizedFrames','originalCodec','optimizedCodec','originalAudio','optimizedAudio','status','crf','vmafMean','vmafP5','qualityConcerns','webmAlternative'];
fs.writeFileSync(path.join(review,'comparison-report.csv'),'\ufeff'+[columns.map(csv).join(','),...videos.map(r=>[r.originalFilename,r.optimizedFilename,r.originalBytes,r.optimizedBytes,r.savedPercent,`${r.original.width}x${r.original.height}`,`${r.optimized.width}x${r.optimized.height}`,r.original.frameRate,r.optimized.frameRate,r.original.duration,r.optimized.duration,r.original.frames,r.optimized.frames,r.original.codec,r.optimized.codec,r.original.audio.map(a=>a.codec).join(';'),r.optimized.audio.map(a=>a.codec).join(';'),r.status,r.crf,r.quality?.mean,r.quality?.p5,r.concerns.join(' '),r.alternative?.filename].map(csv).join(','))].join('\r\n'));
fs.writeFileSync(path.join(review,'poster-inventory.json'),JSON.stringify(posters,null,2));
fs.writeFileSync(path.join(review,'integrity-verification.json'),JSON.stringify({verifiedAt:new Date().toISOString(),protectedFiles:source.protectedFiles.length,changed:[],originalVideos:videos.length,outputFiles:walk(output).length,allPrimaryMp4Faststart:true,audioChecks,losslessVideoChecks},null,2));
const table=videos.map(r=>`| ${cell(r.originalFilename.replace('public/projects/',''))} | ${r.originalBytes.toLocaleString('en-US')} | ${r.optimizedBytes.toLocaleString('en-US')} | ${r.savedPercent}% | ${r.original.width}×${r.original.height} | ${r.original.frameRate} | ${r.original.duration.toFixed(4)} | ${r.crf??'Remux'} | ${r.quality?.mean.toFixed(3)??'Lossless'} |`).join('\n');
const alternatives=videos.filter(r=>r.alternative).map(r=>`- ${r.alternative.filename}: ${r.alternative.bytes.toLocaleString('en-US')} bytes, ${r.alternative.savedVersusMp4Percent}% below MP4; VMAF ${r.alternative.quality.mean.toFixed(3)}. ${r.alternative.audioPolicy}`).join('\n');
fs.writeFileSync(path.join(review,'REPORT.md'),`# Separate experimental video optimization

No website or existing media was modified. The previous image experiment is unchanged. Nothing was committed or deployed, and no references were switched.

## Results

- ${s.count} unique referenced videos: ${s.originalBytes.toLocaleString('en-US')} bytes (${mb(s.originalBytes)}).
- Primary H.264 MP4 copies: ${s.mp4Bytes.toLocaleString('en-US')} bytes (${mb(s.mp4Bytes)}).
- Primary-set reduction: ${(s.originalBytes-s.mp4Bytes).toLocaleString('en-US')} bytes (${mb(s.originalBytes-s.mp4Bytes)}), **${s.savedPercent}%**.
- ${s.losslessRemuxes} lossless remux(es); other primary copies are quality-based H.264 encodes.
- ${s.webmAlternatives} retained VP9 alternatives add ${s.alternativeBytes.toLocaleString('en-US')} bytes. ${s.standardCandidates??0} earlier MP4 candidates add ${(s.standardCandidateBytes??0).toLocaleString('en-US')} bytes. Combined experimental video directory: ${(s.mp4Bytes+s.alternativeBytes+(s.standardCandidateBytes??0)).toLocaleString('en-US')} bytes. Extra candidates are comparison choices, not included in the primary-set savings.
- Keeping originals plus experimental copies increases local storage; the reduction above compares equivalent sets, not disk space reclaimed.
- All primary copies use fast-start MP4 (moov before mdat). Original atom order is in JSON.
- Native resolution, aspect ratio, frame rate, frame counts, and audio-track counts retained. No resizing, cropping, frame-rate reduction, trimming, interpolating, or artificial loop edits.
- ${audioChecks.length} AAC soundtracks copied without re-encoding; elementary-stream SHA-256 checks match originals. Silent originals remain silent. Optional VP9 soundtracks use Opus and need listening review.
- ${source.protectedFiles.length} pre-existing files verified unchanged, including source media, existing optimized images, their review package, website source/configuration, and captured documentation/scripts.

## Before / after

Sizes are exact bytes. Resolution, frame rate, and duration shown below are original values; detailed original and optimized values are in CSV/JSON. MP4 remains H.264. Full original/optimized paths, codec data, duration, frame count, quality differences, and alternative details are recorded per video in JSON.

| Original project-relative file | Original bytes | MP4 bytes | Reduction | Resolution | FPS fraction | Seconds | CRF | VMAF mean |
| --- | ---: | ---: | ---: | --- | --- | ---: | --- | ---: |
${table}

## Encoding and screening policy

Portable encoder: ${source.version.trim()}. Tools were downloaded into a temporary directory, not installed into the website or package manifest. FFmpeg binary source: [Gyan portable build](https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip).

Primary encodes use libx264, slow preset, adaptive CRF 18, then 16/14 if quality screening or inspection warrants it; no fixed bitrate or arbitrary file-size cap. Two Pillars text/graphics videos additionally received CRF 14 primary copies after contour roughness was seen in an earlier CRF 18 still-frame. The earlier copies remain selectable in the viewer, with separate hashes and sizes. Original AAC audio is stream-copied. Existing color tags are passed through; untagged input is not assigned an invented color space. All sources are 8-bit YUV 4:2:0; no source declares an HDR transfer function, and the tagged logo retains BT.709 tags. One logo source includes an ancillary data/timecode track; it is not an audible or visible video track.

VMAF screening is at native resolution on every fifth frame across the video, with no resizing for measurement. Acceptance: mean >=97 and fifth percentile >=93. If the result is not smaller or fails this range, retain a lossless fast-start stream remux. Metrics and per-frame logs are saved in metrics/. This is not exhaustive visual review, and may miss single-frame flicker, gradient banding, typography issues, audio problems, or loop joins. The model is not a guarantee of equivalent perceptual quality, especially for portrait motion graphics and fine text.

VP9 is evaluated using three video-only samples near 10%, 50%, and 85% of each source, up to 1.5 seconds each. CRF 24 is tried first, then 20 when there is a plausible size advantage but insufficient quality. An alternative must pass the same quality floors, stay within 0.5 mean / 1.0 fifth-percentile VMAF points of its H.264 counterpart, and save at least 15%. Qualifying full-length alternatives undergo the same full-timeline sampled screening and must retain dimensions/frame count. Rejected samples are documented; their temporary encodes are not shipped. CRF numbers are not comparable between codecs. AV1 was not selected: VP9 provides the alternative-codec experiment without another full encoding/decoding compatibility matrix. No claim of mathematically optimal encoding is made.

## Optional VP9 copies

${alternatives||'No VP9 sample set passed the entry screen, so no full-length WebM alternatives were generated. Sample trial results are retained in JSON; this does not prove VP9 could never improve another encoding choice.'}

## Review required

All ${videos.length} primary copies require user visual approval before integration. The list and concerns are in [manual-review.json](manual-review.json). Lossless remuxes and marginal savings are marked separately. Review sharp typography, thin lines, gradients, textures, fast motion, scene transitions, sound, and synchronization. The saved Pillars still-frame comparison shows the original on the left and the earlier CRF 18 candidate on the right; this prompted the higher-quality variants, not approval of them. A second still comparison shows the final CRF 14 primary and was also inspected. No comprehensive playback/listening review has been claimed. Comparison page synchronization is approximate and browser-dependent, not frame-accurate laboratory playback.

Open [index.html](index.html) directly as a local file. Choose a video and format, then Play both. One audio source plays at a time; switch audio to compare. Both videos use object-contain and native controls. Toggle looping to inspect original/experimental joins. Offline file playback may depend on browser codec support.

Deliverables: [CSV](comparison-report.csv), [full JSON](comparison-report.json), [poster inventory](poster-inventory.json), [integrity verification](integrity-verification.json), [loading audit](LOADING-AUDIT.md), and [original snapshot](source-manifest.json).

## Loading audit / next steps

Recommendations only: retain preload=none/posters/click-to-play, review poster sizes and offscreen requests, preserve mute preferences, optionally pause other players, confirm range requests/content types/caching on the deployed host, and use format-aware sources if VP9 is approved. No such website change was implemented. No measured page-load or startup-time improvement is claimed; only actual file-size reduction is measured here.

The experiment adds only public/videos-optimized/ and video-optimization-review/. Its output is not referenced by the website. Because the output resides under public/, it would accompany a future deployment if added to deployment source; do not commit or deploy it before approval. Removing only these two new directories reverses the experiment. Originals and the separate image experiment need no restoration. No lint, build, tests, or type-checking were run. Stop here for explicit approval.
`);
console.log(JSON.stringify({summary:s,posters:posters.length,missingPosters:posters.filter(p=>!p.exists),identicalAudioStreams:audioChecks.length,protectedFilesVerified:source.protectedFiles.length},null,2));
