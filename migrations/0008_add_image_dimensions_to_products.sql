-- Migration: Add image_dimensions column to products table
-- This column will store the required image dimensions for each product (e.g., "1920x1080")

ALTER TABLE products 
ADD COLUMN image_dimensions VARCHAR(50) DEFAULT '1920x1080';

-- Update existing products with default dimensions
UPDATE products 
SET image_dimensions = '1920x1080' 
WHERE image_dimensions IS NULL;

-- Add comment to explain the column
COMMENT ON COLUMN products.image_dimensions IS 'Required image dimensions for this product in WIDTHxHEIGHT format (e.g., 1920x1080)';
