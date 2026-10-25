# Live Lighthouse audits (Windows)

From the portfolio root in a VS Code PowerShell terminal:

```powershell
npm run audit:site
```

This audits **https://yassernasr.com**, never localhost. No Vercel integration, API key, paid service, build or deployment is required. Node 22.19+ or Node 24 LTS, Google Chrome and installed development dependencies are required. On another machine run `npm ci` first. If Chrome is not detected:

```powershell
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run audit:site
```

Discovery combines the live sitemap (including sitemap indexes), the actual local sitemap function/published project records, and concrete Next.js App Router pages. HTTP status, HTML content type, canonical URLs and noindex directives are checked. Redirect/canonical aliases are deduplicated; unpublished local projects are excluded. Dynamic route templates are not guessed: their concrete published URLs must come from the sitemap/data. Check discovery warnings and exclusions for network failures or local changes not yet deployed. No private/authenticated pages are audited.

Each verified page gets **three mobile and three desktop runs**, sequentially, in fresh Chrome profiles without extensions. Official Lighthouse mobile defaults and desktop preset use simulated throttling. The exact resolved settings, Chrome user agent and Lighthouse version are retained in each JSON. Local caches are reset; remote CDN caches are not. Keep the computer plugged in, close heavy applications, use the same network/machine and avoid simultaneous audits. The full collection can take a long time: 20 pages means 120 browser audits. No reports are uploaded; the live server receives normal audit page requests.

Outputs are under `performance-reports/YYYY-MM-DD/<UTC timestamp>/`:

- `mobile/<route>/run-1..3.json` and `.html`, plus desktop equivalents.
- `discovery.json`: included routes, sources, exclusions and discovery warnings.
- `summary.csv`: every attempt, metrics in milliseconds (CLS unitless), LCP node/timing details and significant diagnostics.
- `medians.json`: per-page/device medians with successful-run counts.
- `results.json`: extracted request evidence (transferred/resource bytes separate), diagnostics and environment.
- `ANALYSIS.md`: rankings, poor mobile pages, recurring issues, impact-ranked review suggestions and per-run LCP/network evidence.
- `.error.json` if an audit fails. Failed results never contribute to medians.

Results are checkpointed after every attempt. Ctrl+C requests stopping after the current audit; earlier reports survive. An incomplete run exits nonzero. Timestamps use UTC to avoid ambiguous filenames. Reports are outside `public/` and excluded from Git and Vercel deployment.

Each measurement runs in a separate Node process so Lighthouse/native process state does not accumulate across the collection. A worker failure is recorded and the collection continues. A 4-minute per-worker timeout prevents indefinite hangs.

Resume an interrupted collection without repeating successful JSON/HTML report pairs:

```powershell
npm run audit:site -- -Resume 'performance-reports\2026-10-24\<timestamp>'
```

Resume uses the collection's saved route list. Existing report URL, device, score and runtime status are verified before skipping. Invalid/failed files are preserved with a `.previous-<timestamp>` suffix before retrying. Run on the same computer, browser/Lighthouse versions and network conditions, and avoid resuming across a site deployment; individual reports retain their original timestamps and configuration. Resume does not imply simultaneous measurements.

Validate routes without running Lighthouse:

```powershell
npm run audit:site -- -DiscoverOnly
```

Regenerate aggregate analysis from an existing collection (does not rerun Chrome):

```powershell
npm run audit:site -- -Analyze 'performance-reports\2026-10-24\<timestamp>'
```

Missing Lighthouse fields are marked unavailable. Lab navigation audits do not provide real-user INP; TBT is never substituted. LCP insight timing subparts describe the observed trace and may not sum to the simulated headline LCP. Render-delay and request timings are evidence for investigation, not proof that a particular asset caused the delay. Reported potential savings are estimates and are not additive. Inspect the saved HTML/JSON before approving fixes. No website code or media is changed by this tool.

Implementation follows the [official Lighthouse Node API](https://github.com/GoogleChrome/lighthouse/blob/main/docs/readme.md#using-programmatically) and [desktop configuration](https://github.com/GoogleChrome/lighthouse/blob/main/core/config/desktop-config.js).
