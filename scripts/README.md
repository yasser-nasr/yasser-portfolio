# Development tools

Run tools from the application root. None runs automatically during startup or deployment. Results belong in ignored `reports/` or `performance-reports/`, not `public/`.

## Audit

- `node scripts/audit/audit-site.mjs`: inspect an existing production build for route, SEO and asset integrity. Requires a previously approved/generated `.next/server/app` build; does not build itself.
- `node scripts/audit/audit-project-organization.mjs --after`: read-only source graph, duplicate asset and inventory diagnostics. Its dated output location is declared at the top of the script.
- `scripts/audit/audit-production-media.mjs`: dated 22 October comparison helper; depends on its recorded snapshot and production payload data, plus port 3010. It is on the pending retirement list, not an automatic cleanup tool.

## Media delivery diagnostics

- `node scripts/media/project-performance-audit.mjs`: image metadata and route declarations; expects port 3000.
- `node scripts/media/project-image-transfer.mjs`: compare selected image-response sizes; expects port 3000. Does not recompress source assets.

## Performance and Lighthouse

- `npm run audit:site`: local Chrome/Lighthouse audits of every verified live public URL, three mobile and three desktop runs each. JSON, HTML, CSV and analysis are saved under `performance-reports/`. See [Windows instructions](performance/README.md).
- `scripts/performance/compare-local-production.mjs`: explicit before/after fixture measurements for the 24 October optimization review; requires the documented production servers. Keeps this experiment separate from the live audit command.
- `scripts/performance/{verify-performance-changes,check-critical-visibility,summarize-performance-fixes}.mjs`: focused browser/HTML checks and comparison reporting for the same review. Inputs, ports and output scope are declared in those scripts; do not treat historical measurements as current live-site results.
- `scripts/performance/measure-site-performance.mjs`: opt-in snapshot, local declarations, live HTTP/resource or selected-image diagnostics, using its explicit flags.
- `scripts/performance/profile-production-payloads.mjs --before` / `--after`: compare a separately running production server on port 3010. These do not measure browser paints or CWV.
- `scripts/performance/profile-presentations-lighthouse.mjs --analyze`: analyze the original Lighthouse JSON under `reports/lighthouse/`. Its optional local comparison modes expect port 3011.
- `scripts/performance/summarize-site-performance.mjs`: dated comparison helper, also on the pending retirement list.

Historical datasets remain under `reports/site-2026-10-22/`. Review script input/output constants before recording a new run; do not casually overwrite prior evidence.

## Maintenance

Dated operation drivers and targeted integrity checks live in `scripts/maintenance/`. Generated JSON/CSV/Markdown results live separately in `reports/`. Older organize/cache-clear drivers are historical operation records, not unattended cleanup commands. Do not rerun them or apply old deletion plans against a newer structure. See [the maintenance guide](maintenance/README.md).
