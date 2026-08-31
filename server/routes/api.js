import express from 'express';
import { articlesStore, saveArticlesStore } from '../data/newsData.js';
import { videosStore, saveVideosStore } from '../data/videosData.js';
import { getLiveMarketSnapshot, marketIndices, foreignExchangeRates, commoditiesData, topEquities } from '../data/marketData.js';
import { eventsStore } from '../data/eventsData.js';
import { podcastsData, liveCoverageFeed } from '../data/podcastsData.js';
import { africanQuotes, getQuoteOfDay } from '../data/quotesData.js';
import { generateContinentalBrief, generateArticleSummary, askPanAfricanAnalyst, draftArticleAssistant } from '../geminiService.js';
import { USERS, authenticateUser, validateSession, invalidateSession } from '../data/usersData.js';
import { syncAfricanNewsRSS } from '../services/rssSync.js';

const router = express.Router();

// Helper to extract authenticated user from Bearer header or body
function getAuthUser(req) {
  const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.query.token) {
    token = req.query.token;
  } else if (req.body && req.body.token) {
    token = req.body.token;
  }
  if (!token) return null;
  return validateSession(token);
}

// ----------------------------------------------------
// AUTHENTICATION & ACCESS CONTROL ENDPOINTS
// ----------------------------------------------------

// Login endpoint
router.post('/auth/login', (req, res) => {
  try {
    const { email, username, identifier: bodyId, password } = req.body;
    const identifier = email || username || bodyId;
    if (!identifier || !password) {
      return res.status(400).json({ success: false, error: 'Email/Username and password are required' });
    }

    const sessionUser = authenticateUser(identifier, password);
    if (!sessionUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please check your username/email and password.'
      });
    }

    res.json({
      success: true,
      message: `Welcome back, ${sessionUser.name}! Logged in as ${sessionUser.role === 'admin' ? 'Administrator' : 'Writer'}.`,
      user: sessionUser,
      token: sessionUser.token
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify current session
router.get('/auth/me', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ success: false, error: 'Not authenticated or session expired' });
  }
  res.json({ success: true, user });
});

// Logout endpoint
router.post('/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.body && req.body.token) {
    token = req.body.token;
  }
  if (token) {
    invalidateSession(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// Public accounts directory (summary of access levels for editorial login screen)
router.get('/auth/accounts', (req, res) => {
  const accounts = USERS.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    roleLabel: u.role === 'admin' ? 'Administrator (Full Access)' : 'Staff Writer (Upload Only)',
    title: u.title,
    department: u.department,
    avatar: u.avatar,
    bio: u.bio,
    permissions: u.permissions,
    canEdit: u.role === 'admin',
    canDelete: u.role === 'admin',
    canUpload: true
  }));
  res.json({ success: true, accounts });
});

// Live coverage poll store
let livePollState = {
  question: "Which sector will drive Africa's industrialization most?",
  options: [
    { id: "manufacturing", text: "Manufacturing & Special Economic Zones", votes: 428, percent: 38 },
    { id: "tech", text: "Technology, Sovereign AI & Fintech", votes: 312, percent: 28 },
    { id: "energy", text: "Green Energy & Battery Minerals", votes: 245, percent: 22 },
    { id: "agri", text: "Agro-processing & Cold-chain", votes: 135, percent: 12 }
  ],
  totalVotes: 1120
};

// Reactions store for live coverage items
const liveReactions = new Map();

// In-memory user watchlist store
let userWatchlist = new Set(["JSE:TOP40", "NGX:ASI", "USD/ZAR", "BRENT", "NPN.JO"]);

// In-memory newsletter subscribers
const newsletterSubscribers = new Map();

// ----------------------------------------------------
// NEWS & ARTICLES ENDPOINTS
// ----------------------------------------------------

