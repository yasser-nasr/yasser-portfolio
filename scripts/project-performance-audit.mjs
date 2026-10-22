import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Targeted diagnostics only: this does not run a build, test, or browser benchmark.
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const files = walk("public/projects").filter((file) => /\.(webp|png|jpe?g|gif|avif)$/i.test(file));
const assets = [];
for (const file of files) {
  const bytes = fs.statSync(file).size;
  if (bytes < 1_000_000) continue;
  const { width, height, format } = await sharp(file).metadata();
  assets.push({ file: file.replaceAll("\\", "/"), bytes, width, height, format });
}
assets.sort((a, b) => b.bytes - a.bytes);
if (!process.argv.includes("--pages-only")) console.log(JSON.stringify({ rasterFiles: files.length, totalSourceBytes: files.reduce((n, f) => n + fs.statSync(f).size, 0), over1MB: assets.length, largest: assets.slice(0, 20) }, null, 2));

const projectSource = fs.readFileSync("src/data/projects.ts", "utf8");
const slugs = [...projectSource.matchAll(/["']?slug["']?:\s*["']([^"']+)["']/g)].map((match) => match[1]);
for (const route of ["/", "/work", ...slugs.map((slug) => `/work/${slug}`)]) {
  const start = performance.now();
  try {
    const response = await fetch(`http://localhost:3000${route}`, { signal: AbortSignal.timeout(60000) });
    const ttfbMs = Math.round(performance.now() - start);
    const html = await response.text();
    const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag);
    const direct = images.filter((tag) => /src="\/projects\//.test(tag));
    const sourcePaths = direct.map((tag) => tag.match(/src="([^"]+)"/)?.[1]).filter(Boolean);
    const directSourceBytes = sourcePaths.reduce((sum, src) => sum + (fs.existsSync(`public${src}`) ? fs.statSync(`public${src}`).size : 0), 0);
    console.log(JSON.stringify({ route, status: response.status, ttfbMs, responseMs: Math.round(performance.now() - start), htmlBytes: Buffer.byteLength(html), images: images.length, directProjectImages: direct.length, directSourceBytes, responsiveImages: images.filter((tag) => /src[Ss]et=/.test(tag)).length, eagerImages: images.filter((tag) => !tag.includes('loading="lazy"')).length, scriptFiles: (html.match(/<script[^>]*src=/g) ?? []).length }));
  } catch (error) { console.log(JSON.stringify({ route, error: error.message })); }
}
