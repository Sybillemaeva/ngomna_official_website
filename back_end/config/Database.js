// Enhanced Database Configuration with Multimedia Support for Sections
// This replaces the existing Database.js with multimedia content support

const { Sequelize, DataTypes } = require('sequelize');

// Set up Sequelize with SQLite for WebContainer compatibility
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
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

// Define the Section model (page sections with multimedia support)
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
  // Enhanced multimedia content fields
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
  // Multimedia fields
  backgroundImage: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Background image URL for the section'
  },
  primaryImage: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Main image for the section'
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Video URL (YouTube, Vimeo, or direct link)'
  },
  videoThumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Video thumbnail image URL'
  },
  customData: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional custom data for the section'
  }
});

// Enhanced Media model for comprehensive media management
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
  altEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  altFr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  caption: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  captionEn: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  captionFr: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  mediaType: {
    type: DataTypes.ENUM('image', 'video', 'audio', 'document'),
    allowNull: false,
    defaultValue: 'image'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Category for organizing media (hero, gallery, background, etc.)'
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Section Media relationship table (many-to-many)
const SectionMedia = sequelize.define('SectionMedia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Order of media in the section'
  },
  mediaRole: {
    type: DataTypes.ENUM('primary', 'background', 'gallery', 'thumbnail', 'icon'),
    allowNull: false,
    defaultValue: 'primary',
    comment: 'Role of media in the section'
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
  }
});

// Enhanced Content model for rich text content within sections
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
  contentType: {
    type: DataTypes.ENUM('text', 'html', 'markdown'),
    allowNull: false,
    defaultValue: 'text'
  },
  contentData: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Additional structured content data'
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

// Existing specialized models (keeping for compatibility)

// Menu model
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

// MenuItem model
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
  }
});

// Link model
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
  }
});

// Feature model (enhanced for multimedia)
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
  iconImage: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Custom icon image URL'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Feature image URL'
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
  }
});

// NewsArticle model (enhanced)
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
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  videoThumbnail: {
    type: DataTypes.STRING,
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

// Review model
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

// FAQ model
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

// CarouselItem model
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
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  videoThumbnail: {
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
  }
});

// Define associations
Page.hasMany(Section, { foreignKey: 'pageId', as: 'sections' });
Section.belongsTo(Page, { foreignKey: 'pageId', as: 'page' });

Section.hasMany(Content, { foreignKey: 'sectionId', as: 'contents' });
Content.belongsTo(Section, { foreignKey: 'sectionId', as: 'section' });

Section.hasMany(Feature, { foreignKey: 'sectionId', as: 'features' });
Feature.belongsTo(Section, { foreignKey: 'sectionId', as: 'section' });

Section.hasMany(CarouselItem, { foreignKey: 'sectionId', as: 'carouselItems' });
CarouselItem.belongsTo(Section, { foreignKey: 'sectionId', as: 'section' });

// Media associations - Many-to-Many relationship between Sections and Media
Section.belongsToMany(Media, {
  through: SectionMedia,
  foreignKey: 'sectionId',
  otherKey: 'mediaId',
  as: 'media'
});

Media.belongsToMany(Section, {
  through: SectionMedia,
  foreignKey: 'mediaId',
  otherKey: 'sectionId',
  as: 'sections'
});

// Menu associations
Menu.hasMany(MenuItem, { foreignKey: 'menuId', as: 'items' });
MenuItem.belongsTo(Menu, { foreignKey: 'menuId', as: 'menu' });

Menu.hasMany(Link, { foreignKey: 'menuId', as: 'links' });
Link.belongsTo(Menu, { foreignKey: 'menuId', as: 'menu' });

Page.hasMany(MenuItem, { foreignKey: 'pageId', as: 'menuItems' });
MenuItem.belongsTo(Page, { foreignKey: 'pageId', as: 'page' });

Page.hasMany(Link, { foreignKey: 'pageId', as: 'links' });
Link.belongsTo(Page, { foreignKey: 'pageId', as: 'page' });

// Sync database - temporarily using force: true to recreate tables
// Change to { alter: true } for production use after initial setup
sequelize.sync({ force: true }).then(async () => {
  console.log('✅ Enhanced multimedia database synchronized');

  // Create initial data will be handled by separate scripts

}).catch(error => {
  console.error('❌ Error syncing database:', error);
});

module.exports = {
  sequelize,
  Page,
  Section,
  Content,
  Media,
  SectionMedia,
  Menu,
  MenuItem,
  Link,
  Feature,
  NewsArticle,
  Review,
  FAQ,
  CarouselItem
};