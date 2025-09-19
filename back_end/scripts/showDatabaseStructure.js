// Script to show the actual database structure
const { Sequelize, DataTypes } = require('sequelize');

// Set up database connection
const sequelize = new Sequelize('ngomna', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
  logging: false
});

const showDatabaseStructure = async () => {
  try {
    console.log('🗄️  NGOMNA DATABASE STRUCTURE');
    console.log('=' .repeat(50));

    // Get all tables
    const [results] = await sequelize.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log(`\n📊 TABLES (${results.length} total):`);
    console.log('-'.repeat(30));
    results.forEach((table, index) => {
      console.log(`${index + 1}. ${table.table_name}`);
    });

    // Get detailed structure for each table
    for (const table of results) {
      const tableName = table.table_name;

      console.log(`\n\n📋 TABLE: ${tableName.toUpperCase()}`);
      console.log('='.repeat(40));

      // Get columns
      const [columns] = await sequelize.query(`
        SELECT
          column_name,
          data_type,
          is_nullable,
          column_default,
          character_maximum_length
        FROM information_schema.columns
        WHERE table_name = '${tableName}'
        AND table_schema = 'public'
        ORDER BY ordinal_position;
      `);

      console.log('COLUMNS:');
      columns.forEach(col => {
        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
        const length = col.character_maximum_length ? `(${col.character_maximum_length})` : '';
        const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
        console.log(`  • ${col.column_name}: ${col.data_type}${length} ${nullable}${defaultVal}`);
      });

      // Get foreign keys
      const [foreignKeys] = await sequelize.query(`
        SELECT
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE constraint_type = 'FOREIGN KEY'
        AND tc.table_name = '${tableName}';
      `);

      if (foreignKeys.length > 0) {
        console.log('\nFOREIGN KEYS:');
        foreignKeys.forEach(fk => {
          console.log(`  • ${fk.column_name} → ${fk.foreign_table_name}.${fk.foreign_column_name}`);
        });
      }

      // Get data count
      const [countResult] = await sequelize.query(`SELECT COUNT(*) as count FROM "${tableName}"`);
      console.log(`\n📊 RECORDS: ${countResult[0].count} rows`);
    }

    // Show enum types
    const [enums] = await sequelize.query(`
      SELECT
        t.typname as enum_name,
        array_agg(e.enumlabel ORDER BY enumsortorder) as enum_values
      FROM pg_type t
      JOIN pg_enum e ON t.oid = e.enumtypid
      JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      WHERE n.nspname = 'public'
      GROUP BY t.typname
      ORDER BY t.typname;
    `);

    if (enums.length > 0) {
      console.log(`\n\n🏷️  ENUM TYPES (${enums.length} total):`);
      console.log('='.repeat(40));
      enums.forEach(enumType => {
        console.log(`\n${enumType.enum_name}:`);
        enumType.enum_values.forEach(value => {
          console.log(`  • ${value}`);
        });
      });
    }

    // Show sample data from key tables
    console.log('\n\n📄 SAMPLE DATA:');
    console.log('='.repeat(40));

    // Pages
    const [pages] = await sequelize.query('SELECT id, name, slug, "pageType" FROM "Pages" LIMIT 5');
    if (pages.length > 0) {
      console.log('\nPAGES:');
      pages.forEach(page => {
        console.log(`  • ${page.id}: ${page.name} (${page.slug}) - ${page.pageType}`);
      });
    }

    // Sections
    const [sections] = await sequelize.query('SELECT id, name, "sectionType", "pageId" FROM "Sections" LIMIT 10');
    if (sections.length > 0) {
      console.log('\nSECTIONS:');
      sections.forEach(section => {
        console.log(`  • ${section.id}: ${section.name} (${section.sectionType}) - Page ${section.pageId}`);
      });
    }

    // Features
    const [features] = await sequelize.query('SELECT id, title, icon, color, "sectionId" FROM "Features" LIMIT 5');
    if (features.length > 0) {
      console.log('\nFEATURES:');
      features.forEach(feature => {
        console.log(`  • ${feature.id}: ${feature.title} (${feature.icon}) - Section ${feature.sectionId}`);
      });
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Database structure analysis complete!');

  } catch (error) {
    console.error('❌ Error analyzing database structure:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the analysis
showDatabaseStructure();