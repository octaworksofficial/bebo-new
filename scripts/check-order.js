const { Client } = require('pg');
const fs = require('node:fs');
const path = require('node:path');

// Mock schema definition slightly for raw query or just use raw sql
// Easier to use raw SQL to avoid importing complex schema files in standalone script with ts-node issues

function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    });
  }
}

loadEnv();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function checkOrder() {
  try {
    await client.connect();
    const orderId = process.argv[2];

    console.log(`Checking DB for Order: ${orderId}`);

    const res = await client.query('SELECT * FROM "order" WHERE merchant_oid = $1', [orderId]);

    if (res.rows.length > 0) {
      console.log('✅ Order FOUND!');
      console.log(res.rows[0]);
    } else {
      console.log('❌ Order NOT FOUND in this database.');
      console.log('Make sure you are pointing to the correct database (Local vs Prod).');
    }
  } catch (err) {
    console.error('Database Error:', err);
  } finally {
    await client.end();
  }
}

checkOrder();
