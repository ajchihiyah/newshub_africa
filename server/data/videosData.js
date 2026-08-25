import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIDEOS_FILE = path.join(__dirname, 'videos.json');

export const initialVideos = [
  {
    id: "vid-1",
    title: "Africa's Tech Ecosystem Is Shifting – Latest News & Updates",
    videoUrl: "https://www.youtube.com/embed/5qap5aO4i9A",
    duration: "12:34",
    category: "Technology",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    date: "2026-08-25",
    isMain: true,
    author: "Ashley Jordan Chihiya"
  },
  {
    id: "vid-2",
    title: "Namibia's $10B Green Hydrogen Project Explained",
    videoUrl: "https://www.youtube.com/embed/T7Fk8kJ_ETQ?start=119",
    duration: "08:15",
    category: "Energy",
    thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&h=120&fit=crop",
    date: "2026-08-23",
    isMain: false,
    author: "Farai Chitepo"
  },
  {
    id: "vid-3",
    title: "Africa FinTech Revenues to Hit $65B by 2030",
    videoUrl: "https://www.facebook.com/poaenglish/videos/africafintech-set-for-65b-growth-by-2030/2076715906218978/",
    duration: "15:42",
    category: "Business",
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=200&h=120&fit=crop",
    date: "2026-08-22",
    isMain: false,
    author: "Tariq Adeleke"
  },
  {
    id: "vid-4",
    title: "Egypt's Vertical Farming Revolution",
    videoUrl: "https://www.youtube.com/embed/3baiWL7aJ3c",
    duration: "06:28",
    category: "Agriculture",
    thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&h=120&fit=crop",
    date: "2026-08-20",
    isMain: false,
    author: "Zainab Diallo"
  },
  {
    id: "vid-5",
    title: "Botswana Diamond Sales Rebound to Pre-Pandemic Levels",
    videoUrl: "https://www.youtube.com/embed/Tq5CNa1Bjjo",
    duration: "10:55",
    category: "Mining",
    thumbnail: "https://img.youtube.com/vi/Tq5CNa1Bjjo/hqdefault.jpg",
    date: "2026-08-18",
    isMain: false,
    author: "Jean-Pierre Mbelu"
  }
];

function loadPersistedVideos() {
  try {
    if (fs.existsSync(VIDEOS_FILE)) {
      const data = fs.readFileSync(VIDEOS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading videos.json, falling back to defaults:', err);
  }
  try {
    fs.writeFileSync(VIDEOS_FILE, JSON.stringify(initialVideos, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing initial videos.json:', err);
  }
  return [...initialVideos];
}

export const videosStore = loadPersistedVideos();

export function saveVideosStore() {
  try {
    fs.writeFileSync(VIDEOS_FILE, JSON.stringify(videosStore, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving to videos.json:', err);
  }
}
