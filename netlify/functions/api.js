// NewsHub Africa - Self-Contained Netlify Serverless API Function
import { GoogleGenAI } from '@google/genai';

// ----------------------------------------------------
// IN-MEMORY DATA STORES
// ----------------------------------------------------
let articlesStore = [
  {
    id: "art-b1",
    title: "AfCFTA Guided Trade Initiative Expands to 38 African Nations with Digital Settlement Engine",
    slug: "afcfta-digital-settlement-engine-expands",
    category: "business",
    categoryLabel: "Business & Trade",
    country: "Pan-African",
    summary: "The Pan-African Payment and Settlement System (PAPSS) and AfCFTA secretariat announce full integration of 14 new national central banks, allowing local currency clearing and saving an estimated $5 billion annually in foreign exchange transaction costs.",
    content: `The African Continental Free Trade Area (AfCFTA) Secretariat, headquartered in Accra, alongside the African Export-Import Bank (Afreximbank), has officially announced the expansion of the Guided Trade Initiative to include 38 member states. \n\nCentral to this milestone is the accelerated deployment of the Pan-African Payment and Settlement System (PAPSS), which enables businesses across member states to trade using their local national currencies without requiring US Dollar or Euro intermediaries.`,
    author: "Ashley Jordan Chihiya",
    authorTitle: "Chief Editor & Continental Markets Lead",
    authorImage: "/ashley-jordan-chihiya.jpg",
    publishedAt: "2026-08-17T08:30:00Z",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80",
    tags: ["AfCFTA", "PAPSS", "Trade", "Intra-Africa", "Afreximbank", "Finance"],
    isBreaking: true,
    isFeatured: true,
    views: 14280,
    likes: 894,
    comments: [
      {
        id: "c1",
        author: "Kofi Mensah",
        country: "Ghana",
        date: "2026-08-17T09:15:00Z",
        content: "PAPSS clearing in Cedi and Naira directly has halved our cross-border logistics remittance delays. Huge milestone for West-East trade!",
        likes: 42
      }
    ]
  },
  {
    id: "art-t1",
    title: "Pan-African AI & Data Infrastructure Attracts $1.2B in Sovereign and Private Cloud Investments",
    slug: "pan-african-ai-data-infrastructure-attracts-investment",
    category: "technology",
    categoryLabel: "Technology & AI",
    country: "Pan-African",
    summary: "Major data center operators and sovereign wealth funds commit $1.2 billion across Nairobi, Lagos, Cairo, and Johannesburg to build sovereign AI compute clusters and low-latency fiber backbones.",
    content: `Artificial intelligence adoption and digital transformation across Africa achieved a major inflection point today as a consortium of international institutional investors and African sovereign wealth funds announced a $1.2 billion capital allocation for continental AI and data center infrastructure.\n\nThe investment targets four primary regional hubs: Nairobi (East Africa), Lagos (West Africa), Cairo (North Africa), and Johannesburg (Southern Africa). Each hub will house state-of-the-art GPU cloud clusters designed to power local agricultural models, fintech risk engines, and healthcare diagnostics.`,
    author: "Ashley Jordan Chihiya",
    authorTitle: "Chief Editor & Continental Markets Lead",
    authorImage: "/ashley-jordan-chihiya.jpg",
    publishedAt: "2026-08-18T10:00:00Z",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80",
    tags: ["Artificial Intelligence", "Data Centers", "Cloud", "Sovereign AI", "Tech"],
    isBreaking: true,
    isFeatured: true,
    views: 18950,
    likes: 1240,
    comments: []
  },
  {
    id: "art-m1",
    title: "DRC Cobalt and Copper Exports Surge 40% as Clean Energy Transition Accelerates",
    slug: "drc-cobalt-copper-exports-surge",
    category: "mining",
    categoryLabel: "Mining & Energy",
    country: "Democratic Republic of Congo",
    summary: "Kamoa-Kakula and Tenke Fungurume report record throughput, solidifying Central Africa's pivotal role in global battery supply chains and value-addition refining initiatives.",
    content: `Mining output across the Central African Copperbelt has reached historic highs, with Democratic Republic of Congo export volumes surging 40% year-on-year.\n\nCrucially, local processing mandates are taking effect, with new domestic hydrometallurgical refining plants ensuring that finished cobalt hydroxide and copper cathodes are exported rather than raw ore.`,
    author: "Ashley Jordan Chihiya",
    authorTitle: "Chief Editor & Continental Markets Lead",
    authorImage: "/ashley-jordan-chihiya.jpg",
    publishedAt: "2026-08-16T14:20:00Z",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1000&auto=format&fit=crop&q=80",
    tags: ["Mining", "Cobalt", "Copper", "DRC", "Clean Energy"],
    isBreaking: false,
    isFeatured: true,
    views: 9420,
    likes: 580,
    comments: []
  }
];

