import Parser from 'rss-parser';
import { articlesStore, saveArticlesStore } from '../data/newsData.js';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'NewsHubAfrica-RSS-Sync/1.0'
  }
});

const RSS_FEEDS = [
  // Continental & Economic Hubs
  'https://news.google.com/rss/search?q=Africa+business+markets+economy&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Africa+technology+mining+energy&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=AfCFTA+African+Union+economy&hl=en-US&gl=US&ceid=US:en',
  // Regional & Country Feeds (East, West, North, Southern, Central Africa)
  'https://news.google.com/rss/search?q=Nigeria+business+tech+economy&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Kenya+tech+agriculture+business&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=South+Africa+jse+mining+economy&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Egypt+business+energy+agriculture&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Ghana+cocoa+business+tech&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Morocco+renewable+energy+automotive&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Rwanda+tech+innovation+investment&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Ethiopia+telecom+agriculture+economy&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Zambia+copper+mining+agriculture&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=DRC+cobalt+mining+infrastructure&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Tanzania+mining+agriculture+trade&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Angola+oil+energy+lobito+corridor&hl=en-US&gl=US&ceid=US:en'
];

const CATEGORY_KEYWORDS = {
  business: ['market', 'economy', 'trade', 'bank', 'finance', 'gdp', 'inflation', 'currency', 'investment', 'afcfta'],
  technology: ['tech', 'startup', 'ai', 'digital', 'telecom', 'mobile', 'software', 'fintech', 'cyber'],
  energy: ['energy', 'solar', 'hydrogen', 'power', 'oil', 'gas', 'grid', 'renewable', 'electricity'],
  mining: ['mining', 'copper', 'cobalt', 'gold', 'lithium', 'mineral', 'resources', 'platinum', 'diamond'],
  agriculture: ['agri', 'farm', 'food', 'crop', 'harvest', 'grain', 'cocoa']
};

const COUNTRY_KEYWORDS = [
  'Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Ghana', 'Morocco', 'Rwanda', 
  'Ethiopia', 'Zambia', 'Democratic Republic of Congo', 'DRC', 'Tanzania', 
  'Angola', 'Uganda', 'Namibia', 'Botswana', 'Zimbabwe', 'Mauritius', 'Senegal', 
  'Ivory Coast', 'Cameroon', 'Tunisia', 'Algeria', 'Mozambique', 'Sudan', 'Ghana'
];

function determineCategory(text) {
  const lower = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return cat;
    }
  }
  return 'business';
}

function detectCountry(text) {
  for (const country of COUNTRY_KEYWORDS) {
    if (text.includes(country)) {
      return country === 'DRC' ? 'Democratic Republic of Congo' : country;
    }
  }
  return 'Pan-African';
}

function getCategoryImage(category) {
  const images = {
    business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
    technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80',
    energy: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&auto=format&fit=crop&q=80',
    mining: 'https://images.unsplash.com/photo-1605218427306-022ba6c584a5?w=1000&auto=format&fit=crop&q=80',
    agriculture: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&auto=format&fit=crop&q=80'
  };
  return images[category] || images.business;
}

export async function syncAfricanNewsRSS() {
  let newArticlesAdded = 0;
  try {
    for (const feedUrl of RSS_FEEDS) {
      try {
        const feed = await parser.parseURL(feedUrl);
        if (feed && feed.items) {
          for (const item of feed.items) {
            if (!item.title || !item.link) continue;
            
            // Check if article already exists by title or link
            const exists = articlesStore.some(a => 
              a.title.toLowerCase() === item.title.toLowerCase() || 
              (a.sourceUrl && a.sourceUrl === item.link)
            );

            if (!exists) {
              const fullText = item.title + ' ' + (item.contentSnippet || '');
              const category = determineCategory(fullText);
              const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
              const country = detectCountry(fullText);
              const articleId = `rss-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
              
              const newArt = {
                id: articleId,
                title: item.title.trim(),
                slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80),
                category,
                categoryLabel,
                country,
                summary: (item.contentSnippet || item.summary || item.title).slice(0, 200) + '...',
                content: item.content || item.contentSnippet || item.title,
                author: item.creator || "NewsHub Continental Desk",
                authorTitle: "Automated Multi-Nation RSS Wire",
                authorImage: "/Ashley Jordan Chihiya.jpg",
                publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
                readTime: "3 min read",
                image: getCategoryImage(category),
                tags: [country, categoryLabel, "RSS Feed"],
                isBreaking: false,
                isFeatured: false,
                views: Math.floor(Math.random() * 400) + 80,
                likes: 0,
                comments: [],
                sourceUrl: item.link
              };

              articlesStore.push(newArt);
              newArticlesAdded++;
            }
          }
        }
      } catch (feedErr) {
        console.warn(`Failed to sync individual RSS feed ${feedUrl}:`, feedErr.message);
      }
    }

    if (newArticlesAdded > 0) {
      // Sort articles by publishedAt descending
      articlesStore.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      
      // Clean up old syndicated articles if total exceeds 200 items to keep feed fresh & fast
      if (articlesStore.length > 200) {
        articlesStore.splice(200);
      }

      saveArticlesStore();
      console.log(`[RSS Sync] Successfully syndicated ${newArticlesAdded} new stories across African nations.`);
    }

    return { success: true, newArticlesAdded, totalArticles: articlesStore.length };
  } catch (error) {
    console.error('[RSS Sync Error]:', error);
    return { success: false, error: error.message };
  }
}
