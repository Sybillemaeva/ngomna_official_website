// database.js

const { Sequelize, DataTypes } = require('sequelize');

// Set up Sequelize and PostgreSQL
const sequelize = new Sequelize('ngomna', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

// Define the Page model (main pages)
const Page = sequelize.define('Page', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  pageType: {
    type: DataTypes.ENUM('home', 'service', 'information', 'static'),
    allowNull: false,
    defaultValue: 'service'
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  metaTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  metaDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Define the Section model (page sections)
const Section = sequelize.define('Section', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sectionType: {
    type: DataTypes.ENUM(
      'header', 'footer', 'content',
      'herosection', 'about', 'why_choose_ngomna', 'carousel', 'news', 'reviews', 'faqs', 'download'
    ),
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  pageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Page,
      key: 'id'
    }
  }
});

// Define the Content model (section content)
const Content = sequelize.define('Content', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  titleEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  titleFr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subtitleEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subtitleFr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descriptionEn: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descriptionFr: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contentData: {
    type: DataTypes.JSON,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Section,
      key: 'id'
    }
  }
});

// Define the Menu model (navigation menus)
const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  menuType: {
    type: DataTypes.ENUM('header', 'footer', 'sidebar'),
    allowNull: false,
    defaultValue: 'header'
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Define the MenuItem model (menu items)
const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  labelEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  labelFr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Menu,
      key: 'id'
    }
  },
  pageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Page,
      key: 'id'
    }
  }
});

// Define the Link model (additional links)
const Link = sequelize.define('Link', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  labelEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  labelFr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linkType: {
    type: DataTypes.ENUM('internal', 'external', 'download'),
    defaultValue: 'internal'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Menu,
      key: 'id'
    }
  },
  pageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Page,
      key: 'id'
    }
  }
});

// Define the Feature model (for "Why Choose nGomna" section)
const Feature = sequelize.define('Feature', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  titleEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  titleFr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  descriptionEn: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descriptionFr: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'from-gray-500 to-gray-600'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Section,
      key: 'id'
    }
  }
});

// Define the NewsArticle model (for news section)
const NewsArticle = sequelize.define('NewsArticle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  titleEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  titleFr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  excerptEn: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  excerptFr: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contentEn: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contentFr: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoryFr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Zap'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  externalLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  }
});

// Define the Review model (for reviews section)
const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  commentEn: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  commentFr: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Define the FAQ model (for FAQs section)
const FAQ = sequelize.define('FAQ', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  questionEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  questionFr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  answerEn: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  answerFr: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Define the CarouselItem model (for carousel section)
const CarouselItem = sequelize.define('CarouselItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  titleEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  titleFr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descriptionEn: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descriptionFr: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Section,
      key: 'id'
    }
  }
});

// Define the Media model (for image management)
const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: true
  },
  caption: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Define the relationships with cascading behavior

// Page -> Section relationship
Page.hasMany(Section, {
  foreignKey: 'pageId',
  as: 'sections',
  onDelete: 'CASCADE'
});
Section.belongsTo(Page, {
  foreignKey: 'pageId',
  as: 'page'
});

// Section -> Content relationship
Section.hasMany(Content, {
  foreignKey: 'sectionId',
  as: 'contents',
  onDelete: 'CASCADE'
});
Content.belongsTo(Section, {
  foreignKey: 'sectionId',
  as: 'section'
});

// Section -> Feature relationship (for why_choose_ngomna section)
Section.hasMany(Feature, {
  foreignKey: 'sectionId',
  as: 'features',
  onDelete: 'CASCADE'
});
Feature.belongsTo(Section, {
  foreignKey: 'sectionId',
  as: 'section'
});

// Section -> CarouselItem relationship
Section.hasMany(CarouselItem, {
  foreignKey: 'sectionId',
  as: 'carouselItems',
  onDelete: 'CASCADE'
});
CarouselItem.belongsTo(Section, {
  foreignKey: 'sectionId',
  as: 'section'
});

// Menu -> MenuItem relationship
Menu.hasMany(MenuItem, {
  foreignKey: 'menuId',
  as: 'menuItems',
  onDelete: 'CASCADE'
});
MenuItem.belongsTo(Menu, {
  foreignKey: 'menuId',
  as: 'menu'
});

// Menu -> Link relationship
Menu.hasMany(Link, {
  foreignKey: 'menuId',
  as: 'links',
  onDelete: 'CASCADE'
});
Link.belongsTo(Menu, {
  foreignKey: 'menuId',
  as: 'menu'
});

// Page -> MenuItem relationship
Page.hasMany(MenuItem, {
  foreignKey: 'pageId',
  as: 'menuItems',
  onDelete: 'CASCADE'
});
MenuItem.belongsTo(Page, {
  foreignKey: 'pageId',
  as: 'page'
});

// Page -> Link relationship
Page.hasMany(Link, {
  foreignKey: 'pageId',
  as: 'links',
  onDelete: 'CASCADE'
});
Link.belongsTo(Page, {
  foreignKey: 'pageId',
  as: 'page'
});

