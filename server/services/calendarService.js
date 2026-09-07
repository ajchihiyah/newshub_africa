// Dynamic Pan-African Economic Calendar, Morning Call & Currency Corner Intelligence Engine
// NewsHub Africa Financial Markets & Macro Intelligence Desk

import { getLiveMarketSnapshot, liveFXRates } from '../data/marketData.js';

// Base template of major continental macroeconomic catalysts & corporate events
const eventTemplates = [
  {
    id: "ng-mpc",
    country: "Nigeria",
    flag: "🇳🇬",
    time: "14:00 WAT",
    timezone: "WAT",
    eventTitle: "Monetary Policy Committee Meeting",
    type: "interest",
    typeLabel: "Interest Rate Decision",
    impact: "high",
    impactDots: 3,
    previous: "26.25%",
    forecast: "26.25%",
    offsetDays: 1, // dynamically mapped relative to current date
    description: "Central Bank of Nigeria (CBN) MPC rate announcement. Crucial for banking liquidity, fixed income yields, and FX reserves."
  },
  {
    id: "za-cpi",
    country: "South Africa",
    flag: "🇿🇦",
    time: "10:00 SAST",
    timezone: "SAST",
    eventTitle: "Consumer Price Index (CPI) — Monthly Release",
    type: "inflation",
    typeLabel: "Inflation Data",
    impact: "high",
    impactDots: 3,
    previous: "4.6% YoY",
    forecast: "4.8% YoY",
    offsetDays: 3,
    description: "Statistics South Africa headline CPI figure. Directly guides SARB's rate trajectory and Rand yields."
  },
  {
    id: "ke-gdp",
    country: "Kenya",
    flag: "🇰🇪",
    time: "09:00 EAT",
    timezone: "EAT",
    eventTitle: "Quarterly GDP Growth Rate",
    type: "gdp",
    typeLabel: "GDP Data",
    impact: "medium",
    impactDots: 2,
    previous: "5.2% QoQ",
    forecast: "5.0% QoQ",
    offsetDays: 4,
    description: "Kenya National Bureau of Statistics quarterly economic output figures, driven by agricultural recovery and services."
  },
  {
    id: "eg-cbe",
    country: "Egypt",
    flag: "🇪🇬",
    time: "14:00 EET",
    timezone: "EET",
    eventTitle: "Central Bank of Egypt Rate Decision",
    type: "interest",
    typeLabel: "Interest Rate Decision",
    impact: "high",
    impactDots: 3,
    previous: "27.25%",
    forecast: "27.00%",
    offsetDays: 7,
    description: "CBE Monetary Policy Committee policy rate review following IMF structural benchmark assessments and FX stabilization."
  },
  {
    id: "za-mtn",
    country: "South Africa",
    flag: "🇿🇦",
    time: "08:00 SAST",
    timezone: "SAST",
    eventTitle: "MTN Group — Financial & Operational Results",
    type: "earnings",
    typeLabel: "Corporate Earnings",
    impact: "medium",
    impactDots: 2,
    previous: "EPS: R 5.42",
    forecast: "Est: R 5.85",
    offsetDays: 8,
    description: "Pan-African telecom leader's interim numbers with focus on data revenue, MoMo fintech transaction volumes, and tower assets."
  },
  {
    id: "gh-cpi",
    country: "Ghana",
    flag: "🇬🇭",
    time: "10:00 GMT",
    timezone: "GMT",
    eventTitle: "Headline Consumer Inflation Rate",
    type: "inflation",
    typeLabel: "Inflation Data",
    impact: "low",
    impactDots: 1,
    previous: "22.8% YoY",
    forecast: "22.5% YoY",
    offsetDays: 10,
    description: "Ghana Statistical Service inflation report. Traders monitor disinflation pace for BoG policy easing signals."
  },
  {
    id: "za-ppi",
    country: "South Africa",
    flag: "🇿🇦",
    time: "11:30 SAST",
    timezone: "SAST",
    eventTitle: "Producer Price Index (PPI) — Final",
    type: "inflation",
    typeLabel: "Inflation Data",
    impact: "medium",
    impactDots: 2,
    previous: "3.8% YoY",
    forecast: "4.1% YoY",
    offsetDays: 12,
    description: "Factory gate and mining cost metric measuring upstream inflationary pressure."
  },
  {
    id: "ke-cbk",
    country: "Kenya",
    flag: "🇰🇪",
    time: "15:00 EAT",
    timezone: "EAT",
    eventTitle: "Central Bank of Kenya (CBK) Rate Decision",
    type: "interest",
    typeLabel: "Interest Rate Decision",
    impact: "high",
    impactDots: 3,
    previous: "12.75%",
    forecast: "12.50%",
    offsetDays: 14,
    description: "Monetary Policy Committee meeting under Governor Kamau Thugge analyzing shilling stability and interbank liquidity."
  },
  {
    id: "ng-dangcem",
    country: "Nigeria",
    flag: "🇳🇬",
    time: "13:00 WAT",
    timezone: "WAT",
    eventTitle: "Dangote Cement PLC — Quarterly Financials",
    type: "earnings",
    typeLabel: "Corporate Earnings",
    impact: "medium",
    impactDots: 2,
    previous: "EPS: ₦ 18.20",
    forecast: "Est: ₦ 21.50",
    offsetDays: 16,
    description: "Sub-Saharan Africa's largest industrial manufacturer reporting pan-African clinker shipments and FX impact."
  },
  {
    id: "ci-cocoa",
    country: "Ivory Coast",
    flag: "🇨🇮",
    time: "11:00 GMT",
    timezone: "GMT",
    eventTitle: "Le Conseil du Café-Cacao — Harvest Output & Export Quota",
    type: "gdp",
    typeLabel: "Commodity & Macro",
    impact: "medium",
    impactDots: 2,
    previous: "1.75M Tonnes",
    forecast: "1.82M Tonnes",
    offsetDays: 18,
    description: "Official West African cocoa yield and farmgate pricing report, moving international ICE commodity futures."
  },
  {
    id: "ma-bam",
    country: "Morocco",
    flag: "🇲🇦",
    time: "15:30 WET",
    timezone: "WET",
    eventTitle: "Bank Al-Maghrib Key Interest Rate Decision",
    type: "interest",
    typeLabel: "Interest Rate Decision",
    impact: "high",
    impactDots: 3,
    previous: "2.75%",
    forecast: "2.75%",
    offsetDays: 21,
    description: "Central bank quarterly board meeting assessing euro-area demand, cereal harvests, and dirham liquidity."
  },
  {
    id: "ke-safaricom",
    country: "Kenya",
    flag: "🇰🇪",
    time: "09:30 EAT",
    timezone: "EAT",
    eventTitle: "Safaricom PLC — H1 Financials & M-Pesa Metrics",
    type: "earnings",
    typeLabel: "Corporate Earnings",
    impact: "medium",
    impactDots: 2,
    previous: "EPS: KES 1.45",
    forecast: "Est: KES 1.62",
    offsetDays: 24,
    description: "Key earnings call highlighting Ethiopian subscriber growth, 5G capital expenditure, and M-Pesa remittance volumes."
  }
];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Generates dynamic rolling calendar events starting from today
export function getDynamicCalendarEvents(options = {}) {
  const now = new Date();
  const { impact, type, limit = 12 } = options;

  let computedEvents = eventTemplates.map((tpl, index) => {
    // Generate dynamic date relative to current time
    const eventDate = new Date(now.getTime() + tpl.offsetDays * 24 * 60 * 60 * 1000);
    const dayNum = String(eventDate.getDate()).padStart(2, '0');
    const monthAbbr = monthNames[eventDate.getMonth()];
    const fullMonth = fullMonthNames[eventDate.getMonth()];
    const dayName = dayNames[eventDate.getDay()];
    const year = eventDate.getFullYear();

    const isToday = eventDate.toDateString() === now.toDateString();
    const isPast = eventDate < now && !isToday;

    return {
      id: `${tpl.id}-${year}-${eventDate.getMonth() + 1}`,
      rawId: tpl.id,
      day: dayNum,
      month: monthAbbr,
      fullMonth,
      year,
      dayOfWeek: dayName,
      formattedDate: `${dayName}, ${tpl.time}`,
      time: `${dayName}, ${tpl.time}`,
      country: tpl.country,
      flag: tpl.flag,
      eventTitle: tpl.eventTitle,
      type: tpl.type,
      typeLabel: tpl.typeLabel,
      impact: tpl.impact,
      impactDots: tpl.impactDots,
      previous: tpl.previous,
      forecast: tpl.forecast,
      description: tpl.description,
      status: isToday ? 'today' : (isPast ? 'completed' : 'upcoming'),
      fullTimestamp: eventDate.toISOString()
    };
  });

  // Sort by date ascending
  computedEvents.sort((a, b) => new Date(a.fullTimestamp) - new Date(b.fullTimestamp));

  // Apply filters if provided
  if (impact && impact !== 'all') {
    computedEvents = computedEvents.filter(e => e.impact === impact);
  }
  if (type && type !== 'all') {
    if (type === 'earnings') {
      computedEvents = computedEvents.filter(e => e.type === 'earnings');
    } else {
      computedEvents = computedEvents.filter(e => e.type === type);
    }
  }

  const resultEvents = computedEvents.slice(0, limit);

  // Compute stats
  const allEvents = eventTemplates;
  const highImpactCount = allEvents.filter(e => e.impact === 'high').length;
  const rateDecisionsCount = allEvents.filter(e => e.type === 'interest').length;
  const earningsCount = allEvents.filter(e => e.type === 'earnings').length;
  const countries = new Set(allEvents.map(e => e.country));

  const stats = {
    highImpactCount,
    rateDecisionsCount,
    earningsCount,
    countriesCount: countries.size,
    totalEvents: allEvents.length
  };

  return {
    events: resultEvents,
    stats,
    timestamp: now.toISOString()
  };
}

