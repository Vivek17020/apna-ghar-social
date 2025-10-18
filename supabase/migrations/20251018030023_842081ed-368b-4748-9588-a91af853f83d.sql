-- Add Sports subcategories
DO $$
DECLARE
  sports_id uuid;
  entertainment_id uuid;
BEGIN
  -- Get Sports category ID
  SELECT id INTO sports_id FROM public.categories WHERE slug = 'sports' LIMIT 1;
  
  -- Get Entertainment category ID
  SELECT id INTO entertainment_id FROM public.categories WHERE slug = 'entertainment' LIMIT 1;
  
  -- Add Sports subcategories if Sports category exists
  IF sports_id IS NOT NULL THEN
    INSERT INTO public.categories (name, slug, parent_id, description, color)
    VALUES 
      ('Cricket', 'cricket', sports_id, 'Latest cricket news, scores, and updates', 'sports'),
      ('Football', 'football', sports_id, 'Football news, match results, and analysis', 'sports'),
      ('Tennis', 'tennis', sports_id, 'Tennis tournaments, player rankings, and highlights', 'sports'),
      ('Olympics', 'olympics', sports_id, 'Olympic games news and medal updates', 'sports'),
      ('Esports', 'esports', sports_id, 'Competitive gaming and esports tournaments', 'sports')
    ON CONFLICT (slug) DO NOTHING;
  END IF;
  
  -- Add Entertainment subcategories if Entertainment category exists
  IF entertainment_id IS NOT NULL THEN
    INSERT INTO public.categories (name, slug, parent_id, description, color)
    VALUES 
      ('Bollywood', 'bollywood', entertainment_id, 'Latest Bollywood news and celebrity updates', 'entertainment'),
      ('Hollywood', 'hollywood', entertainment_id, 'Hollywood movies, stars, and industry news', 'entertainment'),
      ('OTT Releases', 'ott-releases', entertainment_id, 'New releases on streaming platforms', 'entertainment'),
      ('Celebrity Buzz', 'celebrity-buzz', entertainment_id, 'Celebrity gossip and trending stories', 'entertainment'),
      ('Reviews', 'reviews', entertainment_id, 'Movie and show reviews', 'entertainment')
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END $$;