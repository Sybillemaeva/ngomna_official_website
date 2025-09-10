// homeController.js

const { sequelize, Page, Text } = require('../config/Database');

// Get homepage content (stats, news, etc.)
const getHomepageContent = async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    
    // Homepage stats data
    const stats = [
      {
        id: 1,
        icon: 'Users',
        number: '10M+',
        label: language === 'fr' ? 'Utilisateurs Actifs' : 'Active Users',
        color: 'from-blue-500 to-blue-600'
      },
      {
        id: 2,
        icon: 'Globe',
        number: '7+',
        label: language === 'fr' ? 'Services Gouvernementaux' : 'Government Services',
        color: 'from-green-500 to-green-600'
      },
      {
        id: 3,
        icon: 'Star',
        number: '4.8/5',
        label: language === 'fr' ? 'Note Utilisateur' : 'User Rating',
        color: 'from-yellow-500 to-yellow-600'
      },
      {
        id: 4,
        icon: 'Shield',
        number: '99.9%',
        label: language === 'fr' ? 'Disponibilité Système' : 'System Uptime',
        color: 'from-purple-500 to-purple-600'
      }
    ];

    // Vision points data
    const visionPoints = [
      {
        id: 1,
        icon: 'Users',
        text: language === 'fr' 
          ? 'Rapprocher les fonctionnaires camerounais des services gouvernementaux'
          : 'Bring Cameroonian public servants closer to government services'
      },
      {
        id: 2,
        icon: 'Globe',
        text: language === 'fr'
          ? 'Rapprocher les citoyens ordinaires des services gouvernementaux'
          : 'Bring ordinary citizens closer to government services'
      },
      {
        id: 3,
        icon: 'CheckCircle',
        text: language === 'fr'
          ? 'Bloc de construction fondamental de la citoyenneté électronique'
          : 'Foundational building block of e-citizenship'
      },
      {
        id: 4,
        icon: 'Shield',
        text: language === 'fr'
          ? 'Protection de l\'identité et des données des fonctionnaires'
          : 'Protection of the identity and data of public servants'
      }
    ];

    // Mission points data
    const missionPoints = [
      {
        id: 1,
        icon: 'Smartphone',
        text: language === 'fr'
          ? 'Télécharger les bulletins de paie via un compte utilisant un téléphone connecté à Internet'
          : 'Download payslips via account using internet-connected phone'
      },
      {
        id: 2,
        icon: 'Bell',
        text: language === 'fr'
          ? 'Afficher les notifications en temps réel et les mises à jour du statut des bulletins de paie'
          : 'Display real-time notifications and payslip status updates'
      },
      {
        id: 3,
        icon: 'Shield',
        text: language === 'fr'
          ? 'Protéger les données de chaque utilisateur enregistré dans le système'
          : 'Protect data of every user registered in the system'
      },
      {
        id: 4,
        icon: 'Settings',
        text: language === 'fr'
          ? 'Support pour la réinitialisation de compte, l\'assistance à l\'installation et le suivi des bogues'
          : 'Support for account reset, installation assistance, and bug tracking'
      }
    ];

    // Future services data
    const futureServices = [
      {
        id: 1,
        icon: 'MessageCircle',
        title: language === 'fr' ? 'Messagerie Gouvernementale' : 'Government Messaging',
        description: language === 'fr'
          ? 'Communications sécurisées entre fonctionnaires, réduisant la dépendance aux plateformes externes'
          : 'Secure communications between public servants, reducing reliance on external platforms',
        color: 'from-blue-500 to-blue-600'
      },
      {
        id: 2,
        icon: 'Globe',
        title: language === 'fr' ? 'Intégration des E-Services' : 'E-Services Integration',
        description: language === 'fr'
          ? 'Plateforme de services numériques complète pour toutes les interactions gouvernementales'
          : 'Comprehensive digital services platform for all government interactions',
        color: 'from-green-500 to-green-600'
      },
      {
        id: 3,
        icon: 'Shield',
        title: language === 'fr' ? 'Souveraineté des Données' : 'Data Sovereignty',
        description: language === 'fr'
          ? 'Contrôle étatique sur les données des citoyens avec des mesures de sécurité avancées'
          : 'State control over citizen data with advanced security measures',
        color: 'from-purple-500 to-purple-600'
      }
    ];

    res.status(200).json({
      success: true,
      data: {
        stats,
        visionPoints,
        missionPoints,
        futureServices
      }
    });

  } catch (error) {
    console.error('Error fetching homepage content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching homepage content',
      error: error.message
    });
  }
};

