import type { LegalPack } from "./types";

/** BROUILLONS. Rédigés par un assistant IA, non par un avocat. Un avocat turc doit les relire avant publication. */
export const fr: LegalPack = {
  ui: {
    banner: "Brouillon en attente de relecture par un avocat turc. Ce texte ne constitue pas un conseil juridique et n'affirme pas que l'entreprise respecte une quelconque loi.",
    notLawyer: "Il a été préparé par un assistant IA, qui n'est pas un avocat.",
    drafted: "Brouillon préparé le : 29 octobre 2026",
    toComplete: "[À compléter par le vendeur]",
    sellerTitle: "Informations sur le vendeur",
    sellerFields: { legalName: "Raison sociale", taxOffice: "Centre des impôts", taxNumber: "Numéro fiscal", mersis: "Numéro MERSIS", address: "Adresse du siège", email: "E-mail", phone: "Téléphone", kepAddress: "Adresse KEP", foodRegistration: "Enregistrement de l'établissement alimentaire" },
    storeNotOpen: "La boutique en ligne n'est pas encore ouverte à la vente. Tant qu'elle n'est pas ouverte, les formulaires de ce site enregistrent uniquement des demandes ; rien n'est vendu et aucun paiement n'est encaissé.",
    related: "Documents associés",
  },

  privacy: {
    title: "Politique de confidentialité et notice KVKK",
    intro: "Cette notice explique quelles données personnelles NORVIGATE traite via ce site, pourquoi, et quels droits vous avez en vertu de la loi turque n° 6698 relative à la protection des données personnelles (KVKK). Elle tient également lieu d'information des personnes concernées.",
    sections: [
      { h: "1. Responsable du traitement", p: ["Le responsable du traitement est l'exploitant de NORVIGATE : [raison sociale, adresse, numéro MERSIS ou fiscal et e-mail de contact, à compléter par l'entreprise avant la publication]."] },
      { h: "2. Ce que nous collectons et comment", p: [
        "Formulaires : uniquement ce que vous y saisissez, comme votre nom, votre e-mail, un numéro de téléphone facultatif, le message ou la demande et, pour les demandes de commande, les produits et quantités choisis. Nous enregistrons aussi la langue de la page et l'heure de l'envoi.",
        "Commandes (uniquement lorsque le paiement en ligne est ouvert) : nom, prénom, e-mail, téléphone, adresse de livraison, contenu et montants de la commande, et un numéro d'identité si le prestataire de paiement l'exige. Vous payez sur la page propre au prestataire de paiement ; les données de votre carte n'arrivent jamais à NORVIGATE.",
        "Données techniques : le serveur peut consigner des informations techniques sur les requêtes pour la sécurité et le diagnostic des pannes. Votre adresse IP n'est pas enregistrée avec les envois de formulaires ni avec les commandes. Elle est utilisée brièvement dans la mémoire du serveur pour limiter les abus (limitation du débit) et, au paiement, elle est transmise au prestataire de paiement, qui l'exige.",
      ] },
      { h: "3. Finalités et bases juridiques", p: [
        "Répondre aux demandes et les traiter : votre consentement explicite donné en cochant la case de consentement d'un formulaire, et les démarches préalables à la conclusion d'un contrat.",
        "Traiter et livrer les commandes et remplir les obligations comptables et fiscales : exécution d'un contrat et obligations légales.",
        "Assurer la sécurité du site et prévenir les abus : intérêt légitime du responsable du traitement.",
        "[La liste définitive des bases au titre des articles 5 et 6 de la KVKK doit être confirmée par l'avocat.]",
      ] },
      { h: "4. Qui reçoit vos données", p: [
        "Prestataire d'hébergement et d'infrastructure : [nom et pays, à compléter].",
        "Prestataire de paiement (uniquement lorsque le paiement en ligne est ouvert) : [iyzico ou le prestataire choisi, à compléter].",
        "Transporteur (uniquement pour les commandes expédiées) : [transporteur, à compléter].",
        "Les taux de change sont récupérés par notre serveur auprès d'un service public de taux et ne comprennent pas vos données personnelles. Le module météo de la page d'Istanbul demande la météo actuelle à Open-Meteo depuis votre navigateur, de sorte qu'Open-Meteo peut voir votre adresse IP, comme pour toute requête web.",
        "Les données ne sont pas vendues. Les transferts à l'étranger, y compris l'hébergement hors de Türkiye, doivent être évalués au regard de l'article 9 de la KVKK. [À compléter avec l'avocat.]",
      ] },
      { h: "5. Conservation", p: ["Les demandes sont conservées le temps nécessaire pour y répondre, puis pendant une durée raisonnable. [Les durées exactes sont à fixer par l'entreprise.] Les justificatifs de commande et de facturation sont conservés pendant les durées prévues par le droit commercial et fiscal turc. [Les durées sont à confirmer par l'avocat.]"] },
      { h: "6. Vos droits", p: [
        "En vertu de l'article 11 de la KVKK, vous pouvez demander si vos données sont traitées, demander des informations à leur sujet, connaître les finalités du traitement et savoir si elles sont respectées, connaître les destinataires, demander la rectification, demander l'effacement ou la destruction, demander que ces démarches soient notifiées aux destinataires, vous opposer à un résultat produit exclusivement par une analyse automatisée, et demander réparation du préjudice causé par un traitement illicite.",
        "Pour exercer vos droits, écrivez à l'adresse de contact indiquée à la section 1 en précisant votre nom et un moyen de vous joindre. Le responsable du traitement doit répondre dans un délai de 30 jours. Vous pouvez également saisir le Conseil de protection des données personnelles (Personal Data Protection Board).",
      ] },
      { h: "7. Obligation d'enregistrement", p: ["La question de savoir si l'exploitant doit s'inscrire au Registre des responsables du traitement (VERBİS) dépend de sa taille et des données qu'il traite. [À confirmer par l'avocat.]"] },
      { h: "8. Modifications", p: ["Nous mettrons à jour cette notice lorsque notre manière de traiter les données change, et nous afficherons la date de la dernière version."] },
    ],
  },

  terms: {
    title: "Conditions d'utilisation",
    intro: "Ces conditions fixent les règles d'utilisation du site NORVIGATE. La vente en ligne a ses propres conditions : voir les Conditions de vente.",
    sections: [
      { h: "1. À propos du site", p: ["NORVIGATE est une plateforme de portes d'entrée des villes. Sa première porte est Istanbul. Le contenu marqué Exemple est une illustration, et non un véritable prestataire, prix, produit ou une véritable disponibilité."] },
      { h: "2. Les demandes ne sont pas des contrats", p: ["Les formulaires enregistrent des demandes et des questions. Une demande n'est ni une réservation, ni une commande, ni un contrat. Rien n'est confirmé tant que NORVIGATE ou un prestataire ne l'a pas confirmé séparément et clairement."] },
      { h: "3. Services et liens de tiers", p: ["Les liens vers des vols, des hôtels et d'autres services mènent à des sites indépendants. NORVIGATE ne contrôle ni leur contenu, ni leurs prix, ni leur disponibilité. Vérifiez les dates et les conditions sur ces sites avant de payer."] },
      { h: "4. Vos envois", p: ["Fournissez des informations exactes, et uniquement des informations que vous avez le droit de partager. N'envoyez pas de contenu illicite, trompeur ou abusif, ni de données personnelles d'autres personnes sans leur autorisation."] },
      { h: "5. Référencements", p: ["Demander à être référencé ne garantit pas la publication. NORVIGATE peut refuser, modifier ou retirer un référencement."] },
      { h: "6. Informations et conversions", p: ["Les horaires de prière sont calculés selon une méthode standard et peuvent différer légèrement du tableau de votre autorité locale. La météo provient d'un tiers. Les conversions de devises sont des taux de référence quotidiens indicatifs, et non une offre ; le montant facturé par une banque ou un prestataire de paiement peut différer."] },
      { h: "7. Propriété intellectuelle", p: ["Le nom, le logo et les illustrations de NORVIGATE appartiennent à leur titulaire. Ne les copiez pas et ne les réutilisez pas sans autorisation écrite. [La formulation relative à la titularité est à confirmer.]"] },
      { h: "8. Responsabilité", p: ["[Les limites de responsabilité et les exclusions de garantie doivent être rédigées par l'avocat. Elles ne peuvent pas exclure une responsabilité que le droit turc n'autorise pas à exclure, ni les droits des consommateurs.]"] },
      { h: "9. Modifications et droit applicable", p: ["Nous pouvons modifier ces conditions et en afficherons la date. [Le droit applicable et les tribunaux ou commissions d'arbitrage de la consommation compétents sont à confirmer par l'avocat.]"] },
    ],
  },

  sales: {
    title: "Conditions de vente et information précontractuelle",
    intro: "Ce texte s'applique aux achats effectués dans la boutique en ligne NORVIGATE une fois celle-ci ouverte. Il constitue l'information précontractuelle exigée pour les contrats à distance par le droit turc de la consommation (loi n° 6502 et règlement sur les contrats à distance). L'acheteur doit pouvoir le lire et le confirmer avant de payer.",
    sections: [
      { h: "1. Vendeur", p: ["L'identité, l'adresse et les coordonnées du vendeur figurent dans le tableau en haut de cette page. La boutique n'ouvre pas tant qu'elles ne sont pas complètes."] },
      { h: "2. Produits", p: ["Les caractéristiques principales de chaque produit, y compris le poids, les ingrédients, les allergènes, la durée de conservation et les conditions de stockage, figurent sur sa fiche produit. Vérifiez-les ainsi que l'étiquette de l'emballage. La confirmation relative aux allergènes lors du paiement est obligatoire."] },
      { h: "3. Prix et paiement", p: ["Les prix sont en livres turques et comprennent les taxes que le vendeur est tenu d'inclure. [La formulation relative aux taxes est à confirmer.] Les frais de livraison sont calculés avant le paiement et indiqués séparément. Le total affiché au moment du paiement est le total que vous payez. Le paiement s'effectue sur la page sécurisée du prestataire de paiement ; NORVIGATE ne reçoit pas les données de votre carte."] },
      { h: "4. Commande et contrat", p: ["Le contrat est conclu lorsque le paiement est confirmé et que le statut de la commande indique Payée. Le vendeur peut annuler et rembourser une commande qu'il ne peut pas honorer, par exemple si le stock n'est pas disponible."] },
      { h: "5. Livraison", p: ["Les conditions, délais et destinations de livraison figurent sur la page Expédition et retours. La livraison n'est possible que vers les destinations proposées lors du paiement."] },
      { h: "6. Droit de rétractation", p: [
        "Un consommateur dispose normalement de 14 jours à compter de la réception des produits pour se rétracter d'un contrat à distance sans donner de motif.",
        "Le règlement exclut certains produits de ce droit, notamment les produits qui se détériorent rapidement ou dont la date peut expirer, ainsi que les produits sous emballage scellé qui ne peuvent pas être retournés pour des raisons de santé ou d'hygiène une fois ouverts. Les denrées alimentaires relèvent vraisemblablement de ces exclusions. [L'avocat doit confirmer quels produits sont exclus, et les fiches produit doivent l'indiquer.]",
        "Lorsque le droit s'applique, informez le vendeur par écrit dans un délai de 14 jours. Le vendeur rembourse dans les 14 jours suivant la notification, en utilisant le même moyen de paiement. [La formulation relative aux frais de retour est à confirmer.]",
      ] },
      { h: "7. Produits défectueux ou erronés", p: ["Si les produits arrivent endommagés, erronés ou défectueux, contactez rapidement le vendeur en joignant des photos. Vos droits légaux au titre du droit turc de la consommation ne sont pas limités par les présentes conditions."] },
      { h: "8. Réclamations et litiges", p: ["Contactez d'abord le vendeur. Un consommateur peut également saisir la commission d'arbitrage de la consommation ou le tribunal de la consommation du lieu de sa résidence ou de celui du vendeur, dans les limites de montant fixées chaque année. [Les limites actuelles et la formulation sont à confirmer par l'avocat.]"] },
      { h: "9. Acheteurs hors de Türkiye", p: ["Le droit de la consommation du pays de l'acheteur peut également s'appliquer. [L'avocat doit donner son avis à ce sujet et sur les règles d'importation des denrées alimentaires dans chaque destination.] La boutique n'ouvre que les destinations que le vendeur a vérifiées."] },
      { h: "10. Données personnelles", p: ["Les données personnelles sont traitées comme décrit dans la Politique de confidentialité et notice KVKK."] },
    ],
  },

  shipping: {
    title: "Expédition et retours",
    intro: "Comment le coût de livraison des commandes est calculé, combien de temps elles prennent, et ce qui se passe en cas de problème. Les chiffres signalés comme en attente sont des valeurs provisoires que le vendeur doit remplacer par de véritables devis de transporteurs avant l'ouverture de la boutique.",
    sections: [
      { h: "1. Où nous livrons", p: ["Uniquement dans les pays proposés lors du paiement. La liste est établie par le vendeur après vérification des règles d'importation des denrées alimentaires de chaque destination. Si votre pays n'est pas proposé, nous ne pouvons pas accepter la commande."] },
      { h: "2. Frais de livraison", p: ["Le coût dépend de la destination et du poids total de la commande, emballage compris. Il est calculé par le serveur et affiché avant le paiement. [Le barème sera publié une fois les devis des transporteurs confirmés.]"] },
      { h: "3. Délai de livraison", p: ["L'estimation affichée lors du paiement correspond à une fourchette de jours à compter de l'expédition, et non à une garantie. Les contrôles douaniers hors de Türkiye peuvent allonger le délai. [Les estimations sont à confirmer avec le transporteur.]"] },
      { h: "4. Suivi", p: ["Lorsqu'une commande est expédiée, sa page de statut indique le transporteur et le numéro de suivi. Conservez le lien privé que vous recevez après le paiement : c'est le seul moyen d'ouvrir la page de statut."] },
      { h: "5. Douane, droits et règles d'importation", p: ["Les denrées alimentaires peuvent être soumises à des restrictions ou à des taxes à l'arrivée. [Le vendeur doit indiquer qui paie les droits et taxes pour chaque destination.] Un colis refusé ou retenu par la douane peut ne pas être remboursable. [À confirmer par l'avocat.]"] },
      { h: "6. Denrées périssables et retours", p: ["Les denrées alimentaires pouvant se détériorer, le droit de rétractation ne s'y applique généralement pas (voir les Conditions de vente). [L'avocat doit confirmer.] Si les produits arrivent endommagés, détériorés ou erronés, contactez-nous dans un délai de [nombre de jours, à déterminer] jours après la livraison en joignant des photos, et nous remplacerons ou rembourserons comme la loi l'exige."] },
      { h: "7. Annulation avant l'expédition", p: ["Contactez-nous dès que possible. Si la commande n'a pas été expédiée, elle peut être annulée et remboursée sur le moyen de paiement d'origine. [Le délai est à confirmer.]"] },
    ],
  },

  cookies: {
    title: "Notice sur les cookies",
    intro: "NORVIGATE ne dépose aucun cookie publicitaire ou d'analyse et ne charge aucun script tiers. Cette notice énumère les petits éléments qu'il enregistre tout de même sur votre appareil.",
    sections: [
      { h: "1. Ce qui est enregistré", p: [
        "NV_LOCALE (cookie, un an) : mémorise la langue que vous avez choisie. Strictement nécessaire au fonctionnement du choix de langue.",
        "nv_currency (stockage du navigateur) : mémorise la devise que vous choisissez pour les prix indicatifs.",
        "nv_cart_v1 (stockage du navigateur) : conserve les articles de votre panier sur votre appareil. Il n'est jamais envoyé à un serveur avant que vous n'envoyiez une demande de commande ou ne passiez au paiement.",
      ] },
      { h: "2. Aucun suivi", p: ["Il n'y a ni analyse d'audience, ni pixel publicitaire, ni contenu intégré de réseaux sociaux. Si l'un d'eux est ajouté par la suite, cette notice sera mise à jour et votre consentement sera demandé au préalable lorsque la loi l'exige."] },
      { h: "3. Requêtes vers des tiers", p: ["Le module météo de la page d'accueil d'Istanbul demande la météo actuelle à Open-Meteo directement depuis votre navigateur. Cette requête ne dépose pas de cookies, mais le prestataire peut voir votre adresse IP, comme pour toute requête web. La page du prestataire de paiement, lorsque le paiement en ligne est ouvert, a ses propres notices."] },
      { h: "4. Vos choix", p: ["Vous pouvez supprimer le cookie et le stockage du navigateur à tout moment dans les paramètres de votre navigateur. Le site oublie alors votre langue, votre devise et votre panier."] },
    ],
  },
};
