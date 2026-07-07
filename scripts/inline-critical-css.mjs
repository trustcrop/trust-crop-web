/**
 * Post-build: make render-blocking CSS non-blocking in the static export.
 *
 * Next.js App Router emits duplicate <link rel="stylesheet" data-precedence="next">
 * tags (one from the HTML shell, one from the RSC payload).
 * We:
 *   1. Inline SMALL CSS chunks (<40 KB) as <style> tags — zero network request.
 *   2. Convert LARGE CSS chunks to preload+swap — browser paints before CSS downloads.
 *   3. Deduplicate: only emit each inlined <style> / preload once.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const OUT = new URL('../out', import.meta.url).pathname;
const INLINE_LIMIT = 40_000; // bytes

function allHtmlFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) out.push(...allHtmlFiles(full));
    else if (e.endsWith('.html')) out.push(full);
  }
  return out;
}

function readCss(href) {
  try {
    return readFileSync(join(OUT, href.replace(/^\//, '')), 'utf8');
  } catch { return null; }
}

for (const file of allHtmlFiles(OUT)) {
  let html = readFileSync(file, 'utf8');
  const seen = new Set();

  html = html.replace(
    /<link\s[^>]*rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*\/?>/g,
    (match, href) => {
      if (seen.has(href)) return ''; // deduplicate
      seen.add(href);

      const css = readCss(href);
      if (!css) return match;

      if (css.length <= INLINE_LIMIT) {
        return `<style data-href="${href}">${css}</style>`;
      }

      // Non-blocking preload swap (strip any trailing slash before onload)
      const preload = match
        .replace(/rel="stylesheet"/, 'rel="preload" as="style"')
        .replace(/\/?>$/, ` onload="this.onload=null;this.rel='stylesheet'">`);
      const noscript = `<noscript><link rel="stylesheet" href="${href}"></noscript>`;
      return preload + noscript;
    },
  );

  writeFileSync(file, html, 'utf8');
  console.log('✓', file.replace(OUT, ''));
}

console.log('Render-blocking CSS elimination complete.');