// Get news/articles data
const getNewsArticles = async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    
    const newsItems = [
      {
        id: 1,
        title: "GOV IA : UNE RÉVOLUTION POUR L'ADMINISTRATION PUBLIQUE CAMEROUNAISE",
        excerpt: language === 'fr' 
          ? "Découvrez comment l'intelligence artificielle transforme les services publics camerounais avec des innovations révolutionnaires."
          : "Discover how artificial intelligence is transforming Cameroonian public services with revolutionary innovations.",
        date: "2025-01-15",
        category: language === 'fr' ? "Innovation" : "Innovation",
        icon: "Zap",
        images: [
          "/GOV AI IMAGE 1.jpg",
          "/GOV AI IMAGE 2.jpg", 
          "/GOV AI IMAGE 3.jpg"
        ],
        featured: true,
        link: "https://impactechosnews.com/sago-2025-le-ministere-des-finances-expose-ses-innovations/"
      },
      {
        id: 2,
        title: language === 'fr' ? 'nGomna 3.0 : Nouvelles Fonctionnalités de Sécurité Avancées' : 'nGomna 3.0: Advanced Security Features Now Live',
        excerpt: language === 'fr' 
          ? 'La dernière mise à jour de nGomna introduit des fonctionnalités de sécurité révolutionnaires pour protéger vos données personnelles.'
          : 'The latest nGomna update introduces revolutionary security features to protect your personal data.',
        date: "2025-01-10",
        category: language === 'fr' ? "Sécurité" : "Security",
        icon: "Shield",
        image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 3,
        title: language === 'fr' ? 'Plus de 2 Millions d\'Utilisateurs Actifs' : 'Community Milestone: 2 Million Active Users',
        excerpt: language === 'fr'
          ? 'nGomna franchit le cap des 2 millions d\'utilisateurs actifs, confirmant son succès auprès des fonctionnaires camerounais.'
          : 'nGomna reaches 2 million active users, confirming its success among Cameroonian civil servants.',
        date: "2025-01-05",
        category: language === 'fr' ? "Communauté" : "Community",
        icon: "Users",
        image: "https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 4,
        title: language === 'fr' ? 'nGomna Remporte le Prix \'Application de l\'Année\'' : 'nGomna Wins \'App of the Year\' Award',
        excerpt: language === 'fr'
          ? 'Nous sommes honorés de recevoir cette reconnaissance prestigieuse des Mobile Excellence Awards 2025.'
          : 'We\'re honored to receive this prestigious recognition from the Mobile Excellence Awards 2025.',
        date: "2025-01-01",
        category: language === 'fr' ? "Récompenses" : "Awards",
        icon: "Star",
        image: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600"
      }
    ];

    res.status(200).json({
      success: true,
      data: newsItems
    });

  } catch (error) {
    console.error('Error fetching news articles:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching news articles',
      error: error.message
    });
  }
};

// Get FAQ data
const getFaqData = async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    
    const faqs = [
      {
        id: 1,
        question: language === 'fr' ? 'nGomna est-il vraiment gratuit?' : 'Is nGomna really free to use?',
        answer: language === 'fr' 
          ? 'Oui! nGomna est complètement gratuit à télécharger et à utiliser. Nous croyons en la fourniture de fonctionnalités premium sans aucun coût pour nos utilisateurs.'
          : 'Yes! nGomna is completely free to download and use. We believe in providing premium features without any cost to our users.'
      },
      {
        id: 2,
        question: language === 'fr' ? 'Quelle est la sécurité de mes données avec nGomna?' : 'How secure is my data with nGomna?',
        answer: language === 'fr'
          ? 'Votre confidentialité et votre sécurité sont nos priorités absolues. nGomna utilise un chiffrement de bout en bout de qualité militaire.'
          : 'Your privacy and security are our top priorities. nGomna uses military-grade end-to-end encryption to protect all your data.'
      },
      {
        id: 3,
        question: language === 'fr' ? 'Quels appareils nGomna prend-il en charge?' : 'Which devices does nGomna support?',
        answer: language === 'fr'
          ? 'nGomna est disponible sur iOS, Android, et nous offrons également une version web avec synchronisation parfaite.'
          : 'nGomna is available on iOS, Android, and we also offer a web version with seamless synchronization across all devices.'
      },
      {
        id: 4,
        question: language === 'fr' ? 'Comment commencer avec nGomna?' : 'How do I get started with nGomna?',
        answer: language === 'fr'
          ? 'Téléchargez nGomna depuis l\'App Store ou Google Play, créez votre compte gratuit, et suivez notre processus d\'intégration intuitif.'
          : 'Download nGomna from the App Store or Google Play, create your free account, and follow our intuitive onboarding process.'
      },
      {
        id: 5,
        question: language === 'fr' ? 'Puis-je utiliser nGomna hors ligne?' : 'Can I use nGomna offline?',
        answer: language === 'fr'
          ? 'Oui, de nombreuses fonctionnalités principales fonctionnent hors ligne avec synchronisation automatique lors de la reconnexion.'
          : 'Yes, many core features work offline. Your data is cached locally and syncs automatically when you reconnect.'
      }
    ];

    res.status(200).json({
      success: true,
      data: faqs
    });

  } catch (error) {
    console.error('Error fetching FAQ data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching FAQ data',
      error: error.message
    });
  }
};

