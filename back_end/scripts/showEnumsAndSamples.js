// Script to show enums and sample data
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ngomna', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
  logging: false
});

const showEnumsAndSamples = async () => {
  try {
    console.log('🏷️  ENUM TYPES:');
    console.log('='.repeat(40));

    // Get enum types with individual queries
    const enums = [
      'enum_Pages_pageType',
      'enum_Sections_sectionType',
      'enum_Menus_menuType',
      'enum_Links_linkType'
    ];

    for (const enumName of enums) {
      try {
        const [values] = await sequelize.query(`
          SELECT enumlabel
          FROM pg_enum e
          JOIN pg_type t ON e.enumtypid = t.oid
          WHERE t.typname = '${enumName}'
          ORDER BY enumsortorder;
        `);

        console.log(`\n${enumName}:`);
        values.forEach(v => console.log(`  • ${v.enumlabel}`));
      } catch (err) {
        console.log(`\n${enumName}: Error retrieving values`);
      }
    }

    console.log('\n\n📄 SAMPLE DATA:');
    console.log('='.repeat(40));

    // Pages
    const [pages] = await sequelize.query('SELECT id, name, slug, "pageType" FROM "Pages" ORDER BY id LIMIT 10');
    if (pages.length > 0) {
      console.log('\nPAGES:');
      pages.forEach(page => {
        console.log(`  • ${page.id}: ${page.name} (${page.slug}) - ${page.pageType}`);
      });
    }

    // Sections
    const [sections] = await sequelize.query('SELECT id, name, "sectionType", "pageId" FROM "Sections" ORDER BY "pageId", "order" LIMIT 15');
    if (sections.length > 0) {
      console.log('\nSECTIONS:');
      sections.forEach(section => {
        console.log(`  • ${section.id}: ${section.name} (${section.sectionType}) - Page ${section.pageId}`);
      });
    }

    // Features
    const [features] = await sequelize.query('SELECT id, title, icon, color, "sectionId" FROM "Features" ORDER BY "order" LIMIT 10');
    if (features.length > 0) {
      console.log('\nFEATURES:');
      features.forEach(feature => {
        console.log(`  • ${feature.id}: ${feature.title} (${feature.icon}) - Section ${feature.sectionId}`);
      });
    }

    // News Articles
    const [newsArticles] = await sequelize.query('SELECT id, title, category, featured FROM "NewsArticles" LIMIT 5');
    if (newsArticles.length > 0) {
      console.log('\nNEWS ARTICLES:');
      newsArticles.forEach(article => {
        console.log(`  • ${article.id}: ${article.title} (${article.category}) - Featured: ${article.featured}`);
      });
    }

    // Reviews
    const [reviews] = await sequelize.query('SELECT id, name, rating, verified FROM "Reviews" LIMIT 5');
    if (reviews.length > 0) {
      console.log('\nREVIEWS:');
      reviews.forEach(review => {
        console.log(`  • ${review.id}: ${review.name} - Rating: ${review.rating} - Verified: ${review.verified}`);
      });
    }

    // FAQs
    const [faqs] = await sequelize.query('SELECT id, question, category FROM "FAQs" ORDER BY "order" LIMIT 5');
    if (faqs.length > 0) {
      console.log('\nFAQS:');
      faqs.forEach(faq => {
        console.log(`  • ${faq.id}: ${faq.question.substring(0, 50)}... (${faq.category || 'General'})`);
      });
    }

    // Menu Items
    const [menuItems] = await sequelize.query('SELECT id, label, url, "menuId" FROM "MenuItems" ORDER BY "order" LIMIT 10');
    if (menuItems.length > 0) {
      console.log('\nMENU ITEMS:');
      menuItems.forEach(item => {
        console.log(`  • ${item.id}: ${item.label} (${item.url || 'no URL'}) - Menu ${item.menuId}`);
      });
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Complete database structure analysis done!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
};

showEnumsAndSamples();