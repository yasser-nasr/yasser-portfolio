# Indexing cleanup — 7 September 2026

Repository fixes are implemented and verified against a local production build. They have not been deployed. Live checks were made directly against https://yassernasr.com. No authenticated hosting or Search Console session was available; no Search Console validation or sitemap submission was performed.

## Fixed in the repository

- `next.config.ts`: added permanent 308 redirects from `/index.php` to `https://yassernasr.com/`, and from the exact `www.yassernasr.com` host to the canonical host while preserving paths and queries. Preserved the existing Dolato slug redirect. HTTPS enforcement already works on the production host.
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/site.ts`: fixed the origin to `https://yassernasr.com`, eliminating environment overrides that could generate HTTP, www, localhost, or preview origins. Kept the `siteUrl` export used by profile data as an alias of the production origin.
- `.env.example`, `README.md`: removed the obsolete environment setting and documented the fixed canonical origin.
- `src/data/projects.ts`: removed the obsolete `placeholder-03` entry. Git history (`e263e86`, `8b14699`, `81d44bd`) shows generic placeholder content, with no unambiguous mapping to a current project. Its route remains 404.
- This report records the findings and remaining hosting work.

## Production items still unresolved

1. `/index.php`, `/yn/block.php` (both reported item IDs), and `/sound.php` return 403 with `X-Vercel-Mitigated: deny`. This is evidence of a Vercel security denial. Application routing cannot be assumed to override it. The built application returns the intended 308 for index.php and 404 for the other PHP paths. No PHP implementation, catch-all redirect, firewall exception, or security weakening was added. A hosting administrator must inspect the responsible rule; retain protection if correcting the response would require weakening security.
2. `https://www.yassernasr.com/` returns a temporary 307 to the canonical host. `http://www.yassernasr.com/` first returns 308 to HTTPS www, then 307 to non-www. The application now provides a permanent host redirect, but the hosting domain redirect can take precedence. Change the existing Vercel www domain redirect to permanent 308, then verify publicly. The current HTTP non-www redirect already uses 308 in one hop.
3. Deploy the repository changes through the established production workflow and repeat public response checks. Deployment alone may not fix the two hosting behaviors above. Do not start Search Console validation claiming these are fixed until public checks support it.

## Public pages verified

Every page below returns 200 both live and in the local production build, with a self-referencing HTTPS non-www canonical and `index, follow`. No noindex response header was found.

| Path | Live | Built app |
| --- | --- | --- |
| `/` | 200 | 200 |
| `/work` | 200 | 200 |
| `/about` | 200 | 200 |
| `/capabilities` | 200 | 200 |
| `/resume` | 200 | 200 |
| `/contact` | 200 | 200 |
| `/work/dolato-warm-winter-marvels` | 200 | 200 |
| `/work/orienta-collagen-packaging-design` | 200 | 200 |
| `/work/3d-exhibition-experiential-design` | 200 | 200 |
| `/work/rilam-fashion-campaign-design` | 200 | 200 |
| `/work/orin` | 200 | 200 |
| `/work/pillars-pr-brand-communication-design` | 200 | 200 |
| `/work/mena-law-reporters` | 200 | 200 |
| `/work/x-factor-interior-design-branding-case-study` | 200 | 200 |
| `/work/renovofix-brand-digital-design` | 200 | 200 |

The sitemap contains exactly these 15 pages, no duplicate entries, no unpublished projects, no redirect/error URLs, no non-page assets, no queries, and no artificial last-modified dates. Its existing production contents were already correct; the change prevents future environment-driven origin drift. Robots allows crawling and points to the canonical sitemap. Production project lookup and public grids continue to require publishable projects; remaining unpublished placeholders return 404. Development-only previews remain separate from public output.

## Fonts, links, metadata, and structured data