// Sync the models with the database and insert sample data
sequelize.sync({ force: true }) // This will recreate the tables
  .then(async () => {
    console.log('Database & tables created!');

    // Create pages including home page
    const pages = await Page.bulkCreate([
      { name: 'Home', slug: 'home', url: '/', pageType: 'home' },
      { name: 'Payslips', slug: 'payslips', url: '/payslips', pageType: 'service' },
      { name: 'Information', slug: 'information', url: '/information', pageType: 'service' },
      { name: 'Notifications', slug: 'notifications', url: '/notifications', pageType: 'service' },
      { name: 'Messaging', slug: 'messaging', url: '/messaging', pageType: 'service' },
      { name: 'Security', slug: 'security', url: '/security', pageType: 'service' },
      { name: 'DGI', slug: 'dgi', url: '/dgi', pageType: 'service' },
      { name: 'GOV-AI', slug: 'gov-ai', url: '/gov-ai', pageType: 'service' },
      { name: 'Census', slug: 'census', url: '/census', pageType: 'service' },
      { name: 'Children', slug: 'children', url: '/children', pageType: 'service' },
      { name: 'OTP', slug: 'otp', url: '/otp', pageType: 'service' },
      { name: 'News', slug: 'news', url: '/news', pageType: 'information' }
    ]);

    console.log('Pages created:', pages.map(p => ({ id: p.id, name: p.name, pageType: p.pageType })));

    // Create sections for home page
    const homePage = pages[0];
    const homeSections = await Section.bulkCreate([
      { name: 'Header', sectionType: 'header', order: 1, pageId: homePage.id },
      { name: 'Hero Section', sectionType: 'herosection', order: 2, pageId: homePage.id },
      { name: 'About', sectionType: 'about', order: 3, pageId: homePage.id },
      { name: 'Why Choose nGomna', sectionType: 'why_choose_ngomna', order: 4, pageId: homePage.id },
      { name: 'Carousel', sectionType: 'carousel', order: 5, pageId: homePage.id },
      { name: 'News', sectionType: 'news', order: 6, pageId: homePage.id },
      { name: 'Reviews', sectionType: 'reviews', order: 7, pageId: homePage.id },
      { name: 'FAQs', sectionType: 'faqs', order: 8, pageId: homePage.id },
      { name: 'Download', sectionType: 'download', order: 9, pageId: homePage.id },
      { name: 'Footer', sectionType: 'footer', order: 10, pageId: homePage.id }
    ]);

    // Create sections for other service pages (herosection, about, carousel)
    for (let i = 1; i < pages.length; i++) {
      await Section.bulkCreate([
        { name: 'Header', sectionType: 'header', order: 1, pageId: pages[i].id },
        { name: 'Hero Section', sectionType: 'herosection', order: 2, pageId: pages[i].id },
        { name: 'About', sectionType: 'about', order: 3, pageId: pages[i].id },
        { name: 'Carousel', sectionType: 'carousel', order: 4, pageId: pages[i].id },
        { name: 'Footer', sectionType: 'footer', order: 5, pageId: pages[i].id }
      ]);
    }

    console.log('Sections created for all pages');

    // Create content for home page hero section
    const heroSection = homeSections.find(s => s.sectionType === 'herosection');
    await Content.create({
      title: 'Welcome to nGomna',
      titleEn: 'Welcome to nGomna',
      titleFr: 'Bienvenue à nGomna',
      subtitle: 'Your Digital Government Services Platform',
      subtitleEn: 'Your Digital Government Services Platform',
      subtitleFr: 'Votre plateforme de services gouvernementaux numériques',
      description: 'Access all your government services in one secure platform. Download payslips, manage notifications, and stay connected.',
      descriptionEn: 'Access all your government services in one secure platform. Download payslips, manage notifications, and stay connected.',
      descriptionFr: 'Accédez à tous vos services gouvernementaux sur une plateforme sécurisée. Téléchargez vos bulletins de paie, gérez les notifications et restez connecté.',
      sectionId: heroSection.id,
      order: 1
    });

    // Create sample news articles
    await NewsArticle.bulkCreate([
      {
        title: "GOV IA : UNE RÉVOLUTION POUR L'ADMINISTRATION PUBLIQUE CAMEROUNAISE",
        titleEn: "GOV AI: A REVOLUTION FOR CAMEROONIAN PUBLIC ADMINISTRATION",
        titleFr: "GOV IA : UNE RÉVOLUTION POUR L'ADMINISTRATION PUBLIQUE CAMEROUNAISE",
        excerpt: "Discover how artificial intelligence is transforming Cameroonian public services with revolutionary innovations.",
        excerptEn: "Discover how artificial intelligence is transforming Cameroonian public services with revolutionary innovations.",
        excerptFr: "Découvrez comment l'intelligence artificielle transforme les services publics camerounais avec des innovations révolutionnaires.",
        category: "Innovation",
        categoryEn: "Innovation",
        categoryFr: "Innovation",
        icon: "Zap",
        images: ["/GOV AI IMAGE 1.jpg", "/GOV AI IMAGE 2.jpg", "/GOV AI IMAGE 3.jpg"],
        featured: true,
        externalLink: "https://impactechosnews.com/sago-2025-le-ministere-des-finances-expose-ses-innovations/",
        slug: "gov-ai-revolution-public-administration"
      },
      {
        title: "nGomna 3.0: Advanced Security Features",
        titleEn: "nGomna 3.0: Advanced Security Features",
        titleFr: "nGomna 3.0 : Fonctionnalités de sécurité avancées",
        excerpt: "The latest nGomna update introduces revolutionary security features.",
        excerptEn: "The latest nGomna update introduces revolutionary security features.",
        excerptFr: "La dernière mise à jour de nGomna introduit des fonctionnalités de sécurité révolutionnaires.",
        category: "Security",
        categoryEn: "Security",
        categoryFr: "Sécurité",
        icon: "Shield",
        image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
        slug: "ngomna-3-security-features"
      }
    ]);

    // Create sample FAQs
    await FAQ.bulkCreate([
      {
        question: "Is nGomna really free to use?",
        questionEn: "Is nGomna really free to use?",
        questionFr: "nGomna est-il vraiment gratuit?",
        answer: "Yes! nGomna is completely free to download and use.",
        answerEn: "Yes! nGomna is completely free to download and use.",
        answerFr: "Oui! nGomna est complètement gratuit à télécharger et à utiliser.",
        order: 1
      },
      {
        question: "How secure is my data with nGomna?",
        questionEn: "How secure is my data with nGomna?",
        questionFr: "Quelle est la sécurité de mes données avec nGomna?",
        answer: "Your privacy and security are our top priorities. nGomna uses military-grade encryption.",
        answerEn: "Your privacy and security are our top priorities. nGomna uses military-grade encryption.",
        answerFr: "Votre confidentialité et votre sécurité sont nos priorités absolues. nGomna utilise un chiffrement de qualité militaire.",
        order: 2
      }
    ]);

    // Create sample reviews
    await Review.bulkCreate([
      {
        name: "Vladimir Cruise",
        username: "@vladimir_cruise",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        rating: 5,
        comment: "A revolutionary app that truly simplifies the lives of Cameroonian civil servants.",
        commentEn: "A revolutionary app that truly simplifies the lives of Cameroonian civil servants.",
        commentFr: "Une application révolutionnaire qui simplifie vraiment la vie des fonctionnaires camerounais.",
        verified: true
      },
      {
        name: "Freddy Djilo",
        username: "@freddy_djilo",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
        rating: 5,
        comment: "Finally a sustainable solution to download our payslips securely.",
        commentEn: "Finally a sustainable solution to download our payslips securely.",
        commentFr: "Enfin une solution durable pour télécharger nos bulletins de paie en toute sécurité.",
        verified: true
      }
    ]);

    // Create features for "Why Choose nGomna" section
    const whyChooseSection = homeSections.find(s => s.sectionType === 'why_choose_ngomna');
    await Feature.bulkCreate([
      {
        title: "Fast & Efficient",
        titleEn: "Fast & Efficient",
        titleFr: "Rapide et efficace",
        description: "Lightning-fast performance for all your government service needs.",
        descriptionEn: "Lightning-fast performance for all your government service needs.",
        descriptionFr: "Performances ultra-rapides pour tous vos besoins de services gouvernementaux.",
        icon: "Zap",
        color: "from-yellow-400 to-yellow-500",
        order: 1,
        sectionId: whyChooseSection.id
      },
      {
        title: "Secure & Protected",
        titleEn: "Secure & Protected",
        titleFr: "Sécurisé et protégé",
        description: "Military-grade security to protect your personal information.",
        descriptionEn: "Military-grade security to protect your personal information.",
        descriptionFr: "Sécurité de niveau militaire pour protéger vos informations personnelles.",
        icon: "Shield",
        color: "from-green-500 to-emerald-600",
        order: 2,
        sectionId: whyChooseSection.id
      }
    ]);

    // Create menus
    const headerMenu = await Menu.create({ title: 'main-navigation', menuType: 'header' });
    const footerMenu = await Menu.create({ title: 'footer-links', menuType: 'footer' });

    // Create menu items
    await MenuItem.bulkCreate([
      { label: 'Home', labelEn: 'Home', labelFr: 'Accueil', url: '/', order: 1, menuId: headerMenu.id, pageId: pages[0].id },
      { label: 'Payslips', labelEn: 'Payslips', labelFr: 'Bulletins de paie', url: '/payslips', order: 2, menuId: headerMenu.id, pageId: pages[1].id },
      { label: 'DGI', labelEn: 'DGI', labelFr: 'DGI', url: '/dgi', order: 3, menuId: headerMenu.id, pageId: pages[6].id },
      { label: 'Security', labelEn: 'Security', labelFr: 'Sécurité', url: '/security', order: 4, menuId: headerMenu.id, pageId: pages[5].id }
    ]);

    console.log('Sample data created successfully!');
  })
  .catch(err => {
    console.error('Unable to create tables:', err);
  });

module.exports = {
  sequelize,
  Page,
  Section,
  Content,
  Menu,
  MenuItem,
  Link,
  Feature,
  NewsArticle,
  Review,
  FAQ,
  CarouselItem,
  Media
};
