/* Tool: privacy policy generator. Text in French or English; the rights, the
 * authority and the legal bases follow the chosen country's law. */
(function () {
  var PW = window.PW, esc = PW.esc;

  // law: which family of rules; auth: [name, url]
  var LAW = {
    fr: { n: 'France', law: 'gdpr', auth: ['la CNIL', 'https://www.cnil.fr/'], postMortem: true },
    be: { n: 'Belgique', law: 'gdpr', auth: ['l’Autorité de protection des données', 'https://www.autoriteprotectiondonnees.be/'] },
    de: { n: 'Allemagne', law: 'gdpr', auth: ['l’autorité de protection des données de votre Land', 'https://www.bfdi.bund.de/'] },
    es: { n: 'Espagne', law: 'gdpr', auth: ['l’AEPD', 'https://www.aepd.es/'] },
    it: { n: 'Italie', law: 'gdpr', auth: ['le Garante per la protezione dei dati personali', 'https://www.garanteprivacy.it/'] },
    ch: { n: 'Suisse', law: 'nlpd', auth: ['le Préposé fédéral à la protection des données (PFPDT)', 'https://www.edoeb.admin.ch/'] },
    uk: { n: 'Royaume-Uni', law: 'ukgdpr', auth: ['l’ICO', 'https://ico.org.uk/'] },
    us: { n: 'États-Unis', law: 'us', auth: ['le procureur général de votre État ou la FTC', 'https://www.ftc.gov/'] },
    ca: { n: 'Canada', law: 'ca', auth: ['le Commissariat à la protection de la vie privée du Canada (ou la Commission d’accès à l’information au Québec)', 'https://www.priv.gc.ca/'] },
    in: { n: 'Inde', law: 'in', auth: ['le Data Protection Board of India', 'https://www.meity.gov.in/'] },
    au: { n: 'Australie', law: 'au', auth: ['l’OAIC', 'https://www.oaic.gov.au/'] },
    br: { n: 'Brésil', law: 'br', auth: ['l’ANPD', 'https://www.gov.br/anpd/pt-br'] }
  };
  var AUTH_EN = {
    fr: 'the CNIL', be: 'the Belgian Data Protection Authority', de: 'the data protection authority of your German state', es: 'the AEPD', it: 'the Garante per la protezione dei dati personali',
    ch: 'the Federal Data Protection and Information Commissioner (FDPIC)', uk: 'the Information Commissioner’s Office (ICO)', us: 'your state attorney general or the FTC',
    ca: 'the Office of the Privacy Commissioner of Canada (or the Commission d’accès à l’information in Quebec)', in: 'the Data Protection Board of India', au: 'the OAIC', br: 'the ANPD'
  };

  // Purposes: [data, purpose, legal basis, retention] in fr / en.
  var P = {
    contact: { fr: ['nom, email, contenu du message', 'répondre à vos messages', 'intérêt légitime', '3 ans après le dernier échange'], en: ['name, email, message content', 'answer your messages', 'legitimate interest', '3 years after our last exchange'], l: 'Formulaire de contact' },
    account: { fr: ['identifiant, email, mot de passe chiffré', 'créer et gérer votre compte', 'exécution du contrat', 'jusqu’à la suppression du compte'], en: ['username, email, encrypted password', 'create and manage your account', 'performance of a contract', 'until you delete your account'], l: 'Comptes utilisateurs' },
    newsletter: { fr: ['adresse email', 'vous envoyer notre lettre d’information', 'consentement', 'jusqu’à votre désinscription'], en: ['email address', 'send you our newsletter', 'consent', 'until you unsubscribe'], l: 'Newsletter' },
    orders: { fr: ['nom, adresses, commandes ; le paiement est traité par notre prestataire', 'traiter vos commandes, la livraison et la facturation', 'exécution du contrat et obligation légale', 'durée imposée par la loi comptable (souvent 10 ans)'], en: ['name, addresses, orders; payment is handled by our payment provider', 'process your orders, delivery and invoicing', 'performance of a contract and legal obligation', 'as long as accounting law requires (often 6 to 10 years)'], l: 'Commandes et paiements' },
    comments: { fr: ['pseudonyme, email, commentaire, adresse IP', 'publier et modérer les commentaires', 'intérêt légitime', 'tant que le commentaire est en ligne'], en: ['nickname, email, comment, IP address', 'publish and moderate comments', 'legitimate interest', 'as long as the comment is online'], l: 'Commentaires' },
    stats: { fr: ['pages vues, provenance, type d’appareil, sans identifiant personnel', 'mesurer l’audience de façon anonyme', 'intérêt légitime', '13 mois maximum'], en: ['pages viewed, referrer, device type, without personal identifier', 'measure audience anonymously', 'legitimate interest', '13 months maximum'], l: 'Statistiques sans cookie' },
    statsCookie: { fr: ['identifiant de cookie, pages vues, appareil, adresse IP tronquée', 'mesurer l’audience et améliorer le site', 'consentement', '13 mois maximum'], en: ['cookie identifier, pages viewed, device, truncated IP address', 'measure audience and improve the site', 'consent', '13 months maximum'], l: 'Statistiques avec cookies' },
    ads: { fr: ['identifiants publicitaires, centres d’intérêt déduits', 'afficher des publicités', 'consentement', '13 mois maximum'], en: ['advertising identifiers, inferred interests', 'show advertising', 'consent', '13 months maximum'], l: 'Publicité' },
    logs: { fr: ['adresse IP, date et heure, page demandée, navigateur', 'assurer la sécurité et le bon fonctionnement du site', 'intérêt légitime', '12 mois maximum'], en: ['IP address, date and time, requested page, browser', 'keep the site secure and working', 'legitimate interest', '12 months maximum'], l: 'Journaux du serveur (toujours)' }
  };

  var LABEL_EN = { contact: 'Contact form', account: 'User accounts', newsletter: 'Newsletter', orders: 'Orders and payments', comments: 'Comments', stats: 'Cookie-free analytics', statsCookie: 'Analytics with cookies', ads: 'Advertising', logs: 'Server logs' };

  var RIGHTS = {
    gdpr: { fr: ['accéder à vos données', 'les faire rectifier', 'les faire effacer', 'limiter leur utilisation', 'vous opposer à leur utilisation', 'les récupérer dans un format lisible (portabilité)', 'retirer votre consentement à tout moment'], en: ['access your data', 'have it corrected', 'have it erased', 'restrict its use', 'object to its use', 'receive it in a portable format', 'withdraw your consent at any time'], delay: ['un mois', 'one month'] },
    ukgdpr: { fr: ['accéder à vos données', 'les faire rectifier', 'les faire effacer', 'limiter leur utilisation', 'vous opposer à leur utilisation', 'les récupérer dans un format lisible (portabilité)', 'retirer votre consentement à tout moment'], en: ['access your data', 'have it corrected', 'have it erased', 'restrict its use', 'object to its use', 'receive it in a portable format', 'withdraw your consent at any time'], delay: ['un mois', 'one month'] },
    nlpd: { fr: ['obtenir des informations et accéder à vos données', 'les faire rectifier', 'les faire effacer', 'vous opposer à leur traitement', 'obtenir leur remise dans un format courant'], en: ['obtain information and access your data', 'have it corrected', 'have it erased', 'object to its processing', 'receive it in a common format'], delay: ['30 jours', '30 days'] },
    us: { fr: ['savoir quelles données nous avons sur vous', 'en demander la suppression', 'en demander la correction', 'refuser la vente ou le partage de vos données', 'ne subir aucune discrimination pour avoir exercé vos droits'], en: ['know what personal information we hold about you', 'request its deletion', 'request its correction', 'opt out of the sale or sharing of your information', 'not be discriminated against for exercising your rights'], delay: ['45 jours', '45 days'] },
    ca: { fr: ['accéder à vos renseignements personnels', 'les faire corriger', 'retirer votre consentement', 'déposer une plainte'], en: ['access your personal information', 'have it corrected', 'withdraw your consent', 'file a complaint'], delay: ['30 jours', '30 days'] },
    in: { fr: ['obtenir un résumé de vos données et de leur utilisation', 'les faire corriger, compléter ou effacer', 'retirer votre consentement', 'déposer une réclamation', 'désigner une personne qui exercera vos droits à votre place'], en: ['obtain a summary of your data and how it is used', 'have it corrected, completed or erased', 'withdraw your consent', 'raise a grievance', 'nominate someone to exercise your rights for you'], delay: ['les délais fixés par la loi', 'the time limits set by law'] },
    au: { fr: ['accéder à vos informations personnelles', 'les faire corriger', 'déposer une plainte'], en: ['access your personal information', 'have it corrected', 'make a complaint'], delay: ['30 jours', '30 days'] },
    br: { fr: ['confirmer que nous traitons vos données et y accéder', 'les faire corriger', 'les faire anonymiser, bloquer ou supprimer', 'les récupérer (portabilité)', 'savoir avec qui elles sont partagées', 'retirer votre consentement'], en: ['confirm that we process your data and access it', 'have it corrected', 'have it anonymised, blocked or deleted', 'receive it (portability)', 'know who it is shared with', 'withdraw your consent'], delay: ['15 jours', '15 days'] }
  };

  var T = {
    fr: { title: 'Politique de confidentialité', intro: 'Cette page explique quelles données personnelles nous collectons sur {site}, pourquoi, combien de temps nous les gardons et comment exercer vos droits.', who: 'Qui est responsable de vos données ?', whoText: 'Le responsable du traitement est {name}{address}. Pour toute question : {email}.', dpo: 'Délégué à la protection des données : {dpo}.', what: 'Quelles données et pourquoi ?', cols: ['Usage', 'Données', 'Finalité', 'Base légale', 'Durée'], recip: 'Qui reçoit vos données ?', recipText: 'Vos données ne sont jamais vendues. Elles sont accessibles à nos seuls besoins et à nos prestataires techniques, qui agissent sur nos instructions :', transfer: 'Transferts hors de votre pays', transferText: 'Certains prestataires sont situés hors de votre pays (par exemple aux États-Unis). Ces transferts sont encadrés par des garanties reconnues (décision d’adéquation, clauses contractuelles types ou mécanisme équivalent).', cookies: 'Cookies', cookiesOn: 'Nous utilisons des cookies non essentiels uniquement avec votre accord. Vous pouvez changer d’avis à tout moment avec le lien « Gérer les cookies » en bas de chaque page.', cookiesOff: 'Ce site ne dépose aucun cookie de suivi. Seuls des éléments strictement nécessaires à son fonctionnement peuvent être utilisés.', rights: 'Vos droits', rightsText: 'Vous pouvez :', rightsHow: 'Écrivez-nous à {email}. Nous répondons dans un délai de {delay}. Nous pouvons vous demander de prouver votre identité.', postMortem: 'Vous pouvez aussi définir des directives sur le sort de vos données après votre décès.', complain: 'Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir {auth} ({url}).', security: 'Sécurité', securityText: 'Le site est servi en HTTPS, les accès sont limités et protégés par des mots de passe forts et une double authentification.', changes: 'Modifications', changesText: 'Nous pouvons mettre à jour cette politique. La date de dernière mise à jour figure ci-dessous.', updated: 'Dernière mise à jour :', provHost: 'hébergement du site', provMail: 'envoi des emails', provPay: 'paiement', provStats: 'mesure d’audience', provNews: 'newsletter', us: 'Selon la loi de votre État de résidence (par exemple la Californie), vous pouvez :', site: 'ce site' },
    en: { title: 'Privacy policy', intro: 'This page explains what personal data we collect on {site}, why, how long we keep it and how to exercise your rights.', who: 'Who is responsible for your data?', whoText: 'The data controller is {name}{address}. For any question: {email}.', dpo: 'Data protection officer: {dpo}.', what: 'What data and why?', cols: ['Use', 'Data', 'Purpose', 'Legal basis', 'Retention'], recip: 'Who receives your data?', recipText: 'We never sell your data. It is only used for our own needs and by our technical providers, who act on our instructions:', transfer: 'Transfers outside your country', transferText: 'Some providers are located outside your country (for example in the United States). These transfers rely on recognised safeguards (adequacy decision, standard contractual clauses or equivalent).', cookies: 'Cookies', cookiesOn: 'We only use non-essential cookies with your consent. You can change your mind at any time with the “Manage cookies” link at the bottom of every page.', cookiesOff: 'This site does not set any tracking cookie. Only items strictly needed for it to work may be used.', rights: 'Your rights', rightsText: 'You can:', rightsHow: 'Write to us at {email}. We reply within {delay}. We may ask you to prove your identity.', postMortem: '', complain: 'If you think your rights are not respected, you can contact {auth} ({url}).', security: 'Security', securityText: 'The site is served over HTTPS, and access is restricted and protected by strong passwords and two-factor authentication.', changes: 'Changes', changesText: 'We may update this policy. The date of the latest update is shown below.', updated: 'Last updated:', provHost: 'website hosting', provMail: 'sending emails', provPay: 'payments', provStats: 'audience measurement', provNews: 'newsletter', us: 'Depending on the law of your state of residence (for example California), you can:', site: 'this site' }
  };

  function fill(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k] != null ? o[k] : ''; }); }

  function build(d) {
    var c = LAW[d.country] || LAW.fr, lang = d.lang === 'en' ? 'en' : 'fr', t = T[lang], r = RIGHTS[c.law];
    var showBasis = c.law === 'gdpr' || c.law === 'ukgdpr' || c.law === 'br';
    var uses = (d.uses || []).concat(['logs']);
    var h = '<section lang="' + lang + '">\n<h1>' + esc(t.title) + '</h1>\n';
    h += '<p>' + esc(fill(t.intro, { site: d.site || t.site })) + '</p>\n';
    h += '\n<h2>' + esc(t.who) + '</h2>\n<p>' + esc(fill(t.whoText, { name: d.name || '…', address: d.address ? ', ' + d.address : '', email: d.email || '…' })) + '</p>\n';
    if (d.dpo) h += '<p>' + esc(fill(t.dpo, { dpo: d.dpo })) + '</p>\n';

    h += '\n<h2>' + esc(t.what) + '</h2>\n<table>\n<thead><tr>';
    t.cols.forEach(function (col, i) { if (i === 3 && !showBasis) return; h += '<th>' + esc(col) + '</th>'; });
    h += '</tr></thead>\n<tbody>\n';
    uses.forEach(function (u) {
      var row = P[u]; if (!row) return; var v = row[lang];
      var label = lang === 'en' ? LABEL_EN[u] : row.l.replace(' (toujours)', '');
      h += '<tr><td>' + esc(label) + '</td><td>' + esc(v[0]) + '</td><td>' + esc(v[1]) + '</td>' + (showBasis ? '<td>' + esc(v[2]) + '</td>' : '') + '<td>' + esc(v[3]) + '</td></tr>\n';
    });
    h += '</tbody>\n</table>\n';

    var prov = [];
    if (d.pHost) prov.push(d.pHost + ' (' + t.provHost + ')');
    if (d.pMail) prov.push(d.pMail + ' (' + t.provMail + ')');
    if (d.pPay && uses.indexOf('orders') !== -1) prov.push(d.pPay + ' (' + t.provPay + ')');
    if (d.pStats && (uses.indexOf('stats') !== -1 || uses.indexOf('statsCookie') !== -1)) prov.push(d.pStats + ' (' + t.provStats + ')');
    if (d.pNews && uses.indexOf('newsletter') !== -1) prov.push(d.pNews + ' (' + t.provNews + ')');
    h += '\n<h2>' + esc(t.recip) + '</h2>\n<p>' + esc(t.recipText) + '</p>\n';
    if (prov.length) h += '<ul>\n' + prov.map(function (p) { return '  <li>' + esc(p) + '</li>'; }).join('\n') + '\n</ul>\n';
    if (d.transfer) h += '\n<h2>' + esc(t.transfer) + '</h2>\n<p>' + esc(t.transferText) + '</p>\n';

    var cookieUse = uses.indexOf('statsCookie') !== -1 || uses.indexOf('ads') !== -1;
    h += '\n<h2>' + esc(t.cookies) + '</h2>\n<p>' + esc(cookieUse ? t.cookiesOn : t.cookiesOff) + '</p>\n';

    h += '\n<h2>' + esc(t.rights) + '</h2>\n<p>' + esc(c.law === 'us' ? t.us : t.rightsText) + '</p>\n<ul>\n' +
      r[lang].map(function (x) { return '  <li>' + esc(x) + '</li>'; }).join('\n') + '\n</ul>\n';
    h += '<p>' + esc(fill(t.rightsHow, { email: d.email || '…', delay: r.delay[lang === 'en' ? 1 : 0] })) + '</p>\n';
    if (c.postMortem && lang === 'fr') h += '<p>' + esc(t.postMortem) + '</p>\n';
    h += '<p>' + esc(fill(t.complain, { auth: lang === 'en' ? AUTH_EN[d.country] : c.auth[0], url: c.auth[1] })) + '</p>\n';
    h += '\n<h2>' + esc(t.security) + '</h2>\n<p>' + esc(t.securityText) + '</p>\n';
    h += '\n<h2>' + esc(t.changes) + '</h2>\n<p>' + esc(t.changesText) + '</p>\n';
    h += '\n<p><small>' + esc(t.updated) + ' ' + new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) + '</small></p>\n</section>\n';
    return h;
  }

  function htmlToText(html) {
    var div = document.createElement('div');
    div.innerHTML = html.replace(/<\/(h1|h2|p|li|tr)>/g, '$&\n').replace(/<\/t[dh]>/g, ' | ');
    return div.textContent.replace(/\n{3,}/g, '\n\n').trim() + '\n';
  }

  PW.tool({
    id: 'confidentialite', group: 'Pages légales', icon: 'shield',
    t: 'Générateur de politique de confidentialité',
    d: 'Une politique claire selon la loi de votre pays (RGPD, UK GDPR, nLPD, LPRPDE, CCPA, DPDP, LGPD…), en français ou en anglais.',
    render: function (el, params) {
      var opts = Object.keys(LAW).map(function (k) { return '<option value="' + k + '">' + esc(LAW[k].n) + '</option>'; }).join('');
      var useChecks = Object.keys(P).filter(function (k) { return k !== 'logs'; }).map(function (k) {
        return '<label><input type="checkbox" name="uses" value="' + k + '"' + (k === 'contact' ? ' checked' : '') + '> ' + esc(P[k].l) + '</label>';
      }).join('');
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="pvForm" autocomplete="off">' +
          '<div class="row2"><div class="field"><label for="pv-country">Pays dont la loi s’applique</label><select id="pv-country" name="country">' + opts + '</select></div>' +
          '<div class="field"><label for="pv-lang">Langue du texte</label><select id="pv-lang" name="lang"><option value="fr">Français</option><option value="en">English</option></select></div></div>' +
          '<div class="field"><label for="pv-site">Nom ou adresse du site</label><input id="pv-site" name="site" type="text" placeholder="atelier-martin.fr"></div>' +
          '<div class="field"><label for="pv-name">Responsable (vous ou votre entreprise)</label><input id="pv-name" name="name" type="text" placeholder="Atelier Martin SAS"></div>' +
          '<div class="field"><label for="pv-address">Adresse</label><input id="pv-address" name="address" type="text" placeholder="12 rue des Lilas, 75011 Paris"></div>' +
          '<div class="row2"><div class="field"><label for="pv-email">Email pour les demandes</label><input id="pv-email" name="email" type="email" placeholder="vie-privee@exemple.fr"></div>' +
          '<div class="field"><label for="pv-dpo">DPO <span class="hint">(facultatif)</span></label><input id="pv-dpo" name="dpo" type="text"></div></div>' +
          '<fieldset><legend class="legend">Ce que fait votre site</legend><div class="checks">' + useChecks + '</div><p class="hint small mt">Les journaux du serveur sont toujours ajoutés : tout hébergeur en tient.</p></fieldset>' +
          '<h3>Prestataires</h3>' +
          '<div class="row2"><div class="field"><label for="pv-host">Hébergeur</label><input id="pv-host" name="pHost" type="text" placeholder="OVHcloud"></div>' +
          '<div class="field"><label for="pv-mail">Service email</label><input id="pv-mail" name="pMail" type="text" placeholder="Proton Mail"></div></div>' +
          '<div class="row2"><div class="field"><label for="pv-pay">Paiement</label><input id="pv-pay" name="pPay" type="text" placeholder="Stripe"></div>' +
          '<div class="field"><label for="pv-stats">Statistiques</label><input id="pv-stats" name="pStats" type="text" placeholder="Plausible"></div></div>' +
          '<div class="field"><label for="pv-news">Outil de newsletter</label><input id="pv-news" name="pNews" type="text" placeholder="Brevo"></div>' +
          '<div class="checks"><label><input type="checkbox" name="transfer" data-single> Un prestataire est situé hors de mon pays (ex. aux États-Unis)</label></div>' +
        '</form>' +
        '<div class="out"><div class="panel"><div class="tabbar" role="tablist">' +
          '<button type="button" role="tab" aria-selected="true" data-tab="preview">Aperçu</button>' +
          '<button type="button" role="tab" aria-selected="false" data-tab="html">HTML</button>' +
          '<button type="button" role="tab" aria-selected="false" data-tab="txt">Texte</button></div>' +
          '<div data-pane="preview"><div class="doc-out" id="pvPreview"></div></div>' +
          '<div data-pane="html" hidden>' + PW.codeBlock('pvHtml', 'Code HTML', 'confidentialite.html') + '</div>' +
          '<div data-pane="txt" hidden>' + PW.codeBlock('pvTxt', 'Texte brut', 'confidentialite.txt') + '</div>' +
        '</div><p class="note warn small"><strong>Un point de départ.</strong> Adaptez les durées et les usages à ce que fait vraiment votre site : une politique fausse est pire qu’aucune.</p></div></div>';

      var form = PW.$('#pvForm', el);
      PW.persistForm(form, 'pw-tool-privacy');
      if (LAW[params.pays]) form.country.value = params.pays;
      PW.wireCode(el);
      PW.$$('[data-tab]', el).forEach(function (b) {
        b.addEventListener('click', function () {
          PW.$$('[data-tab]', el).forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
          PW.$$('[data-pane]', el).forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== b.getAttribute('data-tab'); });
        });
      });
      function update() {
        var html = build(PW.formData(form));
        PW.$('#pvPreview', el).innerHTML = html;
        PW.setCode('pvHtml', html);
        PW.setCode('pvTxt', htmlToText(html));
      }
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      update();
    }
  });
})();
