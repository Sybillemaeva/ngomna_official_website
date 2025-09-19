// Script to add Features section data that matches the frontend Features component
const { Sequelize, DataTypes } = require('sequelize');

// Set up database connection
const sequelize = new Sequelize('ngomna', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

// Import models from existing database
const { Page, Section, Feature } = require('../config/Database');

const addFeatureData = async () => {
  try {
    // Find home page and its features section
    const homePage = await Page.findOne({ where: { slug: 'home' } });
    if (!homePage) {
      console.log('Home page not found');
      return;
    }

    let featuresSection = await Section.findOne({
      where: {
        pageId: homePage.id,
        sectionType: 'why_choose_ngomna'
      }
    });

    if (!featuresSection) {
      console.log('Why Choose nGomna section not found');
      return;
    }

    // Add features that match the frontend Features.jsx component
    const features = [
      {
        sectionId: featuresSection.id,
        title: 'Lightning Fast',
        titleEn: 'Lightning Fast',
        titleFr: 'Ultra Rapide',
        description: 'Access your government services instantly with our optimized platform.',
        descriptionEn: 'Access your government services instantly with our optimized platform.',
        descriptionFr: 'Accédez instantanément à vos services gouvernementaux avec notre plateforme optimisée.',
        icon: 'Zap',
        color: 'from-yellow-400 to-yellow-500',
        order: 1,
        published: true
      },
      {
        sectionId: featuresSection.id,
        title: 'Bank-Level Security',
        titleEn: 'Bank-Level Security',
        titleFr: 'Sécurité de niveau bancaire',
        description: 'Your data is protected with military-grade encryption and security protocols.',
        descriptionEn: 'Your data is protected with military-grade encryption and security protocols.',
        descriptionFr: 'Vos données sont protégées par un cryptage et des protocoles de sécurité de grade militaire.',
        icon: 'Shield',
        color: 'from-green-500 to-emerald-600',
        order: 2,
        published: true
      },
      {
        sectionId: featuresSection.id,
        title: 'User Friendly',
        titleEn: 'User Friendly',
        titleFr: 'Convivial',
        description: 'Intuitive design that makes government services accessible to everyone.',
        descriptionEn: 'Intuitive design that makes government services accessible to everyone.',
        descriptionFr: 'Design intuitif qui rend les services gouvernementaux accessibles à tous.',
        icon: 'Heart',
        color: 'from-green-400 to-green-500',
        order: 3,
        published: true
      },
      {
        sectionId: featuresSection.id,
        title: 'Community Driven',
        titleEn: 'Community Driven',
        titleFr: 'Axé sur la communauté',
        description: 'Built with feedback from public servants and citizens across Cameroon.',
        descriptionEn: 'Built with feedback from public servants and citizens across Cameroon.',
        descriptionFr: 'Construit avec les commentaires des fonctionnaires et citoyens du Cameroun.',
        icon: 'Users',
        color: 'from-emerald-500 to-teal-600',
        order: 4,
        published: true
      },
      {
        sectionId: featuresSection.id,
        title: 'Premium Quality',
        titleEn: 'Premium Quality',
        titleFr: 'Qualité premium',
        description: 'Government-grade infrastructure ensuring 99.9% uptime and reliability.',
        descriptionEn: 'Government-grade infrastructure ensuring 99.9% uptime and reliability.',
        descriptionFr: 'Infrastructure de qualité gouvernementale garantissant 99,9% de disponibilité et de fiabilité.',
        icon: 'Star',
        color: 'from-green-600 to-green-700',
        order: 5,
        published: true
      },
      {
        sectionId: featuresSection.id,
        title: 'Cross Platform',
        titleEn: 'Cross Platform',
        titleFr: 'Multiplateforme',
        description: 'Available on web, mobile, and desktop for seamless access anywhere.',
        descriptionEn: 'Available on web, mobile, and desktop for seamless access anywhere.',
        descriptionFr: 'Disponible sur web, mobile et bureau pour un accès transparent partout.',
        icon: 'Smartphone',
        color: 'from-teal-500 to-cyan-600',
        order: 6,
        published: true
      }
    ];

    // Insert features
    await Feature.bulkCreate(features, { ignoreDuplicates: true });

    console.log('✅ Features data added successfully!');
    console.log(`Added ${features.length} features to section ${featuresSection.id}`);

  } catch (error) {
    console.error('❌ Error adding feature data:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the script
addFeatureData();