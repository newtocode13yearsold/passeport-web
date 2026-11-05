// Makes an unlock code for a premium manual, to email to a buyer once their transfer has arrived.
//   node scripts/make-code.mjs SEO        (one manual: SEO, VENTE, SECU, MAIL, RGPD, LANCE)
//   node scripts/make-code.mjs PACK       (all premium manuals)
//   node scripts/make-code.mjs PACK 3     (three codes)
//   node scripts/make-code.mjs check SEO-K7Q2M-X9HTD   (test a code)
// It runs js/data/shop.js unchanged, so codes always match what the site accepts.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { window: {}, crypto: globalThis.crypto, Math, Uint8Array };
vm.runInNewContext(readFileSync(join(root, 'js/data/shop.js'), 'utf8'), sandbox);
const shop = sandbox.window.PW.shop;
const items = Object.keys(shop.items);

const [a, b] = process.argv.slice(2);
if (a === 'check') {
  const k = shop.verify(b);
  console.log(k ? `Valid code for ${k}` : 'Invalid code');
  process.exit(k ? 0 : 1);
}
const item = String(a || '').toUpperCase();
if (!items.includes(item)) {
  console.error(`Usage: node scripts/make-code.mjs <${items.join('|')}> [count]`);
  process.exit(1);
}
const n = Math.max(1, Math.min(50, parseInt(b, 10) || 1));
for (let i = 0; i < n; i++) console.log(shop.makeCode(item));
