/* Premium manuals: what is unlocked on this device, and the buy box (bank transfer + unlock code).
 * Prices, bank details and code checks live in js/data/shop.js. */
(function () {
  var PW = window.PW, esc = PW.esc, shop = PW.shop;
  var KEY = 'pw-unlocked';

  function owned() { var v = PW.store.get(KEY, []); return Array.isArray(v) ? v : []; }
  var premium = PW.premium = {
    list: function () { return PW.guides.filter(function (g) { return g.premium; }); },
    isUnlocked: function (g) {
      if (!g.premium) return true;
      var o = owned();
      return o.indexOf('PACK') !== -1 || o.indexOf(g.code) !== -1;
    },
    unlock: function (item) {
      var o = owned();
      if (o.indexOf(item) === -1) { o.push(item); PW.store.set(KEY, o); }
    }
  };

  function price(n) { return PW.fr(String(n).replace('.', ',') + ' ' + shop.currency); }
  function iban(s) { return String(s).replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim(); }
  function reference(item) {
    var k = 'pw-ref-' + item, r = PW.store.get(k, '');
    if (!r) { r = 'PW-' + item + '-' + shop.randomPart(4); PW.store.set(k, r); }
    return r;
  }

  /** Buy box shown under the free steps of a locked manual. */
  premium.box = function (g) {
    var rest = g.steps.slice(g.free || 2), n = premium.list().length;
    var full = n * shop.prices.guide;
    return '<section class="paywall" id="paywall" aria-labelledby="pwT">' +
      '<div class="pw-head">' + PW.icon('lock') + '<div><h2 id="pwT">La suite du manuel est premium</h2>' +
        '<p class="muted">' + PW.fr('Encore ' + rest.length + ' étapes détaillées, avec les valeurs exactes, des exemples à copier et les sources officielles :') + '</p></div></div>' +
      '<ol class="pw-locked" start="' + ((g.free || 2) + 1) + '">' + rest.map(function (s) { return '<li>' + esc(s.t) + '</li>'; }).join('') + '</ol>' +
      '<div class="pw-offers" role="group" aria-label="Choisir une offre">' +
        '<button type="button" class="offer" data-item="' + g.code + '" aria-pressed="false"><span class="o-t">Ce manuel</span><span class="o-p">' + price(shop.prices.guide) + '</span><span class="o-d">' + esc(g.t) + '</span></button>' +
        '<button type="button" class="offer best" data-item="PACK" aria-pressed="false"><span class="o-badge">Le plus avantageux</span><span class="o-t">Les ' + n + ' manuels premium</span><span class="o-p">' + price(shop.prices.pack) + '</span><span class="o-d">' + PW.fr('au lieu de ' + price(full) + ' : ') + premium.list().map(function (x) { return esc(x.t); }).join(', ') + '</span></button>' +
      '</div>' +
      '<div class="pw-pay" id="pwPay" hidden></div>' +
      '<form class="pw-code" id="pwCode" novalidate>' +
        '<label for="pwCodeIn">Vous avez reçu votre code ?</label>' +
        '<div class="pw-code-row"><input id="pwCodeIn" type="text" autocomplete="off" spellcheck="false" placeholder="ex. SEO-K7Q2M-X9HTD" aria-describedby="pwErr"><button class="btn" type="submit">Débloquer</button></div>' +
        '<p class="pw-err" id="pwErr" role="alert"></p>' +
        '<p class="small muted">' + PW.fr('Le code débloque le manuel sur cet appareil. Gardez l’email qui le contient : il marche aussi sur vos autres appareils.') + '</p>' +
      '</form></section>';
  };

  function payHtml(item, g) {
    var isPack = item === 'PACK', amount = price(isPack ? shop.prices.pack : shop.prices.guide), ref = reference(item);
    var what = isPack ? 'les ' + premium.list().length + ' manuels premium' : 'le manuel « ' + g.t + ' »';
    if (!shop.isOpen()) {
      return '<p class="note warn">' + PW.fr('<strong>Le paiement par virement ouvre bientôt.</strong> Les coordonnées bancaires ne sont pas encore en ligne : revenez dans quelques jours.') + '</p>';
    }
    var row = function (label, value, copy) {
      return '<div><dt>' + esc(label) + '</dt><dd><span class="pw-v">' + esc(value) + '</span>' +
        (copy ? '<button type="button" class="btn small ghost" data-copy-v="' + esc(copy) + '" data-label="' + esc(label) + '">Copier</button>' : '') + '</dd></div>';
    };
    var mail = 'mailto:' + shop.contact + '?subject=' + encodeURIComponent('Passeport Web — ' + ref) +
      '&body=' + encodeURIComponent('Bonjour,\n\nJe viens de faire un virement de ' + amount.replace(/ /g, ' ') + ' pour ' + what + '.\nRéférence : ' + ref + '\nNom du titulaire du compte qui a payé : \n\nMerci de m’envoyer mon code à cette adresse.\n');
    return '<h3>' + PW.fr('Payer ' + what + ' par virement') + '</h3>' +
      '<ol class="pw-steps">' +
        '<li>' + PW.fr('Faites un virement de <strong>' + amount + '</strong> depuis votre banque, avec la <strong>référence</strong> ci-dessous dans le libellé.') + '</li>' +
        '<li>' + PW.fr('Envoyez cette référence par email à <a href="' + esc(mail) + '">' + esc(shop.contact) + '</a>, avec le nom du compte qui a payé.') + '</li>' +
        '<li>' + PW.fr('Dès que le virement arrive (quelques secondes pour un virement instantané, 1 à 3 jours ouvrés sinon), vous recevez votre code par email. Saisissez-le plus bas.') + '</li>' +
      '</ol>' +
      '<dl class="pw-rib">' +
        row('Bénéficiaire', shop.holder) +
        row('IBAN', iban(shop.iban), shop.iban.replace(/\s+/g, '')) +
        (shop.bic ? row('BIC', shop.bic, shop.bic) : '') +
        (shop.bank ? row('Banque', shop.bank) : '') +
        row('Montant', amount, String(isPack ? shop.prices.pack : shop.prices.guide)) +
        row('Référence', ref, ref) +
      '</dl>';
  }

  /** Wire the buy box; onUnlock() re-renders the manual. */
  premium.wire = function (root, g, onUnlock) {
    var box = PW.$('#paywall', root); if (!box) return;
    var pay = PW.$('#pwPay', box);
    box.addEventListener('click', function (e) {
      var offer = e.target.closest('.offer');
      if (offer) {
        PW.$$('.offer', box).forEach(function (o) { o.setAttribute('aria-pressed', o === offer ? 'true' : 'false'); });
        pay.innerHTML = payHtml(offer.getAttribute('data-item'), g);
        pay.hidden = false;
        return;
      }
      var cp = e.target.closest('[data-copy-v]');
      if (cp) PW.copy(cp.getAttribute('data-copy-v'), cp.getAttribute('data-label'));
    });
    var form = PW.$('#pwCode', box), input = PW.$('#pwCodeIn', box), err = PW.$('#pwErr', box);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var item = shop.verify(input.value);
      if (!item) {
        err.textContent = input.value.trim() ? 'Ce code n’est pas valide. Vérifiez qu’il est recopié en entier, tirets compris.' : 'Saisissez le code reçu par email.';
        input.setAttribute('aria-invalid', 'true'); input.focus();
        return;
      }
      if (item !== 'PACK' && item !== g.code) {
        premium.unlock(item);
        var other = PW.guides.filter(function (x) { return x.code === item; })[0];
        err.textContent = PW.fr('Ce code débloque un autre manuel : « ' + (other ? other.t : item) + ' ». Il est maintenant disponible.');
        return;
      }
      premium.unlock(item);
      PW.toast(item === 'PACK' ? 'Les manuels premium sont débloqués' : 'Manuel débloqué');
      onUnlock();
    });
    input.addEventListener('input', function () { err.textContent = ''; input.removeAttribute('aria-invalid'); });
  };
})();
