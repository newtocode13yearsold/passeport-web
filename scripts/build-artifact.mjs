// Builds the claude.ai artifact copy of Passeport Web into an output folder.
//   node scripts/build-artifact.mjs <out-dir>
// The artifact host wraps the page in its own <!doctype><html><head><body>, sets its own
// security policy, and serves fonts best as data: URIs. So this script:
//   - keeps only the <title>, description, styles and scripts from <head>, plus the body content;
//   - drops the charset/viewport/CSP/favicon tags the host provides itself;
//   - inlines the woff2 fonts into css/fonts.css;
//   - copies css/style.css and every js/ file unchanged.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = process.argv[2];
if (!out) { console.error('Usage: node scripts/build-artifact.mjs <out-dir>'); process.exit(1); }

const html = readFileSync(join(root, 'index.html'), 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
const pick = (re) => (head.match(re) || [''])[0];

const page = [
  pick(/<title>[^<]*<\/title>/),
  '<meta name="claude:viewport-fit-sides" content="cover">',
  pick(/<meta name="description"[^>]*>/),
  '<link rel="stylesheet" href="css/fonts.css">',
  '<link rel="stylesheet" href="css/style.css">',
  '<script src="js/theme.js"></script>',
  body.trim(),
  ''
].join('\n');

mkdirSync(join(out, 'css'), { recursive: true });
writeFileSync(join(out, 'index.html'), page);

const fontsCss = readFileSync(join(root, 'css/fonts.css'), 'utf8').replace(/url\(\.\.\/fonts\/([^)]+\.woff2)\)/g, (_, f) =>
  'url(data:font/woff2;base64,' + readFileSync(join(root, 'fonts', f)).toString('base64') + ')');
writeFileSync(join(out, 'css/fonts.css'), fontsCss);
copyFileSync(join(root, 'css/style.css'), join(out, 'css/style.css'));

const files = ['css/fonts.css', 'css/style.css'];
(function copyDir(dir) {
  for (const name of readdirSync(join(root, dir))) {
    const rel = dir + '/' + name;
    if (statSync(join(root, rel)).isDirectory()) { copyDir(rel); continue; }
    if (!name.endsWith('.js')) continue;
    mkdirSync(join(out, dir), { recursive: true });
    copyFileSync(join(root, rel), join(out, rel));
    files.push(rel);
  }
})('js');

writeFileSync(join(out, 'files.json'), JSON.stringify(files, null, 2) + '\n');
console.log('Built', relative(process.cwd(), out) || out, '-', files.length + 1, 'files');