// Get articles with optional query filters (category, search, tag, sort)
router.get('/articles', (req, res) => {
  try {
    const { category, q, tag, country, sort = 'latest', limit } = req.query;
    let filtered = [...articlesStore];

    if (category && category !== 'all') {
      filtered = filtered.filter(art => art.category.toLowerCase() === category.toLowerCase());
    }

    if (country && country !== 'all') {
      filtered = filtered.filter(art => art.country.toLowerCase().includes(country.toLowerCase()));
    }

    if (tag) {
      filtered = filtered.filter(art => art.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }

    if (q) {
      const searchLower = q.toLowerCase();
      filtered = filtered.filter(art =>
        art.title.toLowerCase().includes(searchLower) ||
        art.summary.toLowerCase().includes(searchLower) ||
        art.content.toLowerCase().includes(searchLower) ||
        art.tags.some(t => t.toLowerCase().includes(searchLower))
      );
    }

    if (sort === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sort === 'likes') {
      filtered.sort((a, b) => b.likes - a.likes);
    } else {
      // Default: latest
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    if (limit) {
      filtered = filtered.slice(0, parseInt(limit, 10));
    }

    res.json({
      success: true,
      total: filtered.length,
      articles: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Alias for top / latest news
router.get('/news/top', (req, res) => {
  const articles = [...articlesStore].slice(0, 10);
  res.json({ success: true, total: articles.length, articles });
});

router.get('/news/latest', (req, res) => {
  const articles = [...articlesStore].slice(0, 10);
  res.json({ success: true, total: articles.length, articles });
});

// Get single article by ID or slug
router.get('/articles/:idOrSlug', (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const article = articlesStore.find(a => a.id === idOrSlug || a.slug === idOrSlug);
    
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    // Increment view counter
    article.views += 1;

    // Find related articles in same category
    const related = articlesStore
      .filter(a => a.id !== article.id && a.category === article.category)
      .slice(0, 3);

    res.json({
      success: true,
      article,
      related
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Submit / Publish new editorial article
router.post('/articles', (req, res) => {
  try {
    const { title, category, country, summary, content, author, authorTitle, image, tags, isBreaking, isFeatured } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({ success: false, error: 'Title, category, and content are required' });
    }

    const newArticle = {
      id: `art-${Date.now()}`,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: category.toLowerCase(),
      categoryLabel: category.charAt(0).toUpperCase() + category.slice(1),
      country: country || "Pan-African",
      summary: summary || content.slice(0, 180) + '...',
      content,
      author: author || "Ashley Jordan Chihiya",
      authorTitle: authorTitle || "Senior Pan-African Intelligence Editor",
      authorImage: "/Ashley Jordan Chihiya.jpg",
      publishedAt: new Date().toISOString(),
      readTime: `${Math.max(2, Math.ceil(content.split(' ').length / 200))} min read`,
      image: image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80",
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : ["Africa", category]),
      isBreaking: Boolean(isBreaking),
      isFeatured: Boolean(isFeatured),
      views: 1,
      likes: 0,
      comments: []
    };

    articlesStore.unshift(newArticle);
    saveArticlesStore();

    res.status(201).json({
      success: true,
      message: 'Article published successfully and live on NewsHub Africa!',
      article: newArticle
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// VIDEO ENDPOINTS
// ----------------------------------------------------

router.get('/videos', (req, res) => {
  try {
    res.json({ success: true, videos: videosStore });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

function toEmbedUrl(url) {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  let videoId = '';
  if (url.includes('youtu.be/')) {
    const parts = url.split('youtu.be/');
    if (parts[1]) videoId = parts[1].split('?')[0].split('&')[0];
  } else if (url.includes('youtube.com/watch')) {
    const match = url.match(/[?&]v=([^&]+)/);
    if (match && match[1]) videoId = match[1];
  } else if (url.includes('youtube.com/shorts/')) {
    const parts = url.split('youtube.com/shorts/');
    if (parts[1]) videoId = parts[1].split('?')[0].split('&')[0];
  }
  if (videoId) {
    const queryIndex = url.indexOf('?');
    let extraParams = '';
    if (queryIndex !== -1) {
      const queryStr = url.substring(queryIndex + 1);
      const params = queryStr.split('&').filter(p => !p.startsWith('v='));
      if (params.length > 0) extraParams = '&' + params.join('&');
    }
    return `https://www.youtube.com/embed/${videoId}?${extraParams ? extraParams.substring(1) : ''}`;
  }
  return url;
}

router.post('/videos', (req, res) => {
  try {
    const { title, videoUrl, duration, category, thumbnail, isMain, author } = req.body;
    if (!title || !videoUrl) {
      return res.status(400).json({ success: false, error: 'Title and video URL are required' });
    }

    if (isMain) {
      videosStore.forEach(v => { v.isMain = false; });
    }

    const normalizedUrl = toEmbedUrl(videoUrl.trim());

    const newVideo = {
      id: `vid-${Date.now()}`,
      title: title.trim(),
      videoUrl: normalizedUrl,
      duration: duration || '10:00',
      category: category || 'General',
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop',
      date: new Date().toISOString().split('T')[0],
      isMain: Boolean(isMain),
      author: author || 'Ashley Jordan Chihiya'
    };

    if (isMain || videosStore.length === 0) {
      videosStore.forEach(v => { v.isMain = false; });
      newVideo.isMain = true;
      videosStore.unshift(newVideo);
    } else {
      videosStore.push(newVideo);
    }

    saveVideosStore();

    res.status(201).json({
      success: true,
      message: 'Video uploaded and published successfully!',
      video: newVideo,
      videos: videosStore
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/videos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = videosStore.findIndex(v => v.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Video not found' });
    }

    const deleted = videosStore.splice(index, 1)[0];
    if (deleted.isMain && videosStore.length > 0) {
      videosStore[0].isMain = true;
    }
    saveVideosStore();

    res.json({ success: true, message: 'Video deleted successfully', videos: videosStore });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Sync latest African news from RSS feeds automatically
router.post('/articles/sync-rss', async (req, res) => {
  try {
    const result = await syncAfricanNewsRSS();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Sync articles from client localStorage (ensures drafts and published articles stay in sync)
router.post('/articles/sync', (req, res) => {
  try {
    const { articles } = req.body;
    if (Array.isArray(articles) && articles.length > 0) {
      let added = 0;
      articles.forEach(clientArt => {
        if (clientArt && clientArt.title && clientArt.content) {
          const exists = articlesStore.some(a => a.id === clientArt.id || a.title === clientArt.title);
          if (!exists) {
            articlesStore.unshift({
              ...clientArt,
              id: clientArt.id || `art-${Date.now()}`,
              publishedAt: clientArt.publishedAt || new Date().toISOString()
            });
            added++;
          }
        }
      });
      if (added > 0) {
        saveArticlesStore();
      }
      return res.json({ success: true, syncedCount: added, totalArticles: articlesStore.length });
    }
    res.json({ success: true, syncedCount: 0, totalArticles: articlesStore.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update an existing article (Admin Only)
router.put('/articles/:id', (req, res) => {
  try {
    const user = getAuthUser(req);
    if (user && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Access Denied: Writer credentials only have upload access. Modifying existing articles is restricted to the Administrator.'
      });
    }

    const { id } = req.params;
    const index = articlesStore.findIndex(a => a.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    const { title, category, country, summary, content, author, authorTitle, image, tags, isBreaking, isFeatured } = req.body;
    const existing = articlesStore[index];

    const updatedArticle = {
      ...existing,
      title: title || existing.title,
      category: category ? category.toLowerCase() : existing.category,
      categoryLabel: category ? (category.charAt(0).toUpperCase() + category.slice(1)) : existing.categoryLabel,
      country: country || existing.country,
      summary: summary || existing.summary,
      content: content || existing.content,
      author: author || existing.author,
      authorTitle: authorTitle || existing.authorTitle,
      image: image || existing.image,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : existing.tags,
      isBreaking: isBreaking !== undefined ? Boolean(isBreaking) : existing.isBreaking,
      isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : existing.isFeatured,
      updatedAt: new Date().toISOString()
    };

    articlesStore[index] = updatedArticle;
    saveArticlesStore();
    res.json({
      success: true,
      message: 'Article updated successfully',
      article: updatedArticle
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete an article (Admin Only)
router.delete('/articles/:id', (req, res) => {
  try {
    const user = getAuthUser(req);
    if (user && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Access Denied: Writer credentials only have upload access. Deleting articles is restricted to the Administrator.'
      });
    }

    const { id } = req.params;
    const index = articlesStore.findIndex(a => a.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    const removed = articlesStore.splice(index, 1)[0];
    saveArticlesStore();
    res.json({
      success: true,
      message: 'Article deleted successfully',
      deletedArticle: removed
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Like an article
router.post('/articles/:id/like', (req, res) => {
  try {
    const article = articlesStore.find(a => a.id === req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }
    article.likes += 1;
    saveArticlesStore();
    res.json({ success: true, likes: article.likes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Post a comment to an article
router.post('/articles/:id/comments', (req, res) => {
  try {
    const { author, country, content, text } = req.body;
    const commentBody = text || content;
    if (!commentBody || !author) {
      return res.status(400).json({ success: false, error: 'Author and comment content are required' });
    }

    const article = articlesStore.find(a => a.id === req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    const comment = {
      id: `c-${Date.now()}`,
      author,
      country: country || 'Africa',
      date: new Date().toISOString(),
      content: commentBody,
      likes: 0
    };

    if (!article.comments) article.comments = [];
    article.comments.unshift(comment);
    saveArticlesStore();

    res.status(201).json({ success: true, comment, comments: article.comments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// ----------------------------------------------------
// MARKETS ENDPOINTS (Real-Time 24/7 Engine)
// ----------------------------------------------------

// Get real-time African market snapshot (Indices, Forex, Commodities, Top Equities)
router.get('/markets/live', (req, res) => {
  try {
    const snapshot = getLiveMarketSnapshot();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...snapshot
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/markets/snapshot', (req, res) => {
  try {
    const snapshot = getLiveMarketSnapshot();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...snapshot
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Server-Sent Events (SSE) stream for continuous real-time market ticks
router.get('/markets/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send initial snapshot
  const initial = getLiveMarketSnapshot();
  res.write(`data: ${JSON.stringify(initial)}\n\n`);

  // Send ticks every 3 seconds
  const intervalId = setInterval(() => {
    try {
      const snap = getLiveMarketSnapshot();
      res.write(`data: ${JSON.stringify(snap)}\n\n`);
    } catch (e) {
      clearInterval(intervalId);
    }
  }, 3000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

// Specific market slices
router.get('/markets/indices', (req, res) => {
  try {
    const snapshot = getLiveMarketSnapshot();
    res.json({ success: true, indices: snapshot.indicesList, map: snapshot.indices });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/markets/commodities', (req, res) => {
  try {
    const snapshot = getLiveMarketSnapshot();
    res.json({ success: true, commodities: snapshot.commoditiesList, map: snapshot.commodities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/markets/forex', (req, res) => {
  try {
    const snapshot = getLiveMarketSnapshot();
    res.json({ success: true, forex: snapshot.forex, map: snapshot.fx });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/markets/equities', (req, res) => {
  try {
    const snapshot = getLiveMarketSnapshot();
    res.json({
      success: true,
      equities: snapshot.equities,
      gainers: snapshot.gainers,
      losers: snapshot.losers,
      heavyweights: snapshot.heavyweights
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// WATCHLIST ENDPOINTS
// ----------------------------------------------------

router.get('/watchlist', (req, res) => {
  try {
    const snapshot = getLiveMarketSnapshot();
    const items = [];

    // Check indices
    const indicesArr = Array.isArray(snapshot.indicesList) ? snapshot.indicesList : Object.values(snapshot.indices || {});
    indicesArr.forEach(idx => {
      if (idx && idx.symbol && userWatchlist.has(idx.symbol)) {
        items.push({ type: 'index', ...idx });
      }
    });

    // Check FX
    const forexArr = Array.isArray(snapshot.forex) ? snapshot.forex : Object.values(snapshot.fx || {});
    forexArr.forEach(fx => {
      if (fx && fx.pair && userWatchlist.has(fx.pair)) {
        items.push({ type: 'forex', ...fx, symbol: fx.pair });
      }
    });

    // Check commodities
    const commoditiesArr = Array.isArray(snapshot.commoditiesList) ? snapshot.commoditiesList : Object.values(snapshot.commodities || {});
    commoditiesArr.forEach(cmd => {
      if (cmd && (userWatchlist.has(cmd.symbol) || userWatchlist.has(cmd.id))) {
        items.push({ type: 'commodity', ...cmd });
      }
    });

    // Check equities
    const equitiesArr = Array.isArray(snapshot.equities) ? snapshot.equities : (snapshot.topEquities || []);
    equitiesArr.forEach(eq => {
      if (eq && eq.ticker && (userWatchlist.has(eq.ticker) || userWatchlist.has(`${eq.ticker}.${eq.exchange}`))) {
        items.push({ type: 'equity', ...eq, symbol: eq.ticker });
      }
    });

    res.json({
      success: true,
      watchlistSymbols: Array.from(userWatchlist),
      items
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/watchlist/toggle', (req, res) => {
  try {
    const { symbol } = req.body;
    if (!symbol) {
      return res.status(400).json({ success: false, error: 'Symbol is required' });
    }

    let isAdded = false;
    if (userWatchlist.has(symbol)) {
      userWatchlist.delete(symbol);
      isAdded = false;
    } else {
      userWatchlist.add(symbol);
      isAdded = true;
    }

    res.json({
      success: true,
      symbol,
      isAdded,
      watchlistSymbols: Array.from(userWatchlist)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// EVENTS & SUMMITS ENDPOINTS
// ----------------------------------------------------

router.get('/events', (req, res) => {
  try {
    const { category, country, q } = req.query;
    let list = [...eventsStore];

    if (category && category !== 'all') {
      list = list.filter(e => e.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (country && country !== 'all') {
      list = list.filter(e => e.country.toLowerCase().includes(country.toLowerCase()));
    }
    if (q) {
      const qLower = q.toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(qLower) ||
        e.location.toLowerCase().includes(qLower) ||
        e.description.toLowerCase().includes(qLower)
      );
    }

    res.json({
      success: true,
      total: list.length,
      events: list
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/events', (req, res) => {
  try {
    const { title, organization, location, country, category, startDate, endDate, description, website } = req.body;
    if (!title || !location || !startDate) {
      return res.status(400).json({ success: false, error: 'Event title, location, and start date are required' });
    }

    const newEvent = {
      id: `evt-${Date.now()}`,
      title,
      organization: organization || 'African Enterprise Network',
      location,
      country: country || 'Africa',
      category: category || 'Business & Trade',
      startDate,
      endDate: endDate || startDate,
      description: description || 'Pan-African industry conference and business summit.',
      website: website || '#',
      attendeesExpected: '500+',
      featuredSpeakers: [],
      status: 'Upcoming',
      isFeatured: false
    };

    eventsStore.unshift(newEvent);

    res.status(201).json({
      success: true,
      message: 'Event submitted successfully and published to the continental calendar!',
      event: newEvent
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete an event
router.delete('/events/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = eventsStore.findIndex(e => e.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }
    const removed = eventsStore.splice(index, 1)[0];
    res.json({ success: true, message: 'Event removed', event: removed });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// EDITORIAL DASHBOARD & NEWSROOM ANALYTICS
// ----------------------------------------------------

router.get('/dashboard/stats', (req, res) => {
  try {
    const totalArticles = articlesStore.length;
    const totalViews = articlesStore.reduce((sum, a) => sum + (a.views || 0), 0);
    const totalLikes = articlesStore.reduce((sum, a) => sum + (a.likes || 0), 0);
    const totalComments = articlesStore.reduce((sum, a) => sum + (a.comments ? a.comments.length : 0), 0);
    const totalEvents = eventsStore.length;
    const totalSubscribers = newsletterSubscribers.size;

    // Breakdown by category
    const categoryCounts = {};
    articlesStore.forEach(a => {
      const cat = a.categoryLabel || a.category;
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    // Top trending tags
    const tagMap = {};
    articlesStore.forEach(a => {
      (a.tags || []).forEach(t => {
        tagMap[t] = (tagMap[t] || 0) + 1;
      });
    });
    const trendingTags = Object.entries(tagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag, count]) => ({ tag, count }));

    // Top viewed articles
    const topArticles = [...articlesStore]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map(a => ({ id: a.id, title: a.title, views: a.views, likes: a.likes, category: a.categoryLabel }));

    res.json({
      success: true,
      stats: {
        totalArticles,
        totalViews,
        totalLikes,
        totalComments,
        totalEvents,
        totalSubscribers,
        categoryCounts,
        trendingTags,
        topArticles
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// PODCASTS & LIVE COVERAGE ENDPOINTS
// ----------------------------------------------------

router.get('/podcasts', (req, res) => {
  res.json({
    success: true,
    podcasts: podcastsData
  });
});

// Real-time quotes endpoints (African Leadership & Market Wisdom)
router.get('/quotes', (req, res) => {
  const { category } = req.query;
  let quotes = [...africanQuotes];
  if (category) {
    quotes = quotes.filter(q => q.category.toLowerCase().includes(category.toLowerCase()));
  }
  res.json({
    success: true,
    total: quotes.length,
    quotes
  });
});

router.get('/quotes/today', (req, res) => {
  const quote = getQuoteOfDay();
  res.json({
    success: true,
    quote
  });
});

router.get('/quotes/random', (req, res) => {
  const randomIdx = Math.floor(Math.random() * africanQuotes.length);
  res.json({
    success: true,
    quote: africanQuotes[randomIdx]
  });
});

// Full automated live coverage endpoints
router.get('/live-coverage', (req, res) => {
  try {
    const { category, q } = req.query;
    let feed = [...liveCoverageFeed];

    if (category && category !== 'all') {
      feed = feed.filter(item => 
        item.category.toLowerCase().includes(category.toLowerCase()) || 
        item.badge.toLowerCase() === category.toLowerCase()
      );
    }

    if (q) {
      const search = q.toLowerCase();
      feed = feed.filter(item =>
        item.title.toLowerCase().includes(search) ||
        item.content.toLowerCase().includes(search)
      );
    }

    // Attach reaction counts
    const enrichedFeed = feed.map(item => ({
      ...item,
      reactions: liveReactions.get(item.id) || { fire: 14, agree: 28, insight: 9 }
    }));

    res.json({
      success: true,
      status: "LIVE_STREAMING",
      connectedDelegates: 48,
      investmentPledges: "$12.8 Billion",
      activeListeners: 3480 + Math.floor(Math.random() * 45),
      lastUpdated: new Date().toISOString(),
      poll: livePollState,
      feed: enrichedFeed
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/live-coverage', (req, res) => {
  try {
    const { title, content, badge = "UPDATE", category = "Continental", author = "NewsHub Desk" } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, error: 'Title and content are required' });
    }

    const newLiveItem = {
      id: `live-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' GMT',
      badge: badge.toUpperCase(),
      badgeColor: badge.toUpperCase() === 'BREAKING' ? '#e94560' : (badge.toUpperCase() === 'POLICY' ? '#2a9d8f' : '#0033cc'),
      title,
      content,
      author,
      category
    };

    liveCoverageFeed.unshift(newLiveItem);
    // Initialize default reactions
    liveReactions.set(newLiveItem.id, { fire: 1, agree: 1, insight: 1 });

    res.status(201).json({ success: true, item: newLiveItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Live Poll Vote endpoint
router.post('/live-coverage/poll-vote', (req, res) => {
  try {
    const { optionId } = req.body;
    const option = livePollState.options.find(o => o.id === optionId);
    if (!option) {
      return res.status(400).json({ success: false, error: 'Invalid poll option' });
    }

    option.votes += 1;
    livePollState.totalVotes += 1;

    // Recalculate percentages
    livePollState.options.forEach(opt => {
      opt.percent = Math.round((opt.votes / livePollState.totalVotes) * 100);
    });

    res.json({
      success: true,
      poll: livePollState
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Live Reaction endpoint
router.post('/live-coverage/react', (req, res) => {
  try {
    const { itemId, reactionType = 'fire' } = req.body;
    const current = liveReactions.get(itemId) || { fire: 5, agree: 12, insight: 3 };
    if (current[reactionType] !== undefined) {
      current[reactionType] += 1;
    } else {
      current[reactionType] = 1;
    }
    liveReactions.set(itemId, current);

    res.json({
      success: true,
      reactions: current
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// NEWSLETTER SUBSCRIPTION
// ----------------------------------------------------

router.post('/newsletter/subscribe', (req, res) => {
  try {
    const { email, frequency = 'daily', topics = ['Business', 'Tech', 'Markets'] } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email address is required' });
    }

    newsletterSubscribers.set(email, {
      email,
      frequency,
      topics,
      subscribedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: `Thank you for subscribing! The Pan-African ${frequency} briefing will be delivered to ${email}.`,
      subscription: { email, frequency, topics }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// AI INTELLIGENCE SUITE (GEMINI)
// ----------------------------------------------------

// Generate 3-bullet AI summary for any article
router.post('/ai/article-summary', async (req, res) => {
  try {
    const { title, category, content } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'Title is required for summarization' });
    }
    const summary = await generateArticleSummary({ title, category, content });
    res.json({ success: true, summary });
  } catch (error) {
    console.error('AI Article Summary error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Editorial AI Assistant - Generate or Refine Article Drafts & Headlines
router.post('/ai/draft-assistant', async (req, res) => {
  try {
    const { topic, category, country, keyPoints, mode } = req.body;
    if (!topic) {
      return res.status(400).json({ success: false, error: 'Topic or working title is required' });
    }
    const draft = await draftArticleAssistant({ topic, category, country, keyPoints, mode });
    res.json({ success: true, draft });
  } catch (error) {
    console.error('AI Draft Assistant error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
