const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

// Load environment variables
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

const MERCHANT_KEY = process.env.PAYTR_MERCHANT_KEY;
const MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT;
const MERCHANT_OID = process.argv[2];
const TOTAL_AMOUNT = process.argv[3] || '10000'; // Default 100.00 TL

if (!MERCHANT_OID) {
  console.error('Usage: node scripts/generate-hash.js <ORDER_ID> [TOTAL_AMOUNT]');
  process.exit(1);
}

const status = '1'; // Success

// hash_str = merchant_oid + merchant_salt + status + total_amount
const hashStr = `${MERCHANT_OID}${MERCHANT_SALT}${status}${TOTAL_AMOUNT}`;
const token = crypto.createHmac('sha256', MERCHANT_KEY).update(hashStr).digest('base64');

console.log('\n--- PayTR Hash Generator ---');
console.log(`Merchant OID: ${MERCHANT_OID}`);
console.log(`Status: ${status}`);
console.log(`Total Amount: ${TOTAL_AMOUNT}`);
console.log(`Merchant Salt: ${MERCHANT_SALT}`);
console.log(`Hash String: ${hashStr}`);
console.log('\nGenerated Hash:');
console.log(token);
console.log('\nCURL Command:');
console.log(`curl --location 'https://birebiro.com/api/paytr/callback' \\
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data-urlencode 'merchant_oid=${MERCHANT_OID}' \\
--data-urlencode 'status=${status}' \\
--data-urlencode 'total_amount=${TOTAL_AMOUNT}' \\
--data-urlencode 'hash=${token}' \\
--data-urlencode 'payment_type=card'`);
