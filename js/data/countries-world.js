/* Country manuals — Americas, Asia, Oceania. Same shape as countries-europe.js. */
(function () {
  var C = window.PW.countries;

  C.push({
    code: 'us', name: 'États-Unis', group: 'Amériques', verified: '2026-11',
    stamp: { ink: 'blue', shape: 'round', r: -3 },
    summary: 'Aucune déclaration fédérale du site. Tout se joue État par État : création de l’entreprise, sales tax et lois sur la vie privée, Californie en tête.',
    mrz: 'P<USA<<EIN<<LLC<<CCPA<<COPPA<<DMCA<<ADA<<<<<<<',
    facts: [
      ['Déclarer le site', 'Non, il n’existe pas de registre fédéral des sites'],
      ['Déclarer l’activité', 'Dans votre État (LLC, corporation) ou un DBA ; EIN gratuit auprès de l’IRS'],
      ['Page obligatoire', 'Privacy policy (CalOPPA, en pratique pour tous les sites)'],
      ['Autorité des données', 'FTC au niveau fédéral, procureurs des États, CPPA en Californie'],
      ['Seuil de taxe', 'Sales tax : « economic nexus », souvent 100 000 $ de ventes par État'],
      ['Domaine national', '.us (présence aux États-Unis exigée) — ou un .com']
    ],
    sections: [
      { id: 'activite', t: 'Créer votre entreprise',
        do: [
          'Sole proprietorship : aucune formalité au départ ; enregistrer un « DBA » (nom commercial) si vous n’utilisez pas votre propre nom.',
          'LLC : déposer les « Articles of Organization » auprès du Secretary of State de l’État choisi (de 35 à 500 $ selon l’État).',
          'Demander un <strong>EIN</strong> (numéro fiscal) gratuitement sur irs.gov — jamais via un site payant.',
          'Vérifier les licences locales (ville ou comté) : une « business license » est parfois exigée même pour une activité en ligne.',
          'Non-résident sans SSN ni ITIN : l’EIN se demande avec le formulaire SS-4 (fax ou courrier).'
        ] },
      { id: 'domaine', t: 'Nom de domaine',
        do: [
          'Le .us exige un lien avec les États-Unis (citoyen, résident, entreprise ou activité réelle).',
          'Le .com reste le choix par défaut et il est ouvert à tous.',
          'Activer la protection Whois proposée par la plupart des registraires.'
        ] },
      { id: 'pages', t: 'Pages obligatoires',
        do: [
          '<strong>Privacy policy</strong> bien visible : obligatoire (CalOPPA) dès que vous collectez des données de résidents californiens, donc en pratique pour tout site.',
          'Terms of service : conseillés, indispensables si vous vendez ou proposez des comptes.',
          'Contenus publiés par les utilisateurs : désigner un <strong>agent DMCA</strong> auprès du Copyright Office (6 $, à renouveler tous les 3 ans) pour bénéficier de la protection « safe harbor ».',
          'Affiliation et contenus sponsorisés : signaler clairement le lien commercial (FTC Endorsement Guides).'
        ] },
      { id: 'donnees', t: 'Vie privée',
        i: 'Pas de grande loi fédérale : une vingtaine d’États ont leur propre loi (Californie, Virginie, Colorado, Texas…).',
        do: [
          'Vérifier si la Californie (CCPA / CPRA) vous vise : plus de 26,6 M$ de chiffre d’affaires, ou données de 100 000 consommateurs californiens, ou 50 % du chiffre d’affaires tiré de la vente de données.',
          'Si vous êtes visé : lien « Do Not Sell or Share My Personal Information » et respect du signal Global Privacy Control (GPC).',
          'Enfants de moins de 13 ans : <strong>COPPA</strong> — consentement parental vérifiable (règle renforcée, à respecter depuis avril 2026).',
          'Pas de bannière cookies imposée au niveau fédéral, mais une information claire dans la privacy policy.',
          'Données de santé : règles très strictes même pour les petits sites (Washington My Health My Data Act).'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Expédier dans le délai annoncé, ou sous 30 jours si aucun délai n’est donné (FTC Mail Order Rule).',
          'Abonnements : consentement explicite et annulation aussi simple que la souscription (ROSCA, lois des États comme la Californie).',
          'Pas de droit de rétractation fédéral pour la vente en ligne : publiez une politique de retour claire.'
        ] },
      { id: 'taxes', t: 'Sales tax et impôts',
        do: [
          'Vérifier l’<strong>economic nexus</strong> dans chaque État où vous vendez (souvent 100 000 $ de ventes par an).',
          'S’enregistrer pour la sales tax dans votre État si vous vendez des biens taxables (et souvent des produits numériques).',
          'Cinq États n’ont pas de sales tax générale : Alaska (taxes locales seulement), Delaware, Montana, New Hampshire, Oregon.',
          'Indépendant : payer l’impôt fédéral par acomptes trimestriels (estimated tax), plus la self-employment tax.'
        ] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'ADA Title III : les tribunaux l’appliquent souvent aux sites, et les procès contre des sites e-commerce se comptent par milliers chaque année.',
          'Viser <strong>WCAG 2.1 AA</strong>, la référence retenue par le ministère de la Justice pour les sites publics.'
        ] },
      { id: 'autres', t: 'Emails et SMS',
        do: [
          'CAN-SPAM : objet honnête, message identifié comme publicité, adresse postale physique, désinscription traitée sous 10 jours ouvrés.',
          'SMS marketing : consentement écrit préalable (TCPA), avec des amendes élevées par message.'
        ] }
    ],
    links: [
      { t: 'SBA — Business Guide', u: 'https://www.sba.gov/counseling/#business-guide', d: 'Créer et enregistrer une entreprise, étape par étape.' },
      { t: 'IRS — obtenir un EIN', u: 'https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number', d: 'Demande gratuite en ligne.' },
      { t: 'Copyright Office — DMCA Directory', u: 'https://www.copyright.gov/dmca-directory/', d: 'Désigner votre agent DMCA.' },
      { t: 'FTC — Business Guidance', u: 'https://www.ftc.gov/business-guidance', d: 'Vie privée, publicité, avis, ventes en ligne.' },
      { t: 'FTC — COPPA FAQ', u: 'https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions', d: 'Sites visant les moins de 13 ans.' },
      { t: 'FTC — CAN-SPAM', u: 'https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business', d: 'Guide de conformité des emails commerciaux.' },
      { t: 'California Privacy Protection Agency', u: 'https://cppa.ca.gov/', d: 'CCPA / CPRA : règles et seuils.' },
      { t: 'ADA — Web Guidance', u: 'https://www.ada.gov/resources/web-guidance/', d: 'Accessibilité des sites et ADA.' },
      { t: 'about.us', u: 'https://www.about.us/', d: 'Règles du .us.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'ca', name: 'Canada', group: 'Amériques', verified: '2026-11',
    stamp: { ink: 'red', shape: 'rect', r: 4 },
    summary: 'Entreprise à enregistrer dans votre province, vie privée encadrée par la LPRPDE (et la Loi 25 au Québec), et une loi anti-pourriel parmi les plus strictes au monde.',
    mrz: 'P<CAN<<LPRPDE<<LOI25<<LCAP<<TPS<TVH<<CIRA<<<<<',
    facts: [
      ['Déclarer le site', 'Non'],
      ['Déclarer l’activité', 'Registre provincial ou fédéral (Corporations Canada) ; numéro d’entreprise de l’ARC'],
      ['Page obligatoire', 'Politique de confidentialité ; au Québec, site en français'],
      ['Autorité des données', 'Commissariat à la protection de la vie privée (CPVP) ; CAI au Québec'],
      ['Seuil de taxe', 'TPS / TVH : 30 000 $ sur quatre trimestres'],
      ['Domaine national', '.ca, géré par CIRA (présence au Canada exigée)']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        do: [
          'Entreprise individuelle : enregistrer votre nom commercial auprès de votre province (inutile dans certaines provinces si vous utilisez votre nom légal).',
          'Société : constitution provinciale ou fédérale (Corporations Canada, en ligne).',
          'Obtenir un <strong>numéro d’entreprise</strong> (NE) auprès de l’Agence du revenu du Canada.',
          'Québec : immatriculation au Registraire des entreprises si vous n’exercez pas sous vos nom et prénom.'
        ] },
      { id: 'domaine', t: 'Nom de domaine en .ca',
        do: [
          'Le .ca exige une présence canadienne (citoyen, résident permanent, entreprise canadienne, marque déposée au Canada…).',
          'Réserver via un registraire certifié par CIRA.'
        ] },
      { id: 'pages', t: 'Pages obligatoires',
        do: [
          'Politique de confidentialité : finalités, tiers, conservation et façon d’exercer ses droits.',
          'Québec (Loi 25) : publier le titre et les coordonnées du <strong>responsable de la protection des renseignements personnels</strong>.',
          'Québec : site, conditions et contrats disponibles en français (Charte de la langue française, renforcée par la loi 96).',
          'Conditions de vente : prix, frais, livraison, politique de retour et d’annulation.'
        ] },
      { id: 'donnees', t: 'Vie privée',
        do: [
          'Obtenir un consentement valable avant de collecter, utiliser ou communiquer des renseignements personnels (LPRPDE).',
          'Québec : les technologies qui identifient, localisent ou profilent doivent être <strong>désactivées par défaut</strong> ; consentement explicite pour les cookies non essentiels.',
          'Déclarer les atteintes à la sécurité présentant un risque réel de préjudice grave au CPVP (et à la CAI au Québec) et tenir un registre des incidents.',
          'Alberta et Colombie-Britannique ont leur propre loi (PIPA) pour le secteur privé.'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Lois provinciales sur la protection du consommateur : identité, prix total, livraison et politique d’annulation avant la commande.',
          'Envoyer une copie du contrat au client (dans les 15 jours en Ontario et au Québec).'
        ] },
      { id: 'taxes', t: 'TPS / TVH et TVQ',
        do: [
          '<strong>Petit fournisseur</strong> : pas d’inscription obligatoire à la TPS/TVH tant que vos ventes restent sous 30 000 $ sur quatre trimestres civils consécutifs.',
          'Québec : même seuil pour la TVQ auprès de Revenu Québec.',
          'Vendeur étranger de services numériques aux Canadiens : inscription simplifiée dès 30 000 $ de ventes.',
          'Taux combinés de 5 % (TPS seule) à 15 % (TVH) selon la province du client.'
        ] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'Ontario (LAPHO / AODA) : sites des organisations de 50 employés ou plus conformes aux WCAG 2.0 AA.',
          'Organisations sous réglementation fédérale : Loi canadienne sur l’accessibilité.',
          'Pour tous : viser WCAG 2.1 AA.'
        ] },
      { id: 'autres', t: 'Courriels commerciaux (LCAP)',
        do: [
          'Consentement exprès ou tacite avant tout courriel commercial.',
          'Identifier l’expéditeur et offrir un lien de désabonnement, traité sous 10 jours ouvrables.',
          'Garder la preuve de chaque consentement (date, méthode, texte affiché).'
        ],
        n: [['warn', 'Les sanctions de la LCAP peuvent atteindre 10 M$ par violation pour une entreprise.']] }
    ],
    links: [
      { t: 'Lancer une entreprise (Canada.ca)', u: 'https://www.canada.ca/fr/services/entreprises/lancer.html', d: 'Le point d’entrée fédéral.' },
      { t: 'Corporations Canada', u: 'https://ised-isde.canada.ca/site/corporations-canada/fr', d: 'Constitution fédérale en ligne.' },
      { t: 'ARC — numéro d’entreprise', u: 'https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/inscription-entreprise/numero-entreprise-comptes-programme/besoin-ne.html', d: 'Savoir s’il vous faut un NE et l’obtenir (en ligne uniquement depuis novembre 2025).' },
      { t: 'ARC — TPS/TVH', u: 'https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/tps-tvh-entreprises.html', d: 'Inscription, seuil du petit fournisseur, taux.' },
      { t: 'Commissariat à la protection de la vie privée', u: 'https://www.priv.gc.ca/fr/', d: 'LPRPDE et guides pour les entreprises.' },
      { t: 'Commission d’accès à l’information du Québec', u: 'https://www.cai.gouv.qc.ca/', d: 'Loi 25 et obligations au Québec.' },
      { t: 'CRTC — Loi canadienne anti-pourriel', u: 'https://crtc.gc.ca/fra/internet/anti.htm', d: 'Règles de la LCAP.' },
      { t: 'Registraire des entreprises du Québec', u: 'https://www.registreentreprises.gouv.qc.ca/', d: 'Immatriculation au Québec.' },
      { t: 'Office québécois de la langue française', u: 'https://www.oqlf.gouv.qc.ca/', d: 'Obligations linguistiques des entreprises.' },
      { t: 'AODA — sites web accessibles', u: 'https://www.ontario.ca/page/how-make-websites-accessible', d: 'Exigences en Ontario.' },
      { t: 'CIRA', u: 'https://www.cira.ca/fr/', d: 'Registre du .ca.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'banniere-cookies', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'in', name: 'Inde', group: 'Asie et Océanie', verified: '2026-11',
    stamp: { ink: 'green', shape: 'round', r: 5 },
    summary: 'Pas d’enregistrement du site, mais la GST, des règles e-commerce (grievance officer) et la loi DPDP sur les données, qui entre en vigueur par étapes jusqu’en mai 2027.',
    mrz: 'P<IND<<DPDP<<GST<<UDYAM<<MCA<<CERT<IN<<<<<<<<',
    facts: [
      ['Déclarer le site', 'Non'],
      ['Déclarer l’activité', 'Udyam (statut MSME, gratuit) ; société via le MCA (SPICe+)'],
      ['Page obligatoire', 'Privacy policy, conditions, coordonnées du grievance officer'],
      ['Autorité des données', 'Data Protection Board of India (DPDP Act 2023)'],
      ['Seuil de taxe', 'GST : 20 lakh ₹ (services) / 40 lakh ₹ (biens), moins dans certains États'],
      ['Domaine national', '.in, géré par NIXI (ouvert à tous)']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        do: [
          'Entreprise individuelle : pas d’immatriculation centrale ; obtenir un PAN, ouvrir un compte bancaire, puis la GST et la licence « Shop & Establishment » selon l’État.',
          'S’inscrire gratuitement sur le portail <strong>Udyam</strong> (statut MSME, accès aux aides).',
          'Private Limited ou LLP : immatriculation en ligne auprès du Ministry of Corporate Affairs (formulaire SPICe+).',
          'Fondateur étranger : une Private Limited avec au moins un directeur résident en Inde est la structure la plus courante.'
        ] },
      { id: 'domaine', t: 'Nom de domaine en .in',
        do: [
          'Le .in est ouvert à tous via un registraire accrédité par NIXI.',
          'Il existe aussi des noms en langues indiennes (.भारत).'
        ] },
      { id: 'pages', t: 'Pages obligatoires',
        do: [
          'Privacy policy publiée (IT Act 2000 et règles SPDI de 2011, remplacées progressivement par le DPDP).',
          'E-commerce : nom légal, adresse, coordonnées du service client et du <strong>grievance officer</strong> (Consumer Protection E-Commerce Rules 2020).',
          'Plateforme avec contenus d’utilisateurs : grievance officer, accusé de réception sous 24 heures et traitement sous 15 jours (IT Rules 2021).',
          'Terms of use et conditions de vente.'
        ] },
      { id: 'donnees', t: 'Données personnelles (DPDP)',
        i: 'Les règles du Digital Personal Data Protection Act ont été publiées le 13 novembre 2025, avec 18 mois pour s’y conformer.',
        do: [
          'Préparer dès maintenant : la plupart des obligations s’appliquent à partir de <strong>mai 2027</strong> (le gouvernement a annoncé vouloir raccourcir ce délai).',
          'Avis de consentement clair et séparé, disponible en anglais ou dans l’une des 22 langues de la Constitution.',
          'Mineurs (moins de 18 ans) : consentement vérifiable des parents.',
          'Fuite de données : informer le Data Protection Board et les personnes concernées.',
          'Incident de cybersécurité : signaler au CERT-In sous 6 heures et conserver les journaux 180 jours (directives de 2022).'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Afficher le prix total, la politique de retour et de remboursement, les moyens de paiement et le pays d’origine des produits.',
          'Dark patterns interdits (lignes directrices de 2023) : fausse urgence, produits ajoutés au panier sans accord…',
          'Faux avis interdits.'
        ] },
      { id: 'taxes', t: 'GST',
        do: [
          'Inscription à la GST au-delà de 20 lakh ₹ de chiffre d’affaires pour les services (40 lakh ₹ pour les biens dans la plupart des États, 10 lakh ₹ dans certains États).',
          'Vente de biens d’un État à un autre (interstate) : inscription GST en général obligatoire quel que soit le montant.',
          'Export de services vers des clients étrangers : déposer une LUT pour facturer sans GST.',
          'Vendeur étranger de services numériques à des particuliers indiens (OIDAR) : inscription obligatoire sans seuil.',
          'Taux de 18 % pour la plupart des services numériques.'
        ] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'Rights of Persons with Disabilities Act 2016 : obligation d’accessibilité des services publics et des services numériques.',
          'Standards GIGW 3.0 (basés sur les WCAG) pour les sites publics ; viser WCAG 2.1 AA pour tous.'
        ] }
    ],
    links: [
      { t: 'Ministry of Corporate Affairs', u: 'https://www.mca.gov.in/', d: 'Immatriculer une société (SPICe+).' },
      { t: 'Udyam Registration', u: 'https://udyamregistration.gov.in/', d: 'Inscription MSME gratuite.' },
      { t: 'GST Portal', u: 'https://www.gst.gov.in/', d: 'Inscription et déclarations GST.' },
      { t: 'MeitY', u: 'https://www.meity.gov.in/', d: 'Ministère du numérique : DPDP Act, IT Rules.' },
      { t: 'CERT-In', u: 'https://www.cert-in.org.in/', d: 'Signalement des incidents de cybersécurité.' },
      { t: 'Department of Consumer Affairs', u: 'https://consumeraffairs.nic.in/', d: 'E-Commerce Rules, dark patterns.' },
      { t: 'Startup India', u: 'https://www.startupindia.gov.in/', d: 'Reconnaissance startup et aides.' },
      { t: 'India Code', u: 'https://www.indiacode.nic.in/', d: 'Textes de loi officiels (IT Act, DPDP Act).' },
      { t: 'Registry .IN', u: 'https://www.registry.in/', d: 'Registre du .in.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'au', name: 'Australie', group: 'Asie et Océanie', verified: '2026-11',
    stamp: { ink: 'violet', shape: 'oval', r: -4 },
    summary: 'Un numéro ABN gratuit pour démarrer, la GST à partir de 75 000 AUD, et une loi sur la vie privée qui exempte encore la plupart des petites entreprises.',
    mrz: 'P<AUS<<ABN<<ASIC<<APP<<OAIC<<SPAM<ACT<<<<<<<<',
    facts: [
      ['Déclarer le site', 'Non'],
      ['Déclarer l’activité', 'ABN (gratuit) et nom commercial auprès de l’ASIC'],
      ['Page obligatoire', 'Privacy policy si vous êtes soumis à la Privacy Act'],
      ['Autorité des données', 'OAIC'],
      ['Seuil de taxe', 'GST : 75 000 AUD par an'],
      ['Domaine national', '.au et .com.au, gérés par auDA (présence en Australie exigée)']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        do: [
          'Demander un <strong>ABN</strong> (Australian Business Number) gratuitement sur abr.gov.au.',
          'Enregistrer votre nom commercial auprès de l’ASIC si vous n’utilisez pas votre propre nom.',
          'Société (Pty Ltd) : immatriculation auprès de l’ASIC ; au moins un directeur doit résider en Australie.',
          'Chaque directeur de société doit avoir un Director ID.'
        ] },
      { id: 'domaine', t: 'Nom de domaine en .au',
        do: [
          'Le .au et le .com.au exigent une présence australienne (citoyen, résident, entreprise ou marque déposée en Australie).',
          'Réserver via un registraire accrédité par auDA.'
        ] },
      { id: 'pages', t: 'Pages obligatoires',
        do: [
          'Privacy policy conforme aux Australian Privacy Principles (APP 1) si vous êtes soumis à la loi.',
          'Prix totaux affichés et conditions claires (Australian Consumer Law).',
          'ABN sur les factures et devis.'
        ] },
      { id: 'donnees', t: 'Vie privée',
        do: [
          'Vérifier l’exemption « small business » : moins de 3 M AUD de chiffre d’affaires, pas de données de santé et pas de commerce de données personnelles.',
          'Même exempté : publier une privacy policy, que les clients et les services (paiement, publicité) attendent.',
          'Décisions automatisées (IA, scoring) : à décrire dans la privacy policy à partir du 10 décembre 2026.',
          'Pas de bannière cookies imposée par la loi, mais une information claire dans la privacy policy.'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Garanties consommateur de l’Australian Consumer Law : impossible de les exclure (« pas de remboursement » est interdit).',
          'Clauses abusives dans les contrats types : sanctionnées par des amendes depuis novembre 2023.'
        ] },
      { id: 'taxes', t: 'GST',
        do: [
          'Inscription à la GST dès <strong>75 000 AUD</strong> de chiffre d’affaires annuel (150 000 AUD pour une association) ; taux de 10 %.',
          'Déclarations via le Business Activity Statement (BAS).',
          'Vendeur étranger de services numériques ou de petits biens à des Australiens : même seuil de 75 000 AUD.'
        ] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'Disability Discrimination Act 1992 : un site inaccessible peut être considéré comme discriminatoire.',
          'Viser WCAG 2.1 AA, recommandé par la Commission australienne des droits de l’homme.'
        ] },
      { id: 'autres', t: 'Emails et SMS (Spam Act)',
        do: [
          'Consentement avant tout message commercial (email, SMS).',
          'Identifier l’expéditeur et traiter les désinscriptions sous 5 jours ouvrés.'
        ] }
    ],
    links: [
      { t: 'Australian Business Register', u: 'https://www.abr.gov.au/', d: 'Demande d’ABN gratuite.' },
      { t: 'ASIC — enregistrer un nom commercial', u: 'https://www.asic.gov.au/for-business-and-companies/business-names/register-a-business-name', d: 'Nom commercial et sociétés.' },
      { t: 'business.gov.au', u: 'https://business.gov.au/', d: 'Guide officiel pour créer une entreprise.' },
      { t: 'ATO — GST', u: 'https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst', d: 'Inscription et déclarations GST.' },
      { t: 'OAIC', u: 'https://www.oaic.gov.au/', d: 'Privacy Act et Australian Privacy Principles.' },
      { t: 'ACMA — Spam', u: 'https://www.acma.gov.au/avoid-sending-spam', d: 'Règles du Spam Act.' },
      { t: 'ACCC', u: 'https://www.accc.gov.au/', d: 'Droit de la consommation.' },
      { t: 'Australian Business Registry Services', u: 'https://www.abrs.gov.au/', d: 'Director ID.' },
      { t: 'auDA', u: 'https://www.auda.org.au/', d: 'Règles du .au.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'br', name: 'Brésil', group: 'Amériques', verified: '2026-11',
    stamp: { ink: 'green', shape: 'rect', r: -5 },
    summary: 'Le statut MEI permet de démarrer en ligne jusqu’à 81 000 R$ par an. Le CNPJ doit apparaître sur un site de vente, et la LGPD protège les données.',
    mrz: 'P<BRA<<LGPD<<ANPD<<MEI<<CNPJ<<MARCO<CIVIL<<<<<',
    facts: [
      ['Déclarer le site', 'Non'],
      ['Déclarer l’activité', 'MEI (portail gov.br, gratuit) ou société — numéro CNPJ'],
      ['Page obligatoire', 'CNPJ ou CPF, adresse et contact sur le site (décret 7.962/2013)'],
      ['Autorité des données', 'ANPD'],
      ['Plafond MEI', '81 000 R$ par an (des hausses sont en discussion)'],
      ['Domaine national', '.com.br et .br, gérés par Registro.br (CPF ou CNPJ exigé)']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        do: [
          '<strong>MEI</strong> : inscription gratuite sur le Portal do Empreendedor (gov.br), CNPJ immédiat, pour un chiffre d’affaires jusqu’à 81 000 R$ par an.',
          'Toutes les activités ne sont pas admises en MEI (beaucoup de métiers intellectuels en sont exclus) : vérifiez la liste des occupations autorisées.',
          'MEI : payer le DAS mensuel (montant fixe) et faire la déclaration annuelle (DASN-SIMEI).',
          'Au-delà, ou activité non admise : microentreprise (ME) au Simples Nacional, avec un comptable.'
        ],
        n: [['info', 'Dépassement de moins de 20 % (jusqu’à 97 200 R$) : vous restez MEI jusqu’à la fin de l’année en payant un complément. Au-delà, il faut changer de régime.']] },
      { id: 'domaine', t: 'Nom de domaine en .br',
        do: [
          'Réserver directement sur Registro.br avec un CPF (personne) ou un CNPJ (entreprise).',
          'Entreprise étrangère : passer par un représentant légal au Brésil.'
        ] },
      { id: 'pages', t: 'Pages obligatoires',
        do: [
          'Afficher en évidence : nom ou raison sociale, <strong>CNPJ</strong> (ou CPF), adresse physique et électronique (décret 7.962/2013).',
          'Política de privacidade (LGPD).',
          'Termos de uso et conditions de vente, en portugais.'
        ] },
      { id: 'donnees', t: 'Données personnelles (LGPD)',
        do: [
          'Une base légale pour chaque traitement (LGPD, article 7).',
          'Désigner un « encarregado » (DPO) — les petites structures en sont dispensées mais doivent offrir un canal de contact.',
          'Cookies non essentiels : consentement, selon le guide de l’ANPD.',
          'Incident de sécurité : prévenir l’ANPD sous 3 jours ouvrables.',
          'Marco Civil da Internet : une entreprise qui exploite une application internet conserve les journaux d’accès 6 mois.'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Droit de rétractation de <strong>7 jours</strong> pour les achats en ligne (Code de défense du consommateur, article 49), remboursement intégral.',
          'Service client accessible et confirmation immédiate de la commande.',
          'Prix affichés toutes taxes comprises.'
        ] },
      { id: 'taxes', t: 'Impôts et factures',
        do: [
          'Émettre une nota fiscal électronique (NFS-e pour les services) pour chaque vente.',
          'Réforme fiscale : la TVA duale (CBS fédérale et IBS) remplace progressivement les anciens impôts de 2026 à 2033 ; 2026 est une année de test.'
        ] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'Lei Brasileira de Inclusão (article 63) : l’accessibilité est obligatoire pour les sites des entreprises qui ont leur siège ou une représentation au Brésil.',
          'Viser WCAG 2.1 AA (le gouvernement publie aussi le modèle eMAG).'
        ] },
      { id: 'autres', t: 'Contenus des utilisateurs',
        do: [
          'Depuis une décision de la Cour suprême (STF, 2025), une plateforme peut être tenue responsable si elle ne retire pas certains contenus illicites après notification, sans attendre une décision de justice.'
        ] }
    ],
    links: [
      { t: 'Portal do Empreendedor (MEI)', u: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor', d: 'Ouvrir et gérer un MEI.' },
      { t: 'Redesim', u: 'https://www.gov.br/empresas-e-negocios/pt-br/redesim', d: 'Ouverture d’entreprises (ME, LTDA).' },
      { t: 'ANPD', u: 'https://www.gov.br/anpd/pt-br', d: 'Autorité de protection des données, guides LGPD.' },
      { t: 'LGPD (Lei 13.709/2018)', u: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm', d: 'Texte officiel.' },
      { t: 'Décret 7.962/2013 (e-commerce)', u: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm', d: 'Informations obligatoires des sites de vente.' },
      { t: 'Marco Civil da Internet', u: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm', d: 'Loi 12.965/2014.' },
      { t: 'Receita Federal', u: 'https://www.gov.br/receitafederal/pt-br', d: 'CNPJ, impôts, réforme fiscale.' },
      { t: 'consumidor.gov.br', u: 'https://www.consumidor.gov.br/', d: 'Plateforme publique de réclamations.' },
      { t: 'Registro.br', u: 'https://registro.br/', d: 'Registre du .br.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'banniere-cookies', 'seuils-tva', 'checklist']
  });
})();
