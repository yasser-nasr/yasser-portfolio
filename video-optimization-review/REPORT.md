# Separate experimental video optimization

No website or existing media was modified. The previous image experiment is unchanged. Nothing was committed or deployed, and no references were switched.

## Results

- 17 unique referenced videos: 510,500,847 bytes (510.50 MB).
- Primary H.264 MP4 copies: 381,431,881 bytes (381.43 MB).
- Primary-set reduction: 129,068,966 bytes (129.07 MB), **25.28%**.
- 3 lossless remux(es); other primary copies are quality-based H.264 encodes.
- 0 retained VP9 alternatives add 0 bytes. 2 earlier MP4 candidates add 16,636,681 bytes. Combined experimental video directory: 398,068,562 bytes. Extra candidates are comparison choices, not included in the primary-set savings.
- Keeping originals plus experimental copies increases local storage; the reduction above compares equivalent sets, not disk space reclaimed.
- All primary copies use fast-start MP4 (moov before mdat). Original atom order is in JSON.
- Native resolution, aspect ratio, frame rate, frame counts, and audio-track counts retained. No resizing, cropping, frame-rate reduction, trimming, interpolating, or artificial loop edits.
- 13 AAC soundtracks copied without re-encoding; elementary-stream SHA-256 checks match originals. Silent originals remain silent. Optional VP9 soundtracks use Opus and need listening review.
- 1259 pre-existing files verified unchanged, including source media, existing optimized images, their review package, website source/configuration, and captured documentation/scripts.

## Before / after

Sizes are exact bytes. Resolution, frame rate, and duration shown below are original values; detailed original and optimized values are in CSV/JSON. MP4 remains H.264. Full original/optimized paths, codec data, duration, frame count, quality differences, and alternative details are recorded per video in JSON.

| Original project-relative file | Original bytes | MP4 bytes | Reduction | Resolution | FPS fraction | Seconds | CRF | VMAF mean |
| --- | ---: | ---: | ---: | --- | --- | ---: | --- | ---: |
| mena-law-reporters/social-media/mena-law-reporters-cop28-highlights-video.mp4 | 31,297,183 | 22,476,575 | 28.18% | 1080×1920 | 30/1 | 18.9667 | 18 | 97.086 |
| pillars-pr/social-media/web/videos/pillars-pr-logo-animation-intro.mp4 | 230,995 | 230,994 | 0% | 1920×1080 | 60000/1001 | 5.0050 | Remux | Lossless |
| pillars-pr/social-media/web/videos/pillars-pr-online-presence-video.mp4 | 27,076,710 | 9,697,970 | 64.18% | 1080×1920 | 30000/1001 | 71.9719 | 14 | 97.881 |
| pillars-pr/social-media/web/videos/pillars-pr-uses-of-public-relations-video.mp4 | 39,409,419 | 12,347,877 | 68.67% | 1080×1920 | 30000/1001 | 58.3249 | 14 | 97.765 |
| renovofix/before-after/renovofix-ai-renovation-transformation-01.mp4 | 1,245,881 | 1,143,435 | 8.22% | 864×496 | 24/1 | 5.0620 | 18 | 97.653 |
| renovofix/before-after/renovofix-ai-renovation-transformation-02.mp4 | 965,175 | 848,721 | 12.07% | 496×864 | 24/1 | 4.0417 | 18 | 97.788 |
| renovofix/before-after/renovofix-ai-renovation-transformation-03.mp4 | 820,807 | 818,663 | 0.26% | 496×864 | 24/1 | 4.0417 | 16 | 97.137 |
| renovofix/before-after/renovofix-ai-renovation-transformation-04.mp4 | 834,358 | 729,828 | 12.53% | 496×864 | 24/1 | 4.0417 | 18 | 97.126 |
| renovofix/reels/renovofix-bathroom-educational-reel.mp4 | 24,849,656 | 12,617,146 | 49.23% | 1080×1916 | 24/1 | 14.8333 | 18 | 97.791 |
| renovofix/reels/renovofix-ceiling-educational-reel.mp4 | 24,646,457 | 13,126,670 | 46.74% | 1080×1920 | 24/1 | 14.8333 | 16 | 97.286 |
| renovofix/reels/renovofix-flooring-educational-reel.mp4 | 22,995,217 | 9,557,433 | 58.44% | 1080×1916 | 24/1 | 14.0417 | 18 | 97.281 |
| renovofix/reels/renovofix-lighting-educational-reel.mp4 | 24,663,061 | 12,282,192 | 50.2% | 1080×1920 | 24/1 | 15.0417 | 18 | 98.547 |
| videos-reels/memo-travel-dahab-short-form-reel.mp4 | 76,935,417 | 76,839,712 | 0.12% | 1080×1920 | 30/1 | 59.9667 | Remux | Lossless |
| videos-reels/memo-travel-sinai-short-form-reel.mp4 | 61,722,032 | 54,851,644 | 11.13% | 1080×1920 | 30/1 | 59.0000 | 18 | 98.736 |
| videos-reels/memo-travel-umrah-short-form-reel.mp4 | 63,644,650 | 63,569,959 | 0.12% | 1080×1920 | 30/1 | 51.6000 | Remux | Lossless |
| videos-reels/multicultural-center-takeya-kitchen-houston-community-meals-campaign-video.mp4 | 77,099,033 | 69,043,511 | 10.45% | 1920×1080 | 25/1 | 98.2800 | 18 | 97.062 |
| x-factor-interior-design/social-media/x-factor-interior-design-dubai-residential-reel.mp4 | 32,064,796 | 21,249,551 | 33.73% | 1080×1920 | 50/1 | 24.0200 | 18 | 97.167 |

