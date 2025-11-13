CREATE TABLE IF NOT EXISTS "product_frame" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" text NOT NULL,
	"name_en" text,
	"name_fr" text,
	"price_amount" integer NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" text NOT NULL,
	"name_en" text,
	"name_fr" text,
	"description" text NOT NULL,
	"description_en" text,
	"description_fr" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_size" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" text NOT NULL,
	"name_en" text,
	"name_fr" text,
	"dimensions" varchar(50) NOT NULL,
	"price_amount" integer NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_frame" ADD CONSTRAINT "product_frame_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_size" ADD CONSTRAINT "product_size_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