// Get user testimonials/comments
const getTestimonials = async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    
    const testimonials = [
      {
        id: 1,
        name: language === 'fr' ? 'Vladimir Cruise' : 'Vladimir Cruise',
        username: '@vladimir_cruise',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 5,
        comment: language === 'fr'
          ? 'Une application révolutionnaire qui simplifie vraiment la vie des fonctionnaires camerounais. Interface intuitive et sécurisée!'
          : 'A revolutionary app that truly simplifies the lives of Cameroonian civil servants. Intuitive and secure interface!',
        timeAgo: '14 juillet 2025',
        verified: true
      },
      {
        id: 2,
        name: language === 'fr' ? 'Freddy Djilo' : 'Freddy Djilo',
        username: '@freddy_djilo',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 5,
        comment: language === 'fr'
          ? 'Enfin une solution durable pour télécharger nos bulletins de paie en toute sécurité. Bravo à l\'équipe technique!'
          : 'Finally a sustainable solution to download our payslips securely. Congratulations to the technical team!',
        timeAgo: '30 mars 2024',
        verified: true
      },
      {
        id: 3,
        name: language === 'fr' ? 'Carmelo Megha' : 'Carmelo Megha',
        username: '@carmelo_megha',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 5,
        comment: language === 'fr'
          ? 'Interface utilisateur excellente, processus de téléchargement rapide et sécurisé. Je recommande vivement cette application.'
          : 'Excellent user interface, fast and secure download process. I highly recommend this application.',
        timeAgo: '24 août 2023',
        verified: false
      },
      {
        id: 4,
        name: language === 'fr' ? 'Patou Ngoutane' : 'Patou Ngoutane',
        username: '@patou_ngoutane',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 5,
        comment: language === 'fr'
          ? 'Très pratique pour accéder à nos documents administratifs. Plus besoin de faire la queue dans les bureaux!'
          : 'Very practical for accessing our administrative documents. No more waiting in office queues!',
        timeAgo: '6 janvier 2024',
        verified: true
      },
      {
        id: 5,
        name: language === 'fr' ? 'Kris M.' : 'Kris M.',
        username: '@kris_m',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 5,
        comment: language === 'fr'
          ? 'Application stable et fiable. Le support technique est réactif et professionnel. Parfait pour nos besoins quotidiens.'
          : 'Stable and reliable application. Technical support is responsive and professional. Perfect for our daily needs.',
        timeAgo: '5 août 2024',
        verified: false
      },
      {
        id: 6,
        name: language === 'fr' ? 'Abraham Nindjio' : 'Abraham Nindjio',
        username: '@abraham_nindjio',
        avatar: 'https://images.pexels.com/photos/1681686/pexels-photo-1681686.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 5,
        comment: language === 'fr'
          ? 'Excellente initiative du gouvernement camerounais. Cette app facilite vraiment l\'accès aux services publics.'
          : 'Excellent initiative by the Cameroonian government. This app really facilitates access to public services.',
        timeAgo: '25 janvier 2024',
        verified: false
      }
    ];

    res.status(200).json({
      success: true,
      data: testimonials
    });

  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
};

module.exports = {
  getHomepageContent,
  getNewsArticles,
  getFaqData,
  getTestimonials
};