## Encoding and screening policy

Portable encoder: ffmpeg version 9.0.2-essentials_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers. Tools were downloaded into a temporary directory, not installed into the website or package manifest. FFmpeg binary source: [Gyan portable build](https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip).

Primary encodes use libx264, slow preset, adaptive CRF 18, then 16/14 if quality screening or inspection warrants it; no fixed bitrate or arbitrary file-size cap. Two Pillars text/graphics videos additionally received CRF 14 primary copies after contour roughness was seen in an earlier CRF 18 still-frame. The earlier copies remain selectable in the viewer, with separate hashes and sizes. Original AAC audio is stream-copied. Existing color tags are passed through; untagged input is not assigned an invented color space. All sources are 8-bit YUV 4:2:0; no source declares an HDR transfer function, and the tagged logo retains BT.709 tags. One logo source includes an ancillary data/timecode track; it is not an audible or visible video track.

VMAF screening is at native resolution on every fifth frame across the video, with no resizing for measurement. Acceptance: mean >=97 and fifth percentile >=93. If the result is not smaller or fails this range, retain a lossless fast-start stream remux. Metrics and per-frame logs are saved in metrics/. This is not exhaustive visual review, and may miss single-frame flicker, gradient banding, typography issues, audio problems, or loop joins. The model is not a guarantee of equivalent perceptual quality, especially for portrait motion graphics and fine text.

VP9 is evaluated using three video-only samples near 10%, 50%, and 85% of each source, up to 1.5 seconds each. CRF 24 is tried first, then 20 when there is a plausible size advantage but insufficient quality. An alternative must pass the same quality floors, stay within 0.5 mean / 1.0 fifth-percentile VMAF points of its H.264 counterpart, and save at least 15%. Qualifying full-length alternatives undergo the same full-timeline sampled screening and must retain dimensions/frame count. Rejected samples are documented; their temporary encodes are not shipped. CRF numbers are not comparable between codecs. AV1 was not selected: VP9 provides the alternative-codec experiment without another full encoding/decoding compatibility matrix. No claim of mathematically optimal encoding is made.

## Optional VP9 copies

No VP9 sample set passed the entry screen, so no full-length WebM alternatives were generated. Sample trial results are retained in JSON; this does not prove VP9 could never improve another encoding choice.

## Review required

All 17 primary copies require user visual approval before integration. The list and concerns are in [manual-review.json](manual-review.json). Lossless remuxes and marginal savings are marked separately. Review sharp typography, thin lines, gradients, textures, fast motion, scene transitions, sound, and synchronization. The saved Pillars still-frame comparison shows the original on the left and the earlier CRF 18 candidate on the right; this prompted the higher-quality variants, not approval of them. A second still comparison shows the final CRF 14 primary and was also inspected. No comprehensive playback/listening review has been claimed. Comparison page synchronization is approximate and browser-dependent, not frame-accurate laboratory playback.

Open [index.html](index.html) directly as a local file. Choose a video and format, then Play both. One audio source plays at a time; switch audio to compare. Both videos use object-contain and native controls. Toggle looping to inspect original/experimental joins. Offline file playback may depend on browser codec support.

Deliverables: [CSV](comparison-report.csv), [full JSON](comparison-report.json), [poster inventory](poster-inventory.json), [integrity verification](integrity-verification.json), [loading audit](LOADING-AUDIT.md), and [original snapshot](source-manifest.json).

## Loading audit / next steps

Recommendations only: retain preload=none/posters/click-to-play, review poster sizes and offscreen requests, preserve mute preferences, optionally pause other players, confirm range requests/content types/caching on the deployed host, and use format-aware sources if VP9 is approved. No such website change was implemented. No measured page-load or startup-time improvement is claimed; only actual file-size reduction is measured here.

The experiment adds only public/videos-optimized/ and video-optimization-review/. Its output is not referenced by the website. Because the output resides under public/, it would accompany a future deployment if added to deployment source; do not commit or deploy it before approval. Removing only these two new directories reverses the experiment. Originals and the separate image experiment need no restoration. No lint, build, tests, or type-checking were run. Stop here for explicit approval.
