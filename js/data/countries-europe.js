/* Country manuals — Europe (EU rules + 7 countries).
 * Shape of one country:
 *   code, name, group, verified ('YYYY-MM'), stamp {ink, shape, r}, summary,
 *   mrz (decorative passport line), facts [[label, value]],
 *   sections [{ id, t: title, i: intro, do: [to-do items], n: [[kind, text]] }]
 *     kind = 'info' | 'warn' | 'ok'
 *   links [{ t, u, d }], tools [tool ids]
 * Section ids are shared by every country (activite, domaine, pages, donnees,
 * vente, taxes, accessibilite, autres) so the checklist tool can merge them.
 * Small HTML (<strong>, <code>, <a>) is allowed in text. */
(function () {
  var C = window.PW.countries;

  C.push({
    code: 'eu', name: 'Union européenne', group: 'Règles communes', verified: '2026-11',
    stamp: { ink: 'blue', shape: 'round', r: 4 },
    summary: 'Les règles qui s’ajoutent aux règles nationales dès que votre site vise des visiteurs dans l’UE, où que vous soyez installé.',
    mrz: 'P<EUR<<RGPD<<EPRIVACY<<DSA<<EAA<<OSS<<<<<<<<<<',
    facts: [
      ['Données personnelles', 'RGPD (règlement 2016/679)'],
      ['Cookies', 'Directive ePrivacy : consentement avant les traceurs non essentiels'],
      ['Contenus des utilisateurs', 'DSA (règlement 2022/2065)'],
      ['Accessibilité', 'Acte européen (EAA) en vigueur depuis le 28 juin 2025'],
      ['TVA ventes à distance', 'Au-delà de 10 000 € par an dans l’UE : guichet OSS'],
      ['Litiges consommateurs', 'Plateforme RLL fermée le 20 juillet 2025']
    ],
    sections: [
      { id: 'donnees', t: 'Données personnelles (RGPD)',
        i: 'Le RGPD s’applique dès que vous traitez des données de personnes situées dans l’UE, même depuis l’extérieur de l’UE si vous ciblez des Européens (article 3). Un simple formulaire de contact suffit pour être concerné.',
        do: [
          'Lister les données que le site collecte (formulaire, comptes, newsletter, statistiques, journaux du serveur) dans un <strong>registre des traitements</strong>.',
          'Choisir une base légale pour chaque usage : consentement, contrat, intérêt légitime ou obligation légale.',
          'Publier une <strong>politique de confidentialité</strong> claire : qui, quelles données, pourquoi, combien de temps, quels droits, quel contact.',
          'Signer un contrat de sous-traitance (DPA) avec l’hébergeur, l’outil d’emailing et l’outil de statistiques.',
          'Vérifier les transferts hors UE (services américains : EU-US Data Privacy Framework ou clauses contractuelles types).',
          'Prévoir comment répondre aux demandes d’accès ou de suppression : délai d’un mois.',
          'En cas de fuite de données à risque : prévenir l’autorité de contrôle sous 72 heures.'
        ],
        n: [['warn', 'Installé hors de l’UE mais vous ciblez des Européens ? Il faut en général désigner un <strong>représentant dans l’UE</strong> (article 27), sauf traitement occasionnel et à faible risque.']] },
      { id: 'cookies', t: 'Cookies et traceurs',
        i: 'La directive ePrivacy impose le consentement avant de lire ou déposer un traceur qui n’est pas strictement nécessaire au service.',
        do: [
          'Ne déposer aucun cookie non essentiel (statistiques avec identifiant, publicité, boutons de réseaux sociaux) avant le choix du visiteur.',
          'Proposer un bouton « Tout refuser » aussi visible que « Tout accepter ».',
          'Permettre de changer d’avis à tout moment (lien « Gérer les cookies » en pied de page).',
          'Garder une preuve du consentement (date, choix, version du texte).'
        ],
        n: [['ok', 'Une mesure d’audience anonyme et sans cookie (Plausible, Umami, Matomo configuré sans cookie…) permet souvent de se passer de bannière. Vérifiez la position de l’autorité de votre pays.']] },
      { id: 'autres', t: 'Contenus des utilisateurs (DSA)',
        i: 'Le règlement sur les services numériques concerne tout service intermédiaire : forum, commentaires, marketplace, hébergement de fichiers.',
        do: [
          'Indiquer un <strong>point de contact électronique</strong> unique pour les autorités et pour les utilisateurs.',
          'Décrire dans vos conditions d’utilisation les règles de modération.',
          'Hébergeur de contenus : proposer un moyen de signaler un contenu illicite et motiver chaque retrait auprès de l’auteur.',
          'Installé hors de l’UE : désigner un représentant légal dans l’UE.'
        ],
        n: [['info', 'Les micro et petites entreprises sont dispensées des obligations les plus lourdes (rapports de transparence, système interne de réclamation).']] },
      { id: 'vente', t: 'Vendre en ligne aux consommateurs',
        i: 'La directive sur les droits des consommateurs fixe un socle commun dans tous les pays de l’UE.',
        do: [
          'Donner avant la commande : identité du vendeur, prix TTC, frais de livraison, délais, droit de rétractation.',
          'Droit de rétractation de <strong>14 jours</strong> avec un formulaire type.',
          'Bouton de commande explicite (par exemple « Commander avec obligation de paiement »).',
          'Réductions de prix : afficher le prix le plus bas des 30 derniers jours (directive Omnibus).',
          'Avis clients : indiquer si et comment ils sont vérifiés.'
        ],
        n: [['warn', 'Le lien vers la plateforme européenne de règlement en ligne des litiges (RLL / ODR) n’est plus obligatoire depuis sa fermeture le 20 juillet 2025 : retirez-le de vos CGV. Les obligations nationales sur la médiation restent.']] },
      { id: 'taxes', t: 'TVA entre pays de l’UE',
        i: 'Pour les ventes à des particuliers d’autres pays de l’UE, la TVA du pays du client s’applique au-delà d’un seuil commun.',
        do: [
          'Ventes à distance de biens et services numériques B2C : au-delà de <strong>10 000 €</strong> par an (total UE), appliquer la TVA du pays du client.',
          'S’inscrire au guichet unique <strong>OSS</strong> dans votre pays pour déclarer cette TVA en une seule fois.',
          'Clients professionnels : vérifier leur numéro de TVA sur VIES (autoliquidation).'
        ],
        n: [['info', 'Depuis 2025, un régime de franchise transfrontalier permet, sous conditions, de rester en franchise dans d’autres pays de l’UE si votre chiffre d’affaires total dans l’UE ne dépasse pas 100 000 €.']] },
      { id: 'accessibilite', t: 'Accessibilité (EAA)',
        i: 'Depuis le 28 juin 2025, l’acte européen sur l’accessibilité impose que les sites de commerce en ligne et certains services (banque, transport, livres numériques) soient accessibles.',
        do: [
          'Viser le niveau <strong>WCAG 2.1 AA</strong> (norme européenne EN 301 549).',
          'Publier des informations sur l’accessibilité du service (déclaration d’accessibilité).',
          'Les micro-entreprises de services (moins de 10 personnes et moins de 2 M€ de chiffre d’affaires) sont exemptées.'
        ] },
      { id: 'ia', t: 'Intelligence artificielle sur votre site',
        i: 'Le règlement européen sur l’IA (AI Act) prévoit des obligations de transparence (article 50) applicables à partir d’août 2026.',
        do: [
          'Un chatbot doit dire clairement à l’utilisateur qu’il parle à une IA.',
          'Images, sons ou vidéos réalistes générés par IA (« deepfakes ») : les signaler comme tels.',
          'Vérifiez le calendrier exact sur le site de la Commission : des reports de certaines obligations ont été discutés.'
        ] }
    ],
    links: [
      { t: 'Texte du RGPD (EUR-Lex)', u: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679', d: 'Le règlement complet, en français.' },
      { t: 'Comité européen de la protection des données', u: 'https://www.edpb.europa.eu/', d: 'Lignes directrices communes à toutes les autorités.' },
      { t: 'Digital Services Act', u: 'https://digital-strategy.ec.europa.eu/fr/policies/digital-services-act-package', d: 'Présentation officielle du DSA.' },
      { t: 'Guichet unique TVA (OSS)', u: 'https://vat-one-stop-shop.ec.europa.eu/', d: 'Règles et seuils de TVA pour la vente en ligne dans l’UE.' },
      { t: 'VIES — vérifier un numéro de TVA', u: 'https://ec.europa.eu/taxation_customs/vies/', d: 'Contrôle gratuit des numéros de TVA intracommunautaires.' },
      { t: 'L’Europe est à vous — Entreprises', u: 'https://europa.eu/youreurope/business/index_fr.htm', d: 'Guide officiel pour entreprendre dans un autre pays de l’UE.' },
      { t: 'Cadre réglementaire sur l’IA', u: 'https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai', d: 'Calendrier et obligations de l’AI Act.' }
    ],
    tools: ['confidentialite', 'banniere-cookies', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'fr', name: 'France', group: 'Union européenne', eu: true, verified: '2026-11',
    stamp: { ink: 'blue', shape: 'rect', r: -4 },
    summary: 'Pas de déclaration du site lui-même, mais des mentions légales obligatoires, le RGPD et, si le site rapporte de l’argent, une activité à déclarer.',
    mrz: 'P<FRA<<MENTIONS<LEGALES<<RGPD<<CNIL<<SIRET<<<<<<',
    facts: [
      ['Déclarer le site', 'Non : la déclaration CNIL n’existe plus depuis 2018'],
      ['Déclarer l’activité', 'Oui dès qu’il y a des revenus : guichet unique (INPI)'],
      ['Page obligatoire', 'Mentions légales (LCEN, article 6)'],
      ['Autorité des données', 'CNIL'],
      ['Seuil de TVA', '37 500 € (services) ou 85 000 € (ventes)'],
      ['Domaine national', '.fr, géré par l’Afnic (résidents UE)']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        i: 'Un blog personnel sans revenus n’a rien à déclarer. Dès que le site rapporte régulièrement de l’argent (vente, prestations, publicité, affiliation), c’est une activité professionnelle.',
        do: [
          'Choisir un statut : <strong>micro-entreprise</strong> (le plus simple pour démarrer), entreprise individuelle au réel, ou société (SASU, EURL…).',
          'Déclarer la création sur le <strong>guichet unique</strong> formalites.entreprises.gouv.fr — gratuit pour une micro-entreprise.',
          'Recevoir votre numéro SIREN / SIRET (Insee), à afficher dans les mentions légales.',
          'Micro-entrepreneur : déclarer votre chiffre d’affaires chaque mois ou chaque trimestre sur autoentrepreneur.urssaf.fr.',
          'Ouvrir un compte bancaire dédié (obligatoire si le chiffre d’affaires dépasse 10 000 € deux années de suite).'
        ],
        n: [['warn', 'Méfiez-vous des sites qui font payer la création d’une micro-entreprise : la démarche officielle est gratuite.']] },
      { id: 'domaine', t: 'Nom de domaine en .fr',
        do: [
          'Vérifier la disponibilité sur le site de l’Afnic ou chez un bureau d’enregistrement (OVHcloud, Gandi, Infomaniak…).',
          'Le .fr est ouvert aux personnes et entreprises de l’UE, d’Islande, du Liechtenstein, de Norvège et de Suisse.',
          'Donner des coordonnées exactes : un nom aux données fausses peut être supprimé.',
          'Activer le renouvellement automatique pour ne jamais perdre le nom.'
        ],
        n: [['info', 'Pour un particulier, les coordonnées du titulaire sont masquées par défaut dans l’annuaire Whois.']] },
      { id: 'pages', t: 'Mentions légales et pages obligatoires',
        i: 'La loi pour la confiance dans l’économie numérique (LCEN) oblige tout site à identifier son éditeur et son hébergeur.',
        do: [
          '<strong>Mentions légales</strong> : éditeur (nom ou dénomination, adresse, téléphone, email), directeur de la publication, hébergeur (nom, adresse, téléphone).',
          'Professionnel : SIREN, immatriculation (RCS ou RNE), capital social pour une société, numéro de TVA intracommunautaire.',
          'Politique de confidentialité (RGPD).',
          'CGV si vous vendez ; CGU si les visiteurs créent un compte ou publient du contenu.',
          'Un lien permanent « Gestion des cookies » si vous utilisez des traceurs.'
        ],
        n: [
          ['info', 'Particulier non professionnel : vous pouvez rester anonyme en indiquant seulement votre hébergeur, à condition de lui avoir donné votre identité.'],
          ['warn', 'Pas de mentions légales : jusqu’à un an de prison et 75 000 € d’amende pour une personne, 375 000 € pour une société.']
        ] },
      { id: 'donnees', t: 'Données personnelles et cookies',
        i: 'La CNIL contrôle l’application du RGPD et publie de nombreux modèles gratuits.',
        do: [
          'Tenir un registre des traitements (modèle gratuit sur cnil.fr).',
          'Bannière cookies : « Tout refuser » au même niveau que « Tout accepter », aucun traceur avant le choix.',
          'Mesure d’audience : certains outils bien configurés sont dispensés de consentement (liste publiée par la CNIL).',
          'Redemander le consentement au bout de 6 mois environ ; durée de vie des traceurs : 13 mois maximum.',
          'Formulaire de contact : ne demander que le nécessaire, avec une mention d’information sous le formulaire.'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'CGV accessibles avant la commande ; prix TTC, frais et délais de livraison.',
          'Droit de rétractation de 14 jours et formulaire type de rétractation.',
          'Adhérer à un <strong>médiateur de la consommation</strong> et afficher ses coordonnées (obligatoire en B2C).',
          'Vente de biens : mentionner la garantie légale de conformité (2 ans).',
          'Factures entre entreprises : la réception de factures électroniques est obligatoire pour toutes les entreprises depuis le 1er septembre 2026 ; l’émission le devient pour les PME et micro-entreprises le 1er septembre 2027.'
        ] },
      { id: 'taxes', t: 'TVA et impôts',
        do: [
          '<strong>Franchise en base</strong> : pas de TVA facturée tant que le chiffre d’affaires reste sous 37 500 € (services) ou 85 000 € (ventes, hébergement). Mention sur les factures : « TVA non applicable, art. 293 B du CGI ».',
          'Au-delà : demander un numéro de TVA intracommunautaire et facturer la TVA (20 % au taux normal).',
          'Ventes à des particuliers d’autres pays de l’UE au-delà de 10 000 € : guichet OSS sur impots.gouv.fr.',
          'Déclarer les revenus du site (BIC ou BNC) sur votre déclaration de revenus.'
        ],
        n: [['warn', 'La réforme qui devait abaisser ces seuils à 25 000 € a été abandonnée : 37 500 € et 85 000 € restent en vigueur en 2026. Vérifiez chaque année sur impots.gouv.fr.']] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'Organismes publics : référentiel RGAA obligatoire et déclaration d’accessibilité.',
          'E-commerce et services visés par l’acte européen : obligation depuis le 28 juin 2025 (sauf micro-entreprises de services).',
          'Pour tous : viser WCAG 2.1 AA, c’est aussi bon pour le référencement.'
        ] },
      { id: 'autres', t: 'Emails, contenus et droit d’auteur',
        do: [
          'Newsletter vers des particuliers : consentement préalable (case non pré-cochée).',
          'Prospection vers des professionnels : possible sans consentement si le message concerne leur métier, avec un lien de désinscription.',
          'Commentaires ou forum : retirer rapidement un contenu manifestement illicite qui vous est signalé.',
          'Images et textes : n’utiliser que des contenus dont vous avez les droits (banques libres, licences Creative Commons).'
        ] }
    ],
    links: [
      { t: 'Guichet unique des formalités d’entreprises', u: 'https://formalites.entreprises.gouv.fr/', d: 'Créer, modifier ou fermer une entreprise (gratuit pour une micro-entreprise).' },
      { t: 'Portail auto-entrepreneur de l’Urssaf', u: 'https://www.autoentrepreneur.urssaf.fr/', d: 'Déclarer et payer vos cotisations de micro-entrepreneur.' },
      { t: 'Mentions obligatoires d’un site internet', u: 'https://entreprendre.service-public.fr/vosdroits/F31228', d: 'La fiche officielle du service public.' },
      { t: 'CNIL', u: 'https://www.cnil.fr/', d: 'RGPD, modèles de registre, conseils pratiques.' },
      { t: 'CNIL — cookies et traceurs', u: 'https://www.cnil.fr/fr/cookies-et-autres-traceurs', d: 'Règles et exemples de bannières conformes.' },
      { t: 'Afnic', u: 'https://www.afnic.fr/', d: 'Registre du .fr : disponibilité et règles d’attribution.' },
      { t: 'impots.gouv.fr — professionnels', u: 'https://www.impots.gouv.fr/professionnel', d: 'TVA, franchise en base, guichet OSS.' },
      { t: 'Médiation de la consommation', u: 'https://www.economie.gouv.fr/mediation-conso', d: 'Liste des médiateurs agréés.' },
      { t: 'Accessibilité numérique (RGAA)', u: 'https://accessibilite.numerique.gouv.fr/', d: 'Le référentiel officiel et ses critères.' },
      { t: 'LCEN sur Légifrance', u: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164', d: 'Le texte de loi sur les mentions légales.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'banniere-cookies', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'be', name: 'Belgique', group: 'Union européenne', eu: true, verified: '2026-11',
    stamp: { ink: 'red', shape: 'oval', r: 3 },
    summary: 'Activité à inscrire à la Banque-Carrefour des Entreprises via un guichet d’entreprises, informations d’identification obligatoires sur le site, franchise de TVA jusqu’à 25 000 €.',
    mrz: 'P<BEL<<BCE<<CDE<<APD<<GBA<<TVA<<<<<<<<<<<<<<<',
    facts: [
      ['Déclarer le site', 'Non'],
      ['Déclarer l’activité', 'Oui : Banque-Carrefour des Entreprises (BCE) via un guichet agréé'],
      ['Page obligatoire', 'Identification du prestataire (Code de droit économique, livre XII)'],
      ['Autorité des données', 'Autorité de protection des données (APD)'],
      ['Seuil de TVA', 'Franchise jusqu’à 25 000 € par an'],
      ['Domaine national', '.be, géré par DNS Belgium (ouvert à tous)']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        i: 'Indépendant à titre principal ou complémentaire, vous devez être inscrit avant de commencer.',
        do: [
          'S’inscrire à la <strong>BCE</strong> via un guichet d’entreprises agréé (inscription payante, tarif indexé chaque année).',
          'S’affilier à une caisse d’assurances sociales pour indépendants avant le début de l’activité.',
          'Activer votre numéro de TVA (par le guichet ou sur MyMinfin), même si vous êtes en franchise.',
          'Ouvrir un compte bancaire dédié à l’activité.'
        ],
        n: [['info', 'Revenus vraiment occasionnels : renseignez-vous sur le régime des revenus divers avant de vous inscrire comme indépendant.']] },
      { id: 'domaine', t: 'Nom de domaine en .be',
        do: [
          'Le .be est ouvert à tous, sans condition de résidence, via un bureau d’enregistrement agréé par DNS Belgium.',
          'Pensez aussi à .brussels ou .vlaanderen pour un ancrage local.',
          'Donner des coordonnées exactes et activer le renouvellement automatique.'
        ] },
      { id: 'pages', t: 'Informations obligatoires sur le site',
        i: 'Le Code de droit économique (article XII.6) liste ce que tout prestataire en ligne doit afficher de façon facile et permanente.',
        do: [
          'Nom ou dénomination sociale, adresse géographique, adresse email.',
          'Numéro d’entreprise (BCE) et numéro de TVA.',
          'Profession réglementée : titre professionnel, ordre ou organisme, règles applicables.',
          'Prix clairs, TVA et frais de livraison compris.',
          'Politique de confidentialité et politique cookies.'
        ] },
      { id: 'donnees', t: 'Données personnelles et cookies',
        do: [
          'Appliquer le RGPD (voir la fiche Union européenne) ; l’APD publie des modèles et une check-list cookies.',
          'Consentement préalable pour les cookies non essentiels, refus aussi simple que l’acceptation.',
          'Désigner un délégué à la protection des données seulement si vos traitements l’exigent (suivi à grande échelle, données sensibles).'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Informations précontractuelles complètes et droit de rétractation de 14 jours (livre VI du Code de droit économique).',
          'Indiquer le Service de médiation pour le consommateur comme voie de règlement des litiges.',
          'Bouton de commande explicite et confirmation de commande sur un support durable (email).'
        ] },
      { id: 'taxes', t: 'TVA',
        do: [
          '<strong>Franchise des petites entreprises</strong> : pas de TVA facturée si le chiffre d’affaires annuel ne dépasse pas 25 000 €.',
          'Mention sur les factures : « Régime particulier de franchise des petites entreprises » (formulation à vérifier auprès du SPF Finances).',
          'Au-delà : TVA de 21 % (taux normal) et déclarations périodiques.',
          'Ventes à des particuliers d’autres pays de l’UE au-delà de 10 000 € : guichet OSS.'
        ] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'E-commerce et services visés par l’acte européen : accessibles depuis le 28 juin 2025.',
          'Services publics : obligation d’accessibilité et déclaration publiée.'
        ] }
    ],
    links: [
      { t: 'Banque-Carrefour des Entreprises', u: 'https://economie.fgov.be/fr/themes/entreprises/banque-carrefour-des', d: 'Inscription, numéro d’entreprise, guichets agréés.' },
      { t: 'Recherche publique BCE', u: 'https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html', d: 'Vérifier les données d’une entreprise.' },
      { t: 'Autorité de protection des données', u: 'https://www.autoriteprotectiondonnees.be/', d: 'RGPD, cookies, modèles pour PME.' },
      { t: 'SPF Finances — TVA', u: 'https://finances.belgium.be/fr/entreprises/tva', d: 'Franchise, taux, déclarations.' },
      { t: 'DNS Belgium', u: 'https://www.dnsbelgium.be/', d: 'Registre du .be.' },
      { t: 'Business.belgium.be', u: 'https://business.belgium.be/fr', d: 'Portail fédéral pour les entreprises.' },
      { t: 'Service de médiation pour le consommateur', u: 'https://mediationconsommateur.be/', d: 'Règlement amiable des litiges de consommation.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'banniere-cookies', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'ch', name: 'Suisse', group: 'Europe hors UE', verified: '2026-11',
    stamp: { ink: 'red', shape: 'round', r: -6 },
    summary: 'Hors UE : la nouvelle loi sur la protection des données (nLPD) s’applique, l’identité de l’exploitant doit figurer sur le site, et la TVA ne commence qu’à 100 000 CHF.',
    mrz: 'P<CHE<<NLPD<<PFPDT<<LCD<<IDE<<EASYGOV<<<<<<<<',
    facts: [
      ['Déclarer le site', 'Non'],
      ['Déclarer l’activité', 'Registre du commerce dès 100 000 CHF de chiffre d’affaires (raison individuelle) ; toujours pour une société'],
      ['Page obligatoire', 'Impressum (LCD, art. 3, al. 1, let. s)'],
      ['Autorité des données', 'Préposé fédéral (PFPDT)'],
      ['Seuil de TVA', '100 000 CHF de chiffre d’affaires mondial'],
      ['Domaine national', '.ch, via un registraire (registre SWITCH)']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        do: [
          'Raison individuelle : démarrage sans formalité lourde ; inscription au <strong>registre du commerce</strong> obligatoire dès 100 000 CHF de chiffre d’affaires annuel.',
          'Sàrl ou SA : inscription au registre du commerce (démarches en ligne sur EasyGov.swiss).',
          'S’annoncer comme indépendant à la caisse de compensation AVS de votre canton.',
          'Recevoir un numéro IDE (CHE-xxx.xxx.xxx) à utiliser dans vos documents.'
        ] },
      { id: 'domaine', t: 'Nom de domaine en .ch',
        do: [
          'Le .ch est ouvert à tous, via un registraire agréé (le registre est géré par SWITCH).',
          'Le .swiss est réservé aux entités ayant un lien avec la Suisse et passe par une procédure plus stricte.',
          'Activer le renouvellement automatique.'
        ] },
      { id: 'pages', t: 'Impressum et pages obligatoires',
        i: 'La loi contre la concurrence déloyale (LCD) impose au commerce en ligne d’indiquer clairement son identité et son adresse.',
        do: [
          '<strong>Impressum</strong> : nom ou raison sociale, adresse postale, adresse email.',
          'Numéro IDE si l’entreprise en possède un.',
          'Déclaration de protection des données dès que vous collectez des données personnelles.',
          'Conditions générales de vente si vous vendez.'
        ] },
      { id: 'donnees', t: 'Protection des données (nLPD)',
        i: 'La loi révisée est en vigueur depuis le 1er septembre 2023 et se rapproche du RGPD.',
        do: [
          'Informer les personnes lors de la collecte (déclaration de protection des données), en citant les pays vers lesquels les données partent.',
          'Tenir un registre des activités de traitement (les entreprises de moins de 250 personnes à faible risque peuvent en être dispensées).',
          'Annoncer au PFPDT une violation de la sécurité des données qui entraîne un risque élevé.',
          'Cookies : informer et permettre de refuser (loi sur les télécommunications, art. 45c). Si vous ciblez des visiteurs de l’UE, appliquez aussi le consentement RGPD.'
        ],
        n: [['warn', 'Les amendes (jusqu’à 250 000 CHF) visent les personnes responsables, pas seulement l’entreprise.']] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Prix affichés TTC en francs suisses (ordonnance sur l’indication des prix).',
          'Décrire les étapes de la commande et permettre de corriger les erreurs avant de valider.',
          'Il n’existe <strong>pas de droit de rétractation légal</strong> pour les achats en ligne en Suisse : si vous en offrez un, écrivez-le dans vos CGV.',
          'Clients dans l’UE : les règles européennes (rétractation 14 jours) s’appliquent si vous ciblez ces pays.'
        ] },
      { id: 'taxes', t: 'TVA',
        do: [
          'S’inscrire à la TVA auprès de l’AFC dès que le chiffre d’affaires mondial atteint <strong>100 000 CHF</strong> par an.',
          'En dessous : inscription volontaire possible (utile pour récupérer la TVA sur vos achats).',
          'Taux normal 8,1 %, taux réduit 2,6 %.'
        ] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'Services publics : norme eCH-0059 (basée sur les WCAG).',
          'Privé : pas d’obligation générale, mais visez WCAG 2.1 AA — et l’acte européen s’applique si vous vendez à des consommateurs de l’UE.'
        ] }
    ],
    links: [
      { t: 'EasyGov.swiss', u: 'https://www.easygov.swiss/', d: 'Créer une entreprise et faire les démarches en ligne.' },
      { t: 'Préposé fédéral à la protection des données', u: 'https://www.edoeb.admin.ch/fr', d: 'nLPD, guides et formulaire d’annonce des violations.' },
      { t: 'Loi sur la protection des données (Fedlex)', u: 'https://www.fedlex.admin.ch/eli/cc/2022/491/fr', d: 'Le texte officiel de la nLPD.' },
      { t: 'Administration fédérale des contributions', u: 'https://www.estv.admin.ch/', d: 'TVA, inscription et taux.' },
      { t: 'Zefix — registre du commerce', u: 'https://www.zefix.ch/fr/search/entity/welcome', d: 'Recherche d’entreprises inscrites.' },
      { t: 'Registre IDE', u: 'https://www.uid.admin.ch/', d: 'Numéro d’identification des entreprises.' },
      { t: 'nic.ch (SWITCH)', u: 'https://www.nic.ch/fr/', d: 'Informations sur le .ch et liste des registraires.' },
      { t: 'Portail PME de la Confédération', u: 'https://www.kmu.admin.ch/kmu/fr/home.html', d: 'Conseils pour créer et gérer une PME.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'banniere-cookies', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'de', name: 'Allemagne', group: 'Union européenne', eu: true, verified: '2026-11',
    stamp: { ink: 'violet', shape: 'rect', r: 5 },
    summary: 'L’Impressum est obligatoire et très surveillé (mises en demeure payantes « Abmahnung »). Une activité commerciale se déclare au Gewerbeamt, une profession libérale au Finanzamt.',
    mrz: 'P<DEU<<IMPRESSUM<<DDG<<DSGVO<<TDDDG<<ELSTER<<<',
    facts: [
      ['Déclarer le site', 'Non'],
      ['Déclarer l’activité', 'Gewerbeanmeldung (commerce) ou Finanzamt (profession libérale)'],
      ['Page obligatoire', 'Impressum (§ 5 DDG) et Datenschutzerklärung'],
      ['Autorité des données', 'Autorité de votre Land, BfDI au niveau fédéral'],
      ['Seuil de TVA', 'Kleinunternehmer : 25 000 € l’année précédente et 100 000 € l’année en cours'],
      ['Domaine national', '.de, géré par DENIC']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        do: [
          'Activité commerciale (boutique en ligne, agence…) : <strong>Gewerbeanmeldung</strong> auprès du Gewerbeamt de votre commune, souvent en ligne (de 20 à 60 € environ).',
          'Profession libérale (Freiberufler : développeur, designer, rédacteur…) : pas de Gewerbe, déclaration directe au Finanzamt.',
          'Remplir le « Fragebogen zur steuerlichen Erfassung » sur ELSTER pour obtenir votre numéro fiscal (Steuernummer).',
          'Demander un numéro de TVA intracommunautaire (USt-IdNr.) au BZSt si vous travaillez avec d’autres pays de l’UE.'
        ] },
      { id: 'domaine', t: 'Nom de domaine en .de',
        do: [
          'Réserver le .de chez un registraire membre de DENIC.',
          'Donner une adresse postale où vous pouvez recevoir du courrier.',
          'Activer le renouvellement automatique.'
        ] },
      { id: 'pages', t: 'Impressum et pages obligatoires',
        i: 'Le § 5 de la Digitale-Dienste-Gesetz (DDG), qui a remplacé le TMG en mai 2024, impose un Impressum à tout service en ligne à caractère commercial — un blog avec publicité compris.',
        do: [
          'Impressum accessible en deux clics au plus depuis chaque page, sous un intitulé clair (« Impressum »).',
          'Nom complet, adresse postale (pas de boîte postale), email et un second moyen de contact rapide (téléphone ou formulaire).',
          'Société : forme juridique, représentant légal, registre du commerce (Handelsregister) et numéro, USt-IdNr.',
          'Contenus journalistiques ou éditoriaux : nommer la personne responsable selon le § 18 MStV.',
          '<strong>Datenschutzerklärung</strong> (politique de confidentialité) complète.'
        ],
        n: [['warn', 'Un Impressum incomplet ou une bannière cookies non conforme peut déclencher une « Abmahnung » : une mise en demeure payante envoyée par un concurrent ou une association. Ne recopiez pas l’Impressum d’un autre site.']] },
      { id: 'donnees', t: 'Données personnelles et cookies',
        do: [
          'Consentement avant tout cookie ou traceur non nécessaire (§ 25 TDDDG, ex-TTDSG).',
          'Héberger vos polices de caractères vous-même : charger Google Fonts depuis les serveurs de Google a déjà valu des condamnations (LG München, 2022).',
          'Désigner un délégué à la protection des données (DSB) si au moins 20 personnes traitent régulièrement des données personnelles.',
          'Signer un contrat de sous-traitance (AV-Vertrag) avec l’hébergeur et chaque prestataire.',
          'Newsletter : confirmation par double opt-in pour pouvoir prouver le consentement.'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Bouton de commande sans ambiguïté, par exemple « zahlungspflichtig bestellen ».',
          'Widerrufsbelehrung (information sur la rétractation) et formulaire type.',
          'Prix TTC avec mention de la TVA et des frais de livraison (PAngV).',
          'Plus de 10 salariés : indiquer si vous participez à une procédure de règlement des litiges de consommation (§ 36 VSBG).'
        ] },
      { id: 'taxes', t: 'TVA et impôts',
        do: [
          '<strong>Kleinunternehmer</strong> (§ 19 UStG) : pas de TVA facturée si le chiffre d’affaires est ≤ 25 000 € l’année précédente et ≤ 100 000 € l’année en cours.',
          'Factures en franchise : mentionner l’exonération selon le § 19 UStG.',
          'Au-delà : TVA de 19 % (7 % au taux réduit), déclarations via ELSTER.',
          'Factures B2B électroniques : réception obligatoire depuis 2025, émission obligatoire par étapes en 2027 et 2028.'
        ] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'Barrierefreiheitsstärkungsgesetz (BFSG) en vigueur depuis le 28 juin 2025 pour l’e-commerce et certains services.',
          'Micro-entreprises de services (moins de 10 personnes et 2 M€ de chiffre d’affaires) exemptées.',
          'Publier une déclaration d’accessibilité si vous êtes concerné.'
        ] }
    ],
    links: [
      { t: '§ 5 DDG — Impressum', u: 'https://www.gesetze-im-internet.de/ddg/__5.html', d: 'Le texte officiel des mentions obligatoires.' },
      { t: 'ELSTER', u: 'https://www.elster.de/', d: 'Démarches fiscales en ligne et questionnaire d’inscription.' },
      { t: 'Bundeszentralamt für Steuern', u: 'https://www.bzst.de/', d: 'Numéro de TVA intracommunautaire (USt-IdNr.).' },
      { t: 'BfDI', u: 'https://www.bfdi.bund.de/', d: 'Commissaire fédéral à la protection des données.' },
      { t: 'Existenzgründungsportal', u: 'https://www.existenzgruendungsportal.de/', d: 'Portail officiel de création d’entreprise (Gewerbe, Freiberufler).' },
      { t: 'DENIC', u: 'https://www.denic.de/', d: 'Registre du .de.' },
      { t: 'TDDDG (cookies)', u: 'https://www.gesetze-im-internet.de/ttdsg/', d: 'Loi sur la protection des données dans les télécoms et services numériques.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'banniere-cookies', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'es', name: 'Espagne', group: 'Union européenne', eu: true, verified: '2026-11',
    stamp: { ink: 'red', shape: 'rect', r: -2 },
    summary: 'Aviso legal obligatoire (LSSI), inscription comme autónomo auprès de Hacienda et de la Sécurité sociale, et pas de franchise de TVA générale.',
    mrz: 'P<ESP<<AVISO<LEGAL<<LSSI<<AEPD<<RETA<<036<<<<<',
    facts: [
      ['Déclarer le site', 'Non'],
      ['Déclarer l’activité', 'Alta en Hacienda (modelo 036) et affiliation au RETA'],
      ['Page obligatoire', 'Aviso legal (LSSI-CE, article 10)'],
      ['Autorité des données', 'AEPD'],
      ['Seuil de TVA', 'Pas de franchise générale : IVA dès le premier euro (21 %)'],
      ['Domaine national', '.es, géré par Red.es (dominios.es)']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        do: [
          'S’inscrire au recensement fiscal de l’Agencia Tributaria avec le <strong>modelo 036</strong>.',
          'S’affilier au régime des travailleurs indépendants (<strong>RETA</strong>) via le portail Import@ss, avant de commencer. Cotisation selon les revenus réels, avec un tarif réduit la première année (« tarifa plana »).',
          'Étranger : obtenir d’abord un NIE (numéro d’identification).',
          'Société (SL) : constitution possible en ligne via le CIRCE (points PAE).'
        ] },
      { id: 'domaine', t: 'Nom de domaine en .es',
        do: [
          'Le .es est ouvert à tous via un registraire accrédité par Red.es.',
          'Données du titulaire exactes et renouvellement automatique.'
        ] },
      { id: 'pages', t: 'Aviso legal et pages obligatoires',
        i: 'La loi sur les services de la société de l’information (LSSI-CE) impose d’identifier le prestataire.',
        do: [
          '<strong>Aviso legal</strong> : nom ou raison sociale, adresse, email, NIF.',
          'Société : données d’inscription au Registro Mercantil.',
          'Profession réglementée : ordre professionnel et numéro d’inscription.',
          'Política de privacidad (RGPD et LOPDGDD) et política de cookies.',
          'Condiciones generales de contratación si vous vendez.'
        ] },
      { id: 'donnees', t: 'Données personnelles et cookies',
        do: [
          'Suivre le guide cookies de l’AEPD : bouton « Rechazar » dès le premier niveau de la bannière.',
          'Formulaire de contact : information de base en première couche (responsable, finalité, droits) et lien vers la politique complète.',
          'Contrats de sous-traitance avec vos prestataires.'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Droit de rétractation (desistimiento) de 14 jours et formulaire type.',
          'Prix TTC et frais de livraison affichés avant la commande.',
          'Confirmation de la commande par email.'
        ] },
      { id: 'taxes', t: 'TVA (IVA) et impôts',
        do: [
          'Facturer l’<strong>IVA à 21 %</strong> (10 % ou 4 % pour certains produits) dès la première facture.',
          'Déclarations trimestrielles (modelo 303) et récapitulatif annuel (modelo 390).',
          'Factures à des entreprises espagnoles : retenue d’IRPF de 15 % (7 % les premières années).',
          'Îles Canaries : IGIC à la place de l’IVA.'
        ],
        n: [['info', 'Logiciels de facturation : le système VERI*FACTU est prévu pour 2027, après plusieurs reports. Vérifiez la date sur le site de l’Agencia Tributaria.']] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'Loi 11/2023 (transposition de l’acte européen) : e-commerce accessible depuis le 28 juin 2025.',
          'Viser WCAG 2.1 AA.'
        ] }
    ],
    links: [
      { t: 'Agencia Tributaria — sede electrónica', u: 'https://sede.agenciatributaria.gob.es/', d: 'Modelo 036, IVA, IRPF.' },
      { t: 'Import@ss (Sécurité sociale)', u: 'https://portal.seg-social.gob.es/wps/portal/importass/importass', d: 'Affiliation au RETA en ligne.' },
      { t: 'AEPD', u: 'https://www.aepd.es/', d: 'Protection des données, guide cookies, outil Facilita RGPD.' },
      { t: 'LSSI-CE (BOE)', u: 'https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758', d: 'Texte consolidé de la loi.' },
      { t: 'PAE / CIRCE', u: 'https://paeelectronico.es/', d: 'Créer une société ou s’installer comme autónomo en ligne.' },
      { t: 'dominios.es', u: 'https://www.dominios.es/', d: 'Registre officiel du .es.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'banniere-cookies', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'it', name: 'Italie', group: 'Union européenne', eu: true, verified: '2026-11',
    stamp: { ink: 'green', shape: 'oval', r: -5 },
    summary: 'Partita IVA obligatoire dès que l’activité est régulière, et elle doit apparaître sur la page d’accueil du site. Le Garante Privacy veille aux cookies.',
    mrz: 'P<ITA<<PARTITA<IVA<<GARANTE<<PEC<<SDI<<<<<<<<',
    facts: [
      ['Déclarer le site', 'Non'],
      ['Déclarer l’activité', 'Partita IVA (Agenzia delle Entrate), INPS, Registro delle Imprese pour les commerçants'],
      ['Page obligatoire', 'Note legali, avec la Partita IVA visible dès l’accueil'],
      ['Autorité des données', 'Garante per la protezione dei dati personali'],
      ['Seuil de TVA', 'Regime forfettario jusqu’à 85 000 € (sans TVA)'],
      ['Domaine national', '.it, géré par Registro.it (UE et EEE)']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        do: [
          'Ouvrir une <strong>Partita IVA</strong> (formulaire AA9/12 pour une entreprise individuelle) auprès de l’Agenzia delle Entrate — gratuit et en ligne.',
          'Choisir le code ATECO de votre activité (classification ATECO 2025).',
          'Commerçant ou artisan : Comunicazione Unica au Registro delle Imprese (Camera di Commercio) et inscription à l’INPS.',
          'Profession libérale sans ordre professionnel : Gestione Separata de l’INPS.',
          'Obtenir une adresse PEC (email certifié), obligatoire pour les entreprises inscrites au registre.'
        ],
        n: [['info', 'Une activité vraiment occasionnelle peut être exercée en « prestazione occasionale », sans Partita IVA (cotisations INPS au-delà de 5 000 € par an). Dès qu’elle devient régulière, la Partita IVA est obligatoire.']] },
      { id: 'domaine', t: 'Nom de domaine en .it',
        do: [
          'Le .it est réservé aux personnes et entreprises de l’UE, de l’EEE, de Suisse, de Saint-Marin et du Vatican.',
          'Réserver via un registraire accrédité par Registro.it.'
        ] },
      { id: 'pages', t: 'Note legali et pages obligatoires',
        do: [
          'Afficher la <strong>Partita IVA sur la page d’accueil</strong> (article 35 du DPR 633/1972).',
          'Note legali : dénomination, siège, PEC, numéro REA et capital social pour une société.',
          'Informativa privacy (article 13 du RGPD) et cookie policy.',
          'Condizioni generali di vendita si vous vendez.'
        ] },
      { id: 'donnees', t: 'Données personnelles et cookies',
        i: 'Les lignes directrices du Garante (2021) sont précises sur la bannière.',
        do: [
          'Un « X » pour fermer la bannière doit valoir refus des cookies non techniques.',
          'Ne pas redemander le consentement avant 6 mois, sauf changement important.',
          'Informativa privacy complète et facile à trouver.'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Droit de rétractation (recesso) de 14 jours (Codice del Consumo).',
          'Informations précontractuelles complètes et prix TTC.',
          'Confirmation de commande sur un support durable.'
        ] },
      { id: 'taxes', t: 'TVA et impôts',
        do: [
          '<strong>Regime forfettario</strong> : jusqu’à 85 000 € de revenus, impôt forfaitaire de 15 % (5 % les cinq premières années) et pas de TVA facturée.',
          'Sortie immédiate du régime si vous dépassez 100 000 € dans l’année.',
          'Facturation électronique via le SdI obligatoire pour tous, forfettari compris.',
          'Au-delà : IVA à 22 % (taux normal).'
        ] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'Acte européen transposé : e-commerce accessible depuis le 28 juin 2025.',
          'Administrations et grandes entreprises : loi Stanca et lignes directrices de l’AgID.'
        ] }
    ],
    links: [
      { t: 'Agenzia delle Entrate', u: 'https://www.agenziaentrate.gov.it/', d: 'Partita IVA, regime forfettario, fatturazione elettronica.' },
      { t: 'Garante Privacy', u: 'https://www.garanteprivacy.it/', d: 'Protection des données et lignes directrices cookies.' },
      { t: 'Registro Imprese', u: 'https://www.registroimprese.it/', d: 'Registre des entreprises des Chambres de commerce.' },
      { t: 'INPS', u: 'https://www.inps.it/', d: 'Sécurité sociale et cotisations.' },
      { t: 'Impresa in un giorno', u: 'https://www.impresainungiorno.gov.it/', d: 'Guichet unique (SUAP) pour démarrer une activité.' },
      { t: 'Registro.it', u: 'https://www.registro.it/', d: 'Registre du .it.' },
      { t: 'AgID', u: 'https://www.agid.gov.it/', d: 'Agence pour l’Italie numérique (accessibilité).' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'banniere-cookies', 'seuils-tva', 'checklist']
  });

  C.push({
    code: 'uk', name: 'Royaume-Uni', group: 'Europe hors UE', verified: '2026-11',
    stamp: { ink: 'blue', shape: 'oval', r: 6 },
    summary: 'Le seul pays de la liste avec une vraie « déclaration » liée aux données : la plupart des organisations qui traitent des données paient une redevance annuelle à l’ICO.',
    mrz: 'P<GBR<<ICO<FEE<<UK<GDPR<<PECR<<HMRC<<<<<<<<<<',
    facts: [
      ['Déclarer le site', 'Non, mais redevance ICO pour la plupart des organisations'],
      ['Déclarer l’activité', 'Sole trader : HMRC ; Ltd : Companies House (100 £ en ligne)'],
      ['Page obligatoire', 'Informations des E-Commerce Regulations 2002 (+ Companies Act pour une Ltd)'],
      ['Autorité des données', 'ICO'],
      ['Seuil de TVA', '90 000 £ sur 12 mois glissants'],
      ['Domaine national', '.uk et .co.uk, gérés par Nominet']
    ],
    sections: [
      { id: 'activite', t: 'Déclarer votre activité',
        do: [
          'Sole trader : s’inscrire au Self Assessment auprès de HMRC (au plus tard le 5 octobre qui suit votre première année d’activité).',
          'Revenus annexes inférieurs à 1 000 £ par an : « trading allowance », pas besoin de déclarer.',
          'Limited company : immatriculation sur Companies House — <strong>100 £</strong> en ligne depuis le 1er février 2026.',
          'Payer la <strong>data protection fee</strong> à l’ICO si vous traitez des données personnelles (52 £ par an pour les micro-structures). Faites le test d’exemption en ligne.'
        ],
        n: [['warn', 'Ne pas payer la redevance ICO quand on y est tenu expose à une amende pouvant atteindre 4 350 £.']] },
      { id: 'domaine', t: 'Nom de domaine en .uk',
        do: [
          'Le .uk et le .co.uk sont ouverts à tous via un registraire accrédité par Nominet.',
          'Données exactes du titulaire et renouvellement automatique.'
        ] },
      { id: 'pages', t: 'Informations obligatoires sur le site',
        do: [
          'Nom, adresse géographique et email (E-Commerce Regulations 2002).',
          'Limited company : dénomination exacte, numéro d’immatriculation, lieu d’immatriculation (England and Wales, Scotland…) et adresse du registered office.',
          'Numéro de TVA si vous en avez un.',
          'Privacy notice (UK GDPR) et cookie policy.',
          'Terms and conditions si vous vendez.'
        ] },
      { id: 'donnees', t: 'Données personnelles et cookies',
        i: 'UK GDPR, Data Protection Act 2018 et Data (Use and Access) Act 2025.',
        do: [
          'Privacy notice claire et complète.',
          'Cookies publicitaires et de suivi : consentement préalable (PECR).',
          'Depuis le 5 février 2026, certains cookies de statistiques, de sécurité et de fonctionnement sont dispensés de consentement, à condition d’informer clairement et de permettre un refus simple.',
          'Transferts : libres vers l’UE ; vers les États-Unis, « UK Extension » du Data Privacy Framework ou contrat type (IDTA).',
          'Signaler une fuite de données à l’ICO sous 72 heures.'
        ] },
      { id: 'vente', t: 'Vendre en ligne',
        do: [
          'Droit d’annulation de 14 jours (Consumer Contracts Regulations 2013).',
          'Prix total affiché dès le départ, frais obligatoires inclus (DMCC Act 2024, en vigueur depuis avril 2025).',
          'Faux avis interdits : publiez la façon dont vous les vérifiez.'
        ] },
      { id: 'taxes', t: 'TVA et impôts',
        do: [
          'Inscription à la TVA obligatoire au-delà de <strong>90 000 £</strong> de chiffre d’affaires sur 12 mois glissants ; taux normal 20 %.',
          'Making Tax Digital : depuis avril 2026, les sole traders au-delà de 50 000 £ de revenus tiennent leurs comptes avec un logiciel compatible (seuil abaissé à 30 000 £ en avril 2027).'
        ] },
      { id: 'accessibilite', t: 'Accessibilité',
        do: [
          'Equality Act 2010 : obligation d’aménagements raisonnables, qui s’applique aussi aux services en ligne.',
          'Secteur public : WCAG 2.2 AA et déclaration d’accessibilité.'
        ] },
      { id: 'autres', t: 'Contenus des utilisateurs et emails',
        do: [
          'Forum, commentaires ou espace membre : l’<strong>Online Safety Act 2023</strong> impose une évaluation des risques (contenus illégaux, protection des enfants). L’Ofcom publie des outils pour les petits services.',
          'Emails marketing : consentement, sauf « soft opt-in » pour vos clients existants avec désinscription simple (PECR).'
        ] }
    ],
    links: [
      { t: 'ICO — data protection fee', u: 'https://ico.org.uk/for-organisations/data-protection-fee/', d: 'Test d’exemption et paiement de la redevance.' },
      { t: 'ICO — cookies et traceurs (guide 2026)', u: 'https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/', d: 'Règles et exemptions de consentement.' },
      { t: 'Set up a limited company', u: 'https://www.gov.uk/limited-company-formation', d: 'Guide officiel Companies House.' },
      { t: 'Set up as a sole trader', u: 'https://www.gov.uk/set-up-sole-trader', d: 'Inscription auprès de HMRC.' },
      { t: 'VAT registration', u: 'https://www.gov.uk/vat-registration', d: 'Seuils et inscription à la TVA.' },
      { t: 'Ofcom — Online Safety', u: 'https://www.ofcom.org.uk/online-safety', d: 'Obligations des sites avec contenus d’utilisateurs.' },
      { t: 'E-Commerce Regulations 2002', u: 'https://www.legislation.gov.uk/uksi/2002/2013/contents', d: 'Texte officiel.' },
      { t: 'Nominet', u: 'https://www.nominet.uk/', d: 'Registre du .uk.' }
    ],
    tools: ['mentions-legales', 'confidentialite', 'banniere-cookies', 'seuils-tva', 'checklist']
  });
})();
