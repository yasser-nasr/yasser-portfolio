import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const app = path.join(root, ".next/server/app");
const origin = "https://yassernasr.com";
const issues = [];
const pages = [];
const assets = new Set();
const decode = (value = "") => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const files = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const htmlFiles = files(app).filter((file) => file.endsWith(".html") && !path.relative(app, file).startsWith("_"));
const routes = new Set(htmlFiles.map((file) => "/" + path.relative(app, file).replaceAll("\\", "/").replace(/\.html$/, "").replace(/^index$/, "")));

function issue(route, message) { issues.push({ route, message }); }
function assetExists(url) {
  const parsed = new URL(url, origin);
  if (parsed.origin !== origin) return true;
  if (parsed.pathname === "/_next/image") return assetExists(parsed.searchParams.get("url"));
  if (parsed.pathname.startsWith("/_next/")) return fs.existsSync(path.join(root, ".next", parsed.pathname.replace("/_next/", "")));
  if (["/opengraph-image", "/icon.svg"].includes(parsed.pathname)) return true;
  assets.add(parsed.pathname);
  return fs.existsSync(path.join(root, "public", decodeURIComponent(parsed.pathname)));
}

for (const file of htmlFiles) {
  const route = "/" + path.relative(app, file).replaceAll("\\", "/").replace(/\.html$/, "").replace(/^index$/, "");
  const html = fs.readFileSync(file, "utf8");
  const meta = Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => { const a = attrs(tag); return [a.name ?? a.property, a.content]; }));
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attrs(tag));
  const canonical = links.find((link) => link.rel === "canonical")?.href;
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1]);
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1.length !== 1) issue(route, `Expected one H1; found ${h1.length}`);
  if (!title) issue(route, "Missing title");
  if (!meta.description) issue(route, "Missing description");
  const pageUrl = route === "/" ? origin : origin + route;
  if (canonical !== pageUrl) issue(route, `Canonical mismatch: ${canonical}`);
  for (const name of ["og:title", "og:description", "og:image", "og:url", "twitter:card", "twitter:title", "twitter:description", "twitter:image"]) if (!meta[name]) issue(route, `Missing ${name}`);
  if (meta["og:url"] !== pageUrl) issue(route, "OG URL mismatch");
  if (meta.robots?.includes("noindex")) issue(route, "Public page is noindex");
  for (const name of ["og:image", "twitter:image"]) if (meta[name] && !assetExists(meta[name])) issue(route, `Missing ${name} asset: ${meta[name]}`);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (!schemas.length) issue(route, "Missing JSON-LD");
  for (const schema of schemas) try { JSON.parse(schema[1]); } catch { issue(route, "Invalid JSON-LD"); }
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => attrs(tag));
  for (const image of images) {
    if (!("alt" in image)) issue(route, `Missing image alt: ${image.src}`);
    if (image.src && !assetExists(image.src)) issue(route, `Missing image: ${image.src}`);
  }
  for (const [tag] of html.matchAll(/<(?:source|video)\b[^>]*>/g)) {
    const a = attrs(tag);
    for (const name of ["src", "poster"]) if (a[name] && !assetExists(a[name])) issue(route, `Missing media asset: ${a[name]}`);
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
    const a = attrs(tag);
    if (!a.href || /^(mailto:|tel:|https?:\/\/|javascript:)/.test(a.href)) continue;
    const url = new URL(a.href, origin + route);
    if (url.pathname === route && url.hash && !ids.has(decodeURIComponent(url.hash.slice(1)))) issue(route, `Missing anchor: ${a.href}`);
    if (!routes.has(url.pathname) && !["/api/contact"].includes(url.pathname) && !assetExists(url.pathname)) issue(route, `Broken internal link: ${a.href}`);
  }
  pages.push({ route, title, descriptionLength: meta.description?.length ?? 0, h1: h1.length, images: images.length, schemas: schemas.length });
}
const titles = new Map();
for (const page of pages) { if (titles.has(page.title)) issue(page.route, `Duplicate title with ${titles.get(page.title)}`); titles.set(page.title, page.route); }
const sitemap = fs.readFileSync(path.join(app, "sitemap.xml.body"), "utf8");
for (const route of routes) if (!sitemap.includes(`<loc>${route === "/" ? origin : origin + route}</loc>`)) issue(route, "Missing from sitemap");
console.log(JSON.stringify({ pageCount: pages.length, uniqueAssets: assets.size, pages, issues }, null, 2));
if (issues.length) process.exitCode = 1;
