// homeController.js

const {
  sequelize,
  Page,
  Section,
  Content,
  NewsArticle,
  FAQ,
  Review,
  Feature
} = require('../config/Database');

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

    // Fetch news articles from database
    const newsArticles = await NewsArticle.findAll({
      where: { published: true },
      order: [['featured', 'DESC'], ['publishedAt', 'DESC']]
    });

    // Format articles for response based on language
    const newsItems = newsArticles.map(article => ({
      id: article.id,
      title: language === 'fr' ? (article.titleFr || article.title) : (article.titleEn || article.title),
      excerpt: language === 'fr' ? (article.excerptFr || article.excerpt) : (article.excerptEn || article.excerpt),
      content: language === 'fr' ? (article.contentFr || article.content) : (article.contentEn || article.content),
      date: article.publishedAt,
      category: language === 'fr' ? (article.categoryFr || article.category) : (article.categoryEn || article.category),
      icon: article.icon,
      image: article.image,
      images: article.images,
      featured: article.featured,
      link: article.externalLink,
      slug: article.slug
    }));

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

    // Fetch FAQs from database
    const faqData = await FAQ.findAll({
      where: { published: true },
      order: [['order', 'ASC'], ['id', 'ASC']]
    });

    // Format FAQs for response based on language
    const faqs = faqData.map(faq => ({
      id: faq.id,
      question: language === 'fr' ? (faq.questionFr || faq.question) : (faq.questionEn || faq.question),
      answer: language === 'fr' ? (faq.answerFr || faq.answer) : (faq.answerEn || faq.answer),
      category: faq.category
    }));

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

    // Fetch reviews from database
    const reviewData = await Review.findAll({
      where: { published: true },
      order: [['publishedAt', 'DESC']]
    });

    // Format reviews for response based on language
    const testimonials = reviewData.map(review => ({
      id: review.id,
      name: review.name,
      username: review.username,
      avatar: review.avatar,
      rating: review.rating,
      comment: language === 'fr' ? (review.commentFr || review.comment) : (review.commentEn || review.comment),
      timeAgo: review.publishedAt,
      verified: review.verified
    }));

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

// Get page content with all sections
const getPageContent = async (req, res) => {
  try {
    const { pageSlug } = req.params;
    const { language = 'en' } = req.query;

    // Find the page by slug
    const page = await Page.findOne({
      where: { slug: pageSlug, published: true },
      include: [
        {
          model: Section,
          as: 'sections',
          where: { published: true },
          required: false,
          include: [
            {
              model: Content,
              as: 'contents',
              where: { published: true },
              required: false
            },
            {
              model: Feature,
              as: 'features',
              where: { published: true },
              required: false
            }
          ]
        }
      ],
      order: [
        [{ model: Section, as: 'sections' }, 'order', 'ASC'],
        [{ model: Section, as: 'sections' }, { model: Content, as: 'contents' }, 'order', 'ASC'],
        [{ model: Section, as: 'sections' }, { model: Feature, as: 'features' }, 'order', 'ASC']
      ]
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    // Format page content based on language
    const pageContent = {
      id: page.id,
      name: page.name,
      slug: page.slug,
      url: page.url,
      pageType: page.pageType,
      sections: page.sections.map(section => ({
        id: section.id,
        name: section.name,
        sectionType: section.sectionType,
        order: section.order,
        contents: section.contents.map(content => ({
          id: content.id,
          title: language === 'fr' ? (content.titleFr || content.title) : (content.titleEn || content.title),
          subtitle: language === 'fr' ? (content.subtitleFr || content.subtitle) : (content.subtitleEn || content.subtitle),
          description: language === 'fr' ? (content.descriptionFr || content.description) : (content.descriptionEn || content.description),
          contentData: content.contentData,
          order: content.order
        })),
        features: section.features.map(feature => ({
          id: feature.id,
          title: language === 'fr' ? (feature.titleFr || feature.title) : (feature.titleEn || feature.title),
          description: language === 'fr' ? (feature.descriptionFr || feature.description) : (feature.descriptionEn || feature.description),
          icon: feature.icon,
          color: feature.color,
          order: feature.order
        }))
      }))
    };

    res.status(200).json({
      success: true,
      data: pageContent
    });

  } catch (error) {
    console.error('Error fetching page content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching page content',
      error: error.message
    });
  }
};

// Get features for a specific section
const getSectionFeatures = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { language = 'en' } = req.query;

    // Fetch features for the section
    const features = await Feature.findAll({
      where: { sectionId, published: true },
      order: [['order', 'ASC'], ['id', 'ASC']]
    });

    // Format features for response based on language
    const formattedFeatures = features.map(feature => ({
      id: feature.id,
      title: language === 'fr' ? (feature.titleFr || feature.title) : (feature.titleEn || feature.title),
      description: language === 'fr' ? (feature.descriptionFr || feature.description) : (feature.descriptionEn || feature.description),
      icon: feature.icon,
      color: feature.color,
      order: feature.order
    }));

    res.status(200).json({
      success: true,
      data: formattedFeatures
    });

  } catch (error) {
    console.error('Error fetching section features:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching section features',
      error: error.message
    });
  }
};

// Get features for home page Features section
const getFeatures = async (req, res) => {
  try {
    const { language = 'en' } = req.query;

    // Find home page features section
    const homePage = await Page.findOne({ where: { slug: 'home' } });
    if (!homePage) {
      return res.status(404).json({
        success: false,
        message: 'Home page not found'
      });
    }

    const featuresSection = await Section.findOne({
      where: {
        pageId: homePage.id,
        sectionType: 'why_choose_ngomna',
        published: true
      }
    });

    if (!featuresSection) {
      return res.status(404).json({
        success: false,
        message: 'Features section not found'
      });
    }

    // Fetch features for the section
    const features = await Feature.findAll({
      where: { sectionId: featuresSection.id, published: true },
      order: [['order', 'ASC'], ['id', 'ASC']]
    });

    // Format features for response based on language
    const formattedFeatures = features.map(feature => ({
      id: feature.id,
      title: language === 'fr' ? (feature.titleFr || feature.title) : (feature.titleEn || feature.title),
      description: language === 'fr' ? (feature.descriptionFr || feature.description) : (feature.descriptionEn || feature.description),
      icon: feature.icon,
      color: feature.color,
      order: feature.order
    }));

    res.status(200).json({
      success: true,
      data: formattedFeatures
    });

  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching features',
      error: error.message
    });
  }
};

module.exports.getHomepageContent = getHomepageContent;
module.exports.getNewsArticles = getNewsArticles;
module.exports.getFaqData = getFaqData;
module.exports.getTestimonials = getTestimonials;
module.exports.getPageContent = getPageContent;
module.exports.getSectionFeatures = getSectionFeatures;
module.exports.getFeatures = getFeatures;