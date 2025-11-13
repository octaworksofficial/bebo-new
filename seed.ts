import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as schema from './src/models/Schema';

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  const db = drizzle(client, { schema });

  console.log('🌱 Seeding database...');

  // Önce mevcut ürün verilerini temizle
  console.log('🧹 Cleaning existing product data...');
  // Önce foreign key olan order'ları sil
  await db.delete(schema.orderSchema);
  await db.delete(schema.productFrameSchema);
  await db.delete(schema.productSizeSchema);
  await db.delete(schema.productSchema);
  console.log('✅ Cleaned existing data');

  // Insert Wall Art Product
  const wallArtProducts = await db.insert(schema.productSchema).values({
    slug: 'wall-art',
    name: 'Duvar Tablosu',
    nameEn: 'Wall Art',
    nameFr: 'Art Mural',
    description: 'Özel tasarımınızla benzersiz bir duvar dekoru oluşturun',
    descriptionEn: 'Create a unique wall decoration with your custom design',
    descriptionFr: 'Créez une décoration murale unique avec votre design personnalisé',
    isActive: true,
    sortOrder: 1,
  }).returning();

  const wallArtProduct = wallArtProducts[0];
  if (!wallArtProduct) {
    throw new Error('Failed to create wall art product');
  }

  console.log('✅ Created product:', wallArtProduct.name);

  // Insert Sizes
  const sizes = await db.insert(schema.productSizeSchema).values([
    {
      productId: wallArtProduct.id,
      slug: 'small',
      name: 'Küçük',
      nameEn: 'Small',
      nameFr: 'Petit',
      dimensions: '30x40 cm',
      priceAmount: 29900, // 299 TL in kuruş
      sortOrder: 1,
    },
    {
      productId: wallArtProduct.id,
      slug: 'medium',
      name: 'Orta',
      nameEn: 'Medium',
      nameFr: 'Moyen',
      dimensions: '50x70 cm',
      priceAmount: 49900, // 499 TL
      sortOrder: 2,
    },
    {
      productId: wallArtProduct.id,
      slug: 'large',
      name: 'Büyük',
      nameEn: 'Large',
      nameFr: 'Grand',
      dimensions: '70x100 cm',
      priceAmount: 79900, // 799 TL
      sortOrder: 3,
    },
    {
      productId: wallArtProduct.id,
      slug: 'xlarge',
      name: 'Ekstra Büyük',
      nameEn: 'Extra Large',
      nameFr: 'Très Grand',
      dimensions: '100x140 cm',
      priceAmount: 129900, // 1299 TL
      sortOrder: 4,
    },
  ]).returning();

  console.log(`✅ Created ${sizes.length} sizes`);

  // Insert Frames
  const frames = await db.insert(schema.productFrameSchema).values([
    {
      productId: wallArtProduct.id,
      slug: 'no-frame',
      name: 'Çerçevesiz',
      nameEn: 'No Frame',
      nameFr: 'Sans cadre',
      priceAmount: 0, // Free
      sortOrder: 1,
    },
    {
      productId: wallArtProduct.id,
      slug: 'black',
      name: 'Siyah Çerçeve',
      nameEn: 'Black Frame',
      nameFr: 'Cadre Noir',
      priceAmount: 15000, // 150 TL
      sortOrder: 2,
    },
    {
      productId: wallArtProduct.id,
      slug: 'white',
      name: 'Beyaz Çerçeve',
      nameEn: 'White Frame',
      nameFr: 'Cadre Blanc',
      priceAmount: 15000, // 150 TL
      sortOrder: 3,
    },
    {
      productId: wallArtProduct.id,
      slug: 'wood',
      name: 'Ahşap Çerçeve',
      nameEn: 'Wooden Frame',
      nameFr: 'Cadre en Bois',
      priceAmount: 20000, // 200 TL
      sortOrder: 4,
    },
  ]).returning();

  console.log(`✅ Created ${frames.length} frames`);

  console.log('🎉 Seeding completed!');

  await client.end();
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