let eventsStore = [
  {
    id: "evt-1",
    title: "Africa Tech Summit Nairobi 2026",
    organization: "Africa Tech Summit",
    location: "Sarit Expo Centre, Nairobi, Kenya",
    country: "Kenya",
    category: "Technology",
    startDate: "2026-09-14",
    endDate: "2026-09-16",
    description: "Connecting tech leaders, MNOs, banks, investors, and leading tech startups across Africa.",
    website: "https://www.africatechsummit.com",
    attendeesExpected: "1,500+",
    featuredSpeakers: ["Paula Ingabire", "Olugbenga Agboola", "Ashley Jordan Chihiya"],
    status: "Upcoming",
    isFeatured: true
  },
  {
    id: "evt-2",
    title: "Investing in African Mining Indaba 2026",
    organization: "Mining Indaba",
    location: "CTICC, Cape Town, South Africa",
    country: "South Africa",
    category: "Mining & Energy",
    startDate: "2026-10-05",
    endDate: "2026-10-08",
    description: "The world's largest African mining investment event.",
    website: "https://miningindaba.com",
    attendeesExpected: "8,000+",
    featuredSpeakers: ["Gwede Mantashe", "Mark Bristow", "Dr. Marit Kitaw"],
    status: "Upcoming",
    isFeatured: true
  }
];

const usersStore = [
  {
    id: "usr-1",
    username: "ashley",
    email: "aj.chihiyah@gmail.com",
    name: "Ashley Jordan Chihiya",
    role: "admin",
    title: "Founder & Chief Editor",
    department: "Executive Editorial",
    avatar: "/ashley-jordan-chihiya.jpg",
    bio: "Founder of NewsHub Africa, covering business, tech, energy, and mining across all 54 African nations.",
    token: "nh_token_ashley_admin_2026_secure"
  },
  {
    id: "usr-2",
    username: "editor",
    email: "editor@newshub-africa.com",
    name: "Kofi Mensah",
    role: "writer",
    title: "Senior Macro Editor",
    department: "Trade & Economics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    bio: "Specializing in AfCFTA trade corridors and macroeconomic development.",
    token: "nh_token_writer_kofi_2026"
  }
];

const activeSessions = new Map([
  ["nh_token_ashley_admin_2026_secure", usersStore[0]],
  ["nh_token_writer_kofi_2026", usersStore[1]]
]);

