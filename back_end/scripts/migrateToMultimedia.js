// Migration script to upgrade database with multimedia support
const { Sequelize } = require('sequelize');

// Current database connection
const currentSequelize = new Sequelize('ngomna', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
  logging: false
});

const migrateToMultimedia = async () => {
  try {
    console.log('🔄 Starting multimedia database migration...');

    // 1. Backup existing data
    console.log('\n📁 Backing up existing data...');

    const [pages] = await currentSequelize.query('SELECT * FROM "Pages"');
    const [sections] = await currentSequelize.query('SELECT * FROM "Sections"');
    const [contents] = await currentSequelize.query('SELECT * FROM "Contents"');
    const [features] = await currentSequelize.query('SELECT * FROM "Features"');
    const [newsArticles] = await currentSequelize.query('SELECT * FROM "NewsArticles"');
    const [reviews] = await currentSequelize.query('SELECT * FROM "Reviews"');
    const [faqs] = await currentSequelize.query('SELECT * FROM "FAQs"');
    const [menus] = await currentSequelize.query('SELECT * FROM "Menus"');
    const [menuItems] = await currentSequelize.query('SELECT * FROM "MenuItems"');

    console.log(`Backed up:
  - ${pages.length} pages
  - ${sections.length} sections
  - ${contents.length} contents
  - ${features.length} features
  - ${newsArticles.length} news articles
  - ${reviews.length} reviews
  - ${faqs.length} faqs
  - ${menus.length} menus
  - ${menuItems.length} menu items`);

    // 2. Replace the database configuration
    console.log('\n🔧 Replacing database configuration...');
    const fs = require('fs');
    const path = require('path');

    const currentDbPath = path.join(__dirname, '../config/Database.js');
    const multimediaDbPath = path.join(__dirname, '../config/DatabaseMultimedia.js');
    const backupDbPath = path.join(__dirname, '../config/Database.backup.js');

    // Backup current database file
    if (fs.existsSync(currentDbPath)) {
      fs.copyFileSync(currentDbPath, backupDbPath);
      console.log('✅ Current database configuration backed up');
    }

    // Replace with multimedia version
    fs.copyFileSync(multimediaDbPath, currentDbPath);
    console.log('✅ Multimedia database configuration installed');

    // 3. Load new database models
    console.log('\n📊 Initializing new database structure...');
    delete require.cache[require.resolve('../config/Database.js')];
    const {
      sequelize: newSequelize,
      Page, Section, Content, Media, SectionMedia,
      Feature, NewsArticle, Review, FAQ, CarouselItem,
      Menu, MenuItem, Link
    } = require('../config/Database.js');

    // Wait for database sync
    await new Promise(resolve => {
      const checkSync = setInterval(() => {
        newSequelize.authenticate()
          .then(() => {
            clearInterval(checkSync);
            resolve();
          })
          .catch(() => {
            // Still syncing, wait
          });
      }, 1000);
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    // 4. Restore data with enhanced multimedia support
    console.log('\n📥 Restoring data with multimedia enhancements...');

    // Restore pages
    if (pages.length > 0) {
      await Page.bulkCreate(pages.map(page => ({
        id: page.id,
        name: page.name,
        slug: page.slug,
        url: page.url,
        pageType: page.pageType,
        published: page.published,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt
      })), { ignoreDuplicates: true });
      console.log(`✅ Restored ${pages.length} pages`);
    }

    // Restore sections with multimedia fields
    if (sections.length > 0) {
      await Section.bulkCreate(sections.map(section => ({
        id: section.id,
        name: section.name,
        sectionType: section.sectionType,
        order: section.order,
        published: section.published,
        pageId: section.pageId,
        // Initialize multimedia fields as null for existing sections
        title: null,
        titleEn: null,
        titleFr: null,
        subtitle: null,
        subtitleEn: null,
        subtitleFr: null,
        description: null,
        descriptionEn: null,
        descriptionFr: null,
        content: null,
        contentEn: null,
        contentFr: null,
        backgroundImage: null,
        primaryImage: null,
        videoUrl: null,
        videoThumbnail: null,
        customData: null,
        createdAt: section.createdAt,
        updatedAt: section.updatedAt
      })), { ignoreDuplicates: true });
      console.log(`✅ Restored ${sections.length} sections with multimedia support`);
    }

    // Restore other data
    if (contents.length > 0) {
      await Content.bulkCreate(contents.map(content => ({
        id: content.id,
        title: content.title,
        titleEn: content.titleEn,
        titleFr: content.titleFr,
        subtitle: content.subtitle,
        subtitleEn: content.subtitleEn,
        subtitleFr: content.subtitleFr,
        description: content.description,
        descriptionEn: content.descriptionEn,
        descriptionFr: content.descriptionFr,
        content: null,
        contentEn: null,
        contentFr: null,
        contentType: 'text',
        contentData: content.contentData,
        order: content.order,
        published: content.published,
        sectionId: content.sectionId,
        createdAt: content.createdAt,
        updatedAt: content.updatedAt
      })), { ignoreDuplicates: true });
      console.log(`✅ Restored ${contents.length} contents`);
    }

    if (features.length > 0) {
      await Feature.bulkCreate(features.map(feature => ({
        id: feature.id,
        title: feature.title,
        titleEn: feature.titleEn,
        titleFr: feature.titleFr,
        description: feature.description,
        descriptionEn: feature.descriptionEn,
        descriptionFr: feature.descriptionFr,
        icon: feature.icon,
        iconImage: null,
        image: null,
        color: feature.color,
        order: feature.order,
        published: feature.published,
        sectionId: feature.sectionId,
        createdAt: feature.createdAt,
        updatedAt: feature.updatedAt
      })), { ignoreDuplicates: true });
      console.log(`✅ Restored ${features.length} features with multimedia support`);
    }

    if (newsArticles.length > 0) {
      await NewsArticle.bulkCreate(newsArticles.map(article => ({
        id: article.id,
        title: article.title,
        titleEn: article.titleEn,
        titleFr: article.titleFr,
        excerpt: article.excerpt,
        excerptEn: article.excerptEn,
        excerptFr: article.excerptFr,
        content: article.content,
        contentEn: article.contentEn,
        contentFr: article.contentFr,
        category: article.category,
        categoryEn: article.categoryEn,
        categoryFr: article.categoryFr,
        icon: article.icon,
        image: article.image,
        images: article.images,
        videoUrl: null,
        videoThumbnail: null,
        featured: article.featured,
        published: article.published,
        publishedAt: article.publishedAt,
        externalLink: article.externalLink,
        slug: article.slug,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt
      })), { ignoreDuplicates: true });
      console.log(`✅ Restored ${newsArticles.length} news articles with video support`);
    }

    if (reviews.length > 0) {
      await Review.bulkCreate(reviews, { ignoreDuplicates: true });
      console.log(`✅ Restored ${reviews.length} reviews`);
    }

    if (faqs.length > 0) {
      await FAQ.bulkCreate(faqs, { ignoreDuplicates: true });
      console.log(`✅ Restored ${faqs.length} FAQs`);
    }

    if (menus.length > 0) {
      await Menu.bulkCreate(menus, { ignoreDuplicates: true });
      console.log(`✅ Restored ${menus.length} menus`);
    }

    if (menuItems.length > 0) {
      await MenuItem.bulkCreate(menuItems, { ignoreDuplicates: true });
      console.log(`✅ Restored ${menuItems.length} menu items`);
    }

    // 5. Add sample multimedia content
    console.log('\n🎨 Adding sample multimedia content...');

    // Add sample media entries
    const sampleMedia = [
      {
        filename: 'hero-bg.jpg',
        originalName: 'hero-background.jpg',
        mimetype: 'image/jpeg',
        size: 1024000,
        path: '/uploads/images/hero-bg.jpg',
        url: '/uploads/images/hero-bg.jpg',
        alt: 'Hero background image',
        altEn: 'Hero background image',
        altFr: 'Image d\'arrière-plan héros',
        caption: 'Professional background for hero sections',
        captionEn: 'Professional background for hero sections',
        captionFr: 'Arrière-plan professionnel pour les sections héros',
        mediaType: 'image',
        category: 'background',
        published: true
      },
      {
        filename: 'intro-video.mp4',
        originalName: 'ngomna-introduction.mp4',
        mimetype: 'video/mp4',
        size: 15728640,
        path: '/uploads/videos/intro-video.mp4',
        url: '/uploads/videos/intro-video.mp4',
        alt: 'nGomna introduction video',
        altEn: 'nGomna introduction video',
        altFr: 'Vidéo d\'introduction nGomna',
        caption: 'Introduction video explaining nGomna services',
        captionEn: 'Introduction video explaining nGomna services',
        captionFr: 'Vidéo d\'introduction expliquant les services nGomna',
        mediaType: 'video',
        category: 'hero',
        published: true
      }
    ];

    await Media.bulkCreate(sampleMedia, { ignoreDuplicates: true });
    console.log(`✅ Added ${sampleMedia.length} sample media files`);

    // Update a few sections with multimedia content
    const heroSection = await Section.findOne({
      where: { sectionType: 'herosection', pageId: 1 }
    });

    if (heroSection) {
      await heroSection.update({
        title: 'Welcome to nGomna',
        titleEn: 'Welcome to nGomna',
        titleFr: 'Bienvenue à nGomna',
        subtitle: 'Your Digital Government Services Platform',
        subtitleEn: 'Your Digital Government Services Platform',
        subtitleFr: 'Votre plateforme de services gouvernementaux numériques',
        description: 'Revolutionizing how Cameroonian citizens and public servants access government services through secure, efficient digital solutions.',
        descriptionEn: 'Revolutionizing how Cameroonian citizens and public servants access government services through secure, efficient digital solutions.',
        descriptionFr: 'Révolutionner la façon dont les citoyens camerounais et les fonctionnaires accèdent aux services gouvernementaux grâce à des solutions numériques sécurisées et efficaces.',
        backgroundImage: '/uploads/images/hero-bg.jpg',
        videoUrl: '/uploads/videos/intro-video.mp4',
        customData: {
          showVideo: true,
          videoAutoplay: false,
          ctaButtons: [
            {
              text: 'Download App',
              textEn: 'Download App',
              textFr: 'Télécharger l\'application',
              url: '#download',
              type: 'primary'
            }
          ]
        }
      });
      console.log('✅ Enhanced hero section with multimedia content');
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📋 MULTIMEDIA DATABASE FEATURES ADDED:');
    console.log('=' .repeat(50));
    console.log('✅ Enhanced Section model with multimedia fields:');
    console.log('   • title, subtitle, description (multi-language)');
    console.log('   • backgroundImage, primaryImage');
    console.log('   • videoUrl, videoThumbnail');
    console.log('   • customData for flexible content');
    console.log('');
    console.log('✅ New Media management system:');
    console.log('   • Comprehensive media metadata');
    console.log('   • Multi-language captions and alt text');
    console.log('   • Media types: image, video, audio, document');
    console.log('   • Media categories and roles');
    console.log('');
    console.log('✅ Section-Media relationship:');
    console.log('   • Many-to-many relationship');
    console.log('   • Media roles: primary, background, gallery, thumbnail, icon');
    console.log('   • Ordered media within sections');
    console.log('');
    console.log('✅ Enhanced existing models:');
    console.log('   • Features with custom icons and images');
    console.log('   • News articles with video support');
    console.log('   • Carousel items with video content');
    console.log('');
    console.log('🔄 All existing data preserved and enhanced!');

    await newSequelize.close();

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await currentSequelize.close();
  }
};

// Run migration
migrateToMultimedia();