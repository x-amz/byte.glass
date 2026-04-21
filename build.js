#!/usr/bin/env node
// Build static site from src/ (markdown + layout) and static/ (pass-through).
// Outputs to dist/. Zero config: first H1 becomes the page title, first paragraph
// becomes the description. Markdown files become clean-URL directories
// (foo.md -> foo/index.html), except index.md which stays as index.html.

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname, relative, extname, basename } from 'node:path';
import { marked } from 'marked';

const SRC = 'src';
const STATIC = 'static';
const DIST = 'dist';
const LAYOUT = join(SRC, '_layout.html');

marked.setOptions({ gfm: true, breaks: false });

// Markdown images render as click-to-expand screenshot thumbnails (the alt
// text is exposed to assistive tech but not shown as a caption). Raw <img>
// tags in the markdown (used for app icons, badges) render as-is.
marked.use({
  renderer: {
    image({ href, title, text }) {
      const alt = text ?? '';
      const safe = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
      return `<figure class="screenshot">` +
        `<a href="${safe(href)}" class="screenshot-trigger" aria-label="${safe(alt) || 'Expand screenshot'}">` +
        `<img src="${safe(href)}" alt="${safe(alt)}" loading="lazy">` +
        `</a>` +
        `</figure>`;
    },
  },
});

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function stripMarkdown(s) {
  return s
    .replace(/^>\s*/gm, '')                  // blockquote markers
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function extractMeta(md) {
  const h1 = md.match(/^#\s+(.+)$/m);
  const title = h1 ? stripMarkdown(h1[1]) : 'byte.glass';
  // First prose-or-blockquote block after the H1 — skip images, raw HTML, headings.
  const after = h1 ? md.slice(md.indexOf(h1[0]) + h1[0].length) : md;
  const paras = after.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  let description = '';
  for (const p of paras) {
    if (p.startsWith('!') || p.startsWith('<') || p.startsWith('#')) continue;
    description = stripMarkdown(p).replace(/\s+/g, ' ');
    if (description) break;
  }
  if (description.length > 180) description = description.slice(0, 177).trimEnd() + '…';
  return { title, description };
}

function htmlEscape(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderPage(layout, { title, description, body }) {
  return layout
    .replaceAll('{{title}}', htmlEscape(title))
    .replaceAll('{{description}}', htmlEscape(description))
    .replace('{{body}}', body); // body is trusted HTML from marked
}

function outPathFor(srcRelPath) {
  // src/index.md          -> dist/index.html
  // src/blob/index.md     -> dist/blob/index.html
  // src/blob/privacy.md   -> dist/blob/privacy/index.html  (clean URL)
  const noExt = srcRelPath.replace(/\.md$/, '');
  if (basename(noExt) === 'index') return join(DIST, `${noExt}.html`);
  return join(DIST, noExt, 'index.html');
}

function main() {
  if (!existsSync(LAYOUT)) throw new Error(`Missing layout at ${LAYOUT}`);
  const layout = readFileSync(LAYOUT, 'utf8');

  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  // Copy static/ verbatim.
  if (existsSync(STATIC)) cpSync(STATIC, DIST, { recursive: true });

  // Render markdown pages.
  const pages = [];
  for (const file of walk(SRC)) {
    if (file === LAYOUT) continue;
    const rel = relative(SRC, file);
    if (extname(file) !== '.md') {
      const dest = join(DIST, rel);
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(file, dest);
      continue;
    }
    const md = readFileSync(file, 'utf8');
    const { title, description } = extractMeta(md);
    // <figure> is block-level — strip the <p> wrappers marked adds around images.
    const body = marked.parse(md).replace(
      /<p>\s*(<figure\b[\s\S]*?<\/figure>)\s*<\/p>/g,
      '$1',
    );
    const dest = outPathFor(rel);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, renderPage(layout, { title, description, body }));
    pages.push({ src: rel, dest: relative(DIST, dest), title });
  }

  for (const p of pages) console.log(`  ${p.src.padEnd(28)} → ${p.dest}   (${p.title})`);
  console.log(`\nbuilt ${pages.length} page${pages.length === 1 ? '' : 's'} to ${DIST}/`);
}

main();
