import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.resolve(root, "public/projects");
const outputRoot = path.resolve(root, "public/projects-optimized");
const reviewRoot = path.resolve(root, "image-optimization-review");
const limit = 1_048_576;
const minimumSSIM = 0.99;
const minimumPSNR = 38;
const refine = process.argv.includes("--refine");
const restart = process.argv.includes("--restart");
const previousReport = refine ? JSON.parse(fs.readFileSync(path.join(reviewRoot, "comparison-report.json"), "utf8")) : null;
const previousRows = new Map(previousReport?.images.map((row) => [row.originalFilename, row]) ?? []);
sharp.concurrency(2);
sharp.cache({ memory: 64, files: 0, items: 32 });
if (fs.existsSync(outputRoot) && !refine) throw new Error("Experimental directory already exists; refusing to overwrite it.");
if (fs.existsSync(path.join(reviewRoot, "source-manifest.json")) && !refine && !restart) throw new Error("A prior experiment exists; refusing to overwrite it.");
fs.mkdirSync(outputRoot, { recursive: true });
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const hash = (value) => crypto.createHash("sha256").update(value).digest("hex");
const raster = /\.(webp|avif|png|jpe?g|gif|tiff?|bmp)$/i;
const files = walk(sourceRoot).filter((f) => raster.test(f)).sort();
const manifest = [];
for (const file of files) {
  const { width, height, pages, hasAlpha, orientation, space } = await sharp(file, { animated: true }).metadata();
  manifest.push({ filename: path.relative(sourceRoot, file).replaceAll("\\", "/"), width, height, pages: pages ?? 1, hasAlpha: Boolean(hasAlpha), orientation, space, bytes: fs.statSync(file).size, sha256: hash(fs.readFileSync(file)) });
}
if (refine || restart) {
  const initial = JSON.parse(fs.readFileSync(path.join(reviewRoot, "source-manifest.json"), "utf8"));
  if (JSON.stringify(initial.images) !== JSON.stringify(manifest)) throw new Error("Original source snapshot changed; stopping refinement.");
} else fs.writeFileSync(path.join(reviewRoot, "source-manifest.json"), JSON.stringify({ sourceRoot, images: manifest }, null, 2));
console.log(`Snapshot: ${manifest.length} source images; ${manifest.filter((m) => m.bytes > limit).length} need optimization.`);

async function pixels(input) {
  return sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true }).toColourspace("srgb").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

function similarity(reference, candidate) {
  const a = reference.data, b = candidate.data;
  if (reference.info.width !== candidate.info.width || reference.info.height !== candidate.info.height) return { ssim: 0, psnr: 0 };
  const { width, height } = reference.info;
  let squared = 0, blocks = 0, totalSSIM = 0;
  for (let y = 0; y < height; y += 8) for (let x = 0; x < width; x += 8) {
    let n = 0, sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
    for (let dy = y; dy < Math.min(y + 8, height); dy++) for (let dx = x; dx < Math.min(x + 8, width); dx++) {
      const i = (dy * width + dx) * 4;
      // Composite over neutral gray so transparency contributes to the metric.
      const aa = a[i + 3] / 255, ba = b[i + 3] / 255;
      let av = 0, bv = 0;
      for (let c = 0; c < 3; c++) {
        const ac = a[i + c] * aa + 128 * (1 - aa), bc = b[i + c] * ba + 128 * (1 - ba);
        squared += (ac - bc) ** 2;
        const w = c === 0 ? 0.2126 : c === 1 ? 0.7152 : 0.0722;
        av += ac * w; bv += bc * w;
      }
      n++; sx += av; sy += bv; sxx += av * av; syy += bv * bv; sxy += av * bv;
    }
    const mx = sx / n, my = sy / n;
    const vx = Math.max(0, sxx / n - mx * mx), vy = Math.max(0, syy / n - my * my), cov = sxy / n - mx * my;
    totalSSIM += ((2 * mx * my + 6.5025) * (2 * cov + 58.5225)) / ((mx * mx + my * my + 6.5025) * (vx + vy + 58.5225));
    blocks++;
  }
  const mse = squared / (width * height * 3);
  return { ssim: +(totalSSIM / blocks).toFixed(6), psnr: mse === 0 ? 100 : +(10 * Math.log10(65025 / mse)).toFixed(2) };
}

