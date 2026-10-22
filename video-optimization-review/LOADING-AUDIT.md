# Video-loading audit — recommendations only

No website loading behavior was changed. This is a source-code and local-media audit, not a measured live-site network or navigation benchmark.

## Scope and evidence

17 unique local MP4 files were found under `public/projects/`. All 17 are referenced by `src/app/motion-video/page.tsx`, including paths expanded from the RenovoFix arrays. The MENA, Pillars PR, RenovoFix, and X Factor case studies reuse 13 of those files. There were no additional local MOV, WebM, M4V, MKV, AVI, OGV, or MPEG files in the scanned public tree.

References were followed through these files:

- `src/app/motion-video/page.tsx`: Memo Travel (3), Takeya Kitchen (1), RenovoFix (8), Pillars PR (3), MENA (1), X Factor (1).
- `src/components/case-study/MenaLawReportersCaseStudy.tsx`.
- `src/components/case-study/PillarsPrCaseStudy.tsx` (`MotionVisual` builds paths using `webMediaBase`).
- `src/components/case-study/RenovoFixCaseStudy.tsx` (`episodes` and `transformations` expand dynamic paths).
- `src/components/case-study/XFactorSocialMediaShowcase.tsx`.
- All use `src/components/case-study/VideoPlayer.tsx`.

## Existing behavior worth keeping

- `preload="none"`: requests that the browser defer video payload loading until playback. It is a browser hint, not a guarantee of zero requests.
- Posters are supplied at the inspected call sites. A dedicated poster inventory records their existence, dimensions, and bytes.
- `controls` and `playsInline`, plus accessible labels and fallback text.
- No autoplay or loop attributes in the shared player. Videos are click-to-play, avoiding many simultaneous autoplay downloads/decoders.
- CSS aspect-ratio containers reserve the player footprint; `object-contain` avoids cropping. The unusual 1080×1916 and 864×496 source compositions were not normalized to another ratio in this experiment.
- A single lightweight shared React player, not a third-party player library. No evidence here justifies replacing it.

## Measured local-media findings

- Original video set: 510,500,847 bytes across 17 unique files; selected experimental primaries: 381,431,881 bytes (25.28% reduction). This is a file-set comparison, not a measured page-load result.
- All 17 referenced posters exist. They total 1,777,250 bytes; the largest is 183,474 bytes at 1080×1920 (MENA COP28). None is an oversized multi-megabyte poster, so any deferred-poster work should be justified by actual offscreen network requests, not assumed to be a dominant bottleneck.
- Four original RenovoFix before/after MP4s have their moov atom after mdat. The experimental primary copies put moov first. The other 13 sources already have fast-start ordering.
- The biggest originals are Takeya (77,099,033 bytes), Dahab (76,935,417), and Umrah (63,644,650). Dahab and Umrah were retained as lossless stream remuxes after the conservative H.264 attempt was not smaller. This search does not prove another setting could not compress them further.

## Potential improvements after approval

1. **Adopt reviewed compression first.** Large playback payloads, rather than an eagerly downloaded full video collection, are the clearest local-media concern. The measured before/after byte counts are in the comparison report. They are not measured startup-time gains.
2. **Keep `preload="none"` for offscreen/click-to-play items.** Avoid switching the whole gallery to `auto` or `metadata`. If browser traces reveal unwanted downloads, defer assigning each source until interaction or near-viewport entry. Verify behavior before adding more client code.
3. **Review poster transfer size.** Native `<video poster>` does not use Next Image responsive transformations. Below-the-fold posters may be requested even though video preload is disabled. Consider purpose-sized poster copies and deferring offscreen player/poster mounting if measured downloads justify it. Do not alter the existing image experiment without approval.
4. **Maintain fast-start MP4.** Each experimental primary copy is checked for a `moov` atom preceding `mdat`. Original atom order is recorded too. This helps progressive playback but does not alone prove fast startup.
5. **Pause other players when a new one starts, if desired.** Nothing currently coordinates separate instances, so a visitor can manually start multiple videos. An opt-in one-active-player policy could reduce concurrent downloads, sound, and decoder work; it changes behavior and needs approval.
6. **Preserve audio preferences.** `prepareSound` runs on metadata and play, setting `muted=false` and `volume=1`. It can override a user's mute/volume choice when resuming. Removing this forced reset is an accessibility/UX recommendation, not implemented here. Any future autoplay would need a separate muted, reduced-motion/data-conscious policy.
7. **Use correct source MIME types if WebM is adopted.** The current player hardcodes `type="video/mp4"`. It must not be pointed at VP9 WebM without updating source descriptors and retaining MP4 fallback. These experimental alternatives have not been integrated.
8. **Validate delivery on the actual host.** Check `Content-Type`, byte-range `206` responses, seeking, cache hits, and time to first frame on mobile networks. `next.config.ts` currently declares `Cache-Control: public, max-age=3600, must-revalidate` for `/projects/:path*`. Longer immutable caching should only be considered with versioned filenames and an invalidation strategy; deployed headers have not been measured.
9. **Do not confuse route prefetch with video downloading.** Route/RSC prefetch and media transfers are different. No Link prefetch changes were made. Use a browser network trace to distinguish page navigation, poster requests, first play, and buffered video bytes before changing navigation.
10. **Streaming is optional, not a default rewrite.** The longest local clip is about 98 seconds. Only consider adaptive streaming/CDN changes if traffic, mobile playback, or rebuffering measurements justify the added system complexity.

## Manual checks before any integration

Inspect sharp typography, gradients, material textures, fast motion, transitions, and starts/ends. Listen for sound and check lip/music synchronization. Toggle looping in the local viewer to compare the original join with the experimental join; this experiment does not turn a non-seamless original into a seamless loop. Check MP4 playback on Safari/iOS and Chrome/Android; optional VP9/Opus needs its own compatibility and listening checks. Captions/transcripts for meaningful speech are a separate accessibility improvement; none were authored or removed.

The installed Next.js video guide was consulted: `node_modules/next/dist/docs/01-app/02-guides/videos.md`. No framework component/configuration changes, lint, builds, tests, or type-checking were performed.
