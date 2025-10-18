import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Article {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  published: boolean;
  updated_at: string;
  published_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Fetch articles
    const { data: articles, error: articlesError } = await supabaseClient
      .from("articles")
      .select("id, title, slug, category_id, published, updated_at, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
      throw articlesError;
    }

    // Fetch categories
    const { data: categories, error: categoriesError } = await supabaseClient
      .from("categories")
      .select("id, name, slug, parent_id")
      .order("name");

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      throw categoriesError;
    }

    const sitemapXml = generateSitemap(articles as Article[], categories as Category[]);

    return new Response(sitemapXml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });

  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate sitemap' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateSitemap(articles: Article[], categories: Category[]) {
  const baseUrl = "https://www.thebulletinbriefs.in";
  const today = new Date().toISOString().split("T")[0];

  let urls = `
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Static pages
  const staticPages = [
    { path: '/about', changefreq: 'monthly' },
    { path: '/contact', changefreq: 'monthly' },
    { path: '/editorial-guidelines', changefreq: 'monthly' },
    { path: '/subscription', changefreq: 'weekly' },
    { path: '/privacy', changefreq: 'monthly' },
    { path: '/terms', changefreq: 'monthly' },
    { path: '/cookies', changefreq: 'monthly' },
    { path: '/disclaimer', changefreq: 'monthly' }
  ];

  staticPages.forEach(page => {
    urls += `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Category pages
  categories.forEach(category => {
    // For subcategories, use /category/parent-slug/subcategory-slug structure
    if (category.parent_id) {
      const parent = categories.find(c => c.id === category.parent_id);
      if (parent) {
        urls += `
  <url>
    <loc>${baseUrl}/category/${parent.slug}/${category.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
      }
    } else {
      // Parent categories
      urls += `
  <url>
    <loc>${baseUrl}/category/${category.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  });

  // Article pages with category paths
  articles
    .filter(article => article.published)
    .forEach(article => {
      const lastmod = article.updated_at 
        ? new Date(article.updated_at).toISOString().split("T")[0] 
        : today;
      
      // Find the article's category to build the correct URL
      const articleCategory = categories.find(c => c.id === article.category_id);
      let articlePath = `/article/${article.slug}`; // fallback to old format
      
      if (articleCategory) {
        // If it's a subcategory, use parent/subcategory/article-slug format
        if (articleCategory.parent_id) {
          const parentCategory = categories.find(c => c.id === articleCategory.parent_id);
          if (parentCategory) {
            articlePath = `/${parentCategory.slug}/${articleCategory.slug}/${article.slug}`;
          }
        } else {
          // If it's a main category, use category/article-slug format
          articlePath = `/${articleCategory.slug}/${article.slug}`;
        }
      }
      
      urls += `
  <url>
    <loc>${baseUrl}${articlePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

  // RSS Feed
  urls += `
  <url>
    <loc>${baseUrl}/rss</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