- Searched current repository text, including hidden configuration, excluding dependency, build, and Git object directories; reviewed relevant Git history for the placeholder. No current source references generate the legacy PHP paths, font hashes, or enc/d query pattern. No middleware, proxy, or separate hosting configuration exists in the repository.
- Audited current font configuration: Next.js Google fonts and bundled local fonts, including Alpharush and case-study typefaces. All 36 distinct font URLs found in generated CSS return 200 in each environment. Current generated CSS also returns 200.
- Both exact reported font URLs return 404 on production and neither is referenced by current production HTML/CSS. Related hash prefixes occur in valid current font filenames; those are not broken links. The local build legitimately regenerates `/_next/static/media/47fe1b7cd6e6ed85-s.p.3bh2vc0w-r-ll.woff2` and serves it with 200. Preserve valid generated output: do not force that URL to 404 or add redirects. The second reported font URL remains 404 locally too.
- Checked 75 distinct same-site linked URLs per environment, including navigation, case-study links, font/preload assets, social images, icons, and the downloadable CV: all returned 200. No obsolete placeholder link remained in rendered public pages.
- `/opengraph-image`: 200, `image/png`, valid PNG signature and 1200×630 dimensions. General-page OG and Twitter metadata reference it; projects reference valid project images. It is absent from the page sitemap.
- `/manifest.webmanifest`: 200, `application/manifest+json`, valid JSON, name and short_name `Yasser Nasr`, start_url `/`, display `standalone`. Both PNG icons return 200 with matching 192×192 and 512×512 dimensions. The application links the manifest correctly. It is absent from the page sitemap.
- Parsed rendered JSON-LD and checked same-site URL and image references. Person, WebSite, WebPage, ProfilePage, ContactPage, BreadcrumbList, and CreativeWork references remain canonical and point to public resources. Preserved `https://yassernasr.com/#person`; no architecture or project-content rewrite was needed.
- The supplied `/?enc=…&d=yassernasr.com` pattern is not generated by the current site. Live testing returns the homepage with 200, `index, follow`, and the clean homepage canonical, rather than the historical noindex response. Left it alone as requested; its Search Console classification may change to a duplicate/canonical exclusion after recrawl.

## URL disposition

Paths without a host below refer to https://yassernasr.com. Expected status describes the intended application behavior; live blockers are stated explicitly.

| URL | Previous issue | Final expected HTTP status | Action taken | Expected Search Console behavior |
| --- | --- | --- | --- | --- |
| `/index.php` | 403 | 308 → homepage 200; live still 403 | Permanent redirect implemented and tested; Vercel denial unresolved | Page with redirect once reachable |
| `/yn/block.php?name=innerpage&item_id=132` | 403 | 404; live still 403 | Verified native 404; no replacement or security bypass | Not found after hosting permits normal missing-route response |
| `/yn/block.php?name=innerpage&item_id=134` | 403 | 404; live still 403 | Same | Same |
| `/sound.php?do=show_sub&IDS=10` | 403 | 404; live still 403 | Same | Same |
| `/work/placeholder-03` | 404 | 404 | Removed obsolete data; no defensible replacement | Intentional not found |
| `/_next/static/media/47fe1b7cd6e6ed85-s.p.3bh2vc0w-r-ll.woff2` | 404 | 404 on current production; 200 if generated by a deployment | Verified current font loading; no redirect or manual recreation | Historical asset exclusion is safe |
| `/_next/static/media/e2334d715941921-e.s.p.3o_v2fun1jzxk.woff2` | 404 | 404 | No references or redirect | Historical asset exclusion is safe |
| `http://yassernasr.com/` | Page with redirect | 308 → 200 | Verified existing one-hop redirect | Intentional page with redirect |
| `https://www.yassernasr.com/` | Page with redirect | 308 → 200; live still 307 → 200 | Added application redirect; hosting change pending | Intentional page with redirect |
| `http://www.yassernasr.com/` | Page with redirect | Permanent hops → 200; live 308 → 307 → 200 | Preserve HTTPS enforcement; hosting change pending | Intentional page with redirect |
| `/?enc=…&d=yassernasr.com` | Excluded by noindex | 200 with clean homepage canonical, as observed | No generated references; no unnecessary route or redirect | Duplicate/canonical exclusion may replace old noindex classification |
| `/opengraph-image` | Crawled, not indexed | 200 image/png | Validated; no indexing change | Safe non-page exclusion |
| `/manifest.webmanifest` | Crawled, not indexed | 200 application/manifest+json | Validated; no indexing change | Safe non-page exclusion |
| `/work/dolato-winter-theme-competition-2023` | Existing old slug | 308 → current project 200 | Preserved existing redirect | Intentional page with redirect |

## Validation

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed, no warnings or errors.
- `npm run build`: passed using installed Next.js 16.3.4.
- `git diff --check`: passed.
- Tested local production HTTP responses, canonical host matching (including a nested path with a query), all public pages, linked resources, structured data, manifest and image payloads, and missing routes.
- Deployment, hosting settings, and Search Console actions remain unperformed. No visual design, case-study content, published slug, external link, or security header was changed.
