import type { ContentOverlay } from "../overlay";

/** Traduction française du contenu de src/data. À faire relire par un locuteur natif. */
export const fr: ContentOverlay = {
  "cities": {
    "istanbul": {
      "name": "Istanbul",
      "platformName": "PORTE INTERNATIONALE D'ISTANBUL",
      "tagline": "Votre porte d'entrée vers Istanbul",
      "country": "Türkiye",
      "description": "La première plateforme urbaine NORVIGATE : un guide de la ville, des catégories de services, des activités à faire, des demandes de voyage, des demandes de traduction et une boutique avec demandes de commande. Le contenu est composé de données d'exemple."
    }
  },
  "providerCategories": {
    "accommodation": {
      "name": "Hébergement",
      "description": "Hôtels, maisons d'hôtes et appartements avec services."
    },
    "transport": {
      "name": "Transport",
      "description": "Transferts aéroport et transports locaux."
    },
    "business-services": {
      "name": "Services aux entreprises",
      "description": "Création d'entreprise, comptabilité et accompagnement professionnel."
    },
    "food-dining": {
      "name": "Restauration",
      "description": "Restaurants, cafés et expériences gourmandes."
    },
    "shopping": {
      "name": "Shopping",
      "description": "Marchés, cadeaux et produits locaux."
    },
    "health-wellness": {
      "name": "Santé et bien-être",
      "description": "Cliniques, spas et services de bien-être."
    },
    "education": {
      "name": "Éducation",
      "description": "Écoles de langues, cours et soutien scolaire."
    },
    "relocation": {
      "name": "Aide à l'installation",
      "description": "Aide à l'installation pour les nouveaux arrivants."
    },
    "experiences": {
      "name": "Expériences",
      "description": "Visites, activités et choses à faire."
    }
  },
  "providers": {
    "p-guesthouse": {
      "name": "Maison d'hôtes (exemple, Vieille Ville)",
      "summary": "Profil de démonstration d'une fiche de maison d'hôtes.",
      "description": "Cet exemple montre comment sera présenté un profil d'hébergement : une courte description, le quartier, les langues parlées et une date de dernière mise à jour. Il ne s'agit pas d'une véritable maison d'hôtes.",
      "area": "Fatih"
    },
    "p-apartments": {
      "name": "Appartements avec services (exemple)",
      "summary": "Profil de démonstration d'une fiche d'appartements avec services.",
      "description": "Une fiche d'exemple pour les séjours de longue durée. Elle illustre uniquement la mise en page du profil ; il n'existe ni appartements, ni tarifs, ni disponibilités.",
      "area": "Şişli"
    },
    "p-transfer": {
      "name": "Société de transferts aéroport (exemple)",
      "summary": "Profil de démonstration d'un prestataire de transferts.",
      "description": "Une fiche de transport d'exemple indiquant une zone de service couvrant la ville. Il ne s'agit pas d'un véritable opérateur et elle n'indique ni véhicules, ni itinéraires, ni prix.",
      "area": "Toute la ville",
      "serviceArea": "Istanbul, y compris les deux aéroports"
    },
    "p-business": {
      "name": "Conseil en création d'entreprise (exemple)",
      "summary": "Profil de démonstration d'une fiche de services professionnels.",
      "description": "Une fiche d'exemple pour l'aide à la création d'entreprise et à la comptabilité. Il ne s'agit pas d'un véritable cabinet et elle ne fournit ni conseils, ni honoraires, ni qualifications.",
      "area": "Şişli"
    },
    "p-kitchen": {
      "name": "Cuisine familiale (exemple)",
      "summary": "Profil de démonstration d'une fiche de restaurant.",
      "description": "Un profil de restauration d'exemple. Il n'indique ni menu, ni horaires, ni prix, ni notes, car l'établissement n'est pas réel.",
      "area": "Kadıköy"
    },
    "p-gifts": {
      "name": "Boutique de cadeaux du bazar (exemple)",
      "summary": "Profil de démonstration d'une fiche de boutique.",
      "description": "Une fiche de shopping d'exemple. Elle illustre uniquement la mise en page ; il n'y a ni véritable boutique, ni stock, ni prix derrière elle.",
      "area": "Fatih"
    },
    "p-school": {
      "name": "École de langues (exemple)",
      "summary": "Profil de démonstration d'une fiche d'école de langues.",
      "description": "Une fiche d'éducation d'exemple. Elle n'indique ni cours, ni horaires, ni tarifs, ni accréditation, car l'école n'est pas réelle.",
      "area": "Beyoğlu",
      "accessibility": "Informations sur l'accessibilité non fournies pour cet exemple."
    },
    "p-relocation": {
      "name": "Aide à l'installation (exemple)",
      "summary": "Profil de démonstration d'une fiche d'aide à l'installation.",
      "description": "Une fiche d'exemple pour l'accompagnement à l'installation. Elle ne propose aucun service réel et ne donne aucun conseil en matière de résidence ou de questions juridiques.",
      "area": "Kadıköy",
      "serviceArea": "Istanbul"
    }
  },
  "experiences": {
    "e-hagia-sophia": {
      "title": "Sainte-Sophie",
      "summary": "Un monument de la péninsule historique, achevé au VIe siècle.",
      "description": "Achevée au VIe siècle, Sainte-Sophie a été une église, une mosquée et un musée, et est aujourd'hui une mosquée en activité. Les modalités de visite, les règles vestimentaires et les règles d'accès sont fixées par les autorités et peuvent changer ; consultez donc la source officielle avant votre visite.",
      "area": "Fatih (Sultanahmet)",
      "duration": "Prévoyez environ 1–2 heures"
    },
    "e-topkapi": {
      "title": "Palais de Topkapı",
      "summary": "Un ancien palais impérial ottoman dominant la Corne d'Or et le Bosphore.",
      "description": "Pendant des siècles, résidence principale et centre administratif des sultans ottomans, le palais de Topkapı est aujourd'hui un musée avec des cours, des pavillons et des collections. Consultez la source officielle pour connaître les jours d'ouverture, les parties accessibles aux visiteurs et la billetterie.",
      "area": "Fatih (Sultanahmet)",
      "duration": "Prévoyez environ une demi-journée"
    },
    "e-cistern": {
      "title": "Citerne Basilique",
      "summary": "Une citerne d'eau souterraine byzantine soutenue par des rangées de colonnes.",
      "description": "Construite au VIe siècle pour stocker l'eau destinée aux palais de la ville, la citerne est une salle de colonnes fraîche et faiblement éclairée, sous la vieille ville. Consultez la source officielle pour les horaires et les billets.",
      "area": "Fatih (Sultanahmet)",
      "duration": "Prévoyez environ 1 heure"
    },
    "e-grand-bazaar": {
      "title": "Grand Bazar",
      "summary": "L'un des plus anciens et des plus grands marchés couverts du monde.",
      "description": "Un labyrinthe de rues et de cours couvertes comptant des centaines de boutiques qui vendent des textiles, des céramiques, des lampes, des bijoux et des cadeaux. Les prix sont négociables dans de nombreuses boutiques ; les jours et les horaires d'ouverture varient, confirmez-les donc avant votre visite.",
      "area": "Fatih (Beyazıt)",
      "duration": "Prévoyez environ 1–3 heures"
    },
    "e-spice-bazaar": {
      "title": "Bazar aux épices",
      "summary": "Un marché couvert historique réputé pour ses épices, ses douceurs et ses fruits secs.",
      "description": "Près du front de mer d'Eminönü, le bazar est un bon endroit pour découvrir des loukoums, des épices, des thés et des fruits secs. Comparez la qualité et les prix entre les étals, et vérifiez l'étiquette de tout produit que vous comptez rapporter chez vous.",
      "area": "Fatih (Eminönü)",
      "duration": "Prévoyez environ 1 heure"
    },
    "e-galata": {
      "title": "Tour de Galata et son quartier",
      "summary": "Une tour de pierre médiévale offrant des vues sur la vieille ville et la Corne d'Or.",
      "description": "La tour se dresse dans le quartier de Galata, dont les rues escarpées mènent à des cafés, de petites galeries et des boutiques. Consultez la source officielle pour les modalités de visite.",
      "area": "Beyoğlu (Galata)",
      "duration": "Prévoyez environ 1–2 heures"
    },
    "e-suleymaniye": {
      "title": "Mosquée Süleymaniye",
      "summary": "Un complexe de mosquée du XVIe siècle conçu par l'architecte Sinan.",
      "description": "Dominant la Corne d'Or depuis l'une des collines de la ville, le complexe est l'une des œuvres les plus connues de l'architecte Mimar Sinan. C'est un lieu de culte actif : habillez-vous de manière modeste, et respectez les heures de prière et les règles de visite.",
      "area": "Fatih (Süleymaniye)",
      "duration": "Prévoyez environ 1 heure"
    },
    "e-bosphorus": {
      "title": "Le Bosphore en ferry",
      "summary": "Passez de l'Europe à l'Asie sur le détroit qui divise la ville.",
      "description": "Le Bosphore relie la mer Noire et la mer de Marmara et sépare les rives européenne et asiatique d'Istanbul. Des ferries publics comme des croisières organisées y circulent ; les itinéraires, les horaires et les tarifs changent, renseignez-vous donc auprès de l'opérateur.",
      "area": "Dans toute la ville",
      "duration": "Prévoyez environ 1–2 heures"
    },
    "e-kadikoy": {
      "title": "Kadıköy",
      "summary": "Un quartier de la rive asiatique réputé pour ses rues commerçantes, ses cafés et sa liaison par ferry.",
      "description": "Accessible en ferry depuis la rive européenne, Kadıköy possède un quartier de marché animé consacré à l'alimentation, des cafés et des boutiques indépendantes. Une manière détendue de découvrir l'Istanbul du quotidien, loin des principaux monuments.",
      "area": "Kadıköy",
      "duration": "Prévoyez environ une demi-journée"
    }
  },
  "travelServices": {
    "t-ist-transfer": {
      "title": "Transfert depuis/vers l'aéroport d'Istanbul (IST)",
      "summary": "Demande de transfert privé entre l'aéroport d'Istanbul et votre hébergement.",
      "description": "Indiquez votre vol, votre heure d'arrivée et votre destination dans la ville, et nous enregistrons la demande. Aucun véhicule, aucun prix ni aucun chauffeur n'est réservé par l'envoi de cette demande.",
      "location": "De l'aéroport d'Istanbul (IST) vers des adresses de la ville",
      "inclusions": [
        "Demande enregistrée par NORVIGATE",
        "Suivi de votre demande (non garanti)"
      ],
      "exclusions": [
        "Disponibilité confirmée",
        "Prix fixe",
        "Suivi du vol"
      ]
    },
    "t-saw-transfer": {
      "title": "Transfert depuis/vers Sabiha Gökçen (SAW)",
      "summary": "Demande de transfert privé entre l'aéroport Sabiha Gökçen et votre hébergement.",
      "description": "Indiquez votre vol, votre heure d'arrivée et votre destination dans la ville, et nous enregistrons la demande. Aucun véhicule, aucun prix ni aucun chauffeur n'est réservé par l'envoi de cette demande.",
      "location": "De l'aéroport Sabiha Gökçen (SAW) vers des adresses de la ville",
      "inclusions": [
        "Demande enregistrée par NORVIGATE",
        "Suivi de votre demande (non garanti)"
      ],
      "exclusions": [
        "Disponibilité confirmée",
        "Prix fixe",
        "Suivi du vol"
      ]
    },
    "t-old-city-tour": {
      "title": "Visite touristique de la Vieille Ville (exemple)",
      "summary": "Un exemple de visite guidée de la péninsule historique.",
      "description": "Montre comment est présentée une page de service de visite : description, prestations incluses, prestations non incluses, lieu et formulaire de demande. Aucun organisateur de visite, itinéraire, guide ni prix ne se cache derrière cet exemple.",
      "location": "Péninsule historique (Fatih)",
      "duration": "Environ une demi-journée (à titre indicatif)",
      "inclusions": [
        "Planification d'un parcours autour de sites bien connus",
        "Guide (si un guide qualifié est prévu)"
      ],
      "exclusions": [
        "Billets d'entrée",
        "Repas et boissons",
        "Prise en charge à l'hôtel"
      ]
    },
    "t-bosphorus": {
      "title": "Aide pour une croisière sur le Bosphore (exemple)",
      "summary": "Aide pour choisir entre les ferries publics et les croisières organisées.",
      "description": "Un exemple de service d'assistance qui explique les options et vous oriente vers le canal de réservation propre à l'opérateur. NORVIGATE ne vend pas de billets.",
      "location": "Embarcadères du Bosphore",
      "duration": "Environ 1–2 heures (à titre indicatif)",
      "inclusions": [
        "Informations sur les options"
      ],
      "exclusions": [
        "Billets",
        "Horaires confirmés"
      ]
    },
    "t-local-transport": {
      "title": "Orientation dans les transports locaux (exemple)",
      "summary": "Aide pour comprendre les options de métro, de tramway, de ferry et de bus.",
      "description": "Un exemple de service décrivant une aide à l'orientation pour les nouveaux arrivants. Il renvoie vers les informations officielles sur la carte de transport dans le guide de la ville et ne vend pas de titres de transport.",
      "location": "Istanbul",
      "inclusions": [
        "Explication des principaux modes de transport"
      ],
      "exclusions": [
        "Cartes ou billets de transport",
        "Informations sur les tarifs (renseignez-vous auprès de l'opérateur)"
      ]
    },
    "t-assistance": {
      "title": "Aide au voyage et à l'itinéraire (exemple)",
      "summary": "Aide générale pour planifier un voyage à Istanbul.",
      "description": "Un exemple de service d'assistance : dites-nous ce que vous souhaitez voir et quand, et nous enregistrons votre demande. Il n'inclut pas la réservation de vols, d'hôtels ou de visites.",
      "location": "Istanbul",
      "inclusions": [
        "Demande enregistrée par NORVIGATE"
      ],
      "exclusions": [
        "Réservations de vols, d'hôtels ou de visites",
        "Conseils en matière de visa ou de droit"
      ]
    }
  },
  "products": {
    "pr-lokum": {
      "name": "Loukoum turc (lokum, exemple)",
      "summary": "Cubes tendres saupoudrés de sucre. Produit d'exemple.",
      "description": "Une fiche de démonstration pour le loukoum turc classique. Le produit, le prix et les détails sont inventés pour montrer le fonctionnement d'une page produit de la boutique.",
      "variants": [
        {
          "label": "Boîte de 250 g"
        },
        {
          "label": "Boîte de 500 g"
        }
      ],
      "ingredients": "Sucre, amidon, eau, arôme (exemple)",
      "storage": "Endroit frais et sec (exemple)"
    },
    "pr-baklava": {
      "name": "Baklava à la pistache (exemple)",
      "summary": "Pâtisserie feuilletée aux fruits à coque et au sirop. Produit d'exemple.",
      "description": "Une fiche de démonstration pour le baklava. La pâtisserie fraîche a une courte durée de conservation et nécessite un envoi soigneux, ce qui explique en partie pourquoi l'expédition n'est pas activée.",
      "variants": [
        {
          "label": "Boîte de 500 g"
        },
        {
          "label": "Boîte de 1 kg"
        }
      ],
      "ingredients": "Farine, pistaches, beurre, sucre, eau (exemple)",
      "storage": "Endroit frais, à l'abri de la lumière du soleil (exemple)"
    },
    "pr-halva": {
      "name": "Halva au tahini (exemple)",
      "summary": "Bloc de confiserie à base de sésame. Produit d'exemple.",
      "description": "Une fiche de démonstration pour le halva au tahini. Données d'exemple uniquement.",
      "variants": [
        {
          "label": "Bloc de 300 g"
        }
      ],
      "ingredients": "Pâte de sésame, sucre (exemple)",
      "storage": "Endroit frais et sec (exemple)"
    },
    "pr-tea": {
      "name": "Thé noir (exemple)",
      "summary": "Thé noir en feuilles. Produit d'exemple.",
      "description": "Une fiche de démonstration pour du thé noir en feuilles, en paquet.",
      "variants": [
        {
          "label": "Paquet de 250 g"
        },
        {
          "label": "Paquet de 500 g"
        }
      ],
      "ingredients": "Thé noir (exemple)",
      "storage": "Récipient hermétique, endroit sec (exemple)"
    },
    "pr-coffee": {
      "name": "Café turc (exemple)",
      "summary": "Café finement moulu à préparer dans un cezve. Produit d'exemple.",
      "description": "Une fiche de démonstration pour du café finement moulu.",
      "variants": [
        {
          "label": "Paquet de 100 g"
        },
        {
          "label": "Paquet de 250 g"
        }
      ],
      "ingredients": "Café moulu (exemple)",
      "storage": "Récipient hermétique, endroit frais (exemple)"
    },
    "pr-spread": {
      "name": "Pâte à tartiner aux noisettes (exemple)",
      "summary": "Pâte à tartiner aux noisettes en pot. Produit d'exemple.",
      "description": "Une fiche de démonstration pour une pâte à tartiner aux noisettes.",
      "variants": [
        {
          "label": "Pot de 400 g"
        }
      ],
      "ingredients": "Noisettes, sucre, lait en poudre, cacao (exemple)",
      "storage": "Endroit frais et sec (exemple)"
    },
    "pr-molasses": {
      "name": "Mélasse de grenade (exemple)",
      "summary": "Sirop de grenade acidulé pour la cuisine. Produit d'exemple.",
      "description": "Une fiche de démonstration pour une spécialité de garde-manger.",
      "variants": [
        {
          "label": "Bouteille de 350 g"
        }
      ],
      "ingredients": "Grenade (exemple)",
      "storage": "Endroit frais ; à conserver au réfrigérateur après ouverture (exemple)"
    },
    "pr-spice": {
      "name": "Mélange d'épices d'Istanbul (exemple)",
      "summary": "Un mélange d'épices. Produit d'exemple.",
      "description": "Une fiche de démonstration pour un mélange d'épices. La composition des mélanges d'épices peut varier considérablement ; celui-ci est inventé.",
      "variants": [
        {
          "label": "Pot de 100 g"
        }
      ],
      "ingredients": "Épices moulues variées (exemple)",
      "storage": "Hermétique, à l'abri de la lumière (exemple)"
    },
    "pr-nuts": {
      "name": "Mélange de fruits à coque grillés (exemple)",
      "summary": "Noisettes et pistaches grillées. Produit d'exemple.",
      "description": "Une fiche de démonstration pour un mélange de fruits à coque grillés.",
      "variants": [
        {
          "label": "Sachet de 250 g"
        }
      ],
      "ingredients": "Noisettes, pistaches (exemple)",
      "storage": "Endroit frais et sec (exemple)"
    },
    "pr-gift-box": {
      "name": "Coffret cadeau dégustation d'Istanbul (exemple)",
      "summary": "Un coffret cadeau assorti de douceurs et de thé d'exemple. Produit d'exemple.",
      "description": "Une fiche de démonstration pour un coffret cadeau. Le contenu est inventé ; un véritable coffret cadeau indiquerait chaque article et ses allergènes.",
      "variants": [
        {
          "label": "Petit coffret"
        },
        {
          "label": "Grand coffret"
        }
      ],
      "ingredients": "Voir chaque article (exemple)",
      "storage": "Endroit frais et sec (exemple)"
    },
    "pr-soap": {
      "name": "Savon à l'huile d'olive (exemple)",
      "summary": "Une savonnette à l'huile d'olive. Produit d'exemple.",
      "description": "Une fiche de démonstration pour un savon de style artisanal. Ce n'est pas un produit alimentaire.",
      "variants": [
        {
          "label": "1 savonnette (150 g)"
        },
        {
          "label": "Lot de 3"
        }
      ],
      "storage": "Endroit sec (exemple)"
    },
    "pr-towel": {
      "name": "Serviette de bain en coton, peştemal (exemple)",
      "summary": "Une serviette fine en coton tissé. Produit d'exemple.",
      "description": "Une fiche de démonstration pour une serviette en coton tissé, présentée avec des options de couleur pour illustrer les variantes de produit.",
      "variants": [
        {
          "label": "Bleu marine"
        },
        {
          "label": "Orange"
        }
      ],
      "storage": "Lavable en machine (exemple)"
    }
  },
  "faqItems": {
    "what": {
      "q": "Qu'est-ce que NORVIGATE ?",
      "a": "NORVIGATE est une plateforme de porte d'entrée urbaine qui aide les gens à découvrir une ville, à planifier ce dont ils ont besoin, à trouver des services locaux et à entrer en contact avec des prestataires. Istanbul est la première plateforme urbaine."
    },
    "sample": {
      "q": "Pourquoi le site indique-t-il « données d'exemple » ?",
      "a": "Il s'agit d'un aperçu. Les prestataires, produits, prix et services présentés ici ont été créés pour démontrer la plateforme et ne sont pas réels. De véritables fiches vérifiées les remplaceront, et nous l'indiquerons clairement."
    },
    "book": {
      "q": "Puis-je réserver ou payer sur NORVIGATE ?",
      "a": "Pas pour le moment. Les formulaires enregistrent uniquement une demande. Il n'y a ni paiement, ni moteur de réservation, ni connexion, ni système de réservation. Les vols et les hôtels renvoient vers des sites externes où vous pouvez réserver selon leurs conditions."
    },
    "verified": {
      "q": "Les prestataires sont-ils vérifiés ?",
      "a": "Pour l'instant, aucun prestataire n'est réel ni vérifié. Lorsque de vrais prestataires seront ajoutés, seuls les champs contenant des données réelles seront affichés, avec une date de dernière mise à jour. Nous n'affichons pas d'avis, de notes, d'adresses ni de disponibilités inventés."
    },
    "contact-business": {
      "q": "Comment contacter une entreprise ?",
      "a": "Les fiches d'exemple n'ont pas de coordonnées. Pour l'instant, vous pouvez envoyer une demande à NORVIGATE via le formulaire de contact ; elle est reçue par NORVIGATE et n'est pas transmise automatiquement à un prestataire."
    },
    "store": {
      "q": "Comment fonctionne la boutique ?",
      "a": "Vous pouvez parcourir des produits d'exemple, remplir un panier et envoyer une demande de commande. Cela enregistre votre intérêt. Cela ne vous débite pas, ne réserve pas de stock et ne confirme pas de commande, et la livraison et l'expédition ne sont pas opérationnelles."
    },
    "international": {
      "q": "Les produits peuvent-ils être expédiés à l'étranger ?",
      "a": "Pas encore. L'expédition internationale, en particulier de denrées alimentaires, nécessite un examen des restrictions d'importation du pays de destination, des règles d'étiquetage, de la faisabilité de l'expédition et de la préparation des commandes avant l'activation de toute destination. Nous n'activerons aucune destination avant cet examen."
    },
    "translation": {
      "q": "La traduction certifiée est-elle disponible ?",
      "a": "La traduction certifiée ne peut être proposée que lorsqu'un prestataire dûment qualifié est disponible. Pour l'instant, une demande enregistre votre intérêt ; la disponibilité n'est pas confirmée."
    },
    "languages": {
      "q": "Quelles langues le site prend-il en charge ?",
      "a": "L'anglais, le turc, l'arabe, l'espagnol et le français, avec une mise en page complète de droite à gauche pour l'arabe. La plateforme est conçue pour que d'autres langues puissent être ajoutées ; le texte qui n'est pas encore traduit s'affiche en anglais. Utilisez le sélecteur de langue dans l'en-tête."
    },
    "currency": {
      "q": "Les prix convertis sont-ils exacts ?",
      "a": "Non. Les conversions sont indicatives, fondées sur les taux de référence quotidiens d'un service tiers. Les prix de la boutique sont des prix d'exemple en livres turques et rien n'est débité. Si le service de taux est injoignable, aucun montant converti n'est affiché."
    },
    "listing": {
      "q": "Si je soumets mon entreprise, sera-t-elle référencée ?",
      "a": "Pas automatiquement. La soumission enregistre votre intérêt et ne garantit pas la publication. Les soumissions sont examinées avant toute publication."
    },
    "privacy": {
      "q": "Qu'advient-il des informations que j'envoie ?",
      "a": "Elles sont conservées par NORVIGATE pour donner suite à votre demande. Aucun cookie d'analyse ou de publicité n'est utilisé. La politique de confidentialité est un projet en attente de révision juridique."
    }
  },
  "guideSections": {
    "arriving": {
      "title": "Arrivée : aéroports et entrée sur le territoire",
      "body": [
        "Istanbul compte deux grands aéroports commerciaux : l'aéroport d'Istanbul (IST) sur la rive européenne et Sabiha Gökçen (SAW) sur la rive asiatique. Vérifiez quel aéroport figure sur votre billet avant d'organiser la suite de votre trajet.",
        "Les conditions d'entrée et de visa dépendent de votre nationalité et peuvent changer. Utilisez le système officiel d'e-visa et les conseils aux voyageurs de votre propre gouvernement plutôt que de vous fier au résumé d'un tiers."
      ],
      "links": [
        {
          "label": "e-Visa de la République de Türkiye (site officiel)"
        },
        {
          "label": "Exploitant de l'aéroport Sabiha Gökçen"
        }
      ]
    },
    "transport": {
      "title": "Se déplacer",
      "body": [
        "Les transports publics d'Istanbul combinent métro, tramway, train de banlieue, bus, funiculaires et ferries traversant le Bosphore. La carte de transport intelligente de la ville, İstanbulkart, est le moyen de paiement habituel sur la plupart des transports publics.",
        "Les tarifs, les itinéraires, les horaires et les lieux où acheter ou recharger une carte changent. Consultez toujours les informations officielles de l'opérateur."
      ],
      "links": [
        {
          "label": "İstanbulkart (site officiel)"
        },
        {
          "label": "Municipalité métropolitaine d'Istanbul"
        }
      ]
    },
    "connectivity": {
      "title": "Connectivité",
      "body": [
        "Les données mobiles, les cartes SIM et les règles d'utilisation d'un téléphone étranger en Türkiye sont fixées par les autorités et les opérateurs et peuvent changer. Renseignez-vous auprès d'un opérateur agréé et de sources officielles avant votre voyage ou l'achat d'une carte SIM."
      ]
    },
    "essentials": {
      "title": "Services essentiels",
      "body": [
        "Le numéro d'urgence unique en Türkiye est le 112. Vérifiez-le, ainsi que les autres numéros locaux, auprès d'une source officielle ; les numéros et les services peuvent changer.",
        "Pour obtenir des informations destinées aux visiteurs, le portail touristique national officiel est un bon point de départ."
      ],
      "links": [
        {
          "label": "GoTürkiye (portail touristique officiel)"
        }
      ]
    },
    "customs": {
      "title": "Coutumes locales",
      "body": [
        "Lors de la visite de mosquées, habillez-vous de manière modeste, couvrez-vous les épaules et les genoux, et attendez-vous à devoir retirer vos chaussures. Il peut être demandé aux femmes de se couvrir les cheveux. Évitez de visiter pendant les heures de prière, sauf si vous venez pour prier, et suivez les instructions du personnel.",
        "Le marchandage est courant dans de nombreuses boutiques des bazars, mais pas dans les boutiques à prix affichés."
      ]
    },
    "money": {
      "title": "Argent et prix",
      "body": [
        "La monnaie est la livre turque (TRY). Les taux de change et les prix changent fréquemment. Le convertisseur de devises NORVIGATE affiche des taux de référence quotidiens indicatifs provenant d'un service tiers ; il ne s'agit pas de prix de marché en temps réel. Les prix affichés sur ce site sont des données d'exemple."
      ]
    }
  },
  "externalLinks": {
    "skyscanner": {
      "description": "Comparateur de vols qui répertorie les tarifs des compagnies aériennes et des agences de voyages."
    },
    "turkish-airlines": {
      "description": "Le site propre à la compagnie aérienne pour rechercher et réserver ses vols."
    },
    "pegasus": {
      "description": "Le site propre à la compagnie aérienne pour rechercher et réserver ses vols."
    },
    "booking": {
      "description": "Site de réservation d'hébergements en ligne proposant un large choix d'établissements."
    },
    "expedia": {
      "description": "Site de voyage proposant des hébergements (Stays) parmi d'autres produits de voyage."
    }
  },
  "allergenLabels": {
    "gluten": "Gluten",
    "treeNuts": "Fruits à coque",
    "milk": "Lait",
    "sesame": "Graines de sésame"
  }
};
