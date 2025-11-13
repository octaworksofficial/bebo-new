const { Client } = require('pg');
require('dotenv/config');

async function checkProducts() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database\n');

    // Check products
    const products = await client.query('SELECT * FROM product');
    console.log('=== PRODUCTS ===');
    console.log(products.rows);
    console.log('');

    // Check sizes
    const sizes = await client.query('SELECT * FROM product_size');
    console.log('=== PRODUCT SIZES ===');
    console.log(sizes.rows);
    console.log('');

    // Check frames
    const frames = await client.query('SELECT * FROM product_frame');
    console.log('=== PRODUCT FRAMES ===');
    console.log(frames.rows);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

checkProducts();
