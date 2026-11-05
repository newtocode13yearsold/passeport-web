/* Premium manuals: prices, bank details for the transfer (RIB) and unlock codes.
 *
 * TO FILL IN BEFORE SELLING: holder, iban, bic, bank and contact below.
 * While iban or contact is empty, the buy box says payment is not open yet.
 *
 * How a sale works:
 *   1. The buyer picks a manual (or the pack) and sees your RIB, the amount and a transfer reference.
 *   2. They make the transfer and email you the reference.
 *   3. When the money arrives, you run:  node scripts/make-code.mjs <ITEM>   (SEO, VENTE, SECU, MAIL, RGPD, LANCE or PACK)
 *      and email them the code it prints.
 *   4. They type the code on the manual page: it unlocks on their device (kept in their browser).
 *
 * Limit: the site has no server, so the check runs in the browser. Someone who reads the
 * site's JavaScript can find the manual text or make codes. Fine for small sales; for
 * stronger protection the premium text would have to live on a server.
 *
 * This file has no DOM code: scripts/make-code.mjs loads it as is. */
(function () {
  var PW = window.PW = window.PW || {};

  var shop = PW.shop = {
    holder: 'Yvon LEGROS (EI)',          // Titulaire du compte, ex. « Thomas Dupont »
    iban: 'FR76 1741 8000 0100 0121 4327 323',            // ex. « FR76 3000 6000 0112 3456 7890 189 »
    bic: 'SNNNFR22XXX',             // ex. « AGRIFRPPXXX »
    bank: 'Shine',            // Nom de la banque (facultatif)
    contact: 'thomaslegros71@gmail.com',         // Email où l’acheteur envoie sa référence de virement
    currency: '€',
    prices: { guide: 3, pack: 12 },
    // Short code per premium manual (the guide's "code" field in guides.js) + the pack.
    items: { SEO: 'referencement', VENTE: 'vendre', SECU: 'securite', MAIL: 'email-pro', RGPD: 'rgpd-pratique', LANCE: 'lancement', PACK: '*' },
    salt: 'XUSJB25CE7KSAQCF'
  };

  var ABC = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // no 0/O, 1/I: easy to read in an email

  // cyrb53: small, fast string hash (not cryptographic, see the limit above).
  function hash(str) {
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (var i = 0; i < str.length; i++) {
      var ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }
  function check(item, rand) {
    var n = hash(shop.salt + '|' + item + '|' + rand), s = '';
    for (var i = 0; i < 5; i++) { s += ABC[n % 32]; n = Math.floor(n / 32); }
    return s;
  }
  shop.randomPart = function (len) {
    var out = '', bytes = new Uint8Array(len);
    var c = (typeof crypto !== 'undefined' && crypto.getRandomValues) ? crypto : null;
    if (c) c.getRandomValues(bytes); else for (var i = 0; i < len; i++) bytes[i] = Math.floor(Math.random() * 256);
    for (var j = 0; j < len; j++) out += ABC[bytes[j] % 32];
    return out;
  };

  /** New unlock code for an item, e.g. "SEO-K7Q2M-X9HTD". */
  shop.makeCode = function (item) {
    if (!shop.items[item]) throw new Error('Unknown item ' + item);
    var rand = shop.randomPart(5);
    return item + '-' + rand + '-' + check(item, rand);
  };

  /** "seo k7q2m x9htd" -> "SEO" when valid, else null. */
  shop.verify = function (input) {
    var s = String(input || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    var keys = Object.keys(shop.items).sort(function (a, b) { return b.length - a.length; });
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (s.indexOf(k) !== 0 || s.length !== k.length + 10) continue;
      var rand = s.slice(k.length, k.length + 5), sum = s.slice(k.length + 5);
      if (check(k, rand) === sum) return k;
    }
    return null;
  };

  shop.isOpen = function () { return !!(shop.iban && shop.contact); };
})();
