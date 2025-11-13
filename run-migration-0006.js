const { Client } = require('pg');
const fs = require('node:fs');
const path = require('node:path');

async function runMigration() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('📦 Connected to database');

    const migrationFile = path.join(__dirname, 'migrations', '0006_add_image_url_to_order.sql');
    const sql = fs.readFileSync(migrationFile, 'utf-8');

    console.log('🚀 Running migration: 0006_add_image_url_to_order.sql');
    await client.query(sql);

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

runMigration();