async function encode(file, format, quality, width) {
  let pipeline = sharp(file).rotate();
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  pipeline = pipeline.withIccProfile("srgb");
  return format === "webp"
    ? pipeline.webp({ quality, effort: 5, smartSubsample: true, alphaQuality: 100 }).toBuffer()
    : pipeline.avif({ quality, effort: 4, chromaSubsampling: "4:4:4" }).toBuffer();
}

async function candidate(file, format, width, reference) {
  let low = format === "webp" ? 92 : 84;
  let high = format === "webp" ? 100 : 95;
  let best;
  // A maximum-quality WebP often already qualifies; avoid redundant encodes.
  if (format === "webp") {
    const maximum = await encode(file, format, high, width);
    if (maximum.length <= limit) best = { buffer: maximum, quality: high };
    else high--;
  }
  if (!best) {
    let buffer = await encode(file, format, low, width);
    if (buffer.length > limit) return null;
    best = { buffer, quality: low };
    low++;
    while (low <= high) {
      const quality = Math.floor((low + high) / 2);
      buffer = await encode(file, format, quality, width);
      if (buffer.length <= limit) { best = { buffer, quality }; low = quality + 1; }
      else high = quality - 1;
    }
  }
  const metrics = similarity(reference, await pixels(best.buffer));
  if (metrics.ssim < minimumSSIM || metrics.psnr < minimumPSNR) return null;
  const metadata = await sharp(best.buffer).metadata();
  return { ...best, ...metrics, format, width: metadata.width, height: metadata.height, hasAlpha: Boolean(metadata.hasAlpha) };
}

