// Focused resource/reference diagnostics, not a build, test suite, or browser benchmark.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import ts from 'typescript';

const dir = 'reports/site-2026-10-22';
const read = name => JSON.parse(fs.readFileSync(`${dir}/${name}.json`, 'utf8'));
const before = read('local-before'), after = read('local-after');
const baseline = read('source-before'), production = read('production-http-baseline');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const changedSources = baseline.files.filter(f => !fs.existsSync(f.file) || hash(f.file) !== f.sha256).map(f => f.file);
const changedMedia = baseline.media.filter(f => !fs.existsSync(f.file) || hash(f.file) !== f.sha256).map(f => f.file);
const knownMedia = new Set(baseline.media.map(f => f.file));
const addedMedia = walk('public').map(f => f.replaceAll('\\', '/')).filter(f => !knownMedia.has(f));
const median = values => {const v = [...values].sort((a,b) => a-b); return v.length ? (v[Math.floor((v.length-1)/2)]+v[Math.ceil((v.length-1)/2)])/2 : null;};
const bytes = urls => urls.reduce((sum, url) => sum + (production.resources.find(r => r.url === url)?.transferredBytes ?? 0), 0);
const invariants = ['title','mainTextHash','canonical','social','images','videoPosters','videoSources','videos','videoPreloadNone','autoPlayVideos'];
const routes = after.pages.map(page => {
  const old = before.pages.find(p => p.route === page.route);
  const live = production.pages.find(p => p.route === page.route);
  return {
    route: page.route, status: page.status,
    changedDeclarations: invariants.filter(key => JSON.stringify(old[key]) !== JSON.stringify(page[key])),
    fontPreloadsBefore: old.fontPreloads.length, fontPreloadsAfter: page.fontPreloads.length,
    fontFileBytesBefore: old.preloadedFontFileBytes, fontFileBytesAfter: page.preloadedFontFileBytes,
    liveDeclaredFontTransferBytes: bytes(live.fontPreloads),
    liveDeclaredJsTransferBytes: bytes(live.scripts), liveDeclaredCssTransferBytes: bytes(live.stylesheets),
    liveHttp: Object.fromEntries(['desktop','mobile'].map(profile => {
      const trials = live.trials.filter(t => t.profile === profile && t.status === 200);
      return [profile, {runs:trials.length, medianTtfbMs: median(trials.map(t => t.ttfbMs)), medianHtmlTransferBytes:median(trials.map(t => t.transferredBytes))}];
    })),
    images: page.images.length, responsiveImages: page.images.filter(i => i.srcSet || i.srcset).length,
    lazyImages: page.images.filter(i => i.loading === 'lazy').length,
    imagePreloads: page.imagePreloads.length, videos: page.videos, videoPreloadNone: page.videoPreloadNone,
  };
});

const localAssets = new Set();
function asset(src) {
  if (!src || src.startsWith('data:')) return;
  const url = new URL(src, 'http://localhost:3000');
  if (!['localhost','yassernasr.com','www.yassernasr.com'].includes(url.hostname)) return;
  if (url.pathname === '/_next/image') return asset(url.searchParams.get('url'));
  if (!url.pathname.startsWith('/_next/')) localAssets.add(decodeURIComponent(url.pathname));
}
for (const page of after.pages) {
  for (const image of page.images) {
    asset(image.src);
    for (const entry of (image.srcSet ?? image.srcset ?? '').split(/,\s*(?=\/|https?:)/)) asset(entry.replace(/\s+\d+[wx]$/, ''));
  }
  [...page.social,...page.videoPosters,...page.videoSources].forEach(asset);
}
// Include manifest entries only reachable after opening a gallery/lightbox.
const manifest = ts.createSourceFile('manifest.ts', fs.readFileSync('src/lib/optimized-media-manifest.ts','utf8'), ts.ScriptTarget.Latest, true);
const declarations = {};
function visit(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) declarations[node.name.text] = node.initializer;
  ts.forEachChild(node, visit);
}
visit(manifest);
const object = node => Object.fromEntries(node.properties.map(p => [p.name.text,p.initializer.text]));
const overrides = object(declarations.optimizedImageOverrides);
for (const item of declarations.optimizedImagePaths.arguments[0].elements) asset('/projects/'+(overrides[item.text]??item.text));
Object.values(object(declarations.optimizedVideoPaths)).forEach(asset);
const generatedRoutes = new Set(['/opengraph-image']);
const missingAssets = [...localAssets].filter(url => !generatedRoutes.has(url) && !fs.existsSync('public'+url));
const routeChecks = [];
for (const url of ['/opengraph-image','/sitemap.xml','/robots.txt']) {
  const response = await fetch('http://localhost:3000'+url, {signal:AbortSignal.timeout(60000)});
  await response.arrayBuffer();
  routeChecks.push({url,status:response.status});
}
const videoRangeChecks = [];
for (const url of localAssets) if (/\.(mp4|webm|mov)$/i.test(url)) {
  const response = await fetch('http://localhost:3000'+encodeURI(url), {headers:{Range:'bytes=0-1023'},signal:AbortSignal.timeout(30000)});
  const data = await response.arrayBuffer();
  videoRangeChecks.push({url,status:response.status,contentType:response.headers.get('content-type'),range:response.headers.get('content-range'),bytes:data.byteLength});
}
const rasters = [];
for (const file of walk('public').filter(f => /\.(webp|avif|png|jpe?g|gif)$/i.test(f))) {
  const meta = await sharp(file).metadata();
  rasters.push({file:file.replaceAll('\\','/'), bytes:fs.statSync(file).size, width:meta.width, height:meta.height, format:meta.format});
}
rasters.sort((a,b) => b.bytes-a.bytes);
const result = {
  createdAt:new Date().toISOString(),
  limitations:'Local comparisons are SSR declarations, not production rendering timings. Live HTTP measurements are pre-change and user-agent-only, not mobile/desktop browser emulation. JS budgets exclude dynamically requested chunks, analytics and prefetch. No CWV or browser navigation timings available.',
  changedSources, changedMedia, addedMedia, mediaFilesVerified:baseline.media.length,
  referencedLocalAssetCount:localAssets.size, missingAssets, generatedRouteChecks:routeChecks, videoRangeChecks, routes,
  rasterInventory:rasters,
};
fs.writeFileSync(`${dir}/verification.json`, JSON.stringify(result,null,2));
const columns = ['route','fontPreloadsBefore','fontPreloadsAfter','fontFileBytesBefore','fontFileBytesAfter','liveDeclaredFontTransferBytes','liveDeclaredJsTransferBytes','liveDeclaredCssTransferBytes','images','responsiveImages','lazyImages','imagePreloads','videos','videoPreloadNone'];
fs.writeFileSync(`${dir}/route-resources.csv`, [columns.join(','),...routes.map(r => columns.map(k => r[k]).join(','))].join('\n')+'\n');
console.log(JSON.stringify({changedSources,changedMedia,addedMedia,mediaFilesVerified:baseline.media.length,referencedLocalAssetCount:localAssets.size,missingAssets,generatedRouteChecks:routeChecks,videoRangeChecks:videoRangeChecks.map(v=>({status:v.status,bytes:v.bytes})),invariantDifferences:routes.filter(r => r.changedDeclarations.length),presentation:routes.find(r => r.route.includes('presentations-')),largestRasters:rasters.slice(0,8)},null,2));
