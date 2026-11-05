/* Tool: legal notice generator (mentions légales, Impressum, aviso legal…).
 * The form is in French; the generated page is in the country's language. */
(function () {
  var PW = window.PW, esc = PW.esc;

  // Output labels per language.
  var L = {
    fr: { editor: 'Éditeur du site', phone: 'Téléphone', email: 'Email', capital: 'au capital de', rep: 'Représentant légal', director: 'Directeur de la publication', host: 'Hébergement', dsa: 'Point de contact unique (règlement (UE) 2022/2065)', med: 'Médiation de la consommation', medText: 'En cas de litige, le consommateur peut recourir gratuitement au médiateur suivant :', ip: 'Propriété intellectuelle', ipText: 'L’ensemble des contenus de ce site (textes, images, logo) est protégé par le droit d’auteur. Toute reproduction sans autorisation écrite est interdite.', data: 'Données personnelles', dataText: 'Pour savoir comment vos données sont traitées et comment exercer vos droits, consultez notre', privacy: 'politique de confidentialité', updated: 'Dernière mise à jour :', anon: 'Ce site est édité par un particulier qui a choisi de rester anonyme, conformément à l’article 6, III, 2 de la LCEN. Son identité a été communiquée à l’hébergeur.', office: 'Siège' },
    de: { editor: 'Anbieter', phone: 'Telefon', email: 'E-Mail', capital: 'Stammkapital', rep: 'Vertreten durch', director: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV', host: 'Hosting', dsa: 'Zentrale Kontaktstelle nach Art. 11 und 12 DSA', med: 'Verbraucherstreitbeilegung', medText: 'Wir nehmen an Streitbeilegungsverfahren vor folgender Verbraucherschlichtungsstelle teil:', medNo: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.', ip: 'Urheberrecht', ipText: 'Die Inhalte dieser Website unterliegen dem Urheberrecht. Jede Vervielfältigung bedarf der vorherigen schriftlichen Zustimmung.', data: 'Datenschutz', dataText: 'Informationen zur Verarbeitung Ihrer Daten finden Sie in unserer', privacy: 'Datenschutzerklärung', updated: 'Stand:', office: 'Sitz' },
    es: { editor: 'Titular del sitio web', phone: 'Teléfono', email: 'Correo electrónico', capital: 'Capital social', rep: 'Representante legal', director: 'Responsable de los contenidos', host: 'Alojamiento', dsa: 'Punto único de contacto (Reglamento (UE) 2022/2065)', med: 'Resolución de litigios', medText: 'El consumidor puede acudir a la siguiente entidad de resolución alternativa de litigios:', ip: 'Propiedad intelectual', ipText: 'Todos los contenidos de este sitio web están protegidos por derechos de propiedad intelectual. Queda prohibida su reproducción sin autorización.', data: 'Protección de datos', dataText: 'Puede consultar cómo tratamos sus datos en nuestra', privacy: 'política de privacidad', updated: 'Última actualización:', office: 'Domicilio social' },
    it: { editor: 'Titolare del sito', phone: 'Telefono', email: 'Email', capital: 'Capitale sociale', rep: 'Legale rappresentante', director: 'Responsabile dei contenuti', host: 'Hosting', dsa: 'Punto di contatto unico (Regolamento (UE) 2022/2065)', med: 'Risoluzione delle controversie', medText: 'Il consumatore può rivolgersi al seguente organismo di risoluzione alternativa delle controversie:', ip: 'Proprietà intellettuale', ipText: 'Tutti i contenuti del sito sono protetti dal diritto d’autore. È vietata la riproduzione senza autorizzazione scritta.', data: 'Privacy', dataText: 'Per sapere come trattiamo i tuoi dati personali consulta la nostra', privacy: 'informativa privacy', updated: 'Ultimo aggiornamento:', office: 'Sede legale' },
    en: { editor: 'Website operator', phone: 'Phone', email: 'Email', capital: 'Share capital', rep: 'Represented by', director: 'Responsible for content', host: 'Hosting provider', dsa: 'Single point of contact (Regulation (EU) 2022/2065)', med: 'Dispute resolution', medText: 'Consumers may refer a dispute to:', ip: 'Copyright', ipText: 'All content on this website is protected by copyright. Reproduction without written permission is prohibited.', data: 'Privacy', dataText: 'To learn how we process your personal data and how to exercise your rights, read our', privacy: 'privacy policy', updated: 'Last updated:', office: 'Registered office', dmca: 'Copyright agent (DMCA)' },
    pt: { editor: 'Responsável pelo site', phone: 'Telefone', email: 'E-mail', capital: 'Capital social', rep: 'Representante legal', director: 'Responsável pelo conteúdo', host: 'Hospedagem', med: 'Atendimento e reclamações', medText: 'Você também pode registrar uma reclamação em:', ip: 'Propriedade intelectual', ipText: 'Todo o conteúdo deste site é protegido por direitos autorais. É proibida a reprodução sem autorização.', data: 'Privacidade', dataText: 'Saiba como tratamos seus dados pessoais na nossa', privacy: 'política de privacidade', updated: 'Última atualização:', office: 'Sede' }
  };

  // Country rules. reg/vat = [form label, placeholder]; out labels in the output language.
  var CFG = {
    fr: { name: 'France', lang: 'fr', title: 'Mentions légales', intro: 'Conformément à l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), voici les informations sur l’éditeur et l’hébergeur de ce site.', reg: ['SIREN et immatriculation', '123 456 789 RCS Paris'], regOut: 'Immatriculation', vat: ['N° de TVA intracommunautaire', 'FR12 123456789'], vatOut: 'N° de TVA intracommunautaire', director: true, host: true, dsa: true, anon: true, med: true, note: 'En France, le directeur de la publication et l’hébergeur sont obligatoires, même pour un particulier.' },
    be: { name: 'Belgique', lang: 'fr', title: 'Mentions légales', intro: 'Informations fournies conformément à l’article XII.6 du Code de droit économique.', reg: ['Numéro d’entreprise (BCE)', '0123.456.789'], regOut: 'Numéro d’entreprise (BCE)', vat: ['N° de TVA', 'BE0123.456.789'], vatOut: 'N° de TVA', host: true, dsa: true, med: true, note: 'Numéro d’entreprise et TVA sont obligatoires pour un indépendant ou une société.' },
    ch: { name: 'Suisse (français)', lang: 'fr', title: 'Impressum', intro: 'Informations fournies conformément à l’art. 3, al. 1, let. s de la loi fédérale contre la concurrence déloyale (LCD).', reg: ['Numéro IDE', 'CHE-123.456.789'], regOut: 'Numéro IDE', vat: ['N° TVA', 'CHE-123.456.789 TVA'], vatOut: 'N° TVA', note: 'Minimum légal : nom, adresse postale et adresse email.' },
    'ch-de': { name: 'Suisse (Deutsch)', lang: 'de', title: 'Impressum', intro: 'Angaben gemäss Art. 3 Abs. 1 lit. s des Bundesgesetzes gegen den unlauteren Wettbewerb (UWG).', reg: ['Numéro IDE (UID)', 'CHE-123.456.789'], regOut: 'UID', vat: ['N° TVA (MWST)', 'CHE-123.456.789 MWST'], vatOut: 'MWST-Nr.', note: 'Minimum légal : nom, adresse postale et adresse email.' },
    de: { name: 'Allemagne', lang: 'de', title: 'Impressum', intro: 'Angaben gemäß § 5 DDG', reg: ['Registre (tribunal et numéro)', 'Amtsgericht München, HRB 123456'], regOut: 'Registereintrag', vat: ['USt-IdNr.', 'DE123456789'], vatOut: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG', director: true, dsa: true, med: true, deNoAdr: true, note: 'Un second moyen de contact rapide (téléphone) est attendu en plus de l’email. Pas de boîte postale comme adresse.' },
    es: { name: 'Espagne', lang: 'es', title: 'Aviso legal', intro: 'En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se facilitan los siguientes datos:', reg: ['Inscription au Registro Mercantil', 'Registro Mercantil de Madrid, tomo 1234, folio 56, hoja M-78901'], regOut: 'Datos registrales', vat: ['NIF / CIF', 'B12345678'], vatOut: 'NIF', dsa: true, med: true, note: 'Le NIF est obligatoire, y compris pour un autónomo.' },
    it: { name: 'Italie', lang: 'it', title: 'Note legali', intro: 'Informazioni ai sensi dell’art. 7 del D.Lgs. 70/2003. La Partita IVA è indicata anche nella home page (art. 35 DPR 633/1972).', reg: ['Numéro REA', 'REA MI-1234567'], regOut: 'Numero REA', vat: ['Partita IVA', '12345678901'], vatOut: 'Partita IVA', pec: true, dsa: true, med: true, note: 'Pensez aussi à afficher la Partita IVA dans le pied de page de l’accueil.' },
    uk: { name: 'Royaume-Uni', lang: 'en', title: 'Legal information', intro: 'Information provided under the Electronic Commerce (EC Directive) Regulations 2002 and, for companies, the Companies Act 2006.', reg: ['Numéro de société et lieu d’immatriculation', 'Registered in England and Wales, company number 12345678'], regOut: 'Company registration', vat: ['VAT number', 'GB123456789'], vatOut: 'VAT number', note: 'Une Ltd doit indiquer sa dénomination exacte, son numéro, son lieu d’immatriculation et son registered office.' },
    us: { name: 'États-Unis', lang: 'en', title: 'Legal notice', intro: 'This page identifies the owner and operator of this website.', reg: ['Type d’entité et État', 'Delaware limited liability company'], regOut: 'Entity', vat: ['EIN (facultatif)', '12-3456789'], vatOut: 'EIN', dmca: true, note: 'Aucune loi fédérale n’impose cette page : elle rassure les visiteurs et les services de paiement. Ce qui est obligatoire, c’est la privacy policy (et l’agent DMCA si les utilisateurs publient du contenu).' },
    ca: { name: 'Canada (français)', lang: 'fr', title: 'Mentions légales', intro: 'Les informations suivantes identifient l’entreprise qui exploite ce site.', reg: ['NE et/ou NEQ', 'NE 123456789 — NEQ 1234567890'], regOut: 'Numéro d’entreprise', vat: ['Numéros de TPS/TVQ', 'TPS 123456789RT0001'], vatOut: 'TPS / TVQ', po: 'Responsable de la protection des renseignements personnels', note: 'Au Québec, publiez le titre et les coordonnées du responsable de la protection des renseignements personnels (Loi 25).' },
    'ca-en': { name: 'Canada (English)', lang: 'en', title: 'Legal notice', intro: 'The following information identifies the business operating this website.', reg: ['Business Number', 'BN 123456789'], regOut: 'Business Number', vat: ['GST/HST number', '123456789RT0001'], vatOut: 'GST/HST number', po: 'Person in charge of the protection of personal information', note: 'In Quebec, publish the title and contact details of your privacy officer (Law 25).' },
    in: { name: 'Inde', lang: 'en', title: 'Legal information', intro: 'Information about the operator of this website, provided under the Consumer Protection (E-Commerce) Rules, 2020 and the Information Technology Act, 2000.', reg: ['CIN / LLPIN / Udyam', 'U12345MH2024PTC123456'], regOut: 'Registration', vat: ['GSTIN', '27ABCDE1234F1Z5'], vatOut: 'GSTIN', po: 'Grievance Officer', note: 'Un site de vente ou une plateforme doit nommer un grievance officer avec ses coordonnées.' },
    au: { name: 'Australie', lang: 'en', title: 'Legal information', intro: 'Information about the business operating this website.', reg: ['ABN', 'ABN 12 345 678 901'], regOut: 'ABN', vat: ['ACN (si société)', 'ACN 123 456 789'], vatOut: 'ACN', note: 'Indiquez l’ABN sur le site et sur vos factures.' },
    br: { name: 'Brésil', lang: 'pt', title: 'Informações legais', intro: 'Informações prestadas em cumprimento ao Decreto nº 7.962/2013.', reg: ['CNPJ ou CPF', '12.345.678/0001-90'], regOut: 'CNPJ/CPF', vat: ['Inscription d’État ou municipale (facultatif)', ''], vatOut: 'Inscrição estadual/municipal', po: 'Encarregado pelo tratamento de dados pessoais', note: 'Le CNPJ (ou CPF) et l’adresse physique doivent être bien visibles.' }
  };

  // Common hosts, to fill the host block in one click. Check the address in the host's terms.
  var HOSTS = {
    '': ['', ''],
    github: ['GitHub, Inc.', '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis'],
    cloudflare: ['Cloudflare, Inc.', '101 Townsend Street, San Francisco, CA 94107, États-Unis'],
    vercel: ['Vercel Inc.', '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis'],
    ovh: ['OVH SAS', '2 rue Kellermann, 59100 Roubaix, France'],
    o2switch: ['o2switch', 'Chemin des Pardiaux, 63000 Clermont-Ferrand, France'],
    infomaniak: ['Infomaniak Network SA', 'Rue Eugène-Marziano 25, 1227 Les Acacias (GE), Suisse'],
    hetzner: ['Hetzner Online GmbH', 'Industriestr. 25, 91710 Gunzenhausen, Allemagne']
  };

  function countryOptions(sel) {
    return Object.keys(CFG).map(function (k) {
      return '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' + esc(CFG[k].name) + '</option>';
    }).join('');
  }

  function build(d) {
    var c = CFG[d.country] || CFG.fr, l = L[c.lang];
    var pro = d.kind !== 'perso';
    var blocks = [];
    var today = new Date();
    var date = today.toLocaleDateString({ fr: 'fr-FR', de: 'de-DE', es: 'es-ES', it: 'it-IT', en: 'en-GB', pt: 'pt-BR' }[c.lang], { year: 'numeric', month: 'long', day: 'numeric' });

    if (c.anon && !pro && d.anon) {
      blocks.push({ h: l.editor, lines: [l.anon] });
    } else {
      var ed = [];
      if (d.name) ed.push(d.name + (pro && d.form ? ', ' + d.form : '') + (pro && d.capital ? (c.lang === 'fr' ? ' ' + l.capital + ' ' : ' — ' + l.capital + ' ') + d.capital : ''));
      if (d.address) ed.push((pro && d.form ? l.office + ' : ' : '') + d.address.replace(/\n+/g, ', '));
      if (d.phone) ed.push(l.phone + ' : ' + d.phone);
      if (d.email) ed.push(l.email + ' : ' + d.email);
      if (c.pec && d.pec) ed.push('PEC : ' + d.pec);
      if (pro && d.reg) ed.push(c.regOut + ' : ' + d.reg);
      if (d.vat) ed.push(c.vatOut + ' : ' + d.vat);
      if (pro && d.rep) ed.push(l.rep + ' : ' + d.rep);
      if (d.extra) ed.push(d.extra.replace(/\n+/g, ' — '));
      if (!ed.length) ed.push('[À compléter : nom, adresse, email]');
      blocks.push({ h: l.editor, lines: ed });
    }
    if (c.director && d.director) blocks.push({ h: l.director, lines: [d.director] });
    if (c.po && d.po) blocks.push({ h: c.po, lines: [d.po.replace(/\n+/g, ', ')] });
    if (c.dmca && d.dmca) blocks.push({ h: l.dmca, lines: [d.dmca.replace(/\n+/g, ', ')] });
    if (d.hostName) {
      var hl = [d.hostName];
      if (d.hostAddress) hl.push(d.hostAddress);
      if (d.hostPhone) hl.push(l.phone + ' : ' + d.hostPhone);
      blocks.push({ h: l.host, lines: hl });
    }
    if (c.dsa && d.dsa && d.email) blocks.push({ h: l.dsa, lines: [d.email] });
    if (c.med && pro) {
      if (d.mediator) blocks.push({ h: l.med, lines: [l.medText, d.mediator] });
      else if (c.deNoAdr) blocks.push({ h: l.med, lines: [l.medNo] });
    }
    if (d.ip) blocks.push({ h: l.ip, lines: [l.ipText] });
    if (d.privacyUrl) blocks.push({ h: l.data, lines: [{ text: l.dataText + ' ', link: l.privacy, url: d.privacyUrl, after: '.' }] });

    // German "§ 5 DDG" intro is a heading-like line; others are a sentence.
    return { title: c.title, intro: c.intro, blocks: blocks, footer: l.updated + ' ' + date, lang: c.lang };
  }

  function toHTML(doc) {
    var h = '<section lang="' + doc.lang + '">\n  <h1>' + esc(doc.title) + '</h1>\n  <p>' + esc(doc.intro) + '</p>\n';
    doc.blocks.forEach(function (b) {
      h += '\n  <h2>' + esc(b.h) + '</h2>\n  <p>' + b.lines.map(function (x) {
        return typeof x === 'string' ? esc(x) : esc(x.text) + '<a href="' + esc(x.url) + '">' + esc(x.link) + '</a>' + esc(x.after);
      }).join('<br>\n     ') + '</p>\n';
    });
    return h + '\n  <p><small>' + esc(doc.footer) + '</small></p>\n</section>\n';
  }
  function toMD(doc) {
    var m = '# ' + doc.title + '\n\n' + doc.intro + '\n';
    doc.blocks.forEach(function (b) {
      m += '\n## ' + b.h + '\n\n' + b.lines.map(function (x) {
        return typeof x === 'string' ? x : x.text + '[' + x.link + '](' + x.url + ')' + x.after;
      }).join('  \n') + '\n';
    });
    return m + '\n_' + doc.footer + '_\n';
  }
  function toText(doc) {
    var t = doc.title.toUpperCase() + '\n\n' + doc.intro + '\n';
    doc.blocks.forEach(function (b) {
      t += '\n' + b.h + '\n' + b.lines.map(function (x) { return typeof x === 'string' ? x : x.text + x.link + ' (' + x.url + ')' + x.after; }).join('\n') + '\n';
    });
    return t + '\n' + doc.footer + '\n';
  }

  PW.tool({
    id: 'mentions-legales', group: 'Pages légales', icon: 'doc',
    t: 'Générateur de mentions légales',
    d: 'Mentions légales, Impressum, aviso legal, note legali, legal notice : la page d’identification adaptée à 12 pays, dans la langue du pays.',
    render: function (el, params) {
      var start = CFG[params.pays] ? params.pays : 'fr';
      el.innerHTML =
        '<div class="tool-grid">' +
        '<form class="panel" id="lgForm" autocomplete="off">' +
          '<div class="field"><label for="lg-country">Pays</label><select id="lg-country" name="country">' + countryOptions(start) + '</select></div>' +
          '<p class="note small" id="lgNote"></p>' +
          '<fieldset><legend class="legend">Qui édite le site ?</legend><div class="radio">' +
            '<label><input type="radio" name="kind" value="pro" checked> Une entreprise ou un indépendant</label>' +
            '<label><input type="radio" name="kind" value="perso"> Un particulier</label></div></fieldset>' +
          '<div class="checks" data-only="anon"><label><input type="checkbox" name="anon" data-single> Rester anonyme (seul l’hébergeur connaît mon identité)</label></div>' +
          '<div class="field"><label for="lg-name">Nom ou dénomination sociale</label><input id="lg-name" name="name" type="text" placeholder="Camille Martin ou Atelier Martin"></div>' +
          '<div class="row2" data-only="pro"><div class="field"><label for="lg-form">Forme juridique</label><input id="lg-form" name="form" type="text" placeholder="SAS, GmbH, Ltd, LLC…"></div>' +
          '<div class="field"><label for="lg-capital">Capital social</label><input id="lg-capital" name="capital" type="text" placeholder="1 000 €"></div></div>' +
          '<div class="field"><label for="lg-address">Adresse postale</label><textarea id="lg-address" name="address" rows="2" placeholder="12 rue des Lilas, 75011 Paris, France"></textarea></div>' +
          '<div class="row2"><div class="field"><label for="lg-email">Email</label><input id="lg-email" name="email" type="email" placeholder="contact@exemple.fr"></div>' +
          '<div class="field"><label for="lg-phone">Téléphone</label><input id="lg-phone" name="phone" type="tel" placeholder="+33 1 23 45 67 89"></div></div>' +
          '<div class="field" data-only="pec"><label for="lg-pec">Adresse PEC</label><input id="lg-pec" name="pec" type="email" placeholder="atelier@pec.it"></div>' +
          '<div class="field" data-only="pro"><label for="lg-reg" id="lg-reg-l">Immatriculation</label><input id="lg-reg" name="reg" type="text"></div>' +
          '<div class="field"><label for="lg-vat" id="lg-vat-l">N° de TVA</label><input id="lg-vat" name="vat" type="text"></div>' +
          '<div class="field" data-only="pro"><label for="lg-rep">Représentant légal <span class="hint">(société)</span></label><input id="lg-rep" name="rep" type="text" placeholder="Camille Martin, présidente"></div>' +
          '<div class="field" data-only="director"><label for="lg-director">Directeur ou responsable de la publication</label><input id="lg-director" name="director" type="text" placeholder="Camille Martin"></div>' +
          '<div class="field" data-only="po"><label for="lg-po" id="lg-po-l">Responsable des données</label><textarea id="lg-po" name="po" rows="2" placeholder="Nom ou titre, email, téléphone"></textarea></div>' +
          '<div class="field" data-only="dmca"><label for="lg-dmca">Agent DMCA <span class="hint">(si les utilisateurs publient du contenu)</span></label><textarea id="lg-dmca" name="dmca" rows="2" placeholder="Nom, adresse, email, téléphone"></textarea></div>' +
          '<div class="field"><label for="lg-extra">Informations complémentaires <span class="hint">(profession réglementée, ordre, licence…)</span></label><textarea id="lg-extra" name="extra" rows="2"></textarea></div>' +
          '<h3>Hébergeur</h3>' +
          '<div class="field"><label for="lg-hostpick">Remplir avec un hébergeur courant</label><select id="lg-hostpick"><option value="">Choisir…</option><option value="github">GitHub Pages</option><option value="cloudflare">Cloudflare</option><option value="vercel">Vercel</option><option value="ovh">OVHcloud</option><option value="o2switch">o2switch</option><option value="infomaniak">Infomaniak</option><option value="hetzner">Hetzner</option></select><span class="hint">Vérifiez l’adresse et ajoutez le téléphone depuis les conditions de l’hébergeur.</span></div>' +
          '<div class="field"><label for="lg-hostName">Nom de l’hébergeur</label><input id="lg-hostName" name="hostName" type="text"></div>' +
          '<div class="field"><label for="lg-hostAddress">Adresse de l’hébergeur</label><input id="lg-hostAddress" name="hostAddress" type="text"></div>' +
          '<div class="field"><label for="lg-hostPhone">Téléphone de l’hébergeur</label><input id="lg-hostPhone" name="hostPhone" type="tel"></div>' +
          '<h3>Options</h3>' +
          '<div class="field" data-only="med"><label for="lg-mediator">Médiateur de la consommation <span class="hint">(si vous vendez à des particuliers)</span></label><input id="lg-mediator" name="mediator" type="text" placeholder="Nom du médiateur — site web"></div>' +
          '<div class="checks">' +
            '<label data-only="dsa"><input type="checkbox" name="dsa" data-single checked> Indiquer l’email comme point de contact DSA</label>' +
            '<label><input type="checkbox" name="ip" data-single checked> Ajouter un paragraphe sur le droit d’auteur</label>' +
          '</div>' +
          '<div class="field"><label for="lg-privacy">Lien vers votre politique de confidentialité</label><input id="lg-privacy" name="privacyUrl" type="text" placeholder="/confidentialite.html"></div>' +
        '</form>' +
        '<div class="out">' +
          '<div class="panel"><div class="tabbar" role="tablist">' +
            '<button type="button" role="tab" aria-selected="true" data-tab="preview">Aperçu</button>' +
            '<button type="button" role="tab" aria-selected="false" data-tab="html">HTML</button>' +
            '<button type="button" role="tab" aria-selected="false" data-tab="md">Markdown</button>' +
            '<button type="button" role="tab" aria-selected="false" data-tab="txt">Texte</button></div>' +
            '<div data-pane="preview"><div class="doc-out" id="lgPreview"></div><div class="btn-row mt"><button class="btn small" type="button" id="lgCopyText">Copier le texte</button></div></div>' +
            '<div data-pane="html" hidden>' + PW.codeBlock('lgHtml', 'Code HTML à coller dans votre page', 'mentions-legales.html') + '</div>' +
            '<div data-pane="md" hidden>' + PW.codeBlock('lgMd', 'Markdown (Hugo, Astro, Jekyll…)', 'mentions-legales.md') + '</div>' +
            '<div data-pane="txt" hidden>' + PW.codeBlock('lgTxt', 'Texte brut (Wix, Squarespace…)', 'mentions-legales.txt') + '</div>' +
          '</div>' +
          '<p class="note warn small"><strong>À relire.</strong> Ce modèle couvre les mentions courantes. Une activité réglementée (santé, droit, finance…) ou une grosse boutique doit faire valider le texte.</p>' +
        '</div></div>';

      var form = PW.$('#lgForm', el);
      PW.persistForm(form, 'pw-tool-legal');
      if (CFG[params.pays]) form.country.value = params.pays;
      PW.wireCode(el);

      PW.$('#lg-hostpick', el).addEventListener('change', function () {
        var h = HOSTS[this.value]; if (!h || !this.value) return;
        form.hostName.value = h[0]; form.hostAddress.value = h[1]; form.hostPhone.value = '';
        update(); form.dispatchEvent(new Event('change'));
      });
      PW.$$('[data-tab]', el).forEach(function (b) {
        b.addEventListener('click', function () {
          PW.$$('[data-tab]', el).forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
          PW.$$('[data-pane]', el).forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== b.getAttribute('data-tab'); });
        });
      });
      var current;
      PW.$('#lgCopyText', el).addEventListener('click', function () { PW.copy(toText(current), 'Texte'); });

      function update() {
        var d = PW.formData(form), c = CFG[d.country] || CFG.fr, pro = d.kind !== 'perso';
        function show(key, on) { PW.$$('[data-only="' + key + '"]', el).forEach(function (n) { n.hidden = !on; }); }
        show('pro', pro); show('anon', !!c.anon && !pro); show('pec', !!c.pec); show('director', !!c.director);
        show('po', !!c.po); show('dmca', !!c.dmca); show('med', !!c.med && pro); show('dsa', !!c.dsa);
        PW.$('#lg-reg-l', el).textContent = c.reg[0];
        PW.$('#lg-reg', el).placeholder = c.reg[1];
        PW.$('#lg-vat-l', el).textContent = c.vat[0];
        PW.$('#lg-vat', el).placeholder = c.vat[1];
        if (c.po) PW.$('#lg-po-l', el).textContent = c.po;
        PW.$('#lgNote', el).innerHTML = PW.icon('stamp') + ' ' + esc(c.note) + ' <a href="#pays-' + d.country.split('-')[0] + '">Voir la fiche pays</a>';
        current = build(d);
        PW.$('#lgPreview', el).innerHTML = toHTML(current);
        PW.setCode('lgHtml', toHTML(current));
        PW.setCode('lgMd', toMD(current));
        PW.setCode('lgTxt', toText(current));
      }
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      update();
    }
  });
})();
