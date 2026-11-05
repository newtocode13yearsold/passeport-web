/* General manuals (valid in every country).
 * Shape: { id, t, d, time, steps: [{ t, b, ex? }], tools: [tool ids], links: [{ t, u }],
 *          premium?: true, code?: shop item (see js/data/shop.js), free?: steps shown before the paywall }
 * b is trusted HTML; ex is plain text shown as a copyable code sample. */
(function () {
  window.PW.guides = [
    {
      id: 'parcours', t: 'Créer son site de A à Z', time: '5 min',
      d: 'La carte du parcours complet, de l’idée au site en ligne, avec un lien vers chaque manuel.',
      steps: [
        { t: 'Définir le but du site', b: 'Vitrine, blog, portfolio, boutique ou application ? Le but décide de tout le reste : outil, budget, obligations légales. Écrivez en une phrase ce que le visiteur doit pouvoir faire.' },
        { t: 'Vérifier les obligations du pays', b: 'Si le site rapporte de l’argent, il faut presque toujours déclarer une activité. Ouvrez la <a href="#pays">fiche de votre pays</a> avant de dépenser quoi que ce soit.' },
        { t: 'Réserver le nom de domaine', b: 'Court, facile à dire au téléphone, sans tiret si possible. Voir le manuel <a href="#manuel-nom-de-domaine">Nom de domaine</a>.' },
        { t: 'Choisir comment construire le site', b: 'Constructeur sans code, CMS comme WordPress, ou code à la main. Voir <a href="#manuel-construire">No-code, CMS ou code</a>.' },
        { t: 'Choisir l’hébergement et mettre en ligne', b: 'Un site statique s’héberge gratuitement. Voir <a href="#manuel-hebergement">Hébergement</a> et <a href="#manuel-mise-en-ligne">Mise en ligne gratuite</a>.' },
        { t: 'Ajouter les pages légales', b: 'Mentions légales, politique de confidentialité, cookies, CGV si vous vendez. Les <a href="#outils">générateurs</a> font le premier jet pour vous.' },
        { t: 'Préparer le référencement et les statistiques', b: 'Titres, descriptions, sitemap, Search Console, mesure d’audience respectueuse. Voir <a href="#manuel-referencement">Être trouvé</a>.' },
        { t: 'Vérifier puis lancer', b: 'Mobile, accessibilité, sécurité, liens cassés : suivez <a href="#manuel-lancement">la check-list du jour J</a>.' }
      ],
      tools: ['checklist']
    },
    {
      id: 'nom-de-domaine', t: 'Choisir et acheter un nom de domaine', time: '15 min',
      d: 'Trouver un bon nom, choisir l’extension, l’acheter au bon endroit et ne jamais le perdre.',
      steps: [
        { t: 'Trouver le nom', b: 'Visez court (moins de 15 lettres), prononçable, sans tiret ni chiffre ambigu. Testez-le à voix haute : « mon-site-pro.fr » se dicte mal au téléphone.' },
        { t: 'Choisir l’extension', b: 'L’extension du pays (.fr, .de, .ca…) rassure un public local ; le .com reste universel. Une extension nationale impose parfois une condition de résidence : voyez la fiche du pays.' },
        { t: 'Vérifier les marques', b: 'Cherchez le nom dans les bases de marques (INPI, EUIPO, USPTO, WIPO Global Brand Database). Un nom identique à une marque déposée peut vous être retiré.' },
        { t: 'Acheter chez un registraire sérieux', b: 'Comparez le prix de <strong>renouvellement</strong>, pas seulement celui de la première année. Méfiez-vous des options inutiles vendues au passage.' },
        { t: 'Protéger le nom', b: 'Activez le renouvellement automatique, le verrouillage de transfert et la double authentification sur le compte du registraire. Utilisez une adresse email que vous garderez longtemps.' },
        { t: 'Garder la main', b: 'Le nom doit être à <strong>votre</strong> nom, même si une agence crée le site. Notez la date d’expiration dans votre agenda.' }
      ],
      links: [
        { t: 'Liste des registraires accrédités ICANN', u: 'https://www.icann.org/en/accredited-registrars' },
        { t: 'WIPO Global Brand Database', u: 'https://branddb.wipo.int/' },
        { t: 'Recherche de marques EUIPO (TMview)', u: 'https://www.tmdn.org/tmview/' }
      ]
    },
    {
      id: 'construire', t: 'No-code, CMS ou code : que choisir ?', time: '10 min',
      d: 'Les trois grandes façons de construire un site, leurs coûts cachés et pour qui elles conviennent.',
      steps: [
        { t: 'Constructeur sans code', b: 'Wix, Squarespace, Webflow, Shopify… Rapide, tout est inclus (hébergement, sécurité). Limites : abonnement mensuel, difficile de partir avec son site. Idéal pour une vitrine ou une petite boutique.' },
        { t: 'CMS (WordPress, Ghost…)', b: 'Très souple, des milliers d’extensions. Demande des mises à jour régulières (extensions comprises), sinon c’est la première cible des pirates. Idéal pour un blog ou un site qui grossit.' },
        { t: 'Générateur de site statique', b: 'Astro, Hugo, Eleventy, Jekyll : des pages produites à l’avance, très rapides et presque impossibles à pirater. Hébergement gratuit. Demande un peu de technique.' },
        { t: 'Code à la main', b: 'HTML, CSS et JavaScript : contrôle total et coût zéro, idéal pour apprendre. Prévoir plus de temps pour chaque modification.' },
        { t: 'Décider', b: 'Posez-vous trois questions : qui mettra le site à jour ? quel budget par mois ? faut-il vendre en ligne ? Si la réponse est « moi, zéro euro, non », un site statique suffit.' }
      ]
    },
    {
      id: 'hebergement', t: 'Choisir un hébergement', time: '10 min',
      d: 'Statique, mutualisé, VPS ou cloud : ce que chaque formule vous apporte, et ce qu’il faut vérifier.',
      steps: [
        { t: 'Hébergement statique', b: 'Pour des fichiers HTML, CSS et JS : GitHub Pages, Cloudflare Pages, Netlify, Vercel. Gratuit pour un petit site, HTTPS inclus, très rapide.' },
        { t: 'Mutualisé', b: 'Quelques euros par mois pour un WordPress : votre site partage un serveur avec d’autres. Simple, mais performances variables.' },
        { t: 'VPS', b: 'Un petit serveur à vous (à partir de quelques euros par mois). Puissant, mais vous gérez tout : mises à jour, pare-feu, sauvegardes.' },
        { t: 'Vérifier l’emplacement des données', b: 'Pour un public européen, un hébergeur avec des serveurs dans l’UE simplifie le RGPD. Demandez son contrat de sous-traitance (DPA).' },
        { t: 'Vérifier les sauvegardes', b: 'Combien de jours sont gardés ? Pouvez-vous restaurer vous-même ? Faites aussi une copie de votre côté.' },
        { t: 'Noter les coordonnées de l’hébergeur', b: 'Nom, adresse et téléphone de l’hébergeur doivent figurer dans les mentions légales de nombreux pays (France, Belgique…).' }
      ],
      tools: ['mentions-legales']
    },
    {
      id: 'mise-en-ligne', t: 'Mettre un site statique en ligne gratuitement', time: '20 min',
      d: 'Publier vos fichiers HTML avec GitHub Pages, Cloudflare Pages ou Netlify, puis brancher votre domaine.',
      steps: [
        { t: 'Préparer le dossier', b: 'Un fichier <code>index.html</code> à la racine, des chemins relatifs vers vos images et feuilles de style, et un fichier <code>404.html</code>.' },
        { t: 'Créer un dépôt Git', b: 'Créez un dépôt sur GitHub (ou GitLab) et envoyez-y vos fichiers. L’interface web permet de glisser-déposer sans ligne de commande.' },
        { t: 'Option A : GitHub Pages', b: 'Dans le dépôt : Settings, Pages, choisissez la branche <code>main</code>. Le site est en ligne en une minute sur <code>pseudo.github.io</code>.' },
        { t: 'Option B : Cloudflare Pages ou Netlify', b: 'Connectez votre compte GitHub, choisissez le dépôt, laissez la commande de build vide pour un site statique. Chaque modification envoyée est publiée automatiquement.' },
        { t: 'Brancher votre domaine', b: 'Dans les réglages « Custom domain », ajoutez votre nom de domaine, puis créez chez votre registraire l’enregistrement DNS indiqué (souvent un CNAME). Voir le manuel <a href="#manuel-dns-https">DNS et HTTPS</a>.' },
        { t: 'Ajouter les en-têtes de sécurité', b: 'Cloudflare Pages et Netlify lisent un fichier <code>_headers</code>. Le <a href="#outil-en-tetes-securite">générateur d’en-têtes</a> le prépare pour vous.' }
      ],
      tools: ['en-tetes-securite', 'robots-sitemap'],
      links: [
        { t: 'Documentation GitHub Pages', u: 'https://docs.github.com/fr/pages' },
        { t: 'Documentation Cloudflare Pages', u: 'https://developers.cloudflare.com/pages/' },
        { t: 'Documentation Netlify', u: 'https://docs.netlify.com/' }
      ]
    },
    {
      id: 'dns-https', t: 'Relier domaine et hébergeur : DNS et HTTPS', time: '15 min',
      d: 'Comprendre les enregistrements A, CNAME, MX et TXT, et obtenir le cadenas HTTPS.',
      steps: [
        { t: 'Le DNS, c’est l’annuaire', b: 'Quand on tape votre nom de domaine, le DNS répond « ce site est à telle adresse ». Vous modifiez cet annuaire dans l’espace client de votre registraire (ou chez Cloudflare).' },
        { t: 'A et AAAA', b: 'Relient un nom à une adresse IP (IPv4 pour A, IPv6 pour AAAA). Utilisés pour un serveur dont vous connaissez l’adresse.' },
        { t: 'CNAME', b: 'Fait pointer un nom vers un autre nom (par exemple <code>www</code> vers <code>monsite.pages.dev</code>). C’est ce que demandent la plupart des hébergeurs statiques.' },
        { t: 'MX et TXT', b: 'MX dit où arrivent vos emails ; TXT sert aux vérifications (Google Search Console) et à la sécurité des emails (SPF, DMARC).' },
        { t: 'Attendre la propagation', b: 'Une modification met de quelques minutes à quelques heures pour être visible partout. Vérifiez avec un outil comme DNS Checker.' },
        { t: 'Activer HTTPS', b: 'Les hébergeurs modernes créent le certificat gratuitement (Let’s Encrypt). Forcez ensuite la redirection de http vers https et activez HSTS.' }
      ],
      tools: ['email-dns', 'en-tetes-securite'],
      links: [
        { t: 'Let’s Encrypt', u: 'https://letsencrypt.org/fr/' },
        { t: 'DNS Checker', u: 'https://dnschecker.org/' }
      ]
    },
    {
      id: 'email-pro', t: 'Créer une adresse email pro et la protéger', time: '35 min',
      premium: true, code: 'MAIL', free: 2,
      d: 'contact@votre-domaine qui arrive en boîte de réception : MX, SPF, DKIM et DMARC réglés ligne par ligne, et les règles de Gmail et Yahoo.',
      steps: [
        { t: 'Choisir le service email', b: 'Google Workspace, Microsoft 365, Proton, Infomaniak, OVHcloud, Zoho… Comparez sur cinq points : <strong>prix par utilisateur et par mois</strong>, emplacement des serveurs (UE pour un public européen), nombre d’<strong>alias</strong> gratuits (contact@, factures@…), accès IMAP pour votre logiciel, double authentification. Un alias ne coûte rien ; une boîte de plus, si.' },
        { t: 'Faire la liste de tout ce qui envoie des emails à votre nom', b: 'Avant de toucher au DNS, notez chaque service qui envoie avec votre domaine : la boîte pro, le formulaire du site, la boutique (Shopify, WooCommerce), la newsletter (Brevo, Mailchimp…), l’outil de facturation, le prestataire de paiement. <strong>Chacun</strong> devra être autorisé par SPF ou signer avec DKIM, sinon ses emails finiront en spam dès que DMARC sera actif.' },
        { t: 'Créer les enregistrements MX', b: 'Supprimez les anciens MX (souvent ceux du registraire), puis créez ceux donnés par le service, avec leur priorité (le plus petit nombre est essayé en premier). TTL conseillé : 3600 secondes. Exemple pour Google Workspace, qui n’utilise plus qu’un seul MX :', ex: 'Type  Nom  Priorité  Valeur\nMX    @    1         smtp.google.com.' },
        { t: 'Écrire l’unique enregistrement SPF', b: 'Un seul TXT sur le nom <code>@</code>, qui commence par <code>v=spf1</code>. Ajoutez un <code>include:</code> par service de votre liste (chaque service donne le sien). Deux enregistrements SPF = SPF invalide. Limite stricte : <strong>10 recherches DNS</strong> au total (chaque <code>include</code>, <code>a</code>, <code>mx</code> compte) ; au-delà, SPF échoue. Terminez par <code>~all</code> (souple) au début, <code>-all</code> quand tout est vérifié. Jamais <code>+all</code>.', ex: 'Google Workspace + un outil de newsletter (remplacez par l’include qu’il vous donne) :\n@  TXT  "v=spf1 include:_spf.google.com include:spf.votre-outil-newsletter.com ~all"' },
        { t: 'Activer DKIM sur chaque service', b: 'Dans la console du service, générez une clé <strong>2048 bits</strong> ; il vous donne un enregistrement TXT (ou CNAME) sous un nom de la forme <code>sélecteur._domainkey</code>. Créez-le, attendez la propagation, puis revenez cliquer « Démarrer l’authentification ». Chez Google : console d’administration, Applications, Google Workspace, Gmail, Authentifier les e-mails. Faites de même pour la newsletter et la boutique : chacune a son propre sélecteur.', ex: 'google._domainkey  TXT  "v=DKIM1; k=rsa; p=MIIBIjANBgkqh…(clé fournie)…"' },
        { t: 'Publier DMARC en mode observation', b: 'Un TXT sur le nom <code>_dmarc</code>. <code>p=none</code> ne bloque rien : il demande seulement aux messageries de vous envoyer des rapports (<code>rua</code>). DMARC passe si le domaine de l’adresse « De » <strong>correspond</strong> (« alignement ») au domaine validé par SPF ou par DKIM. Les rapports arrivent en XML : un service gratuit comme Postmark DMARC Digests ou dmarcian les rend lisibles.', ex: '_dmarc  TXT  "v=DMARC1; p=none; rua=mailto:dmarc@votre-domaine.fr; adkim=r; aspf=r"' },
        { t: 'Durcir DMARC en trois temps', b: 'Semaines 1 à 4 : <code>p=none</code>, lisez les rapports et corrigez chaque service légitime qui échoue. Ensuite <code>p=quarantine</code> (les faux vont en spam) pendant deux à quatre semaines. Enfin <code>p=reject</code> : un email qui se fait passer pour vous est refusé. Ne sautez pas l’observation : un oubli (la facturation, par exemple) bloquerait vos vrais emails.' },
        { t: 'Respecter les règles de Gmail et Yahoo', b: 'Depuis février 2024, <strong>tout expéditeur</strong> doit avoir SPF ou DKIM, une connexion TLS et un taux de plaintes pour spam sous <strong>0,3 %</strong> (visible dans Google Postmaster Tools). Au-delà de <strong>5 000 emails par jour</strong> vers Gmail : SPF <em>et</em> DKIM, DMARC au moins en <code>p=none</code> et aligné, et une désinscription en un clic (en-têtes <code>List-Unsubscribe</code> et <code>List-Unsubscribe-Post</code>, RFC 8058) traitée sous deux jours. Les outils de newsletter s’en chargent si vous activez leur domaine authentifié.' },
        { t: 'Séparer et protéger les autres domaines', b: 'Envoyez les newsletters depuis un sous-domaine (<code>news.votre-domaine.fr</code>) : une campagne mal reçue n’abîme pas la réputation de vos emails de tous les jours. Et protégez chaque domaine qui n’envoie <strong>jamais</strong> d’email (anciens noms, variantes), sinon il peut servir à des escrocs :', ex: '@       TXT  "v=spf1 -all"\n_dmarc  TXT  "v=DMARC1; p=reject;"\n@       MX   0 .' },
        { t: 'Tester pour de vrai', b: 'Envoyez un email à l’adresse donnée par mail-tester.com et visez 10/10. Dans Gmail, ouvrez un email reçu, menu ⋮, « Afficher l’original » : vous devez lire <code>SPF: PASS</code>, <code>DKIM: PASS</code> et <code>DMARC: PASS</code>. Recommencez pour chaque service de votre liste (formulaire, boutique, newsletter).' },
        { t: 'Sécuriser la boîte elle-même', b: 'Double authentification par application ou clé de sécurité (pas par SMS), codes de secours imprimés, adresse de récupération <strong>sur un autre domaine</strong> (si votre domaine expire, vous perdriez aussi l’email qui permet de le récupérer). Publiez des alias (contact@, factures@) plutôt que votre adresse nominative.' }
      ],
      tools: ['email-dns'],
      links: [
        { t: 'Exigences de Google pour les expéditeurs', u: 'https://support.google.com/a/answer/81126?hl=fr' },
        { t: 'Google Postmaster Tools', u: 'https://postmaster.google.com/' },
        { t: 'mail-tester', u: 'https://www.mail-tester.com/' },
        { t: 'MXToolbox', u: 'https://mxtoolbox.com/' }
      ]
    },
    {
      id: 'referencement', t: 'Être trouvé sur Google et Bing', time: '45 min',
      premium: true, code: 'SEO', free: 2,
      d: 'Le référencement naturel pas à pas, avec les chiffres exacts : balises, structure, Core Web Vitals, sitemap, Search Console, données structurées, SEO local.',
      steps: [
        { t: 'Une page = une question précise', b: 'Pour chaque page, écrivez la requête que les gens tapent vraiment (« plombier urgence Lyon 3 », pas « Bienvenue »). Pour la trouver : les suggestions de la barre Google, le bloc « Autres questions posées », puis, une fois le site en ligne, le rapport Performances de la Search Console. Deux pages qui visent la même requête se font concurrence : fusionnez-les.' },
        { t: 'Répondre dès le premier paragraphe', b: 'Le premier paragraphe donne la réponse ; le reste de la page la détaille (prix, délais, exemples, photos réelles). Google privilégie le contenu écrit pour les gens, avec une expérience visible : dites qui vous êtes et pourquoi vous savez de quoi vous parlez.' },
        { t: 'Écrire la balise title', b: 'Unique sur chaque page, requête principale au début, environ <strong>50 à 60 caractères</strong> (Google coupe vers 600 pixels de large). Format conseillé : sujet précis, puis la marque. Si le titre ne reflète pas la page, Google le réécrit lui-même.', ex: '<title>Plombier d’urgence à Lyon 3 – 7 j/7 – Dupont Plomberie</title>' },
        { t: 'Écrire la meta description', b: 'Elle ne fait pas monter la page, mais elle fait cliquer. <strong>120 à 155 caractères</strong>, unique, avec une promesse concrète (prix, délai, zone). La balise <code>meta keywords</code> est ignorée par Google depuis 2009 : inutile.', ex: '<meta name="description" content="Intervention en 1 h à Lyon 3 et 7, devis gratuit par téléphone, tarifs affichés. Plombier certifié RGE depuis 2012.">' },
        { t: 'Structurer la page et l’URL', b: 'Un seul <code>&lt;h1&gt;</code>, proche du title ; des <code>&lt;h2&gt;</code> pour chaque partie, des <code>&lt;h3&gt;</code> dessous, sans sauter de niveau. URL courte, en minuscules, mots séparés par des tirets, sans date ni identifiant : <code>/plombier-urgence-lyon-3/</code>. Ne changez plus une URL publiée sans redirection 301.' },
        { t: 'Choisir une seule adresse par page (canonical)', b: 'Décidez une fois pour toutes : https, avec ou sans <code>www</code>, avec ou sans barre finale. Redirigez les autres variantes en <strong>301</strong> et déclarez l’adresse officielle sur chaque page :', ex: '<link rel="canonical" href="https://www.exemple.fr/plombier-urgence-lyon-3/">' },
        { t: 'Relier les pages entre elles', b: 'Chaque page importante doit être atteignable en <strong>trois clics maximum</strong> depuis l’accueil. Le texte du lien décrit la page visée (« nos tarifs de débouchage », pas « cliquez ici »). Une page sans aucun lien entrant (page orpheline) est rarement bien classée.' },
        { t: 'Alléger les images', b: 'Format WebP ou AVIF, largeur adaptée à l’affichage (pas une photo de 4 000 pixels pour un bloc de 800). Indiquez toujours <code>width</code> et <code>height</code> pour éviter les sauts de mise en page. <code>loading="lazy"</code> sur les images plus bas dans la page, <strong>jamais</strong> sur la grande image du haut. Un <code>alt</code> qui décrit l’image, un nom de fichier lisible.', ex: '<img src="/img/debouchage-evier.webp" width="800" height="533" loading="lazy" alt="Débouchage d’un évier de cuisine au furet">' },
        { t: 'Passer les Core Web Vitals', b: 'Les trois seuils « bons » de Google, mesurés sur 75 % des visites réelles : <strong>LCP ≤ 2,5 s</strong> (affichage du plus gros élément), <strong>INP ≤ 200 ms</strong> (réactivité aux clics), <strong>CLS ≤ 0,1</strong> (stabilité de la page). Testez dans PageSpeed Insights, version mobile ; les données « terrain » comptent plus que la note de laboratoire. Causes habituelles : images trop lourdes, polices et scripts tiers (chat, pub, carte) chargés trop tôt.' },
        { t: 'Publier robots.txt et sitemap.xml', b: 'robots.txt, à la racine, indique où les robots ne doivent pas aller et où est le sitemap. Attention : il empêche l’exploration, <strong>pas l’indexation</strong>. Pour retirer une page de Google, laissez-la accessible et ajoutez <code>&lt;meta name="robots" content="noindex"&gt;</code>. Le sitemap ne liste que des pages canoniques qui répondent 200, au maximum 50 000 URL ou 50 Mo par fichier. Le <a href="#outil-robots-sitemap">générateur</a> prépare les deux.', ex: 'User-agent: *\nDisallow: /panier/\nDisallow: /mon-compte/\n\nSitemap: https://www.exemple.fr/sitemap.xml' },
        { t: 'Déclarer le site à Google et Bing', b: 'Search Console : créez une propriété de type <strong>Domaine</strong> (elle couvre http, https et tous les sous-domaines), validez-la avec l’enregistrement TXT fourni, envoyez le sitemap. Pour une page clé toute neuve : Inspection de l’URL, puis « Demander l’indexation ». Surveillez le rapport Pages, notamment « Explorée, actuellement non indexée » (souvent un contenu trop mince). Bing Webmaster Tools importe directement votre propriété Search Console et accepte IndexNow pour une indexation rapide.' },
        { t: 'Ajouter des données structurées', b: 'En JSON-LD, dans le <code>&lt;head&gt;</code>. Pour une entreprise locale : <code>LocalBusiness</code> (nom, adresse, téléphone, horaires, liens vers vos profils) ; pour une boutique : <code>Product</code> avec <code>offers</code> (prix, disponibilité) ; partout : <code>BreadcrumbList</code>. Ne balisez jamais un contenu invisible sur la page. Depuis 2023, Google n’affiche plus les extraits FAQ que pour les sites officiels et de santé : inutile d’en ajouter partout. Vérifiez avec le test des résultats enrichis. Le <a href="#outil-donnees-structurees">générateur JSON-LD</a> fait le code.' },
        { t: 'Soigner le référencement local', b: 'Si vous recevez des clients ou intervenez dans une zone : créez et validez votre <strong>fiche Google Business Profile</strong> (et Bing Places), catégorie principale précise, horaires à jour, vraies photos. Nom, adresse et téléphone écrits <strong>exactement pareil</strong> sur le site, la fiche et les annuaires. Demandez un avis à chaque client satisfait et répondez à tous, même aux négatifs.' },
        { t: 'Site en plusieurs langues : hreflang', b: 'Une URL par langue (<code>/fr/</code>, <code>/de/</code>), chaque version liste toutes les autres <strong>et elle-même</strong>, plus une version <code>x-default</code>. Ne redirigez jamais automatiquement selon l’adresse IP : Google explore surtout depuis les États-Unis et ne verrait qu’une langue.', ex: '<link rel="alternate" hreflang="fr-FR" href="https://exemple.com/fr/">\n<link rel="alternate" hreflang="fr-BE" href="https://exemple.com/be-fr/">\n<link rel="alternate" hreflang="de-DE" href="https://exemple.com/de/">\n<link rel="alternate" hreflang="x-default" href="https://exemple.com/">' },
        { t: 'Mesurer, puis améliorer', b: 'Après quatre à huit semaines, dans Search Console, rapport Performances : une requête avec beaucoup d’impressions mais un taux de clic faible ? Réécrivez title et description. Une page entre la 8<sup>e</sup> et la 20<sup>e</sup> position ? Enrichissez-la et ajoutez-lui des liens internes. N’achetez jamais de liens ni de faux avis : c’est contraire aux règles de Google et cela peut faire disparaître le site.' }
      ],
      tools: ['balises-seo', 'robots-sitemap', 'donnees-structurees'],
      links: [
        { t: 'Google Search Console', u: 'https://search.google.com/search-console' },
        { t: 'Bing Webmaster Tools', u: 'https://www.bing.com/webmasters' },
        { t: 'Guide SEO de Google pour débutants', u: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr' },
        { t: 'PageSpeed Insights', u: 'https://pagespeed.web.dev/' },
        { t: 'Test des résultats enrichis', u: 'https://search.google.com/test/rich-results' },
        { t: 'Règles de Google contre le spam', u: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=fr' }
      ]
    },
    {
      id: 'statistiques', t: 'Mesurer son audience en respectant la vie privée', time: '10 min',
      d: 'Savoir combien de personnes visitent votre site sans bannière cookies géante.',
      steps: [
        { t: 'Se demander ce qu’on veut savoir', b: 'Nombre de visiteurs, pages lues, provenance : la plupart des petits sites n’ont besoin de rien de plus.' },
        { t: 'Choisir un outil sans cookie', b: 'Plausible, Umami, Fathom, Simple Analytics ou Cloudflare Web Analytics mesurent sans identifiant persistant. Matomo peut aussi être configuré sans cookie.' },
        { t: 'Vérifier les règles du pays', b: 'Dans l’UE, une mesure anonyme et limitée peut être dispensée de consentement (la CNIL publie une liste d’outils). Au Royaume-Uni, une exemption existe depuis février 2026.' },
        { t: 'Si vous utilisez Google Analytics', b: 'Il faut le consentement préalable des visiteurs européens : chargez le script seulement après « Accepter ». Le <a href="#outil-banniere-cookies">générateur de bannière</a> montre comment.' },
        { t: 'Le mentionner', b: 'Indiquez l’outil utilisé dans la politique de confidentialité, même sans cookie.' }
      ],
      tools: ['banniere-cookies', 'confidentialite']
    },
    {
      id: 'accessibilite', t: 'Rendre son site accessible en 10 points', time: '20 min',
      d: 'Les gestes qui règlent l’essentiel des problèmes d’accessibilité (WCAG 2.1 AA).',
      steps: [
        { t: 'Contraste suffisant', b: 'Texte normal : contraste d’au moins 4,5:1 avec le fond. Vérifiez avec le <a href="#outil-contraste">vérificateur de contraste</a>.' },
        { t: 'Textes alternatifs', b: 'Chaque image utile a un <code>alt</code> qui dit ce qu’elle apporte ; une image décorative a <code>alt=""</code>.' },
        { t: 'Titres dans l’ordre', b: 'h1, puis h2, puis h3 : les lecteurs d’écran s’en servent comme d’un sommaire.' },
        { t: 'Tout au clavier', b: 'Parcourez la page avec Tab : chaque lien et bouton doit être atteignable, avec un contour de focus visible.' },
        { t: 'Formulaires étiquetés', b: 'Chaque champ a un <code>&lt;label&gt;</code> ; les erreurs disent quoi corriger.' },
        { t: 'Liens explicites', b: 'Pas de « cliquez ici » : le texte du lien dit où il mène.' },
        { t: 'Langue de la page', b: '<code>&lt;html lang="fr"&gt;</code> pour que la voix de synthèse prononce bien.' },
        { t: 'Zoom et mobile', b: 'La page reste lisible zoomée à 200 % et sur un écran de 320 pixels de large.' },
        { t: 'Vidéos sous-titrées', b: 'Sous-titres pour les vidéos, transcription pour les podcasts.' },
        { t: 'Tester avec un outil', b: 'WAVE ou axe DevTools repèrent les erreurs automatiques ; rien ne remplace un vrai test au clavier.' }
      ],
      tools: ['contraste'],
      links: [
        { t: 'WCAG 2.1 en français (W3C)', u: 'https://www.w3.org/Translations/WCAG21-fr/' },
        { t: 'WAVE', u: 'https://wave.webaim.org/' }
      ]
    },
    {
      id: 'securite', t: 'Sécuriser son site', time: '45 min',
      premium: true, code: 'SECU', free: 2,
      d: 'Comptes, domaine, mises à jour, sauvegardes, en-têtes HTTP aux valeurs exactes, formulaires, surveillance et plan de crise : la protection complète d’un petit site.',
      steps: [
        { t: 'Faire l’inventaire des accès', b: 'Listez chaque compte qui peut toucher au site : registraire, DNS, hébergeur, administration du CMS, email, paiement, statistiques, dépôt de code. Pour chacun : qui y a accès, avec quelle adresse email, et si la double authentification est active. Retirez tout de suite les anciens prestataires et collaborateurs.' },
        { t: 'Des mots de passe uniques, dans un gestionnaire', b: 'Bitwarden, 1Password, Proton Pass ou KeePassXC génèrent et retiennent un mot de passe différent par compte : au moins <strong>16 caractères</strong> aléatoires, ou une phrase de cinq mots. Vérifiez vos adresses sur Have I Been Pwned et changez tout mot de passe apparu dans une fuite.' },
        { t: 'Double authentification, dans le bon ordre', b: 'Commencez par l’<strong>email</strong> (il permet de réinitialiser tout le reste), puis le <strong>registraire</strong>, l’hébergeur et le CMS. Préférez une clé d’accès (passkey), une clé de sécurité ou une application TOTP au SMS, qui se détourne par usurpation de carte SIM. Imprimez les codes de secours et rangez-les hors ligne.' },
        { t: 'Verrouiller le nom de domaine', b: 'Chez le registraire : verrou de transfert actif, renouvellement automatique avec une carte valide, DNSSEC si proposé. L’email de contact du registraire doit être <strong>sur un autre domaine</strong> : si le domaine expire, l’adresse qui sert à le récupérer cesse aussi de fonctionner.' },
        { t: 'Tenir CMS, thèmes et extensions à jour', b: 'Une fois par semaine au minimum ; les correctifs de sécurité, le jour même. Laissez actives les mises à jour mineures automatiques de WordPress. Supprimez (pas seulement désactivez) les thèmes et extensions inutilisés. Utilisez une version de PHP encore suivie (voir php.net, « Supported Versions »). Abonnez-vous aux alertes de vulnérabilités (WPScan, Patchstack).' },
        { t: 'Durcir WordPress', b: 'Pas d’identifiant « admin » ; limite de tentatives de connexion ; double authentification pour chaque administrateur ; XML-RPC désactivé si vous ne l’utilisez pas ; fichiers en 644, dossiers en 755, <code>wp-config.php</code> en 600 ou 640. Interdisez l’édition de code depuis l’administration, dans <code>wp-config.php</code> :', ex: "define('DISALLOW_FILE_EDIT', true);" },
        { t: 'Sauvegarder selon la règle 3-2-1', b: 'Trois copies, sur deux supports, dont une <strong>hors de chez l’hébergeur</strong> et, idéalement, non modifiable (un rançongiciel chiffre aussi les sauvegardes accessibles). Fichiers <em>et</em> base de données. Rythme : quotidien si le site prend des commandes, hebdomadaire sinon ; gardez au moins 30 jours. Testez une restauration complète tous les trois mois, sur un site de test.' },
        { t: 'Forcer HTTPS avec HSTS', b: 'Redirection 301 de toute adresse http vers https, renouvellement automatique du certificat (indispensable : leur durée de vie raccourcit). Quand <strong>tous</strong> les sous-domaines sont en HTTPS, ajoutez l’en-tête HSTS d’un an. N’ajoutez <code>preload</code> que si vous êtes sûr : c’est très long à annuler.', ex: 'Strict-Transport-Security: max-age=31536000; includeSubDomains' },
        { t: 'Ajouter les en-têtes de sécurité', b: 'Les valeurs de départ pour un site simple. Testez d’abord la politique de contenu avec <code>Content-Security-Policy-Report-Only</code> : elle signale sans bloquer. Ajoutez ensuite chaque domaine tiers dont vous avez vraiment besoin (paiement, vidéo, statistiques). Visez A+ sur Mozilla Observatory ; le <a href="#outil-en-tetes-securite">générateur</a> écrit le fichier pour votre hébergeur.', ex: "Content-Security-Policy: default-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'\nX-Content-Type-Options: nosniff\nReferrer-Policy: strict-origin-when-cross-origin\nPermissions-Policy: camera=(), microphone=(), geolocation=()" },
        { t: 'Protéger les cookies de session', b: 'Tout cookie de connexion ou de panier porte <code>Secure</code> (HTTPS seulement), <code>HttpOnly</code> (illisible par un script) et <code>SameSite=Lax</code> (pas envoyé depuis un autre site). Les CMS récents le font ; vérifiez dans les outils de développement, onglet Application, Cookies.', ex: 'Set-Cookie: session=…; Path=/; Secure; HttpOnly; SameSite=Lax' },
        { t: 'Blinder les formulaires', b: 'Validez <strong>côté serveur</strong> (le contrôle du navigateur se contourne). Ajoutez un champ piège invisible et un test anti-robot respectueux (Cloudflare Turnstile, hCaptcha). Limitez le rythme : par exemple 5 envois par minute et par adresse IP. Jamais de donnée personnelle dans une URL (méthode POST). Pour les fichiers envoyés : types et taille limités, stockage hors du dossier public.' },
        { t: 'Surveiller', b: 'Un moniteur de disponibilité (UptimeRobot, Better Stack) qui vous alerte par email ou SMS. Les alertes « Problèmes de sécurité » de la Search Console. Et un fichier <code>/.well-known/security.txt</code> (RFC 9116) pour qu’on puisse vous signaler une faille (date <code>Expires</code> à moins d’un an, à renouveler) :', ex: 'Contact: mailto:securite@votre-domaine.fr\nExpires: 2027-10-31T23:00:00.000Z\nPreferred-Languages: fr, en' },
        { t: 'Savoir quoi faire si le site est piraté', b: '1. Mettez le site en maintenance. 2. Changez <strong>tous</strong> les mots de passe et fermez toutes les sessions. 3. Restaurez une sauvegarde antérieure à l’attaque. 4. Mettez tout à jour et cherchez l’entrée dans les journaux. 5. Demandez un réexamen dans la Search Console si Google affiche un avertissement. Si des données personnelles ont fuité, notifiez l’autorité sous <strong>72 heures</strong> : voir <a href="#manuel-rgpd-pratique">Les données personnelles au quotidien</a>.' }
      ],
      tools: ['en-tetes-securite'],
      links: [
        { t: 'Mozilla HTTP Observatory', u: 'https://developer.mozilla.org/fr/observatory' },
        { t: 'Have I Been Pwned', u: 'https://haveibeenpwned.com/' },
        { t: 'Cybermalveillance.gouv.fr (aide aux victimes)', u: 'https://www.cybermalveillance.gouv.fr/' },
        { t: 'Générateur security.txt', u: 'https://securitytxt.org/' }
      ]
    },
    {
      id: 'vendre', t: 'Vendre en ligne : paiement, CGV, factures', time: '50 min',
      premium: true, code: 'VENTE', free: 2,
      d: 'Tout ce qu’il faut avant d’encaisser le premier euro : outil, paiement, informations obligatoires, bouton de commande, rétractation, garanties, TVA, factures et livraison.',
      steps: [
        { t: 'Déclarer l’activité avant la première vente', b: 'Vendre de façon habituelle suppose presque partout une immatriculation (en France, un numéro SIREN, par exemple en micro-entreprise). Distinguez dès le départ <strong>vente de marchandises</strong> et <strong>prestations de services</strong> : seuils, cotisations et taux diffèrent. Voir la <a href="#pays">fiche de votre pays</a>.' },
        { t: 'Choisir ce que vous vendez, et comment', b: 'Produits physiques (livraison, stock, retours), produits numériques (téléchargement, licences), services ou abonnements (durée, résiliation). Chaque modèle change la TVA, le droit de rétractation et le contenu des CGV : décidez-le avant d’écrire quoi que ce soit.' },
        { t: 'Choisir l’outil de boutique', b: 'Shopify (tout compris, abonnement mensuel), WooCommerce sur WordPress (souple, à maintenir vous-même), PrestaShop. Pour des produits numériques vendus dans le monde entier, un <strong>« merchant of record »</strong> comme Paddle ou Lemon Squeezy devient le vendeur légal : il collecte et reverse la TVA de chaque pays à votre place, contre des frais plus élevés (de l’ordre de 5 % + 0,50 $ par vente).' },
        { t: 'Choisir le prestataire de paiement', b: 'Stripe, Mollie, PayPal, SumUp… Comparez : frais par carte européenne (chez Stripe en France, de l’ordre de 1,5 % + 0,25 € ; vérifiez la grille à jour), frais des cartes hors UE, frais de litige, délai de versement, moyens locaux (Bancontact en Belgique, TWINT en Suisse, iDEAL aux Pays-Bas, Pix au Brésil).' },
        { t: 'Utiliser une page de paiement hébergée', b: 'Stripe Checkout, Mollie ou PayPal affichent eux-mêmes le formulaire de carte : vous ne voyez jamais un numéro de carte, et la conformité PCI DSS se réduit au questionnaire le plus court (SAQ A). Dans l’UE, l’authentification forte (3-D Secure, imposée par la directive DSP2) est gérée par le prestataire. Ne stockez jamais de numéro de carte, même « temporairement ».' },
        { t: 'Afficher les informations avant la commande', b: 'Dans l’UE (directive 2011/83/UE), avant que le client s’engage : votre identité et vos coordonnées, les caractéristiques essentielles, le prix <strong>TTC</strong>, les frais de livraison, le délai, les moyens de paiement, l’existence ou l’absence du droit de rétractation et ses conditions, les garanties légales, et pour un abonnement la durée et la façon de résilier.' },
        { t: 'Rendre le bouton de commande conforme', b: 'Un récapitulatif complet (articles, quantités, prix total, livraison) avant validation, puis un bouton dont le texte dit clairement que l’on paie : « Commander avec obligation de paiement », « Payer maintenant ». Un simple « Valider » ou « Continuer » ne suffit pas : sans mention claire, le client n’est pas engagé. La case d’acceptation des CGV ne doit jamais être pré-cochée.' },
        { t: 'Organiser le droit de rétractation', b: '<strong>14 jours</strong> dans l’UE et au Royaume-Uni, à partir de la réception pour un bien ou de la conclusion pour un service ; <strong>7 jours</strong> au Brésil ; pas de droit légal général en Suisse ni aux États-Unis (dites-le dans les CGV, ou offrez un délai commercial). Fournissez le formulaire type, remboursez sous 14 jours après la demande, frais de livraison standard compris ; pour un bien, vous pouvez attendre son retour. Si vous oubliez d’informer le client, le délai s’allonge de <strong>12 mois</strong>. Exceptions : produit personnalisé ou périssable, produit d’hygiène descellé, contenu numérique fourni tout de suite <em>avec</em> l’accord exprès du client et sa reconnaissance qu’il perd ce droit.', ex: 'Case à cocher avant un téléchargement (non pré-cochée) :\n☐ Je demande l’accès immédiat au contenu et je reconnais perdre mon droit de rétractation.' },
        { t: 'Respecter les garanties légales', b: 'Dans l’UE, la garantie légale de conformité couvre un bien pendant <strong>au moins 2 ans</strong> (directive 2019/771) ; le défaut qui apparaît dans la première année (deux ans en France pour un bien neuf) est présumé exister dès la livraison. Les contenus et services numériques ont leur propre garantie de conformité. Une garantie commerciale (« satisfait ou remboursé 30 jours ») s’ajoute, ne remplace pas.' },
        { t: 'Écrire des CGV complètes', b: 'Le plan type : identité du vendeur, objet, produits, prix, commande, paiement, livraison, rétractation, garanties légales et commerciales, responsabilité, données personnelles, service client, <strong>médiation</strong> (en France, la désignation d’un médiateur de la consommation est obligatoire : nom et coordonnées dans les CGV), droit applicable. Le lien vers la plateforme européenne de règlement en ligne des litiges n’est plus exigé depuis juillet 2025. Faites relire les CGV d’une boutique importante par un professionnel.' },
        { t: 'Gérer la TVA', b: 'Ventes à des particuliers d’autres pays de l’UE (biens à distance et services numériques) : seuil commun de <strong>10 000 € par an</strong> pour toute l’UE ; au-delà, vous appliquez la TVA du pays de l’acheteur et la déclarez chaque trimestre via le guichet unique <strong>OSS</strong>. Vente à une entreprise de l’UE : vérifiez son numéro de TVA dans VIES, facturez hors taxe avec la mention « Autoliquidation ». Prix affichés TTC pour les particuliers. Votre propre seuil de franchise : le <a href="#outil-seuils-tva">calculateur</a>.' },
        { t: 'Émettre des factures conformes', b: 'Numéro unique dans une suite continue, date, vos identité et identifiants (SIREN, numéro de TVA), identité du client, désignation, quantité, prix unitaire HT, taux et montant de TVA, totaux HT et TTC, date de la vente, conditions de paiement ; entre professionnels en France, le taux des pénalités de retard et l’indemnité forfaitaire de 40 €. En franchise de TVA en France : « TVA non applicable, art. 293 B du CGI ». Conservez-les <strong>10 ans</strong> en France. Facture électronique en France : réception obligatoire pour toutes les entreprises au 1<sup>er</sup> septembre 2026, émission pour les PME et micro-entreprises au 1<sup>er</sup> septembre 2027, via une plateforme agréée.' },
        { t: 'Cadrer la livraison et les retours', b: 'Affichez délai et transporteur avant la commande. En France, sans date indiquée, la livraison doit avoir lieu sous <strong>30 jours</strong>. Pour un particulier, le risque de perte ou de casse reste chez vous jusqu’à la remise du colis : choisissez un envoi suivi et assuré pour les objets de valeur. Écrivez une procédure de retour simple : adresse, délai, qui paie le port.' },
        { t: 'Après les premières ventes', b: 'Activez l’anti-fraude du prestataire (Stripe Radar, par exemple) et répondez à chaque contestation de paiement dans le délai, preuves de livraison à l’appui. Chaque mois : exportez les paiements, rapprochez-les des factures et des virements reçus, mettez de côté la TVA et les cotisations. Vérifiez tous les trimestres où vous en êtes par rapport aux seuils.' }
      ],
      tools: ['seuils-tva', 'mentions-legales'],
      links: [
        { t: 'Directive 2011/83/UE (droits des consommateurs)', u: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32011L0083' },
        { t: 'Guichet unique OSS (Commission européenne)', u: 'https://vat-one-stop-shop.ec.europa.eu/index_fr' },
        { t: 'Vérifier un numéro de TVA (VIES)', u: 'https://ec.europa.eu/taxation_customs/vies/' },
        { t: 'Médiateurs de la consommation référencés (France)', u: 'https://www.economie.gouv.fr/mediation-conso' },
        { t: 'Stripe', u: 'https://stripe.com/fr' },
        { t: 'Mollie', u: 'https://www.mollie.com/fr' }
      ]
    },
    {
      id: 'rgpd-pratique', t: 'Les données personnelles au quotidien', time: '45 min',
      premium: true, code: 'RGPD', free: 2,
      d: 'Le RGPD appliqué à un petit site, sans jargon : registre, bases légales, durées de conservation chiffrées, prestataires, cookies, newsletter, demandes des personnes et fuites.',
      steps: [
        { t: 'Lister ce que le site collecte', b: 'Pour chaque usage (formulaire de contact, newsletter, comptes clients, commandes, statistiques, cookies), notez : les données, le but, la base légale, la durée de conservation, qui y a accès, quels prestataires. Ce tableau <strong>est</strong> votre registre des traitements (article 30) : tenez-le même si vous êtes seul, c’est la première chose qu’une autorité demande. La CNIL propose un modèle simplifié.' },
        { t: 'Collecter le minimum', b: 'Un formulaire de contact a besoin d’un email et d’un message ; le nom est facultatif. Supprimez téléphone, date de naissance ou adresse s’ils ne servent pas à la demande. Marquez clairement les champs obligatoires. Évitez les zones de texte libre là où quelqu’un pourrait écrire des données de santé sans raison.' },
        { t: 'Choisir la bonne base légale', b: 'Chaque usage repose sur une base de l’article 6 : <strong>contrat</strong> (traiter une commande), <strong>obligation légale</strong> (garder les factures), <strong>consentement</strong> (newsletter auprès de particuliers, cookies non essentiels), <strong>intérêt légitime</strong> (répondre à un message, journaux de sécurité). Le consentement est le seul qu’on peut retirer à tout moment : ne l’utilisez pas quand une autre base convient mieux.' },
        { t: 'Informer au moment de la collecte', b: 'Sous chaque formulaire, quelques lignes (article 13) qui renvoient à la politique complète. Le <a href="#outil-confidentialite">générateur</a> rédige la politique elle-même.', ex: 'Vos données servent uniquement à répondre à votre message. Elles sont conservées 3 ans après notre dernier échange, puis supprimées. Pour y accéder, les corriger ou les effacer : vie-privee@votre-domaine.fr. En savoir plus : politique de confidentialité.' },
        { t: 'Fixer des durées de conservation précises', b: 'Repères de la CNIL (adaptez à votre pays) : contacts et prospects, <strong>3 ans</strong> après le dernier contact ; clients, la durée de la relation, puis 3 ans pour la prospection ; factures et pièces comptables, <strong>10 ans</strong> en France ; comptes inactifs, suppression ou anonymisation après 2 ans environ ; journaux de connexion, 6 mois à 1 an ; cookies, <strong>13 mois</strong> au plus, et le choix de l’internaute conservé environ 6 mois. Programmez la suppression, ne comptez pas sur votre mémoire.' },
        { t: 'Encadrer les prestataires', b: 'Hébergeur, outil d’emailing, CRM, statistiques, paiement : chacun est un sous-traitant. Signez son contrat de sous-traitance (DPA, article 28), souvent accepté en ligne dans les réglages du compte. Notez où sont les serveurs. Pour un prestataire américain, vérifiez qu’il est certifié au <strong>Data Privacy Framework</strong> (liste publique sur dataprivacyframework.gov) ou qu’il propose les clauses contractuelles types.' },
        { t: 'Régler les cookies correctement', b: 'Avant tout clic, seuls les cookies strictement nécessaires (panier, session, sécurité, choix de consentement) sont déposés. Les boutons « Accepter » et « Refuser » sont au même niveau, même taille, même couleur. On peut changer d’avis aussi facilement (lien « Cookies » en pied de page). Les scripts tiers (publicité, vidéos, Google Analytics) ne se chargent qu’après accord. Vérifiez-le dans les outils de développement, onglet Application, avant de cliquer. Le <a href="#outil-banniere-cookies">générateur de bannière</a> fait le code.' },
        { t: 'Envoyer une newsletter dans les règles', b: 'Particuliers : consentement préalable, par une case <strong>non pré-cochée</strong>. Exception pour vos clients, si vous leur proposez des produits ou services analogues et qu’ils ont pu refuser dès la collecte. Professionnels : information et possibilité de refuser suffisent si le message concerne leur métier. Le double opt-in (email de confirmation) vous donne une preuve. Un lien de désinscription dans chaque envoi, traité sans délai.' },
        { t: 'Répondre aux demandes des personnes', b: 'Accès, rectification, effacement, opposition, limitation, portabilité. Délai : <strong>1 mois</strong> à partir de la réception, prolongeable de 2 mois pour une demande complexe (prévenez la personne dans le premier mois). C’est gratuit. Vérifiez l’identité de façon proportionnée : demander une pièce d’identité n’est justifié qu’en cas de doute réel. Gardez une trace de chaque demande et de votre réponse.', ex: 'Bonjour,\nNous avons bien reçu votre demande du [date]. Vous trouverez ci-joint l’ensemble des données que nous détenons à votre sujet : [liste]. Elles proviennent de [source] et servent à [usage]. Elles seront supprimées le [date]. Vous pouvez aussi saisir la CNIL (cnil.fr).\nCordialement,' },
        { t: 'Sécuriser les données', b: 'HTTPS partout, double authentification sur chaque outil qui contient des données, accès limité aux personnes qui en ont besoin (article 32). Les exports (fichier clients, contacts) sont chiffrés ou supprimés après usage : pensez au dossier Téléchargements. Voir <a href="#manuel-securite">Sécuriser son site</a>.' },
        { t: 'Réagir à une fuite de données', b: 'Notez <strong>chaque</strong> incident dans un registre des violations, même mineur (ce qui s’est passé, données touchées, mesures prises). S’il existe un risque pour les personnes, notifiez l’autorité sous <strong>72 heures</strong> après en avoir eu connaissance (article 33 ; en France, formulaire en ligne de la CNIL). Si le risque est élevé, prévenez aussi les personnes concernées, en termes simples (article 34).' },
        { t: 'Savoir si un DPO est obligatoire', b: 'Un délégué à la protection des données n’est obligatoire que pour les organismes publics et pour ceux dont l’activité principale est un suivi à grande échelle des personnes ou le traitement de données sensibles. Un petit site n’en a généralement pas besoin ; désignez quand même une personne référente et une adresse dédiée.' },
        { t: 'Hors de l’UE : les lois proches', b: 'Royaume-Uni : UK GDPR, presque identique. Suisse : nLPD depuis septembre 2023. Brésil : LGPD. Canada : LPRPDE, et Loi 25 au Québec. Inde : DPDP Act. États-Unis : lois des États, comme la CCPA en Californie. Les sept réflexes ci-dessus couvrent l’essentiel ; les détails sont dans la <a href="#pays">fiche de chaque pays</a>. Mettez une révision annuelle dans votre agenda.' }
      ],
      tools: ['confidentialite', 'banniere-cookies'],
      links: [
        { t: 'RGPD, texte officiel (EUR-Lex)', u: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679' },
        { t: 'CNIL : modèle de registre simplifié', u: 'https://www.cnil.fr/fr/RGDP-le-registre-des-activites-de-traitement' },
        { t: 'CNIL : notifier une violation de données', u: 'https://www.cnil.fr/fr/notifier-une-violation-de-donnees-personnelles' },
        { t: 'Liste des entreprises certifiées Data Privacy Framework', u: 'https://www.dataprivacyframework.gov/list' }
      ]
    },
    {
      id: 'lancement', t: 'Le jour du lancement : la check-list technique', time: '50 min',
      premium: true, code: 'LANCE', free: 2,
      d: 'Le compte à rebours complet, de J-7 à J+7 : contenus, liens, mobile, performance, sécurité, redirections, formulaires, SEO, DNS et suivi après la mise en ligne.',
      steps: [
        { t: 'J-7 : relire tous les contenus', b: 'Chaque page, à voix haute : pas de « Lorem ipsum », pas de texte d’exemple du thème, prix et coordonnées exacts, orthographe vérifiée. Pages légales remplies avec votre <strong>vraie</strong> identité (les <a href="#outils">générateurs</a> font le premier jet).' },
        { t: 'J-7 : chasser les liens cassés', b: 'Passez le site au W3C Link Checker ou à Screaming Frog (gratuit jusqu’à 500 URL). Vérifiez que la page d’erreur répond bien avec le <strong>code 404</strong>, et non 200 (sinon Google indexe vos erreurs) :', ex: 'curl -I https://www.exemple.fr/page-qui-n-existe-pas\n# attendu : HTTP/2 404' },
        { t: 'J-7 : tester sur de vrais appareils', b: 'Un iPhone avec Safari, un Android avec Chrome, puis aux largeurs 320, 375, 768 et 1280 pixels : aucun défilement horizontal, menus utilisables au doigt, zones cliquables d’au moins 24 × 24 pixels. Les champs ont le bon type (<code>type="email"</code>, <code>type="tel"</code>) pour afficher le bon clavier.' },
        { t: 'J-7 : vérifier l’accessibilité', b: 'Parcourez le site au clavier seul (Tab, Entrée, Échap) avec un contour de focus visible. WAVE ou axe DevTools : zéro erreur. Contraste du texte d’au moins 4,5:1, attribut <code>lang</code> présent. Voir <a href="#manuel-accessibilite">les 10 points</a>.' },
        { t: 'J-3 : mesurer la performance', b: 'PageSpeed Insights, version mobile, sur l’accueil et les deux pages les plus importantes : visez un LCP ≤ 2,5 s, un CLS ≤ 0,1 et une note de 90 ou plus. Images compressées, et cache long pour les fichiers dont le nom change à chaque version :', ex: 'Cache-Control: public, max-age=31536000, immutable' },
        { t: 'J-3 : verrouiller la sécurité', b: 'HTTPS partout et aucun « contenu mixte » (avertissements dans la console du navigateur), en-têtes de sécurité en place (note Mozilla Observatory), double authentification sur l’administration. Supprimez les comptes de test, les produits de démonstration et les extensions inutiles. Le site de préproduction est protégé par mot de passe. Voir <a href="#manuel-securite">Sécuriser son site</a>.' },
        { t: 'J-3 : préparer les redirections', b: 'Une seule adresse officielle : http vers https et <code>www</code> vers sans <code>www</code> (ou l’inverse) en <strong>une seule</strong> redirection 301. Si vous remplacez un ancien site, faites un tableau ancienne URL → nouvelle URL pour <strong>chaque</strong> page qui reçoit des visites ou des liens, et gardez ces 301 au moins un an.' },
        { t: 'J-1 : tester les formulaires et les emails', b: 'Envoyez un vrai message depuis chaque formulaire : arrive-t-il, et pas dans les spams ? L’accusé de réception part-il ? SPF, DKIM et DMARC passent-ils (voir <a href="#manuel-email-pro">Email pro</a>) ? Pour une boutique : une vraie commande avec une vraie carte, puis remboursez-la ; vérifiez la facture et l’email de confirmation.' },
        { t: 'J-1 : retirer les blocages de la préproduction', b: 'L’erreur la plus fréquente d’un lancement : le site reste caché à Google. Supprimez la balise <code>noindex</code> et la règle <code>Disallow: /</code> du robots.txt. Dans WordPress, décochez « Demander aux moteurs de recherche de ne pas indexer ce site ». Les canonical, le sitemap et les liens internes pointent vers le domaine <strong>définitif</strong>, pas vers l’adresse de test.' },
        { t: 'J-1 : soigner le partage sur les réseaux', b: 'Chaque page a un title et une description uniques, une image Open Graph de <strong>1200 × 630 pixels</strong> et un favicon (voir le <a href="#outil-favicon">générateur</a>). Testez l’aperçu avec l’outil de débogage de partage de Facebook ou de LinkedIn.', ex: '<meta property="og:title" content="Dupont Plomberie – Lyon">\n<meta property="og:description" content="Intervention en 1 h, devis gratuit.">\n<meta property="og:image" content="https://www.exemple.fr/og.jpg">\n<meta property="og:url" content="https://www.exemple.fr/">' },
        { t: 'J-1 : vérifier pages légales et cookies', b: 'Mentions légales, confidentialité, cookies et CGV accessibles depuis le pied de page de <strong>toutes</strong> les pages. Ouvrez le site en navigation privée, outils de développement, onglet Application, Cookies : avant tout clic sur la bannière, seuls les cookies nécessaires sont présents.' },
        { t: 'J-1 : sauvegarder et préparer le DNS', b: 'Sauvegarde complète, fichiers et base de données. Notez (copie d’écran) tous les enregistrements DNS actuels, emails compris. 24 à 48 heures avant de basculer, baissez le TTL des enregistrements concernés à <strong>300 secondes</strong> : la bascule et un éventuel retour arrière seront presque immédiats.' },
        { t: 'Jour J : mettre en ligne', b: 'Changez les enregistrements DNS, suivez la propagation (DNS Checker), vérifiez le certificat HTTPS sur chaque variante d’adresse. Envoyez le sitemap à la Search Console et à Bing Webmaster Tools. Branchez un moniteur de disponibilité. Vérifiez que l’outil de statistiques reçoit bien des visites. Ensuite seulement, annoncez le site.' },
        { t: 'J+7 : contrôler et corriger', b: 'Search Console : rapport Pages (erreurs d’exploration, pages exclues) et Expérience. Journaux du serveur : erreurs 500 et 404 fréquentes, à corriger ou rediriger. Remontez le TTL à 3600 secondes. Recueillez les premiers retours de visiteurs. Notez dans l’agenda les dates de renouvellement du domaine et du certificat si celui-ci n’est pas automatique.' }
      ],
      tools: ['checklist', 'favicon', 'balises-seo'],
      links: [
        { t: 'W3C Link Checker', u: 'https://validator.w3.org/checklink' },
        { t: 'PageSpeed Insights', u: 'https://pagespeed.web.dev/' },
        { t: 'Mozilla HTTP Observatory', u: 'https://developer.mozilla.org/fr/observatory' },
        { t: 'DNS Checker', u: 'https://dnschecker.org/' },
        { t: 'LinkedIn Post Inspector', u: 'https://www.linkedin.com/post-inspector/' }
      ]
    }
  ];
})();