const rows = [];
let changed = 0;
for (const original of manifest) {
  const source = path.join(sourceRoot, original.filename);
  const previous = previousRows.get(original.filename);
  if (refine && previous && previous.status !== "exception-original-preserved") {
    const existing = path.join(outputRoot, previous.optimizedFilename);
    if (hash(fs.readFileSync(existing)) !== previous.optimizedSha256) throw new Error(`Experimental output was edited: ${existing}`);
    rows.push(previous);
    continue;
  }
  let destination = original.filename;
  let selected = null;
  let concerns = "";
  let status = "copied-unchanged";
  if (original.bytes > limit && original.pages === 1 && (!original.orientation || original.orientation === 1)) {
    const reference = await pixels(source);
    const widths = [undefined, ...(original.width > 3200 ? [3200, 2560] : [])];
    for (const width of widths) {
      const choices = [];
      for (const format of ["webp", "avif"]) {
        try {
          const result = await candidate(source, format, width, reference);
          if (result && (!original.hasAlpha || result.hasAlpha)) choices.push(result);
          if (format === "webp" && result?.quality === 100 && choices.length) break;
        } catch (error) { console.log(`Candidate warning ${original.filename} (${format}): ${error.message}`); }
      }
      // Preserve native dimensions whenever an acceptable candidate exists.
      choices.sort((a, b) => b.ssim - a.ssim || b.psnr - a.psnr || a.buffer.length - b.buffer.length);
      if (choices.length) { selected = choices[0]; break; }
    }
    if (selected) {
      destination = original.filename.replace(/\.[^.]+$/, `.${selected.format}`);
      const resized = selected.width !== original.width || selected.height !== original.height;
      concerns = resized
        ? "Resized oversized source; inspect small text and fine detail at 100%. Automated similarity is measured at up to 1600 px width and cannot prove native-resolution equivalence."
        : "Re-encoded; inspect fine text, gradients, texture, and transparency before approval. Similarity metrics are a screening aid, not visual certification.";
      status = resized ? "optimized-resized" : "optimized-native";
    } else {
      status = "exception-original-preserved";
      concerns = "No candidate met both the byte cap and conservative quality thresholds within the permitted quality/dimension range. Original-quality copy retained above 1 MiB.";
    }
  } else if (original.bytes > limit) {
    status = "exception-original-preserved";
    concerns = "Animated or orientation-tagged source retained unchanged for manual review.";
  }
  const target = path.resolve(outputRoot, destination);
  if (!target.startsWith(outputRoot + path.sep)) throw new Error(`Unsafe target: ${target}`);
  const exists = fs.existsSync(target);
  if (exists && (!refine || !previous || destination !== previous.optimizedFilename || hash(fs.readFileSync(target)) !== previous.optimizedSha256)) throw new Error(`Unexpected existing output: ${target}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (selected) fs.writeFileSync(target, selected.buffer, { flag: exists ? "w" : "wx" });
  else if (!exists) fs.copyFileSync(source, target, fs.constants.COPYFILE_EXCL);
  if (refine && previous && previous.optimizedFilename !== destination) {
    const obsolete = path.resolve(outputRoot, previous.optimizedFilename);
    if (!obsolete.startsWith(outputRoot + path.sep) || hash(fs.readFileSync(obsolete)) !== previous.optimizedSha256) throw new Error("Unexpected obsolete experimental copy.");
    fs.unlinkSync(obsolete);
  }
  const optimizedBytes = fs.statSync(target).size;
  const row = {
    originalFilename: original.filename, originalWidth: original.width, originalHeight: original.height, originalBytes: original.bytes,
    optimizedFilename: destination, optimizedWidth: selected?.width ?? original.width, optimizedHeight: selected?.height ?? original.height,
    optimizedBytes, savedPercent: +(100 * (1 - optimizedBytes / original.bytes)).toFixed(2), status,
    format: selected?.format ?? path.extname(destination).slice(1), encoderQuality: selected?.quality ?? null,
    ssim: selected?.ssim ?? 1, psnr: selected?.psnr ?? 100,
    originalHasAlpha: original.hasAlpha, optimizedHasAlpha: selected?.hasAlpha ?? original.hasAlpha,
    originalSha256: original.sha256, optimizedSha256: hash(fs.readFileSync(target)), concerns,
  };
  rows.push(row);
  if (original.bytes > limit) console.log(`[${++changed}/77] ${original.filename}: ${original.bytes} -> ${optimizedBytes} bytes; ${status}${selected ? ` ${selected.format} q${selected.quality}, SSIM ${selected.ssim}` : ""}`);
}

// Integrity verification of original bytes, dimensions, and the raster-file inventory.
for (const original of manifest) {
  const file = path.join(sourceRoot, original.filename);
  if (hash(fs.readFileSync(file)) !== original.sha256) throw new Error(`Source changed: ${original.filename}`);
  const meta = await sharp(file, { animated: true }).metadata();
  if (meta.width !== original.width || meta.height !== original.height) throw new Error(`Source dimensions changed: ${original.filename}`);
}
if (walk(sourceRoot).filter((f) => raster.test(f)).length !== manifest.length) throw new Error("Source raster inventory changed during the run.");
const summary = {
  generatedAt: new Date().toISOString(), limitBytes: limit, imageCount: rows.length,
  originalBytes: rows.reduce((s, r) => s + r.originalBytes, 0), optimizedBytes: rows.reduce((s, r) => s + r.optimizedBytes, 0),
  copiedUnchanged: rows.filter((r) => r.status === "copied-unchanged").length,
  optimizedNative: rows.filter((r) => r.status === "optimized-native").length,
  optimizedResized: rows.filter((r) => r.status === "optimized-resized").length,
  exceptions: rows.filter((r) => r.optimizedBytes > limit).length,
  sourceIntegrity: "All source raster SHA-256 hashes, dimensions, and inventory unchanged.",
  metricMethod: "8x8 block luminance SSIM and RGB PSNR after sRGB conversion, gray compositing for alpha, maximum 1600 px comparison width. Acceptance: SSIM >= 0.99 and PSNR >= 38 dB. Native dimensions preferred; only sources wider than 3200 px are eligible for 3200/2560 px width candidates. No crops or aspect-ratio changes beyond integer pixel rounding.",
};
const exceptions = rows.filter((r) => r.optimizedBytes > limit);
fs.writeFileSync(path.join(reviewRoot, "comparison-report.json"), JSON.stringify({ summary, images: rows }, null, 2));
fs.writeFileSync(path.join(reviewRoot, "exceptions.json"), JSON.stringify(exceptions, null, 2));
const csv = (v) => '"' + String(v ?? "").replaceAll('"', '""') + '"';
const columns = Object.keys(rows[0]);
fs.writeFileSync(path.join(reviewRoot, "comparison-report.csv"), "\ufeff" + [columns.map(csv).join(","), ...rows.map((r) => columns.map((c) => csv(r[c])).join(","))].join("\r\n"));
const savings = (100 * (1 - summary.optimizedBytes / summary.originalBytes)).toFixed(2);
fs.writeFileSync(path.join(reviewRoot, "REPORT.md"), `# Experimental portfolio image optimization\n\nOriginal files and website references are unchanged. Nothing was committed or deployed.\n\n- Images: ${summary.imageCount}\n- Original total: ${summary.originalBytes.toLocaleString("en-US")} bytes\n- Experimental total: ${summary.optimizedBytes.toLocaleString("en-US")} bytes\n- Saved: ${savings}%\n- Already-small images copied byte-for-byte: ${summary.copiedUnchanged}\n- Optimized at native resolution: ${summary.optimizedNative}\n- Optimized with oversized-source resizing: ${summary.optimizedResized}\n- Exceptions above 1 MiB: ${summary.exceptions}\n- Source integrity: ${summary.sourceIntegrity}\n\n## Quality policy\n\n${summary.metricMethod}\n\nWebP quality floor 92, ceiling 100; AVIF floor 84, ceiling 95, 4:4:4 chroma. Each encoder uses a binary search for the highest tested quality within the byte limit. The acceptable candidate with the higher SSIM wins; PSNR and bytes break ties. Native resolution is preferred over resizing. Already-small WebP files are exact copies. Candidate failure retains the original bytes as an exception. Original color profiles are interpreted by Sharp and re-encoded outputs use sRGB with an embedded profile. Alpha is retained; no flattening or cropping occurs.\n\nAutomated metrics are screening tools. They do not guarantee invisible artifacts, perfect color appearance, or native-resolution text equivalence. Every re-encoded image is marked for visual review; resized images receive an extra warning. Approval is pending.\n\n## Review\n\nOpen [index.html](index.html) directly as a local file. It embeds report data, uses no server, and adds no website route. Browse changed images first, compare fitted views, and enable native-pixel inspection for fine detail. Original and optimized images are referenced with relative local paths.\n\nFull per-image data: [CSV](comparison-report.csv) and [JSON](comparison-report.json). Original-byte snapshot: [source manifest](source-manifest.json). Exception details: [exceptions.json](exceptions.json).\n\n## Exceptions\n\n${exceptions.length ? exceptions.map((r) => `- ${r.originalFilename}: ${r.optimizedBytes.toLocaleString("en-US")} bytes. ${r.concerns}`).join("\n") : "None under the automated screening criteria; visual approval is still required."}\n\n## Reversibility\n\nThe experiment adds only public/projects-optimized and image-optimization-review. No current website file, original image, project reference, or production configuration was changed. Do not deploy this output folder before approval. The whole experiment can be removed by removing those two new directories after review. No lint, build, tests, or type-checking were run.\n`);
const template = fs.readFileSync(path.join(reviewRoot, "comparison-template.html"), "utf8");
fs.writeFileSync(path.join(reviewRoot, "index.html"), template.replace("/*REPORT_DATA*/null", JSON.stringify({ summary, images: rows }).replaceAll("<", "\\u003c")));
console.log(JSON.stringify({ ...summary, savedPercent: +savings }, null, 2));
