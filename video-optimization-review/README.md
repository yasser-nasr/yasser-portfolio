# Separate video experiment

Open **index.html** directly in a browser after completion. It is a standalone local comparison page, not a website route. Choose a video and candidate format, play both, and switch which soundtrack is audible. Synchronization is approximate; full-screen and native controls are available.

## Files

- `REPORT.md`: measured totals, before/after table, method, and limitations.
- `comparison-report.csv` / `.json`: exact per-video sizes, timing, codec information, quality screening, and candidate results.
- `manual-review.json`: approval checklist and file-specific concerns.
- `LOADING-AUDIT.md`: read-only website audit; recommendations were not implemented.
- `poster-inventory.json`: existing posters, dimensions, and sizes; no poster files were generated or changed.
- `source-manifest.json`: original-video facts and hashes plus a protected-file snapshot covering the existing website and image work.
- `integrity-verification.json`: final original/output checks, fast-start checks, and matching original/MP4 AAC packet hashes.
- `metrics/`: VMAF logs for encoded candidates and VP9 samples; rejected temporary video candidates are not shipped.
- `results-progress.json`: intermediate journal from the initial pass, before Pillars refinement. It is not the final primary-selection list; use `comparison-report.json`.
- `pillars-frame-comparison.png`: original left / earlier CRF 18 candidate right at 25 seconds. This exposed contour roughness and prompted higher-quality variants; it does not show the final primary variant.
- `pillars-high-quality-frame-comparison.png`: the same original frame versus the final higher-quality primary. This representative still was inspected; complete motion/listening approval remains pending.

Primary optimized copies are under `public/videos-optimized/`, with project-relative subfolders preserved. The two refined Pillars primary files use `-high-quality.mp4`; their earlier same-basename MP4 candidates are retained for comparison and counted separately. Do not assume every file in the output directory is the selected primary; consult the report.

## Generation record

The new scripts implement capture → optimize → refine motion graphics → finalize. They require the portable FFmpeg/FFprobe binaries in the task-specific temporary tools folder. Existing output or snapshots are refused by default. `--resume` validates previously completed generated copies before continuing. These scripts are processing tools, not website tests or framework build commands.

Source media, existing image copies, and the earlier image-review package must stay untouched. Do not run this pipeline over existing user-approved assets or change website references. No package installation, configuration change, commit, or deployment is part of this experiment.

## Approval and reversibility

Review fine typography, contours, gradients, textures, fast movement, sound, sync, and start/end joins. VMAF is not proof of invisible artifacts or seamless loops. All outputs await explicit approval.

Only the new `public/videos-optimized/` and `video-optimization-review/` directories belong to this experiment. Removing those two directories reverses it; originals and optimized images require no restoration. Because assets are under `public/`, keep the new folders out of future deployments until approved.
