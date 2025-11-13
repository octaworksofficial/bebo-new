-- Add image_url column to order table
ALTER TABLE "order" ADD COLUMN "image_url" text;

-- Add comment
COMMENT ON COLUMN "order"."image_url" IS 'URL of the generated/selected image for this order';
