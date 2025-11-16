-- About Content Table Migration
-- Bu tablo, about sayfasının dinamik içeriklerini yönetmek için oluşturulmuştur

CREATE TABLE IF NOT EXISTS "about_content" (
  "id" SERIAL PRIMARY KEY,
  "language" VARCHAR(5) DEFAULT 'tr' NOT NULL UNIQUE,
  
  -- Section 1 content
  "image1" TEXT, -- URL to first section image
  "title1" TEXT NOT NULL,
  "body1" TEXT NOT NULL,
  
  -- Section 2 content  
  "image2" TEXT, -- URL to second section image
  "title2" TEXT NOT NULL,
  "body2" TEXT NOT NULL,
  
  -- Section 3 content
  "image3" TEXT, -- URL to third section image
  "title3" TEXT NOT NULL,
  "body3" TEXT NOT NULL,
  
  -- Mission and Vision
  "mission" TEXT NOT NULL,
  "vision" TEXT NOT NULL,
  
  -- Metadata
  "is_active" BOOLEAN DEFAULT true NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Trigger for updating updated_at column automatically
CREATE OR REPLACE FUNCTION update_about_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER about_content_updated_at_trigger
  BEFORE UPDATE ON about_content
  FOR EACH ROW
  EXECUTE FUNCTION update_about_content_updated_at();

-- Insert default Turkish content
INSERT INTO "about_content" (
  "language", 
  "title1", "body1",
  "title2", "body2", 
  "title3", "body3",
  "mission", "vision"
) VALUES (
  'tr',
  'Hikayemiz',
  'Birebiro, hayal gücünüzü gerçeğe dönüştüren yapay zeka destekli tasarım platformudur. Amacımız, herkesin kendi benzersiz sanat eserlerini kolayca oluşturabilmesini sağlamaktır. Sadece birkaç kelimeyle tarif ettiğiniz hayallerinizi, en gelişmiş yapay zeka teknolojisi ile görsel sanat eserine dönüştürüyoruz.',
  
  'Teknolojimiz', 
  'En son yapay zeka algoritmalarını kullanarak, metinsel açıklamalarınızı benzersiz görsel tasarımlara dönüştürüyoruz. Sistemimiz sürekli öğreniyor ve gelişiyor, böylece size her zaman en iyi sonuçları sunabiliyoruz. Yüksek çözünürlüklü, profesyonel kalitede görseller oluşturmak için özel olarak optimize edilmiş teknolojimiz ile hayal gücünüzün sınırlarını zorlayın.',
  
  'Kalitemiz',
  'Her ürün, uzman ekibimiz tarafından titizlikle kontrol edilir ve yüksek kaliteli malzemelerle üretilir. Müşteri memnuniyeti bizim en önemli önceliğimizdir. 7/24 müşteri desteği, hızlı teslimat ve kalite garantisi ile size en iyi hizmeti sunmaya devam ediyoruz.',
  
  'Hayal gücünüzü gerçeğe dönüştürmek ve herkesin kendi benzersiz sanat eserlerini kolayca oluşturabilmesini sağlamak. Teknoloji ile sanatı birleştirerek, yaratıcılığın demokratikleştirilmesine katkıda bulunmak.',
  
  'Yapay zeka destekli tasarım alanında lider olmak ve dünya genelinde milyonlarca insanın yaratıcı potansiyelini ortaya çıkarmasına yardımcı olmak. Geleceğin sanat dünyasını şekillendirmek.'
);

-- Insert English content
INSERT INTO "about_content" (
  "language", 
  "title1", "body1",
  "title2", "body2", 
  "title3", "body3",
  "mission", "vision"
) VALUES (
  'en',
  'Our Story',
  'Birebiro is an AI-powered design platform that transforms your imagination into reality. Our goal is to enable everyone to easily create their own unique artworks. We turn your dreams, described in just a few words, into visual art pieces using the most advanced artificial intelligence technology.',
  
  'Our Technology',
  'Using the latest artificial intelligence algorithms, we transform your textual descriptions into unique visual designs. Our system continuously learns and evolves, so we can always provide you with the best results. Push the boundaries of your imagination with our technology specially optimized to create high-resolution, professional-quality visuals.',
  
  'Our Quality',
  'Each product is carefully inspected by our expert team and produced with high-quality materials. Customer satisfaction is our most important priority. We continue to provide you with the best service with 24/7 customer support, fast delivery and quality guarantee.',
  
  'To transform your imagination into reality and enable everyone to easily create their own unique artworks. To contribute to the democratization of creativity by combining technology with art.',
  
  'To be a leader in AI-powered design and help millions of people worldwide unleash their creative potential. To shape the art world of the future.'
);

-- Insert French content  
INSERT INTO "about_content" (
  "language", 
  "title1", "body1",
  "title2", "body2", 
  "title3", "body3",
  "mission", "vision"
) VALUES (
  'fr',
  'Notre Histoire',
  'Birebiro est une plateforme de design alimentée par l''IA qui transforme votre imagination en réalité. Notre objectif est de permettre à chacun de créer facilement ses propres œuvres d''art uniques. Nous transformons vos rêves, décrits en quelques mots seulement, en œuvres d''art visuelles en utilisant la technologie d''intelligence artificielle la plus avancée.',
  
  'Notre Technologie',
  'En utilisant les derniers algorithmes d''intelligence artificielle, nous transformons vos descriptions textuelles en designs visuels uniques. Notre système apprend et évolue continuellement, afin de toujours vous fournir les meilleurs résultats. Repoussez les limites de votre imagination avec notre technologie spécialement optimisée pour créer des visuels haute résolution et de qualité professionnelle.',
  
  'Notre Qualité',
  'Chaque produit est soigneusement inspecté par notre équipe d''experts et produit avec des matériaux de haute qualité. La satisfaction du client est notre priorité la plus importante. Nous continuons à vous fournir le meilleur service avec un support client 24h/24 et 7j/7, une livraison rapide et une garantie de qualité.',
  
  'Transformer votre imagination en réalité et permettre à chacun de créer facilement ses propres œuvres d''art uniques. Contribuer à la démocratisation de la créativité en combinant la technologie avec l''art.',
  
  'Être un leader dans le design alimenté par l''IA et aider des millions de personnes dans le monde à libérer leur potentiel créatif. Façonner le monde de l''art du futur.'
);