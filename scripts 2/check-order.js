import dotenv from 'dotenv';
import pg from 'pg';

const { Client } = pg;

dotenv.config({ path: '.env.local' });
// Remove unused drizzle import

// Mock schema definition slightly for raw query or just use raw sql
// Easier to use raw SQL to avoid importing complex schema files in standalone script with ts-node issues

// Custom loadEnv removed as dotenv.config handled it above.
// Also fixing call to main function which was named checkOrder at bottom.

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await client.connect();
    const merchantOid = process.argv[2];

    if (!merchantOid) {
      console.log('Fetching latest 5 orders...');
      const res = await client.query('SELECT * FROM "order" ORDER BY created_at DESC LIMIT 5');

      if (res.rows.length > 0) {
        res.rows.forEach((o) => {
          console.log('-------------------');
          console.log(`OID: ${o.merchant_oid}`);
          console.log(`Status: ${o.payment_status}`);
          console.log(`Amount: ${o.payment_amount}`);
          console.log(`Credits: ${o.credit_amount}`);
          console.log(`Fail Code: ${o.failed_reason_code}`);
          console.log(`Fail Msg: ${o.failed_reason_msg}`);
          console.log(`Date: ${o.created_at}`);
        });
      } else {
        console.log('No orders found in the database.');
      }
      return;
    }

    console.log(`Checking specific order: ${merchantOid} `);
    const res = await client.query('SELECT * FROM "order" WHERE merchant_oid = $1', [merchantOid]);

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

main();
