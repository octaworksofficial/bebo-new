-- Insert wall art product
INSERT INTO "product" (slug, name, name_en, name_fr, description, description_en, description_fr, is_active, sort_order)
VALUES (
  'wall-art',
  'Duvar Tablosu',
  'Wall Art',
  'Art Mural',
  'Özel tasarımınızla benzersiz bir duvar dekoru oluşturun',
  'Create a unique wall decoration with your custom design',
  'Créez une décoration murale unique avec votre design personnalisé',
  true,
  1
) ON CONFLICT (slug) DO NOTHING;

-- Insert product sizes for wall art
INSERT INTO "product_size" (product_id, slug, name, name_en, name_fr, dimensions, price_amount, sort_order)
SELECT 
  p.id,
  'small',
  'Küçük',
  'Small',
  'Petit',
  '30x40 cm',
  2990, -- 29.90 TL
  1
FROM "product" p
WHERE p.slug = 'wall-art'
ON CONFLICT DO NOTHING;

INSERT INTO "product_size" (product_id, slug, name, name_en, name_fr, dimensions, price_amount, sort_order)
SELECT 
  p.id,
  'medium',
  'Orta',
  'Medium',
  'Moyen',
  '50x70 cm',
  4990, -- 49.90 TL
  2
FROM "product" p
WHERE p.slug = 'wall-art'
ON CONFLICT DO NOTHING;

INSERT INTO "product_size" (product_id, slug, name, name_en, name_fr, dimensions, price_amount, sort_order)
SELECT 
  p.id,
  'large',
  'Büyük',
  'Large',
  'Grand',
  '70x100 cm',
  7990, -- 79.90 TL
  3
FROM "product" p
WHERE p.slug = 'wall-art'
ON CONFLICT DO NOTHING;

INSERT INTO "product_size" (product_id, slug, name, name_en, name_fr, dimensions, price_amount, sort_order)
SELECT 
  p.id,
  'xlarge',
  'Ekstra Büyük',
  'Extra Large',
  'Très Grand',
  '100x140 cm',
  9990, -- 99.90 TL
  4
FROM "product" p
WHERE p.slug = 'wall-art'
ON CONFLICT DO NOTHING;

-- Insert product frames for wall art
INSERT INTO "product_frame" (product_id, slug, name, name_en, name_fr, price_amount, sort_order)
SELECT 
  p.id,
  'none',
  'Çerçevesiz',
  'No Frame',
  'Sans Cadre',
  0, -- Free
  1
FROM "product" p
WHERE p.slug = 'wall-art'
ON CONFLICT DO NOTHING;

INSERT INTO "product_frame" (product_id, slug, name, name_en, name_fr, price_amount, sort_order)
SELECT 
  p.id,
  'black',
  'Siyah Çerçeve',
  'Black Frame',
  'Cadre Noir',
  1500, -- 15.00 TL
  2
FROM "product" p
WHERE p.slug = 'wall-art'
ON CONFLICT DO NOTHING;

INSERT INTO "product_frame" (product_id, slug, name, name_en, name_fr, price_amount, sort_order)
SELECT 
  p.id,
  'white',
  'Beyaz Çerçeve',
  'White Frame',
  'Cadre Blanc',
  1500, -- 15.00 TL
  3
FROM "product" p
WHERE p.slug = 'wall-art'
ON CONFLICT DO NOTHING;

INSERT INTO "product_frame" (product_id, slug, name, name_en, name_fr, price_amount, sort_order)
SELECT 
  p.id,
  'wood',
  'Ahşap Çerçeve',
  'Wood Frame',
  'Cadre en Bois',
  2000, -- 20.00 TL
  4
FROM "product" p
WHERE p.slug = 'wall-art'
ON CONFLICT DO NOTHING;
