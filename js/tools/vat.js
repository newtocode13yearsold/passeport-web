/* Tool: VAT / GST / sales-tax threshold checker. Thresholds checked in
 * November 2026 — each result links to the official page to re-check. */
(function () {
  var PW = window.PW, esc = PW.esc;

  function money(n, cur) {
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ' + cur;
  }

  // check(d) returns { yes: must register/charge, big, text, mention? }
  var V = {
    fr: { n: 'France', cur: '€', eu: true, src: 'https://www.impots.gouv.fr/professionnel', check: function (d) {
      var lim = d.kind === 'goods' ? 85000 : 37500;
      if (d.kind === 'both') lim = 85000;
      var yes = d.amount > lim || (d.kind === 'both' && d.services > 37500);
      return { yes: yes, text: yes ? 'Au-delà de ' + money(lim, '€') + ' (' + (d.kind === 'goods' ? 'ventes' : 'services') + '), vous devez facturer la TVA (20 % au taux normal) et déclarer.' : 'Vous restez en franchise en base : pas de TVA sur vos factures, tant que vous restez sous ' + money(d.kind === 'goods' ? 85000 : 37500, '€') + '.', mention: yes ? '' : 'TVA non applicable, art. 293 B du CGI' };
    } },
    be: { n: 'Belgique', cur: '€', eu: true, src: 'https://finances.belgium.be/fr/entreprises/tva', check: function (d) {
      var yes = d.amount > 25000;
      return { yes: yes, text: yes ? 'Au-delà de 25 000 €, vous devez facturer la TVA (21 % au taux normal).' : 'Vous pouvez opter pour la franchise des petites entreprises (25 000 € par an).', mention: yes ? '' : 'Régime particulier de franchise des petites entreprises' };
    } },
    de: { n: 'Allemagne', cur: '€', eu: true, prev: true, src: 'https://www.bzst.de/', check: function (d) {
      var yes = d.prev > 25000 || d.amount > 100000;
      return { yes: yes, text: yes ? 'Kleinunternehmer impossible : chiffre d’affaires de l’an dernier au-dessus de 25 000 € ou de cette année au-dessus de 100 000 €. TVA à 19 % (7 % au taux réduit).' : 'Vous pouvez être Kleinunternehmer (§ 19 UStG) : pas de TVA sur vos factures.', mention: yes ? '' : 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.' };
    } },
    es: { n: 'Espagne', cur: '€', eu: true, src: 'https://sede.agenciatributaria.gob.es/', check: function () {
      return { yes: true, text: 'L’Espagne n’a pas de franchise générale de TVA : l’IVA (21 % au taux normal) s’applique dès la première facture. Aux Canaries, c’est l’IGIC.' };
    } },
    it: { n: 'Italie', cur: '€', eu: true, src: 'https://www.agenziaentrate.gov.it/', check: function (d) {
      var yes = d.amount > 85000;
      return { yes: yes, text: yes ? 'Au-delà de 85 000 €, le regime forfettario n’est plus possible : IVA à 22 %. Au-delà de 100 000 € en cours d’année, la sortie est immédiate.' : 'Le regime forfettario (si vous y avez droit) vous dispense de facturer l’IVA. Une Partita IVA reste obligatoire.', mention: yes ? '' : 'Operazione senza applicazione dell’IVA ai sensi dell’art. 1, commi 54-89, Legge n. 190/2014' };
    } },
    ch: { n: 'Suisse', cur: 'CHF', src: 'https://www.estv.admin.ch/', check: function (d) {
      var yes = d.amount >= 100000;
      return { yes: yes, text: yes ? 'Dès 100 000 CHF de chiffre d’affaires mondial, l’inscription à la TVA est obligatoire (8,1 % au taux normal).' : 'Pas d’inscription obligatoire sous 100 000 CHF de chiffre d’affaires mondial (inscription volontaire possible).' };
    } },
    uk: { n: 'Royaume-Uni', cur: '£', src: 'https://www.gov.uk/vat-registration', check: function (d) {
      var yes = d.amount > 90000;
      return { yes: yes, text: yes ? 'Au-delà de 90 000 £ sur 12 mois glissants, l’inscription à la TVA est obligatoire (20 % au taux normal).' : 'Pas d’inscription obligatoire sous 90 000 £ sur 12 mois glissants. Surveillez le total chaque mois.' };
    } },
    us: { n: 'États-Unis', cur: '$', src: 'https://www.sba.gov/counseling/manage-your-business/#pay-taxes', check: function (d) {
      var yes = d.amount >= 100000;
      return { yes: yes, text: 'Pas de TVA fédérale. Si vous vendez des biens taxables, inscrivez-vous à la sales tax de votre propre État. ' + (yes ? 'Avec 100 000 $ ou plus vendus dans un autre État, vous y avez probablement un « economic nexus » : vérifiez le seuil de cet État et inscrivez-vous.' : 'Sous 100 000 $ de ventes dans un autre État, vous êtes en général sous le seuil d’« economic nexus » (certains États ont d’autres seuils).') };
    } },
    ca: { n: 'Canada', cur: '$ CA', src: 'https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/tps-tvh-entreprises.html', check: function (d) {
      var yes = d.amount > 30000;
      return { yes: yes, text: yes ? 'Au-delà de 30 000 $ sur quatre trimestres consécutifs, l’inscription à la TPS/TVH est obligatoire (et à la TVQ au Québec).' : 'Vous êtes « petit fournisseur » : inscription facultative tant que vous restez sous 30 000 $ sur quatre trimestres.' };
    } },
    in: { n: 'Inde', cur: '₹', src: 'https://www.gst.gov.in/', check: function (d) {
      if (d.kind !== 'services' && d.inter) return { yes: true, text: 'Vente de biens d’un État à un autre : l’inscription à la GST est en général obligatoire quel que soit le montant.' };
      var lim = d.kind === 'services' ? 2000000 : 4000000;
      var yes = d.amount > lim;
      return { yes: yes, text: yes ? 'Au-delà de ' + money(lim, '₹') + ' (' + (lim === 2000000 ? '20' : '40') + ' lakh), l’inscription à la GST est obligatoire.' : 'Sous ' + money(lim, '₹') + ', l’inscription n’est pas obligatoire (seuil plus bas dans certains États : 10 ou 20 lakh).' };
    } },
    au: { n: 'Australie', cur: 'AUD', src: 'https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst', check: function (d) {
      var yes = d.amount >= 75000;
      return { yes: yes, text: yes ? 'Dès 75 000 AUD de chiffre d’affaires annuel, l’inscription à la GST (10 %) est obligatoire.' : 'Pas d’inscription obligatoire sous 75 000 AUD (150 000 AUD pour une association).' };
    } },
    br: { n: 'Brésil', cur: 'R$', src: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor', check: function (d) {
      var yes = d.amount > 81000;
      return { yes: yes, text: yes ? (d.amount <= 97200 ? 'Vous dépassez le plafond du MEI de moins de 20 % : vous restez MEI jusqu’à la fin de l’année en payant un complément, puis vous passez en microentreprise (ME).' : 'Au-delà de 97 200 R$, il faut quitter le MEI pour une microentreprise (ME) au Simples Nacional, avec un comptable.') : 'Vous pouvez rester MEI (plafond de 81 000 R$ par an) : les impôts sont inclus dans le DAS mensuel.' };
    } }
  };

  PW.tool({
    id: 'seuils-tva', group: 'Démarches', icon: 'percent',
    t: 'Dois-je facturer la TVA ?',
    d: 'Entrez votre chiffre d’affaires : l’outil compare avec le seuil de TVA, de GST ou de sales tax du pays, et vous dit quoi écrire sur vos factures.',
    render: function (el, params) {
      var opts = Object.keys(V).map(function (k) { return '<option value="' + k + '">' + esc(V[k].n) + '</option>'; }).join('');
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="vtForm" autocomplete="off">' +
          '<div class="field"><label for="vt-country">Pays de votre entreprise</label><select id="vt-country" name="country">' + opts + '</select></div>' +
          '<fieldset><legend class="legend">Vous vendez</legend><div class="radio">' +
            '<label><input type="radio" name="kind" value="services" checked> des services</label>' +
            '<label><input type="radio" name="kind" value="goods"> des biens</label>' +
            '<label data-only="both"><input type="radio" name="kind" value="both"> les deux</label></div></fieldset>' +
          '<div class="field"><label for="vt-amount" id="vt-amount-l">Chiffre d’affaires annuel prévu</label><input id="vt-amount" name="amount" type="number" min="0" step="100" value="20000"></div>' +
          '<div class="field" data-only="services"><label for="vt-services">Dont services</label><input id="vt-services" name="services" type="number" min="0" step="100" value="0"></div>' +
          '<div class="field" data-only="prev"><label for="vt-prev">Chiffre d’affaires de l’année précédente</label><input id="vt-prev" name="prev" type="number" min="0" step="100" value="0"></div>' +
          '<div class="checks" data-only="inter"><label><input type="checkbox" name="inter" data-single> Je vends des biens à des clients d’autres États indiens</label></div>' +
          '<div data-only="eu"><div class="checks"><label><input type="checkbox" name="cross" data-single> Je vends aussi à des particuliers d’autres pays de l’UE</label></div>' +
          '<div class="field mt" data-only="crossAmt"><label for="vt-crossAmt">Montant annuel de ces ventes (€)</label><input id="vt-crossAmt" name="crossAmt" type="number" min="0" step="100" value="0"></div></div>' +
        '</form>' +
        '<div class="out"><div class="verdict" id="vtOut" aria-live="polite"></div>' +
        '<p class="note small mt">Seuils vérifiés en ' + PW.monthName('2026-11') + '. Ils changent souvent : contrôlez toujours sur le site officiel avant de facturer. Cet outil ne remplace pas un comptable.</p></div></div>';

      var form = PW.$('#vtForm', el);
      PW.persistForm(form, 'pw-tool-vat');
      if (V[params.pays]) form.country.value = params.pays;

      function update() {
        var d = PW.formData(form), v = V[d.country];
        d.amount = +d.amount || 0; d.prev = +d.prev || 0; d.services = +d.services || 0; d.crossAmt = +d.crossAmt || 0;
        function show(k, on) { PW.$$('[data-only="' + k + '"]', el).forEach(function (n) { n.hidden = !on; }); }
        show('both', d.country === 'fr'); show('services', d.country === 'fr' && d.kind === 'both');
        show('prev', !!v.prev); show('inter', d.country === 'in'); show('eu', !!v.eu); show('crossAmt', !!v.eu && d.cross);
        if (d.kind === 'both' && d.country !== 'fr') { d.kind = 'services'; }
        PW.$('#vt-amount-l', el).textContent = (v.prev ? 'Chiffre d’affaires prévu cette année' : 'Chiffre d’affaires annuel prévu') + ' (' + v.cur + ')';
        var r = v.check(d);
        var html = '<div class="big">' + (r.yes ? 'Oui, la taxe s’applique' : 'Non, pas encore') + '</div><p>' + esc(r.text) + '</p>';
        if (r.mention) html += '<p class="small"><strong>Mention à écrire sur vos factures :</strong><br><code>' + esc(r.mention) + '</code></p>';
        if (v.eu && d.cross) {
          html += d.crossAmt > 10000
            ? '<p class="small"><strong>Ventes dans l’UE :</strong> au-delà de 10 000 € par an, appliquez la TVA du pays de chaque client et déclarez-la via le guichet unique OSS.</p>'
            : '<p class="small"><strong>Ventes dans l’UE :</strong> sous 10 000 € par an, vous pouvez appliquer la TVA de votre propre pays (ou rester en franchise).</p>';
        }
        html += '<p class="small"><a href="' + esc(v.src) + '" rel="noopener" target="_blank">Vérifier sur le site officiel</a><br><a href="#pays-' + d.country + '">Fiche ' + esc(v.n) + '</a></p>';
        var out = PW.$('#vtOut', el);
        out.className = 'verdict ' + (r.yes ? 'yes' : 'no');
        out.innerHTML = html;
      }
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      update();
    }
  });
})();
