#!/usr/bin/env node
/**
 * i18n hardcoded-Chinese scanner.
 *
 * Walks src/pages and src/components, reports any non-comment, non-import
 * lines that contain CJK ideographs and are NOT already inside t('...').
 *
 * Usage:
 *   node scripts/check-i18n.mjs           # warn-level (always exit 0)
 *   node scripts/check-i18n.mjs --strict  # exit 1 if any hits found
 *
 * Files matching IGNORE_GLOBS (admin, scanners, log/visitor utilities,
 * raw i18n dictionary files) are skipped — those are operator-only or
 * the dictionary itself.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src/pages", "src/components"];
const STRICT = process.argv.includes("--strict");

const IGNORE_PATH_PARTS = [
  "/admin/",
  "/AIAssistant/", // tracked separately in next migration batch
  "ImageAltScanner",
  "VisitorTracker",
  "VisitorProfile",
  "EnhancedVisitorProfile",
  "RichSEOContent", // sr-only SEO catalog, English fallback for non-zh handled in component
];

const CJK = /[\u4e00-\u9fff]/;
// Match: a Chinese run that lives inside a t('...') call on the same line.
const T_CALL_WITH_CN = /\bt\(\s*['"`][^'"`]*[\u4e00-\u9fff][^'"`]*['"`]/g;
// Properties intentionally holding Chinese strings (gated by language===zh at render time).
const ZH_PROPERTY_LINE = /^\s*\w*[Zz]h\s*:/;

function shouldSkip(file) {
  return IGNORE_PATH_PARTS.some((part) => file.includes(part));
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      yield* walk(full);
    } else if (/\.(tsx?|jsx?)$/.test(entry)) {
      yield full;
    }
  }
}

function stripCommentsAndTCalls(line) {
  // Strip // line comments and /* ... */ inline comments first,
  // then strip any t('中文…') calls so default-value fallbacks
  // and Chinese keys inside t() don't get flagged.
  return line
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/, "")
    .replace(T_CALL_WITH_CN, "t(/*scanned*/");
}

let hits = 0;
const perFile = new Map();

for (const dir of SCAN_DIRS) {
  const abs = join(ROOT, dir);
  try {
    statSync(abs);
  } catch {
    continue;
  }
  for (const file of walk(abs)) {
    const rel = relative(ROOT, file).split(sep).join("/");
    if (shouldSkip(rel)) continue;

    const src = readFileSync(file, "utf8");
    const lines = src.split("\n");
    let inBlockComment = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Track multi-line /* ... */ comments
      if (inBlockComment) {
        const end = line.indexOf("*/");
        if (end === -1) continue;
        line = line.slice(end + 2);
        inBlockComment = false;
      }
      const openIdx = line.indexOf("/*");
      if (openIdx !== -1 && line.indexOf("*/", openIdx) === -1) {
        line = line.slice(0, openIdx);
        inBlockComment = true;
      }

      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) continue;
      if (trimmed.startsWith("import ") || trimmed.startsWith("export ")) {
        // imports rarely carry Chinese, but skip the leading specifier portion
      }

      const cleaned = stripCommentsAndTCalls(line);
      if (!CJK.test(cleaned)) continue;

      const snippet = trimmed.length > 120 ? trimmed.slice(0, 117) + "..." : trimmed;
      hits++;
      if (!perFile.has(rel)) perFile.set(rel, []);
      perFile.get(rel).push({ line: i + 1, snippet });
    }
  }
}

if (hits === 0) {
  console.log("✓ check-i18n: no hardcoded Chinese found in scanned paths.");
  process.exit(0);
}

const sorted = [...perFile.entries()].sort((a, b) => b[1].length - a[1].length);
console.log(`\n⚠ check-i18n: found ${hits} hardcoded Chinese occurrence(s) across ${sorted.length} file(s):\n`);
for (const [file, rows] of sorted) {
  console.log(`  ${file}  (${rows.length})`);
  for (const r of rows.slice(0, 8)) {
    console.log(`    ${file}:${r.line}  ${r.snippet}`);
  }
  if (rows.length > 8) {
    console.log(`    … and ${rows.length - 8} more`);
  }
}
console.log(
  `\nMigrate these strings to t() and add the keys to src/i18n/zh.ts and en.ts.` +
    (STRICT ? "" : "  (warning only — pass --strict to fail the build)"),
);

process.exit(STRICT ? 1 : 0);
