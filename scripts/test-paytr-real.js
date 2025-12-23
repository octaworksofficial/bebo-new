const crypto = require('node:crypto');
const http = require('node:http');
const querystring = require('node:querystring');
const fs = require('node:fs');
const path = require('node:path');
const { Buffer } = require('node:buffer');

// Load environment variables manually since we are running a standalone script
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
const MERCHANT_OID = process.argv[2] || 'BRB1734975000000'; // Pass order ID as argument

if (!MERCHANT_KEY || !MERCHANT_SALT) {
  console.error('Error: PAYTR_MERCHANT_KEY or PAYTR_MERCHANT_SALT not found in .env');
  process.exit(1);
}

// Prepare Payload
const payload = {
  merchant_oid: MERCHANT_OID,
  status: '1', // Success
  total_amount: '10000', // 100.00 TL
  payment_type: 'card',
};

// Generate Hash
// hash_str = merchant_oid + merchant_salt + status + total_amount
const hashStr = `${payload.merchant_oid}${MERCHANT_SALT}${payload.status}${payload.total_amount}`;
const token = crypto.createHmac('sha256', MERCHANT_KEY).update(hashStr).digest('base64');

payload.hash = token;

const postData = querystring.stringify(payload);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/paytr/callback',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
  },
};

console.log('Sending PayTR Callback with VALID HASH...');
console.log('Merchant OID:', payload.merchant_oid);
console.log('Hash String:', hashStr);
console.log('Generated Token:', token);

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();
