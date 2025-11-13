CREATE TABLE IF NOT EXISTS "generated_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"chat_session_id" varchar(255) NOT NULL,
	"generation_id" varchar(255) NOT NULL,
	"product_id" integer,
	"product_size_id" integer,
	"product_frame_id" integer,
	"text_prompt" text NOT NULL,
	"improved_prompt" text,
	"image_url" text NOT NULL,
	"uploaded_image_url" text,
	"user_generation_intent" text,
	"is_generate_mode" boolean DEFAULT true NOT NULL,
	"credit_used" integer DEFAULT 1 NOT NULL,
	"is_selected" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "generated_image_generation_id_unique" UNIQUE("generation_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "generated_image" ADD CONSTRAINT "generated_image_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "generated_image" ADD CONSTRAINT "generated_image_product_size_id_product_size_id_fk" FOREIGN KEY ("product_size_id") REFERENCES "public"."product_size"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "generated_image" ADD CONSTRAINT "generated_image_product_frame_id_product_frame_id_fk" FOREIGN KEY ("product_frame_id") REFERENCES "public"."product_frame"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
