// Measure actual local HTTP image responses, not page-speed or production CWV.
const origin = "http://localhost:3000";
const samples = [
  ["Reference booklet", "/projects/print/reference/reference-medical-training-booklet-standing-cover.webp", [384, 1280]],
  ["Dolato cover", "/projects/dolato-warm-winter-marvels/cover/dolato-warm-winter-marvels-hero.webp", [1280]],
  ["RTA invitation", "/projects/3d-exhibition/rta/supporting/rta-eid-al-etihad-digital-invitation-mockup.webp", [1280]],
];
async function measure(url) {
  const start = performance.now();
  const response = await fetch(origin + url, { headers: { Accept: "image/webp" }, signal: AbortSignal.timeout(60000) });
  const ttfbMs = Math.round(performance.now() - start);
  const bytes = (await response.arrayBuffer()).byteLength;
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`Unexpected image response: ${response.status} ${url}`);
  return { bytes, ttfbMs, totalMs: Math.round(performance.now() - start), cache: response.headers.get("x-nextjs-cache"), cacheControl: response.headers.get("cache-control") };
}
for (const [label, src, widths] of samples) {
  const original = await measure(src);
  for (const width of widths) {
    const url = `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=100`;
    const first = await measure(url);
    const repeat = await measure(url);
    console.log(JSON.stringify({ label, width, quality: 100, original, first, repeat, byteReductionPercent: +(100 * (1 - first.bytes / original.bytes)).toFixed(1) }));
  }
}
