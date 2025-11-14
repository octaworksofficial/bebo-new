-- Add image URL columns to product table
-- Square image (1080x1080) and Wide image (1920x1080)

ALTER TABLE product 
ADD COLUMN image_square_url TEXT NULL,
ADD COLUMN image_wide_url TEXT NULL;

-- Add comments to document the purpose of these columns
COMMENT ON COLUMN product.image_square_url IS 'Square product image URL (1080x1080) - Optional';
COMMENT ON COLUMN product.image_wide_url IS 'Wide product image URL (1920x1080) - Optional';
