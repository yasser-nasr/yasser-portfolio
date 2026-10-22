# Experimental portfolio image optimization

Original files and website references are unchanged. Nothing was committed or deployed.

- Images: 480
- Original total: 316,864,706 bytes
- Experimental total: 205,824,854 bytes
- Saved: 35.04%
- Already-small images copied byte-for-byte: 403
- Optimized at native resolution: 59
- Optimized with oversized-source resizing: 7
- Exceptions above 1 MiB: 11
- Source integrity: All source raster SHA-256 hashes, dimensions, and inventory unchanged.

## Quality policy

8x8 block luminance SSIM and RGB PSNR after sRGB conversion, gray compositing for alpha, maximum 1600 px comparison width. Acceptance: SSIM >= 0.99 and PSNR >= 38 dB. Native dimensions preferred; only sources wider than 3200 px are eligible for 3200/2560 px width candidates. No crops or aspect-ratio changes beyond integer pixel rounding.

WebP quality floor 92, ceiling 100; AVIF floor 84, ceiling 95, 4:4:4 chroma. A qualifying quality-100 WebP is accepted directly without trying AVIF. Otherwise each encoder searches for its highest tested quality within the byte limit, and the acceptable candidate with the higher SSIM wins; PSNR and bytes break ties. Encoder quality values are not comparable between formats. Native resolution is preferred over resizing. Already-small WebP files are exact copies. Candidate failure retains the original bytes as an exception. Original color profiles are interpreted by Sharp and re-encoded outputs use sRGB with an embedded profile. Alpha is retained; no flattening or cropping occurs.

Automated metrics are screening tools. They do not guarantee invisible artifacts, perfect color appearance, or native-resolution text equivalence. Every re-encoded image is marked for visual review; resized images receive an extra warning. Approval is pending.

Representative exhibition, Dolato, and resized-slide visuals were spot-checked at display scale. The full collection has not received visual approval. Exact copies use SSIM 1 / PSNR 100 as identical-file markers. Exceptions indicate this conservative search did not qualify, not proof that no alternative encoding could work.

## Review

Open [index.html](index.html) directly as a local file. It embeds report data, uses no server, and adds no website route. Browse changed images first, compare fitted views, and enable native-pixel inspection for fine detail. Original and optimized images are referenced with relative local paths.

Full per-image data: [CSV](comparison-report.csv) and [JSON](comparison-report.json). Original-byte snapshot: [source manifest](source-manifest.json). Exception details: [exceptions.json](exceptions.json).

## Exceptions

- 3d-exhibition/rta/supporting/rta-eid-al-etihad-digital-invitation-mockup.webp: 9,910,592 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.
- dolato-warm-winter-marvels/applications/dolato-gelato-cup.webp: 7,789,188 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.
- dolato-warm-winter-marvels/cover/dolato-warm-winter-marvels-hero.webp: 7,789,188 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.
- pillars-pr/social-media/static/pillars-pr-legal-marketing-brand-launch-teaser.webp: 1,851,576 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.
- print/madina-womens-hospital-bilingual-flyer-mockup.webp: 1,872,716 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.
- print/reference/reference-medical-training-booklet-flat-cover.webp: 5,433,700 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.
- print/reference/reference-medical-training-booklet-interior-spread-01.webp: 5,717,282 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.
- print/reference/reference-medical-training-booklet-interior-spread-02.webp: 5,702,616 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.
- print/reference/reference-medical-training-booklet-interior-spread-03.webp: 5,755,632 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.
- print/reference/reference-medical-training-booklet-open-cover.webp: 5,373,144 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.
- print/reference/reference-medical-training-booklet-standing-cover.webp: 5,248,028 bytes. No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.

## Reversibility

The experiment adds only public/projects-optimized and image-optimization-review. No current website file, original image, project reference, or production configuration was changed. Do not deploy this output folder before approval. The whole experiment can be removed by removing those two new directories after review. No lint, build, tests, or type-checking were run.

An unused `image-optimization-review/first-pass/` archive contains 46 intermediate copies from this experiment (82,221,370 bytes). Cleanup was blocked by the execution environment, so it remains separate from the final assets, report totals, and comparison page. No original files are in that archive.
