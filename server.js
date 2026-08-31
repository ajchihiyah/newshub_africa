import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './server/routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Body parser with increased limit for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// REST API routes
app.use('/api', apiRouter);

// Serve static assets from root directory
app.use(express.static(__dirname));

// SEO endpoints
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

// Helpful navigation aliases & redirects
app.get('/markets.html', (req, res) => res.redirect(301, '/markets_v13_linked.html'));
app.get('/markets', (req, res) => res.redirect(301, '/markets_v13_linked.html'));
app.get('/business', (req, res) => res.redirect(301, '/business.html'));
app.get('/technology', (req, res) => res.redirect(301, '/technology.html'));
app.get('/tech', (req, res) => res.redirect(301, '/technology.html'));
app.get('/energy', (req, res) => res.redirect(301, '/energy.html'));
app.get('/mining', (req, res) => res.redirect(301, '/mining.html'));
app.get('/agriculture', (req, res) => res.redirect(301, '/agriculture.html'));
app.get('/events', (req, res) => res.redirect(301, '/events.html'));
app.get('/dashboard', (req, res) => res.redirect(301, '/dashboard.html'));
app.get('/studio', (req, res) => res.redirect(301, '/dashboard.html'));
app.get('/watchlist', (req, res) => res.redirect(301, '/watchlist.html'));
app.get('/podcasts', (req, res) => res.redirect(301, '/podcasts.html'));
app.get('/live', (req, res) => res.redirect(301, '/live-coverage.html'));
app.get('/newsletters', (req, res) => res.redirect(301, '/newsletters.html'));
app.get('/about', (req, res) => res.redirect(301, '/about.html'));
app.get('/contact', (req, res) => res.redirect(301, '/contact.html'));
app.get('/careers', (req, res) => res.redirect(301, '/careers.html'));
app.get('/privacy', (req, res) => res.redirect(301, '/privacy.html'));
app.get('/terms', (req, res) => res.redirect(301, '/terms.html'));
app.get('/cookies', (req, res) => res.redirect(301, '/cookies.html'));
app.get('/advertise', (req, res) => res.redirect(301, '/advertise.html'));
app.get('/submit-event', (req, res) => res.redirect(301, '/submit-event.html'));
app.get('/commodities', (req, res) => res.redirect(301, '/commodities.html'));
app.get('/calendar', (req, res) => res.redirect(301, '/calendar.html'));
app.get('/fx-heatmap', (req, res) => res.redirect(301, '/fx-heatmap.html'));
app.get('/weekly-recap.html', (req, res) => res.redirect(301, '/newsletters.html'));

// Article detail view routes
app.get('/article/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'article.html'));
});

// Dynamic fallback for article_*.html that might not exist statically
app.get('/article_*.html', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  if (path.extname(req.path) === '.html') {
    res.sendFile(filePath, err => {
      if (err) {
        // Fallback to dynamic article reader
        res.sendFile(path.join(__dirname, 'article.html'));
      }
    });
  } else {
    res.sendFile(path.join(__dirname, 'article.html'));
  }
});

// Fallback to index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NewsHub Africa server running at http://0.0.0.0:${PORT}`);
});

