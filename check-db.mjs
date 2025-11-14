import 'dotenv/config';

import pg from 'pg';

const { Client } = pg;

async function checkDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔌 Railway PostgreSQL\'e bağlanıyor...');
    await client.connect();
    console.log('✅ Bağlantı başarılı!\n');

    // Tabloları listele
    console.log('📋 Mevcut tablolar:');
    const tablesResult = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);

    if (tablesResult.rows.length === 0) {
      console.log('⚠️  Henüz tablo yok. Migration\'lar çalışmadı.');
    } else {
      tablesResult.rows.forEach((row) => {
        console.log(`  - ${row.tablename}`);
      });
    }

    // Migration tablosunu kontrol et
    console.log('\n🔄 Migration durumu:');
    const migrationCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '__drizzle_migrations'
      );
    `);

    if (migrationCheck.rows[0].exists) {
      const migrations = await client.query('SELECT * FROM __drizzle_migrations ORDER BY created_at;');
      console.log(`✅ ${migrations.rows.length} migration uygulandı:`);
      migrations.rows.forEach((m) => {
        console.log(`  - ${m.hash} (${new Date(m.created_at).toLocaleString()})`);
      });
    } else {
      console.log('⚠️  Migration tablosu bulunamadı.');
    }
  } catch (error) {
    console.error('❌ Hata:', error.message);
  } finally {
    await client.end();
  }
}

checkDatabase();
