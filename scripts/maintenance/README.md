# Dated maintenance tools

Run from the application root. Outputs go to ignored `reports/`; executable tools do not belong in the output folders.

- `restructure-2026-10-24/check-source.mjs`: compare module targets and non-import source content against the external restructuring checkpoint.
- `restructure-2026-10-24/check-pages.mjs --after`: compare server-rendered page output with this pass's baseline; expects the dev server on port 3000.
- `restructure-2026-10-24/check-assets.mjs`: focused asset, video-range, sitemap and ignore-rule checks.
- Other files in that group created the checkpoint, move plan and mechanical patches. The checkpoint/move guards intentionally reject replay against the already-restructured project.
- `organization-2026-10-24/` and `final-cleanup-2026-10-24/` contain older audit/operation drivers preserved as history. Two older drivers are on the pending deletion list. Their dated plans are not safe to replay against arbitrary newer project states.
- `media-merge-2026-10-24/` contains the media merge checkpoint/driver and canonical-versus-legacy URL checks. Results are in `reports/media-merge-2026-10-24/`. The merge driver is a one-time operation and must not be replayed against its already-merged source folders.

These tools are not imported by the website, invoked by npm scripts or included in Vercel deployment uploads. Do not run a cache-clearing or file-moving driver without reviewing its exact targets and the current process state.
