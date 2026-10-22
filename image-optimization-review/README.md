# Local image experiment

Open `index.html` directly in your browser after processing finishes. No web server or website route is required. Originals appear on the left; experimental copies appear on the right.

Start with the changed-image filter. Inspect text, gradients, texture, and transparent edges in both fitted and native-pixel views. Review resized copies and exceptions separately. Automated similarity scores are screening aids, not visual approval.

The complete results are in `REPORT.md`, `comparison-report.csv`, and `comparison-report.json`. `exceptions.json` lists copies still above 1,048,576 bytes. `source-manifest.json` records original dimensions, byte counts, and SHA-256 hashes before processing.

Already-small files and exception copies are byte-for-byte identical to their sources. Their SSIM 1 / PSNR 100 values are identical-file markers; the latter is a capped marker rather than a finite measurement of loss.

Encoding prefers native resolution. A qualifying maximum-quality WebP is accepted directly; otherwise WebP and AVIF candidates are compared using the documented screening metrics. Encoder quality numbers are not comparable between formats. This is a conservative search, not proof that a better encoding cannot exist.

The PNG visual samples are representative spot checks only. They do not replace review of the full collection.

`first-pass/` is an unused archive of intermediate experimental copies. It is not part of the final optimized set or size totals. Automated cleanup was blocked by the execution environment.

## Separation from the website

This experiment adds only `public/projects-optimized/` and `image-optimization-review/`. No original asset or website reference was changed. Because the experimental assets are inside `public/`, they would be included by a future deployment if added to its source tree. Do not commit or deploy these folders before approval.

To reverse this experiment, remove only these two newly generated directories. No restoration or website configuration change is necessary.
