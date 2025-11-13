CREATE TABLE IF NOT EXISTS "art_credit_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"price_per_credit" integer DEFAULT 100 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"min_purchase" integer DEFAULT 1 NOT NULL,
	"max_purchase" integer DEFAULT 1000 NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN IF NOT EXISTS "image_url" text;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "size_label" text DEFAULT 'Boyut Seçin' NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "size_label_en" text DEFAULT 'Select Size';--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "size_label_fr" text DEFAULT 'Sélectionner la taille';--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "frame_label" text DEFAULT 'Çerçeve Seçin' NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "frame_label_en" text DEFAULT 'Select Frame';--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "frame_label_fr" text DEFAULT 'Sélectionner le cadre';