/* Curated links directory. The official links of every country are added to
 * the Liens page automatically from the country files.
 * free: true = usable for free (at least a free plan). */
(function () {
  window.PW.linkCats = [
    { id: 'domaines', t: 'Noms de domaine', items: [
      { t: 'Recherche Whois / RDAP de l’ICANN', u: 'https://lookup.icann.org/', d: 'Voir qui détient un nom et quand il expire.', free: true },
      { t: 'OVHcloud', u: 'https://www.ovhcloud.com/fr/domains/', d: 'Registraire et hébergeur français.' },
      { t: 'Gandi', u: 'https://www.gandi.net/fr', d: 'Registraire français, nombreuses extensions.' },
      { t: 'Infomaniak', u: 'https://www.infomaniak.com/fr/domaines', d: 'Registraire et hébergeur suisse.' },
      { t: 'Cloudflare Registrar', u: 'https://www.cloudflare.com/products/registrar/', d: 'Noms vendus au prix coûtant, sans marge.' },
      { t: 'Porkbun', u: 'https://porkbun.com/', d: 'Registraire américain, prix de renouvellement bas.' }
    ] },
    { id: 'hebergement', t: 'Hébergement', items: [
      { t: 'GitHub Pages', u: 'https://pages.github.com/', d: 'Sites statiques gratuits depuis un dépôt GitHub.', free: true },
      { t: 'Cloudflare Pages', u: 'https://pages.cloudflare.com/', d: 'Sites statiques rapides, offre gratuite généreuse.', free: true },
      { t: 'Netlify', u: 'https://www.netlify.com/', d: 'Statique, formulaires et fonctions serverless.', free: true },
      { t: 'Vercel', u: 'https://vercel.com/', d: 'Idéal pour Next.js et les sites statiques.', free: true },
      { t: 'o2switch', u: 'https://www.o2switch.fr/', d: 'Hébergement mutualisé français, offre unique.' },
      { t: 'Hetzner', u: 'https://www.hetzner.com/', d: 'Serveurs VPS et cloud en Allemagne et Finlande.' }
    ] },
    { id: 'construire', t: 'Construire le site', items: [
      { t: 'WordPress.org', u: 'https://wordpress.org/', d: 'Le CMS le plus utilisé au monde, gratuit et libre.', free: true },
      { t: 'Ghost', u: 'https://ghost.org/', d: 'CMS pour blogs et newsletters.', free: true },
      { t: 'Astro', u: 'https://astro.build/', d: 'Générateur de sites statiques moderne.', free: true },
      { t: 'Hugo', u: 'https://gohugo.io/', d: 'Générateur statique très rapide.', free: true },
      { t: 'Eleventy', u: 'https://www.11ty.dev/', d: 'Générateur statique simple et souple.', free: true },
      { t: 'Webflow', u: 'https://webflow.com/', d: 'Constructeur visuel pour designers.' },
      { t: 'Shopify', u: 'https://www.shopify.com/fr', d: 'Boutique en ligne clé en main.' }
    ] },
    { id: 'design', t: 'Design, images et polices', items: [
      { t: 'Coolors', u: 'https://coolors.co/', d: 'Générateur de palettes de couleurs.', free: true },
      { t: 'Google Fonts', u: 'https://fonts.google.com/', d: 'Polices libres : téléchargez-les et hébergez-les vous-même.', free: true },
      { t: 'Fontsource', u: 'https://fontsource.org/', d: 'Polices libres prêtes à auto-héberger.', free: true },
      { t: 'Lucide', u: 'https://lucide.dev/', d: 'Icônes au trait, libres.', free: true },
      { t: 'Unsplash', u: 'https://unsplash.com/fr', d: 'Photos libres d’utilisation.', free: true },
      { t: 'Pexels', u: 'https://www.pexels.com/fr-fr/', d: 'Photos et vidéos libres.', free: true },
      { t: 'Openverse', u: 'https://openverse.org/fr', d: 'Moteur de recherche d’images sous licence libre.', free: true },
      { t: 'Penpot', u: 'https://penpot.app/', d: 'Outil de maquette libre, alternative à Figma.', free: true },
      { t: 'Figma', u: 'https://www.figma.com/', d: 'Maquettes et prototypes, offre gratuite.', free: true }
    ] },
    { id: 'dev', t: 'Développement', items: [
      { t: 'MDN Web Docs', u: 'https://developer.mozilla.org/fr/', d: 'La documentation de référence du HTML, CSS et JavaScript.', free: true },
      { t: 'Can I use', u: 'https://caniuse.com/', d: 'Quelles fonctionnalités marchent dans quels navigateurs.', free: true },
      { t: 'Validateur W3C', u: 'https://validator.w3.org/', d: 'Vérifier que votre HTML est valide.', free: true },
      { t: 'web.dev', u: 'https://web.dev/', d: 'Guides de Google sur la performance et les bonnes pratiques.', free: true },
      { t: 'CodePen', u: 'https://codepen.io/', d: 'Tester du code dans le navigateur.', free: true }
    ] },
    { id: 'seo', t: 'Référencement et performance', items: [
      { t: 'PageSpeed Insights', u: 'https://pagespeed.web.dev/', d: 'Note de vitesse et conseils, mobile et ordinateur.', free: true },
      { t: 'Google Search Console', u: 'https://search.google.com/search-console', d: 'Suivre votre présence dans Google.', free: true },
      { t: 'Bing Webmaster Tools', u: 'https://www.bing.com/webmasters', d: 'L’équivalent pour Bing (et les moteurs qui l’utilisent).', free: true },
      { t: 'Test des résultats enrichis', u: 'https://search.google.com/test/rich-results', d: 'Vérifier vos données structurées JSON-LD.', free: true },
      { t: 'Schema.org', u: 'https://schema.org/', d: 'Le vocabulaire des données structurées.', free: true },
      { t: 'Squoosh', u: 'https://squoosh.app/', d: 'Compresser vos images en WebP ou AVIF, dans le navigateur.', free: true }
    ] },
    { id: 'securite', t: 'Sécurité', items: [
      { t: 'Mozilla HTTP Observatory', u: 'https://developer.mozilla.org/fr/observatory', d: 'Note vos en-têtes de sécurité.', free: true },
      { t: 'SSL Labs', u: 'https://www.ssllabs.com/ssltest/', d: 'Teste la configuration HTTPS de votre serveur.', free: true },
      { t: 'Let’s Encrypt', u: 'https://letsencrypt.org/fr/', d: 'Certificats HTTPS gratuits.', free: true },
      { t: 'Have I Been Pwned', u: 'https://haveibeenpwned.com/', d: 'Savoir si une adresse email a fuité.', free: true },
      { t: 'Bitwarden', u: 'https://bitwarden.com/fr-fr/', d: 'Gestionnaire de mots de passe libre.', free: true }
    ] },
    { id: 'accessibilite', t: 'Accessibilité', items: [
      { t: 'WAVE', u: 'https://wave.webaim.org/', d: 'Analyse l’accessibilité d’une page.', free: true },
      { t: 'axe DevTools', u: 'https://www.deque.com/axe/devtools/', d: 'Extension de navigateur qui détecte les erreurs.', free: true },
      { t: 'NVDA', u: 'https://www.nvaccess.org/', d: 'Lecteur d’écran gratuit pour Windows, pour tester vous-même.', free: true },
      { t: 'WCAG 2.1 en français', u: 'https://www.w3.org/Translations/WCAG21-fr/', d: 'Le texte de référence.', free: true }
    ] },
    { id: 'email', t: 'Emails', items: [
      { t: 'mail-tester', u: 'https://www.mail-tester.com/', d: 'Note de délivrabilité d’un email envoyé.', free: true },
      { t: 'MXToolbox', u: 'https://mxtoolbox.com/', d: 'Vérifier MX, SPF, DKIM, DMARC et listes noires.', free: true },
      { t: 'Learn DMARC', u: 'https://www.learndmarc.com/', d: 'Comprendre SPF, DKIM et DMARC en le voyant fonctionner.', free: true },
      { t: 'Google Postmaster Tools', u: 'https://postmaster.google.com/', d: 'Réputation de vos envois vers Gmail.', free: true }
    ] },
    { id: 'stats', t: 'Statistiques respectueuses', items: [
      { t: 'Plausible', u: 'https://plausible.io/', d: 'Statistiques sans cookie, hébergées dans l’UE.' },
      { t: 'Umami', u: 'https://umami.is/', d: 'Statistiques sans cookie, auto-hébergeables.', free: true },
      { t: 'Matomo', u: 'https://matomo.org/', d: 'Alternative complète à Google Analytics, auto-hébergeable.', free: true },
      { t: 'Cloudflare Web Analytics', u: 'https://www.cloudflare.com/web-analytics/', d: 'Gratuit, sans cookie.', free: true }
    ] },
    { id: 'paiement', t: 'Paiement', items: [
      { t: 'Stripe', u: 'https://stripe.com/fr', d: 'Paiement par carte et abonnements, très répandu.' },
      { t: 'Mollie', u: 'https://www.mollie.com/fr', d: 'Paiements européens (carte, virement, Bancontact…).' },
      { t: 'PayPal', u: 'https://www.paypal.com/fr/business', d: 'Paiement connu des acheteurs du monde entier.' },
      { t: 'Lemon Squeezy', u: 'https://www.lemonsqueezy.com/', d: 'Vente de produits numériques, gère la TVA mondiale pour vous.' },
      { t: 'SumUp', u: 'https://www.sumup.com/fr-fr/', d: 'Liens de paiement et petite boutique en ligne.' }
    ] }
  ];
})();
