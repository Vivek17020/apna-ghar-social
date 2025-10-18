-- First, get the Business category ID (we'll need to reference it)
-- Add Business subcategories
DO $$
DECLARE
  business_id uuid;
BEGIN
  -- Get the Business category ID
  SELECT id INTO business_id FROM public.categories WHERE slug = 'business';
  
  -- If Business doesn't exist, create it
  IF business_id IS NULL THEN
    INSERT INTO public.categories (name, slug, description)
    VALUES ('Business', 'business', 'Business news and updates')
    RETURNING id INTO business_id;
  END IF;
  
  -- Add subcategories under Business
  INSERT INTO public.categories (name, slug, parent_id, description) VALUES
    ('Market', 'market', business_id, 'Market trends and analysis'),
    ('Economy', 'economy', business_id, 'Economic news and developments'),
    ('Startups', 'startups', business_id, 'Startup news and entrepreneurship'),
    ('Finance', 'finance', business_id, 'Financial news and investment'),
    ('Cryptocurrency', 'cryptocurrency', business_id, 'Cryptocurrency and blockchain news')
  ON CONFLICT (slug) DO NOTHING;
END $$;