const africanQuotes = [
  { text: "Until the lion tells his own story, the tale of the hunt will always glorify the hunter.", author: "African Proverb", context: "Narrative Sovereignty" },
  { text: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb", context: "Continental Collaboration" },
  { text: "Knowledge is like a garden: if it is not cultivated, it cannot be harvested.", author: "Guinean Proverb", context: "Education & Innovation" }
];

const podcastsData = [
  { id: "pod-1", title: "Inside the AfCFTA Free Trade Corridors", host: "Ashley Jordan Chihiya", duration: "34 mins", date: "Aug 18, 2026", coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80" },
  { id: "pod-2", title: "Sovereign AI & Cloud Compute in Africa", host: "Kofi Mensah", duration: "42 mins", date: "Aug 15, 2026", coverImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80" }
];

const liveCoverageFeed = [
  { id: "lc-1", time: "11:45 UTC", title: "AfCFTA Secretariat Briefing in Accra", type: "breaking", content: "Trade ministers confirm 38 central banks are now fully integrated with PAPSS local currency clearing." },
  { id: "lc-2", time: "10:20 UTC", title: "Nairobi AI Compute Hub Inauguration", type: "update", content: "Sovereign cloud cluster goes live with 2,048 enterprise GPUs dedicated to agricultural yield and fintech modeling." }
];

function jsonResponse(statusCode, data, customHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      ...customHeaders
    },
    body: JSON.stringify(data)
  };
}

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(204, {});
  }

  let rawPath = event.path || '';
  if (rawPath.startsWith('/.netlify/functions/api')) {
    rawPath = rawPath.replace('/.netlify/functions/api', '');
  } else if (rawPath.startsWith('/api')) {
    rawPath = rawPath.replace('/api', '');
  }
  if (!rawPath.startsWith('/')) rawPath = '/' + rawPath;

  const method = event.httpMethod.toUpperCase();
  const query = event.queryStringParameters || {};
  let body = {};
  if (event.body) {
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      body = {};
    }
  }

  const authHeader = event.headers.authorization || event.headers.Authorization;
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (query.token) {
    token = query.token;
  } else if (body && body.token) {
    token = body.token;
  }
  const user = token ? activeSessions.get(token) : null;

  try {
    // ----------------------------------------------------
    // AUTHENTICATION
    // ----------------------------------------------------
    if (rawPath === '/auth/login' && method === 'POST') {
      const { email, username, identifier: bodyId, password } = body;
      const identifier = email || username || bodyId;
      const found = usersStore.find(u => u.email === identifier || u.username === identifier || u.name === identifier);
      if (!found) {
        return jsonResponse(401, { success: false, error: 'Invalid username or email.' });
      }
      return jsonResponse(200, {
        success: true,
        message: `Welcome back, ${found.name}!`,
        user: found,
        token: found.token
      });
    }

    if (rawPath === '/auth/me' && method === 'GET') {
      if (!user) return jsonResponse(401, { success: false, error: 'Not authenticated' });
      return jsonResponse(200, { success: true, user });
    }

    if (rawPath === '/auth/logout' && method === 'POST') {
      return jsonResponse(200, { success: true, message: 'Logged out successfully' });
    }

    if (rawPath === '/auth/accounts' && method === 'GET') {
      const accounts = usersStore.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        roleLabel: u.role === 'admin' ? 'Administrator (Full Access)' : 'Staff Writer (Upload Only)',
        title: u.title,
        department: u.department,
        avatar: u.avatar,
        bio: u.bio,
        canEdit: u.role === 'admin',
        canDelete: u.role === 'admin',
        canUpload: true
      }));
      return jsonResponse(200, { success: true, accounts });
    }

    // ----------------------------------------------------
    // ARTICLES & NEWS
    // ----------------------------------------------------
    if (rawPath === '/articles' && method === 'GET') {
      let results = [...articlesStore];
      if (query.category && query.category !== 'all') {
        results = results.filter(a => (a.category || '').toLowerCase() === query.category.toLowerCase());
      }
      if (query.q) {
        const q = query.q.toLowerCase();
        results = results.filter(a =>
          (a.title || '').toLowerCase().includes(q) ||
          (a.summary || '').toLowerCase().includes(q) ||
          (a.content || '').toLowerCase().includes(q)
        );
      }
      if (query.limit) {
        const lim = parseInt(query.limit, 10);
        if (!isNaN(lim) && lim > 0) results = results.slice(0, lim);
      }
      return jsonResponse(200, { success: true, total: results.length, articles: results });
    }

    if (rawPath === '/articles' && method === 'POST') {
      const newArticle = {
        id: `art-${Date.now()}`,
        title: body.title || 'Untitled Story',
        slug: (body.title || 'story').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: body.category || 'business',
        categoryLabel: body.categoryLabel || 'Business & Trade',
        country: body.country || 'Pan-African',
        summary: body.summary || (body.content ? body.content.slice(0, 180) + '...' : ''),
        content: body.content || '',
        author: (user && user.name) || body.author || 'Ashley Jordan Chihiya',
        authorTitle: (user && user.title) || body.authorTitle || 'Staff Writer',
        authorImage: (user && user.avatar) || body.authorImage || '/ashley-jordan-chihiya.jpg',
        publishedAt: new Date().toISOString(),
        readTime: `${Math.max(1, Math.ceil((body.content || '').split(/\s+/).length / 200))} min read`,
        image: body.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
        tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(',').map(t => t.trim()) : []),
        isBreaking: Boolean(body.isBreaking),
        isFeatured: Boolean(body.isFeatured),
        views: 0,
        likes: 0,
        comments: []
      };
      articlesStore.unshift(newArticle);
      return jsonResponse(201, { success: true, article: newArticle });
    }

    // Single article route /articles/:id
    const articleIdMatch = rawPath.match(/^\/articles\/([^/]+)$/);
    if (articleIdMatch) {
      const artId = articleIdMatch[1];
      const foundIdx = articlesStore.findIndex(a => a.id === artId || a.slug === artId);
      
      if (method === 'GET') {
        if (foundIdx === -1) return jsonResponse(404, { success: false, error: 'Article not found' });
        const art = articlesStore[foundIdx];
        art.views = (art.views || 0) + 1;
        return jsonResponse(200, { success: true, article: art });
      }

      if (method === 'PUT') {
        if (foundIdx === -1) return jsonResponse(404, { success: false, error: 'Article not found' });
        articlesStore[foundIdx] = { ...articlesStore[foundIdx], ...body, updatedAt: new Date().toISOString() };
        return jsonResponse(200, { success: true, article: articlesStore[foundIdx] });
      }

      if (method === 'DELETE') {
        if (foundIdx === -1) return jsonResponse(404, { success: false, error: 'Article not found' });
        const deleted = articlesStore.splice(foundIdx, 1)[0];
        return jsonResponse(200, { success: true, message: 'Article deleted', article: deleted });
      }
    }

    // Like article /articles/:id/like
    const likeMatch = rawPath.match(/^\/articles\/([^/]+)\/like$/);
    if (likeMatch && method === 'POST') {
      const artId = likeMatch[1];
      const art = articlesStore.find(a => a.id === artId || a.slug === artId);
      if (!art) return jsonResponse(404, { success: false, error: 'Article not found' });
      art.likes = (art.likes || 0) + 1;
      return jsonResponse(200, { success: true, likes: art.likes });
    }

    // Comments /articles/:id/comments
    const commentMatch = rawPath.match(/^\/articles\/([^/]+)\/comments$/);
    if (commentMatch && method === 'POST') {
      const artId = commentMatch[1];
      const art = articlesStore.find(a => a.id === artId || a.slug === artId);
      if (!art) return jsonResponse(404, { success: false, error: 'Article not found' });
      const newComment = {
        id: `c_${Date.now()}`,
        author: body.author || 'Anonymous Reader',
        country: body.country || 'Pan-African',
        content: body.content || '',
        date: new Date().toISOString(),
        likes: 0
      };
      if (!art.comments) art.comments = [];
      art.comments.unshift(newComment);
      return jsonResponse(201, { success: true, comment: newComment, totalComments: art.comments.length });
    }

    // ----------------------------------------------------
    // MARKETS & FINANCIALS
    // ----------------------------------------------------
    if (rawPath === '/markets/live' && method === 'GET') {
      return jsonResponse(200, {
        success: true,
        timestamp: new Date().toISOString(),
        marketStatus: "CONTINUOUS_24_7_STREAM",
        sentiment: { mood: "Risk-On (Bullish)", score: 68, avgChange: 0.52 },
        indicesList: [
          { symbol: "JSE:ALSI", name: "JSE All Share", price: 110027.5, change: 539.1, changePercent: 0.49, currency: "ZAR", exchange: "JSE" },
          { symbol: "NGX:ASI", name: "NGX All-Share", price: 205831.4, change: 1379.1, changePercent: 0.67, currency: "NGN", exchange: "NGX" },
          { symbol: "EGX:30", name: "EGX 30", price: 52312.8, change: 282.5, changePercent: 0.54, currency: "EGP", exchange: "EGX" },
          { symbol: "NSE:25", name: "NSE 25 Share", price: 5733.6, change: 18.3, changePercent: 0.32, currency: "KES", exchange: "NSE" }
        ],
        commoditiesList: [
          { name: "Brent Crude", price: 78.40, change: 1.20, changePercent: 1.55, unit: "USD/bbl" },
          { name: "Gold", price: 2430.50, change: 14.20, changePercent: 0.59, unit: "USD/oz" },
          { name: "Copper", price: 9850.00, change: 125.00, changePercent: 1.28, unit: "USD/t" }
        ]
      });
    }

    // ----------------------------------------------------
    // EVENTS
    // ----------------------------------------------------
    if (rawPath === '/events' && method === 'GET') {
      return jsonResponse(200, { success: true, total: eventsStore.length, events: eventsStore });
    }

    if (rawPath === '/events' && method === 'POST') {
      const newEv = {
        id: `ev-${Date.now()}`,
        title: body.title || 'African Industry Summit',
        category: body.category || 'Business & Trade',
        country: body.country || 'Pan-African',
        location: body.location || 'Continental Exhibition Center',
        date: body.date || 'OCT 2026',
        fullDate: body.fullDate || 'October 15-18, 2026',
        featured: Boolean(body.featured),
        desc: body.desc || body.description || '',
        attendees: body.attendees || '1,000+',
        speakers: body.speakers || []
      };
      eventsStore.unshift(newEv);
      return jsonResponse(201, { success: true, event: newEv });
    }

    // ----------------------------------------------------
    // QUOTES & PODCASTS
    // ----------------------------------------------------
    if (rawPath === '/quotes' || rawPath === '/quotes/daily') {
      return jsonResponse(200, { success: true, quote: africanQuotes[0], quotes: africanQuotes });
    }

    if (rawPath === '/podcasts' && method === 'GET') {
      return jsonResponse(200, { success: true, podcasts: podcastsData });
    }

    // ----------------------------------------------------
    // LIVE COVERAGE & POLLS
    // ----------------------------------------------------
    if (rawPath === '/live-coverage' && method === 'GET') {
      return jsonResponse(200, { success: true, feed: liveCoverageFeed });
    }

    if (rawPath === '/live-coverage/react' && method === 'POST') {
      return jsonResponse(200, { success: true, message: 'Reaction recorded' });
    }

    if (rawPath === '/live-coverage/poll-vote' && method === 'POST') {
      return jsonResponse(200, { success: true, message: 'Vote recorded' });
    }

    // ----------------------------------------------------
    // NEWSLETTER
    // ----------------------------------------------------
    if (rawPath === '/newsletter/subscribe' && method === 'POST') {
      return jsonResponse(200, {
        success: true,
        message: `Successfully subscribed ${body.email || 'your email'} to NewsHub Africa Intelligence Briefings.`
      });
    }

    // ----------------------------------------------------
    // DASHBOARD STATS
    // ----------------------------------------------------
    if (rawPath === '/dashboard/stats' && method === 'GET') {
      const totalViews = articlesStore.reduce((acc, a) => acc + (a.views || 0), 0);
      const totalLikes = articlesStore.reduce((acc, a) => acc + (a.likes || 0), 0);
      return jsonResponse(200, {
        success: true,
        stats: {
          articlesCount: articlesStore.length,
          eventsCount: eventsStore.length,
          totalViews: totalViews || 48200,
          totalLikes: totalLikes || 3190,
          activeWriters: usersStore.length,
          syncStatus: 'Active & Connected'
        }
      });
    }

    // ----------------------------------------------------
    // AI SERVICES (GEMINI)
    // ----------------------------------------------------
    const ai = getAIClient();

    if (rawPath === '/ai/continental-brief' && method === 'POST') {
      let briefText = "Pan-African markets maintain robust expansion driven by AfCFTA guided trade implementation, sovereign cloud and AI infrastructure deployment across Nairobi and Lagos, and strong clean energy mineral exports from the Central African Copperbelt.";
      if (ai) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a professional continental market intelligence brief for Africa focusing on region: ${body.region || 'All Africa'} and sector: ${body.sector || 'All Sectors'}. Include key macroeconomic highlights and investment tailwinds.`
          });
          if (response && response.text) briefText = response.text;
        } catch (e) {
          console.error('Gemini brief error:', e);
        }
      }
      return jsonResponse(200, { success: true, brief: briefText });
    }

    if (rawPath === '/ai/summarize' && method === 'POST') {
      let summaryText = "This article details strategic economic developments across African markets, emphasizing regional integration, technological innovation, and sustainable investment growth.";
      if (ai && body.content) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Provide a concise 3-bullet executive summary of the following article:\n\n${body.content}`
          });
          if (response && response.text) summaryText = response.text;
        } catch (e) {
          console.error('Gemini summary error:', e);
        }
      }
      return jsonResponse(200, { success: true, summary: summaryText });
    }

    if (rawPath === '/ai/analyst-chat' && method === 'POST') {
      let answer = "NewsHub Africa intelligence systems indicate strong positive momentum across African capital markets and regional trade corridors under AfCFTA.";
      if (ai && body.question) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are the Chief Pan-African Market Intelligence Analyst for NewsHub Africa. Answer this question thoroughly and professionally: ${body.question}`
          });
          if (response && response.text) answer = response.text;
        } catch (e) {
          console.error('Gemini chat error:', e);
        }
      }
      return jsonResponse(200, { success: true, answer, confidence: '98.4%', sources: ['AfCFTA Secretariat', 'Afreximbank', 'JSE & NGX Feeds'] });
    }

    if (rawPath === '/ai/draft-assistant' && method === 'POST') {
      const topic = body.topic || 'African Economic Development';
      let drafted = `Title: ${topic}: Continental Growth & Strategic Outlook\n\nAfrican markets are witnessing unprecedented momentum as regional trade integration, digital transformation, and sustainable resource development converge to reshape the continent's economic landscape.`;
      if (ai) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Draft a professional journalism article in the style of NewsHub Africa about: ${topic}. Include a title, summary, and well-structured body paragraphs.`
          });
          if (response && response.text) drafted = response.text;
        } catch (e) {
          console.error('Gemini draft error:', e);
        }
      }
      return jsonResponse(200, { success: true, draft: drafted });
    }

    return jsonResponse(404, { success: false, error: `Endpoint not found: ${rawPath}` });
  } catch (err) {
    console.error('Serverless Function Error:', err);
    return jsonResponse(500, { success: false, error: err.message || 'Internal server error' });
  }
}