// Expert commentary catalog for currency pairs
const fxExpertNotes = {
  'USD/NGN': {
    take: "The Naira is finding steady support in the interbank window following CBN's continuous FX interventions and clear policy signaling. Exporters and diaspora remittance inflows have bolstered autonomous market liquidity. Traders are monitoring the upcoming MPC rate decision for further yield cues.",
    support: "₦1,570.00",
    resistance: "₦1,610.00"
  },
  'USD/ZAR': {
    take: "The South African Rand remains buoyed by strong foreign equity inflows and positive structural sentiment under the Government of National Unity (GNU). Lower headline inflation trajectory supports local sovereign debt appetite against dollar strength.",
    support: "R 17.95",
    resistance: "R 18.40"
  },
  'USD/KES': {
    take: "The Kenyan Shilling continues its resilient consolidation against major currencies. Strong tea and horticulture export earnings, coupled with robust diaspora remittances surpassing $400M monthly, provide solid reserve buffers for the CBK.",
    support: "KES 127.50",
    resistance: "KES 130.00"
  },
  'USD/EGP': {
    take: "The Egyptian Pound trades stably post-devaluation, supported by expanded IMF program tranches and Gulf sovereign direct investment inflows. Central Bank reserves remain at record highs near $46.5 billion.",
    support: "EGP 48.20",
    resistance: "EGP 49.10"
  },
  'USD/GHS': {
    take: "The Ghanaian Cedi is stabilizing following debt restructuring milestones and cocoa prepayment facility disbursements. Bank of Ghana's domestic gold-for-oil program continues to curb excessive dollar demand.",
    support: "GH₵ 15.10",
    resistance: "GH₵ 15.65"
  },
  'USD/TZS': {
    take: "The Tanzanian Shilling is trading with low volatility supported by mining export receipts (gold) and tourism earnings through Dar es Salaam and Zanzibar ports.",
    support: "TZS 2,560.00",
    resistance: "TZS 2,610.00"
  },
  'USD/UGX': {
    take: "The Ugandan Shilling exhibits firm backing from coffee export windfalls and steady oil-corridor FDI capital inflows into the Lake Albert development basin.",
    support: "UGX 3,690.00",
    resistance: "UGX 3,745.00"
  },
  'USD/MAD': {
    take: "The Moroccan Dirham is holding firm within Bank Al-Maghrib's currency fluctuation band, underpinned by surging automotive manufacturing exports and tourism revenues.",
    support: "MAD 9.85",
    resistance: "MAD 10.05"
  }
};

