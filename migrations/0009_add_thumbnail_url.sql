-- Add thumbnail_url column to generated_image table for performance optimization
ALTER TABLE "generated_image" ADD COLUMN "thumbnail_url" text;
