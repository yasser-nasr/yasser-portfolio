import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Run from the repository root before publishing changed portfolio artwork.
const manifestFile = 'src/data/responsive-images.json';
const outputRoot = 'public/responsive';
const previous = JSON.parse(await fs.readFile(manifestFile, 'utf8').catch(error => {
  if (error.code === 'ENOENT') return '{}';
  throw error;
}));
const version = 'webp-q94-v1-' + sharp.versions.vips + '-' + sharp.versions.webp;
const manifest = {};
const inventory = [];
const seen = new Map();
let created = 0;
let reused = 0;
async function walk(dir) {
  const files = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.posix.join(dir, entry.name);
    if (entry.isDirectory() && file !== outputRoot) files.push(...await walk(file));
    else if (entry.isFile() && /\.(webp|avif|png|jpe?g|gif|svg)$/i.test(file)) files.push(file);
  }
  return files.sort();
}
for (const file of await walk('public')) {
  const src = file.slice('public'.length);
  const input = await fs.readFile(file);
  const hash = createHash('sha256').update(input).digest('hex');
  const metadata = await sharp(input).metadata();
  const { width, height, format } = metadata;
  const duplicate = seen.get(hash);
  seen.set(hash, duplicate ?? src);
  inventory.push({src, width, height, format, bytes:input.length, duplicate});
  if (!width || !height || metadata.pages > 1 || metadata.orientation > 1 ||
      format === 'svg' || width <= 360 || input.length < 12000 ||
      /\/icons\/|\/og\/|[-_]og\.|collection-cover\.webp$/.test(src)) continue;
  // Compatibility WebPs have a higher-fidelity AVIF sibling in A1 Dates.
  if (src.startsWith('/projects/a1-dates/') && src.endsWith('.webp') &&
      await fs.access(file.replace(/\.webp$/, '.avif')).then(()=>true,()=>false)) continue;
  const sizes = src.startsWith('/brand/') ? [160,320,480,768] : [360,480,768,1104,1600,2400];
  // The widest artwork slot is 1152px including 24px gutters on both sides.
  const targets = sizes.filter(size => size < width * (size === 1104 ? 0.95 : 0.86));
  if (!targets.length) continue;
  const isSlide = src.startsWith('/projects/presentations/') && !src.includes('/cover/');
  if (isSlide) targets.unshift(144);
  const id = createHash('sha256').update(version + hash + targets.join(',')).digest('hex').slice(0,16);
  const stem = src.replace(/\.[^/.]+$/, '');
  const prefix = (duplicate && manifest[duplicate]?.[1] === id ? duplicate : src).replace(/\.[^/.]+$/, '');
  const output = size => outputRoot + prefix + '.' + id + '.' + size + '.webp';
  const prior = previous[src];
  const cached = prior?.[1] === id && (prior[2] ?? stem) === prefix;
  const widths = [];
  for (const size of targets) {
    if (cached && prior[3].includes(size) && await fs.stat(output(size)).then(s=>s.size>0,()=>false)) {
      widths.push(size);
      reused++;
      continue;
    }
    // Cached manifests also record which candidate widths failed the savings cutoff.
    if (cached && !prior[3].includes(size)) continue;
    const bytes = await sharp(input).resize({width:size,withoutEnlargement:true}).webp({quality:94,alphaQuality:100,smartSubsample:true,effort:3}).toBuffer();
    if (bytes.length >= input.length * 0.92) continue;
    await fs.mkdir(path.dirname(output(size)),{recursive:true});
    await fs.writeFile(output(size),bytes); widths.push(size); created++;
  }
  manifest[src] = [width,id,prefix === stem ? null : prefix,widths];
}
await fs.writeFile(manifestFile,JSON.stringify(manifest,null,0)+'\n');
await fs.mkdir('reports/responsive-delivery',{recursive:true});
await fs.writeFile('reports/responsive-delivery/inventory.json',JSON.stringify(inventory,null,2));
console.log({audited:inventory.length,entries:Object.keys(manifest).length,created,reused});
