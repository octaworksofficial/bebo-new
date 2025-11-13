import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

async function runMigration() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    const migrationPath = path.join(process.cwd(), 'migrations', '0001_worried_nightcrawler.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    console.log('🚀 Running migration...');
    
    // Split by statement breakpoint and execute one by one
    const statements = sql.split('--> statement-breakpoint').map(s => s.trim()).filter(s => s);
    
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      if (stmt) {
        console.log(`  Executing statement ${i + 1}/${statements.length}...`);
        await client.query(stmt);
      }
    }

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