// Generates dynamic Morning Call and Currency Corner summaries based on live snapshot
export function getLiveMorningCallAndCurrency() {
  const snapshot = getLiveMarketSnapshot();
  const now = new Date();

  // Format today's date for the desk author
  const day = now.getDate();
  const month = fullMonthNames[now.getMonth()];
  const year = now.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  // Analyze market mood from indices
  const ngx = snapshot.indices['NGX'] || snapshot.indices['NGX:ASI'] || { change_pct: 0.67 };
  const jse = snapshot.indices['JSE'] || snapshot.indices['JSE:ALSI'] || snapshot.indices['JSE:TOP40'] || { change_pct: 0.49 };
  const egx = snapshot.indices['EGX'] || snapshot.indices['EGX:30'] || { change_pct: 0.54 };
  const brent = snapshot.commodities['brent'] || { price: 84.62, change_pct: 1.24 };
  const gold = snapshot.commodities['gold'] || { price: 2487.30, change_pct: 0.72 };
  const usdNgn = snapshot.fx['USD/NGN'] || { rate: 1580.00, change_pct: 0.16 };
  const usdZar = snapshot.fx['USD/ZAR'] || { rate: 18.25, change_pct: -0.35 };

  const ngxDirection = ngx.change_pct >= 0 ? `is up ${ngx.change_pct > 0 ? '+' : ''}${ngx.change_pct}%` : `eased ${ngx.change_pct}%`;
  const jseDirection = jse.change_pct >= 0 ? `up ${jse.change_pct > 0 ? '+' : ''}${jse.change_pct}%` : `down ${jse.change_pct}%`;
  const brentText = brent.change_pct >= 0 ? `climbed ${brent.change_pct}% to $${brent.price}/bbl` : `softened to $${brent.price}/bbl`;

  const morningCallText = `Markets opened with dynamic activity across Africa this morning. The NGX ${ngxDirection} and the JSE gained ${jseDirection}, buoyed by robust corporate earnings and resilient foreign portfolio inflows. Brent crude ${brentText}, providing strong underlying momentum for regional energy producers. Currency pairs are trading with steady liquidity as investors position ahead of pivotal central bank interest rate decisions across key commercial hubs.`;

  // Build Currency Corner data for all major pairs
  const currencyPairsList = Object.entries(fxExpertNotes).map(([pair, info]) => {
    const liveRateObj = snapshot.fx[pair] || liveFXRates[pair] || { rate: 1580, change_pct: 0.16 };
    const curSymbol = pair.startsWith('USD/NGN') ? '₦' : (pair.startsWith('USD/ZAR') ? 'R' : (pair.startsWith('USD/KES') ? 'KES' : (pair.startsWith('USD/EGP') ? 'EGP' : (pair.startsWith('USD/GHS') ? 'GH₵' : ''))));
    
    return {
      pair,
      symbol: curSymbol,
      rate: liveRateObj.rate,
      changePercent: liveRateObj.change_pct !== undefined ? liveRateObj.change_pct : liveRateObj.changePercent || 0.16,
      change_pct: liveRateObj.change_pct !== undefined ? liveRateObj.change_pct : liveRateObj.changePercent || 0.16,
      formattedRate: `${curSymbol ? curSymbol + ' ' : ''}${Number(liveRateObj.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      expertTake: info.take,
      support: info.support,
      resistance: info.resistance,
      lastUpdated: now.toISOString()
    };
  });

  const defaultPair = currencyPairsList[0]; // USD/NGN

  return {
    morningCall: {
      title: "The Morning Call",
      text: morningCallText,
      author: `— NewsHub Africa Markets Desk, ${formattedDate}`,
      date: formattedDate,
      timestamp: now.toISOString()
    },
    currencyCorner: {
      activePair: defaultPair,
      pairs: currencyPairsList,
      timestamp: now.toISOString()
    }
  };
}
