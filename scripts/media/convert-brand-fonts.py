"""Lossless WOFF2 copies of existing OFL fonts; never subsets or overwrites sources.
Requires fonttools[woff] (fonttools + brotli). Run from the project root.
"""
from pathlib import Path
import json
import urllib.request
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import RecordingPen

root = Path.cwd()
families = [
    ("zillaslab", root / "public/projects/mena-law-reporters/fonts", "ZillaSlab-*.ttf"),
    ("cairo", root / "public/projects/mena-law-reporters/fonts", "Cairo*.ttf"),
    ("faustina", root / "public/projects/pillars-pr/fonts", "Faustina*.ttf"),
    ("notonaskharabic", root / "public/projects/pillars-pr/fonts", "NotoNaskhArabic*.ttf"),
    ("poppins", root / "src/fonts/renovofix", "Poppins-*.ttf"),
]
rows = []
for family, directory, pattern in families:
    license_url = f"https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt"
    license_text = urllib.request.urlopen(license_url, timeout=30).read().decode("utf-8")
    if "SIL OPEN FONT LICENSE" not in license_text:
        raise RuntimeError(f"Unverified license for {family}")
    (directory / f"OFL-{family}.txt").write_text(license_text, encoding="utf-8")
    for source in sorted(directory.glob(pattern)):
        target = source.with_suffix(".woff2")
        original = TTFont(source, recalcTimestamp=False)
        license_metadata = original["name"].getDebugName(13) or ""
        verified_zilla_light = (family == "zillaslab" and original["name"].getDebugName(0) == "Copyright 2017, The Mozilla Foundation" and "Zilla Slab" in original["name"].getDebugName(1))
        if not verified_zilla_light and not any(word in license_metadata.lower() for word in ["open font", "openfont", "ofl"]):
            raise RuntimeError(f"Font's embedded license requires review: {source}: {license_metadata}")
        if not target.exists():
            original.flavor = "woff2"
            original.save(target)
        decoded = TTFont(target, recalcTimestamp=False)
        # Keep every glyph, advance/sidebearing, character mapping, shaping rule,
        # hint program, variation axis, naming and font metrics intact.
        assert original.getGlyphOrder() == decoded.getGlyphOrder()
        assert original["hmtx"].metrics == decoded["hmtx"].metrics
        assert original.getBestCmap() == decoded.getBestCmap()
        for tag in ["GSUB", "GPOS", "GDEF", "fvar", "avar", "gvar", "HVAR", "MVAR", "OS/2", "hhea", "name", "cvt ", "fpgm", "prep"]:
            if tag in original:
                assert original.getTableData(tag) == decoded.getTableData(tag), (source.name, tag)
        original_glyphs, decoded_glyphs = original.getGlyphSet(), decoded.getGlyphSet()
        for glyph in original.getGlyphOrder():
            before, after = RecordingPen(), RecordingPen()
            original_glyphs[glyph].draw(before)
            decoded_glyphs[glyph].draw(after)
            assert before.value == after.value, (source.name, glyph)
        rows.append({"original": str(source.relative_to(root)), "optimized": str(target.relative_to(root)), "originalBytes": source.stat().st_size, "optimizedBytes": target.stat().st_size, "license": license_url, "glyphs": len(original.getGlyphOrder()), "verified": True})
report = root / "reports/performance-fixes-2026-10-24/font-conversion.json"
report.write_text(json.dumps(rows, indent=2), encoding="utf-8")
print(json.dumps({"files": len(rows), "before": sum(r["originalBytes"] for r in rows), "after": sum(r["optimizedBytes"] for r in rows)}))
