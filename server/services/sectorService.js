// Dynamic Pan-African Sector Intelligence & Real-Time Analytics Engine
// NewsHub Africa Financial Markets Intelligence Desk

import { getLiveMarketSnapshot } from '../data/marketData.js';
import { articlesStore } from '../data/newsData.js';

// Base sector configuration
const BASE_SECTOR_CONFIG = {
  banking: {
    key: 'banking',
    name: 'African Banking',
    icon: '🏦',
    badgeClass: 'banking',
    sub: '15 major banks across 8 exchanges',
    baseIndex: 1284.50,
    mktCapNum: 84.2, // in Billion USD
    mktCap: '$84.2B',
    volume: '24.5B',
    desc: "Comprehensive coverage of Africa's banking sector, spanning tier-1 lenders across Nigeria, South Africa, Kenya, Egypt, Morocco, Ghana, and Tanzania.",
    overview: "Africa's banking sector continues to demonstrate solid capital buffers, with tier-1 lenders posting double-digit ROE across major bourses. Nigerian and Kenyan banks lead in digital transaction penetration and mobile banking margins, while South African majors maintain the continent's deepest corporate credit and capital market access. North African lenders benefit from stable net interest margins.",
    benchmarkWeight: 0.32,
    baseReturns: { d: 1.42, w: 2.18, m: 5.64, ytd: 18.40 },
    metrics: { stocks: 24, exchanges: 8, avgPE: 8.4, avgYield: 5.8, avgROE: 18.2, avgNPL: 4.1 },
    constituents: [
      { ticker: 'GTCO', name: 'GTBank (Guaranty Trust)', exchange: 'NGX', country: 'NG', basePrice: 48.75, mktCap: '₦1.44T', pe: 4.2, yield: 8.5, pb: 0.9, evEbitda: 2.1, roe: 22.4, npl: 3.8, car: 24.5, vs52w: -12, logo: 'G', logoBg: 'linear-gradient(135deg,#c53030,#e53e3e)' },
      { ticker: 'ZENITHBANK', name: 'Zenith Bank', exchange: 'NGX', country: 'NG', basePrice: 42.10, mktCap: '₦1.32T', pe: 3.8, yield: 9.2, pb: 0.8, evEbitda: 1.9, roe: 24.1, npl: 3.2, car: 26.8, vs52w: -8, logo: 'Z', logoBg: 'linear-gradient(135deg,#2b6cb0,#3182ce)' },
      { ticker: 'FSR', name: 'FirstRand Limited', exchange: 'JSE', country: 'ZA', basePrice: 72.35, mktCap: 'R402B', pe: 11.2, yield: 4.8, pb: 1.8, evEbitda: 8.5, roe: 16.8, npl: 3.5, car: 18.2, vs52w: 5, logo: 'F', logoBg: 'linear-gradient(135deg,#1a365d,#2b6cb0)' },
      { ticker: 'SBK', name: 'Standard Bank Group', exchange: 'JSE', country: 'ZA', basePrice: 185.20, mktCap: 'R298B', pe: 10.8, yield: 5.2, pb: 1.6, evEbitda: 7.2, roe: 15.4, npl: 3.9, car: 17.5, vs52w: 8, logo: 'S', logoBg: 'linear-gradient(135deg,#2d3748,#4a5568)' },
      { ticker: 'EQTY', name: 'Equity Group Holdings', exchange: 'NSE', country: 'KE', basePrice: 52.00, mktCap: 'KES196B', pe: 6.5, yield: 6.8, pb: 1.2, evEbitda: 4.1, roe: 19.2, npl: 7.8, car: 19.5, vs52w: -15, logo: 'E', logoBg: 'linear-gradient(135deg,#c05621,#dd6b20)' },
      { ticker: 'KCB', name: 'KCB Group', exchange: 'NSE', country: 'KE', basePrice: 38.20, mktCap: 'KES122B', pe: 5.2, yield: 7.5, pb: 1.0, evEbitda: 3.5, roe: 20.1, npl: 8.2, car: 20.8, vs52w: -22, logo: 'K', logoBg: 'linear-gradient(135deg,#276749,#38a169)' },
      { ticker: 'COMI', name: 'Commercial Int. Bank', exchange: 'EGX', country: 'EG', basePrice: 72.30, mktCap: 'EGP412B', pe: 7.8, yield: 5.5, pb: 1.4, evEbitda: 5.2, roe: 18.5, npl: 2.8, car: 22.1, vs52w: 12, logo: 'C', logoBg: 'linear-gradient(135deg,#2c5282,#4299e1)' },
      { ticker: 'ATW', name: 'Attijariwafa Bank', exchange: 'Casablanca', country: 'MA', basePrice: 385.00, mktCap: 'MAD96B', pe: 12.5, yield: 4.2, pb: 2.1, evEbitda: 9.8, roe: 14.2, npl: 4.1, car: 16.5, vs52w: 3, logo: 'A', logoBg: 'linear-gradient(135deg,#744210,#975a16)' },
      { ticker: 'ETIT', name: 'Ecobank Transnational', exchange: 'BRVM', country: 'GH', basePrice: 5850.00, mktCap: 'CFA1.2T', pe: 5.5, yield: 6.2, pb: 0.9, evEbitda: 3.8, roe: 17.8, npl: 5.5, car: 21.2, vs52w: -5, logo: 'E', logoBg: 'linear-gradient(135deg,#276749,#38a169)' },
      { ticker: 'NMB', name: 'NMB Bank', exchange: 'DSE', country: 'TZ', basePrice: 4120.00, mktCap: 'TZS1.1T', pe: 8.2, yield: 4.8, pb: 1.3, evEbitda: 5.5, roe: 16.5, npl: 4.2, car: 19.8, vs52w: 18, logo: 'N', logoBg: 'linear-gradient(135deg,#2b6cb0,#4299e1)' },
      { ticker: 'SBU', name: 'Stanbic Uganda', exchange: 'USE', country: 'UG', basePrice: 32.50, mktCap: 'UGX125B', pe: 6.8, yield: 7.1, pb: 1.1, evEbitda: 4.0, roe: 19.5, npl: 3.4, car: 22.0, vs52w: 10, logo: 'S', logoBg: 'linear-gradient(135deg,#1a365d,#3182ce)' },
      { ticker: 'MCB', name: 'MCB Group', exchange: 'SEM', country: 'MU', basePrice: 285.00, mktCap: 'MUR42B', pe: 9.1, yield: 5.1, pb: 1.5, evEbitda: 6.4, roe: 17.2, npl: 3.1, car: 19.2, vs52w: 14, logo: 'M', logoBg: 'linear-gradient(135deg,#2f855a,#38a169)' }
    ]
  },

  telecom: {
    key: 'telecom',
    name: 'African Telecom',
    icon: '📡',
    badgeClass: 'telecom',
    sub: 'MTN, Airtel, Safaricom + 6 others',
    baseIndex: 2845.20,
    mktCapNum: 62.8,
    mktCap: '$62.8B',
    volume: '18.2B',
    desc: "From mobile money and fintech ecosystems to 5G rollout, track the continent's telecommunications powerhouses across Sub-Saharan and North Africa.",
    overview: "Africa's telecom sector is the operational backbone of the continent's booming digital economy. Fintech arms such as M-PESA, MoMo, and Airtel Money process over $1 trillion in annual transaction volume. Operators continue to monetize high-speed broadband expansion and sovereign data centre infrastructure.",
    benchmarkWeight: 0.24,
    baseReturns: { d: 0.89, w: 1.45, m: 3.82, ytd: 12.30 },
    metrics: { stocks: 18, exchanges: 10, avgPE: 14.2, avgYield: 4.2, avgROE: 22.5, avgNPL: 0 },
    constituents: [
      { ticker: 'MTN', name: 'MTN Group', exchange: 'JSE', country: 'ZA', basePrice: 185.40, mktCap: 'R348B', pe: 14.5, yield: 4.8, pb: 3.2, evEbitda: 8.5, roe: 24.2, npl: 0, car: 0, vs52w: 15, logo: 'M', logoBg: 'linear-gradient(135deg,#ffcc00,#ff9500)' },
      { ticker: 'SCOM', name: 'Safaricom PLC', exchange: 'NSE', country: 'KE', basePrice: 38.75, mktCap: 'KES1.55T', pe: 16.2, yield: 3.5, pb: 4.1, evEbitda: 10.2, roe: 26.5, npl: 0, car: 0, vs52w: -5, logo: 'S', logoBg: 'linear-gradient(135deg,#38a169,#2f855a)' },
      { ticker: 'AAF', name: 'Airtel Africa', exchange: 'NGX', country: 'NG', basePrice: 2150.00, mktCap: '₦8.1T', pe: 12.8, yield: 3.2, pb: 2.8, evEbitda: 7.5, roe: 21.8, npl: 0, car: 0, vs52w: -18, logo: 'A', logoBg: 'linear-gradient(135deg,#e53e3e,#c53030)' },
      { ticker: 'ETEL', name: 'Telecom Egypt', exchange: 'EGX', country: 'EG', basePrice: 38.50, mktCap: 'EGP68B', pe: 10.5, yield: 5.2, pb: 2.1, evEbitda: 5.8, roe: 18.4, npl: 0, car: 0, vs52w: 8, logo: 'T', logoBg: 'linear-gradient(135deg,#2b6cb0,#63b3ed)' },
      { ticker: 'IAM', name: 'Maroc Telecom', exchange: 'Casablanca', country: 'MA', basePrice: 142.60, mktCap: 'MAD125B', pe: 15.8, yield: 4.5, pb: 3.5, evEbitda: 9.2, roe: 20.1, npl: 0, car: 0, vs52w: -2, logo: 'M', logoBg: 'linear-gradient(135deg,#2c5282,#3182ce)' },
      { ticker: 'MTC', name: 'MTC Namibia', exchange: 'NSX', country: 'NA', basePrice: 8.40, mktCap: 'NAD16.8B', pe: 13.2, yield: 5.5, pb: 2.8, evEbitda: 7.1, roe: 19.5, npl: 0, car: 0, vs52w: 12, logo: 'M', logoBg: 'linear-gradient(135deg,#ffcc00,#ff9500)' },
      { ticker: 'SNTS', name: 'Sonatel', exchange: 'BRVM', country: 'SN', basePrice: 16200.00, mktCap: 'CFA3.2T', pe: 11.5, yield: 6.8, pb: 2.4, evEbitda: 6.2, roe: 22.1, npl: 0, car: 0, vs52w: 5, logo: 'S', logoBg: 'linear-gradient(135deg,#2c5282,#4299e1)' },
      { ticker: 'ECONET', name: 'Econet Wireless', exchange: 'ZSE', country: 'ZW', basePrice: 485.50, mktCap: 'ZiG52B', pe: 8.5, yield: 2.5, pb: 1.8, evEbitda: 4.5, roe: 16.2, npl: 0, car: 0, vs52w: -35, logo: 'E', logoBg: 'linear-gradient(135deg,#c53030,#e53e3e)' }
    ]
  },

  mining: {
    key: 'mining',
    name: 'African Mining',
    icon: '⛏️',
    badgeClass: 'mining',
    sub: 'Anglo American, Gold Fields + 12 others',
    baseIndex: 4521.80,
    mktCapNum: 128.5,
    mktCap: '$128.5B',
    volume: '31.8B',
    desc: "Track the extractive and critical minerals champions driving Africa's export revenues, from PGMs and gold to copper, cobalt, and lithium.",
    overview: "African mining equities are heavily supported by record high gold spot prices and surging green transition demand for copper, cobalt, and battery-grade lithium. Infrastructure logistics and operational cost optimizations continue to safeguard profit margins across Southern, West, and Central African mining basins.",
    benchmarkWeight: 0.28,
    baseReturns: { d: -0.64, w: -1.82, m: -3.45, ytd: 3.20 },
    metrics: { stocks: 22, exchanges: 7, avgPE: 11.8, avgYield: 6.2, avgROE: 14.5, avgNPL: 0 },
    constituents: [
      { ticker: 'AGL', name: 'Anglo American', exchange: 'JSE', country: 'ZA', basePrice: 620.50, mktCap: 'R832B', pe: 12.5, yield: 5.8, pb: 1.8, evEbitda: 6.2, roe: 15.2, npl: 0, car: 0, vs52w: -8, logo: 'A', logoBg: 'linear-gradient(135deg,#2d3748,#4a5568)' },
      { ticker: 'SSW', name: 'Sibanye-Stillwater', exchange: 'JSE', country: 'ZA', basePrice: 18.45, mktCap: 'R52B', pe: 8.2, yield: 8.5, pb: 0.9, evEbitda: 4.1, roe: 11.5, npl: 0, car: 0, vs52w: -25, logo: 'S', logoBg: 'linear-gradient(135deg,#1a365d,#2c5282)' },
      { ticker: 'GFI', name: 'Gold Fields', exchange: 'JSE', country: 'ZA', basePrice: 285.20, mktCap: 'R248B', pe: 14.2, yield: 3.2, pb: 2.5, evEbitda: 7.8, roe: 18.5, npl: 0, car: 0, vs52w: 22, logo: 'G', logoBg: 'linear-gradient(135deg,#b7791f,#d69e2e)' },
      { ticker: 'IMP', name: 'Impala Platinum', exchange: 'JSE', country: 'ZA', basePrice: 62.30, mktCap: 'R48B', pe: 6.5, yield: 9.2, pb: 0.7, evEbitda: 3.2, roe: 10.2, npl: 0, car: 0, vs52w: -35, logo: 'I', logoBg: 'linear-gradient(135deg,#4a5568,#718096)' },
      { ticker: 'NPH', name: 'Northam Platinum', exchange: 'JSE', country: 'ZA', basePrice: 95.80, mktCap: 'R38B', pe: 7.8, yield: 7.5, pb: 0.8, evEbitda: 3.8, roe: 10.8, npl: 0, car: 0, vs52w: -18, logo: 'N', logoBg: 'linear-gradient(135deg,#2d3748,#4a5568)' },
      { ticker: 'EDV', name: 'Endeavour Mining', exchange: 'LSE', country: 'BF', basePrice: 22.40, mktCap: 'GBP5.5B', pe: 10.2, yield: 2.8, pb: 1.5, evEbitda: 4.5, roe: 16.8, npl: 0, car: 0, vs52w: 18, logo: 'E', logoBg: 'linear-gradient(135deg,#975a16,#d69e2e)' },
      { ticker: 'Zijin', name: 'Zijin Mining DRC', exchange: 'HKEX', country: 'CD', basePrice: 18.85, mktCap: 'HKD485B', pe: 15.8, yield: 3.5, pb: 3.2, evEbitda: 8.5, roe: 22.1, npl: 0, car: 0, vs52w: 35, logo: 'Z', logoBg: 'linear-gradient(135deg,#c53030,#e53e3e)' }
    ]
  },

  energy: {
    key: 'energy',
    name: 'African Energy',
    icon: '⚡',
    badgeClass: 'energy',
    sub: 'Sasol, Seplat, TotalEnergies + 10 others',
    baseIndex: 3128.40,
    mktCapNum: 45.2,
    mktCap: '$45.2B',
    volume: '14.6B',
    desc: 'From integrated oil & gas producers to utility-scale solar and geothermal pioneers, track the energy transition across Africa.',
    overview: "Africa's energy landscape is reshaping rapidly. Nigeria's Dangote mega-refinery has begun domestic fuel self-sufficiency, reducing continental import friction, while Seplat expands upstream output. East Africa accelerates geothermal power in the Rift Valley and gas-to-power LNG hubs.",
    benchmarkWeight: 0.16,
    baseReturns: { d: 0.92, w: 1.65, m: 4.20, ytd: 8.50 },
    metrics: { stocks: 16, exchanges: 6, avgPE: 9.5, avgYield: 7.2, avgROE: 16.8, avgNPL: 0 },
    constituents: [
      { ticker: 'SOL', name: 'Sasol Limited', exchange: 'JSE', country: 'ZA', basePrice: 425.80, mktCap: 'R268B', pe: 8.5, yield: 6.8, pb: 1.2, evEbitda: 4.8, roe: 14.2, npl: 0, car: 0, vs52w: 12, logo: 'S', logoBg: 'linear-gradient(135deg,#2b6cb0,#4299e1)' },
      { ticker: 'SEPLAT', name: 'Seplat Energy', exchange: 'NGX', country: 'NG', basePrice: 2850.00, mktCap: '₦1.67T', pe: 6.2, yield: 9.5, pb: 1.0, evEbitda: 3.2, roe: 18.5, npl: 0, car: 0, vs52w: 8, logo: 'S', logoBg: 'linear-gradient(135deg,#744210,#975a16)' },
      { ticker: 'EC', name: 'TotalEnergies EP', exchange: 'BRVM', country: 'CI', basePrice: 42500.00, mktCap: 'CFA8.5T', pe: 11.2, yield: 5.2, pb: 1.8, evEbitda: 5.5, roe: 16.5, npl: 0, car: 0, vs52w: 15, logo: 'T', logoBg: 'linear-gradient(135deg,#c53030,#e53e3e)' },
      { ticker: 'ENOG', name: 'Energean (North Africa)', exchange: 'LSE', country: 'MA', basePrice: 12.85, mktCap: 'GBP2.3B', pe: 7.8, yield: 4.5, pb: 1.4, evEbitda: 4.2, roe: 19.2, npl: 0, car: 0, vs52w: 25, logo: 'E', logoBg: 'linear-gradient(135deg,#2c5282,#4299e1)' },
      { ticker: 'AOI', name: 'Africa Oil Corp', exchange: 'TSX', country: 'KE', basePrice: 2.45, mktCap: 'USD145M', pe: 0, yield: 0, pb: 0.8, evEbitda: 2.1, roe: -5.2, npl: 0, car: 0, vs52w: -45, logo: 'A', logoBg: 'linear-gradient(135deg,#276749,#38a169)' },
      { ticker: 'KIBO', name: 'Kibo Energy', exchange: 'AIM', country: 'TZ', basePrice: 0.45, mktCap: 'GBP18M', pe: 0, yield: 0, pb: 1.5, evEbitda: 0, roe: -12.5, npl: 0, car: 0, vs52w: -60, logo: 'K', logoBg: 'linear-gradient(135deg,#975a16,#d69e2e)' }
    ]
  },

  cement: {
    key: 'cement',
    name: 'African Cement',
    icon: '🏗️',
    badgeClass: 'cement',
    sub: 'Dangote, BUA, Lafarge + 8 others',
    baseIndex: 2156.30,
    mktCapNum: 28.5,
    mktCap: '$28.5B',
    volume: '9.4B',
    desc: 'Continental infrastructure, housing urbanization, and public works drive strong earnings for Africa’s leading industrial cement giants.',
    overview: "Pan-African cement capacity continues to expand to meet continental urbanization and intra-AfCFTA infrastructure projects. Sub-Saharan producers benefit from high local pricing power and integrated captive power generation, while North African producers expand export trade corridors.",
    benchmarkWeight: 0.12,
    baseReturns: { d: 1.85, w: 3.20, m: 7.50, ytd: 22.40 },
    metrics: { stocks: 12, exchanges: 7, avgPE: 10.2, avgYield: 6.8, avgROE: 15.2, avgNPL: 0 },
    constituents: [
      { ticker: 'DANGCEM', name: 'Dangote Cement', exchange: 'NGX', country: 'NG', basePrice: 450.20, mktCap: '₦7.66T', pe: 10.5, yield: 6.2, pb: 3.8, evEbitda: 8.2, roe: 38.5, npl: 0, car: 0, vs52w: 18, logo: 'D', logoBg: 'linear-gradient(135deg,#3182ce,#2b6cb0)' },
      { ticker: 'WAPCO', name: 'Lafarge Africa', exchange: 'NGX', country: 'NG', basePrice: 32.80, mktCap: '₦528B', pe: 8.2, yield: 7.5, pb: 2.1, evEbitda: 5.8, roe: 28.2, npl: 0, car: 0, vs52w: 12, logo: 'L', logoBg: 'linear-gradient(135deg,#c53030,#e53e3e)' },
      { ticker: 'BUACEMENT', name: 'BUA Cement', exchange: 'NGX', country: 'NG', basePrice: 95.20, mktCap: '₦3.22T', pe: 12.5, yield: 4.8, pb: 4.2, evEbitda: 9.5, roe: 35.8, npl: 0, car: 0, vs52w: 25, logo: 'B', logoBg: 'linear-gradient(135deg,#2f855a,#38a169)' },
      { ticker: 'LHM', name: 'LafargeHolcim Maroc', exchange: 'Casablanca', country: 'MA', basePrice: 1420.00, mktCap: 'MAD42B', pe: 11.8, yield: 5.5, pb: 2.8, evEbitda: 7.2, roe: 24.5, npl: 0, car: 0, vs52w: 8, logo: 'L', logoBg: 'linear-gradient(135deg,#744210,#975a16)' },
      { ticker: 'SCEM', name: 'Suez Cement', exchange: 'EGX', country: 'EG', basePrice: 12.45, mktCap: 'EGP8.5B', pe: 7.5, yield: 8.2, pb: 1.2, evEbitda: 4.5, roe: 16.8, npl: 0, car: 0, vs52w: -15, logo: 'S', logoBg: 'linear-gradient(135deg,#2c5282,#4299e1)' },
      { ticker: 'PPC', name: 'PPC Ltd', exchange: 'JSE', country: 'ZA', basePrice: 3.85, mktCap: 'R6.2B', pe: 5.2, yield: 0, pb: 0.6, evEbitda: 2.8, roe: 12.5, npl: 0, car: 0, vs52w: 35, logo: 'P', logoBg: 'linear-gradient(135deg,#2d3748,#4a5568)' }
    ]
  },

  tech: {
    key: 'tech',
    name: 'African Technology',
    icon: '💻',
    badgeClass: 'tech',
    sub: 'Naspers, Prosus, Jumia + 10 others',
    baseIndex: 1845.60,
    mktCapNum: 18.5,
    mktCap: '$18.5B',
    volume: '11.8B',
    desc: 'From venture-backed fintech disruptors to consumer internet and global software services, track African digital scale-ups.',
    overview: "Africa's tech ecosystem is entering an institutional maturation phase. Global cross-border payments, merchant acquiring, AI localized tooling, and logistics networks continue to command premium revenue multiples.",
    benchmarkWeight: 0.10,
    baseReturns: { d: 1.24, w: 2.85, m: 6.40, ytd: 15.80 },
    metrics: { stocks: 14, exchanges: 6, avgPE: 28.5, avgYield: 0.8, avgROE: 12.5, avgNPL: 0 },
    constituents: [
      { ticker: 'NPN', name: 'Naspers Limited', exchange: 'JSE', country: 'ZA', basePrice: 3245.00, mktCap: 'R1.4T', pe: 35.2, yield: 0.4, pb: 4.5, evEbitda: 18.5, roe: 8.2, npl: 0, car: 0, vs52w: 22, logo: 'N', logoBg: 'linear-gradient(135deg,#1a365d,#2c5282)' },
      { ticker: 'PRX', name: 'Prosus', exchange: 'JSE', country: 'ZA', basePrice: 1425.80, mktCap: 'R620B', pe: 32.5, yield: 0.3, pb: 3.8, evEbitda: 16.2, roe: 7.8, npl: 0, car: 0, vs52w: 28, logo: 'P', logoBg: 'linear-gradient(135deg,#2b6cb0,#4299e1)' },
      { ticker: 'SWVL', name: 'Swvl Holdings', exchange: 'NASDAQ', country: 'EG', basePrice: 4.25, mktCap: 'USD85M', pe: 0, yield: 0, pb: 2.5, evEbitda: -8.5, roe: -45.2, npl: 0, car: 0, vs52w: -65, logo: 'S', logoBg: 'linear-gradient(135deg,#c53030,#e53e3e)' },
      { ticker: 'JMIA', name: 'Jumia Technologies', exchange: 'NYSE', country: 'NG', basePrice: 8.45, mktCap: 'USD850M', pe: 0, yield: 0, pb: 4.2, evEbitda: -12.5, roe: -68.5, npl: 0, car: 0, vs52w: -40, logo: 'J', logoBg: 'linear-gradient(135deg,#975a16,#d69e2e)' },
      { ticker: 'FLUT', name: 'Flutterwave (Private Index)', exchange: 'Private', country: 'NG', basePrice: 124.50, mktCap: 'USD3.2B', pe: 0, yield: 0, pb: 0, evEbitda: 0, roe: 0, npl: 0, car: 0, vs52w: 0, logo: 'F', logoBg: 'linear-gradient(135deg,#3182ce,#63b3ed)' },
      { ticker: 'ANDE', name: 'Andela (Private Index)', exchange: 'Private', country: 'NG', basePrice: 85.00, mktCap: 'USD1.5B', pe: 0, yield: 0, pb: 0, evEbitda: 0, roe: 0, npl: 0, car: 0, vs52w: 0, logo: 'A', logoBg: 'linear-gradient(135deg,#2f855a,#38a169)' }
    ]
  }
};

// Generates smooth SVG sparkline path
function generateSectorSparkline(isUp, width = 300, height = 60, seed = 1) {
  const points = [];
  const segments = 16;
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width;
    const progress = i / segments;
    const baseY = isUp
      ? (height * 0.8) - progress * (height * 0.55)
      : (height * 0.25) + progress * (height * 0.55);
    const noise = Math.sin(i * 1.2 + seed) * (height * 0.12) + Math.cos(i * 0.8) * 3;
    const y = Math.max(8, Math.min(height - 8, baseY + noise));
    points.push((i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1));
  }
  const lineD = points.join(' ');
  const areaD = lineD + ` L${width},${height} L0,${height} Z`;
  return { lineD, areaD };
}

// Generate time-series data for the big interactive chart
function generateSectorTimeSeries(sectorKey, timeframe = '1M', baseIndex = 1200, currentReturn = 1.4) {
  let dataPointsCount = 30;
  let labelFormat = 'day';

  switch (timeframe) {
    case '1M': dataPointsCount = 30; labelFormat = 'day'; break;
    case '3M': dataPointsCount = 60; labelFormat = 'week'; break;
    case '6M': dataPointsCount = 90; labelFormat = 'month'; break;
    case '1Y': dataPointsCount = 120; labelFormat = 'month'; break;
    case 'YTD': dataPointsCount = 45; labelFormat = 'day'; break;
    default: dataPointsCount = 30;
  }

  const isUp = currentReturn >= 0;
  const points = [];
  const now = new Date();
  const startTimestamp = now.getTime() - dataPointsCount * 24 * 60 * 60 * 1000;

  const startValue = baseIndex * (1 - (currentReturn / 100) * (timeframe === '1Y' ? 4 : (timeframe === '6M' ? 2.5 : 1)));
  const seed = sectorKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  for (let i = 0; i < dataPointsCount; i++) {
    const frac = i / (dataPointsCount - 1);
    const pointTime = new Date(startTimestamp + i * 24 * 60 * 60 * 1000);
    const trendComponent = startValue + (baseIndex - startValue) * frac;
    const wave = Math.sin(i * 0.6 + seed) * (baseIndex * 0.015) + Math.cos(i * 1.3) * (baseIndex * 0.008);
    const val = +(trendComponent + wave).toFixed(2);

    let dateLabel = pointTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    if (labelFormat === 'month') {
      dateLabel = pointTime.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
    }

    points.push({
      index: i,
      date: dateLabel,
      timestamp: pointTime.toISOString(),
      value: val
    });
  }

  // Ensure last point matches live current value
  if (points.length > 0) {
    points[points.length - 1].value = baseIndex;
  }

  return points;
}

// Compute live sector data synchronized with live market equities
export function getLiveSectorsData() {
  const marketSnapshot = getLiveMarketSnapshot();
  const equitiesMap = new Map();
  if (marketSnapshot && marketSnapshot.equities) {
    marketSnapshot.equities.forEach(eq => {
      equitiesMap.set(eq.ticker, eq);
    });
  }

  const allShareBenchmarkChange = marketSnapshot?.sentiment?.avgChange || 0.49;
  const sectorsResult = {};
  const sectorsSummaryList = [];

  Object.keys(BASE_SECTOR_CONFIG).forEach(key => {
    const base = BASE_SECTOR_CONFIG[key];
    let totalPctChange = 0;
    let constituentsCount = 0;

    // Synchronize constituents with live equities
    const liveConstituents = base.constituents.map((c, idx) => {
      const liveEq = equitiesMap.get(c.ticker);
      let price = c.basePrice;
      let change = 0;
      let changePct = 0;

      if (liveEq) {
        price = liveEq.price;
        change = liveEq.change;
        changePct = liveEq.change_pct;
      } else {
        // High frequency micro drift for constituents not on primary board
        const seed = (key.length * 10) + idx;
        const drift = 1 + Math.sin(Date.now() / 10000 + seed) * 0.012;
        price = +(c.basePrice * drift).toFixed(c.basePrice > 100 ? 2 : 4);
        change = +(price - c.basePrice).toFixed(2);
        changePct = +((change / c.basePrice) * 100).toFixed(2);
      }

      totalPctChange += changePct;
      constituentsCount++;

      const isStockUp = changePct >= 0;
      const trend = isStockUp ? 'up' : 'down';
      const spark = generateSectorSparkline(isStockUp, 80, 28, idx);

      return {
        ...c,
        price,
        change,
        changePct,
        isUp: isStockUp,
        trend,
        sparkline: spark.lineD
      };
    });

    const avgConstituentChange = constituentsCount > 0 ? (totalPctChange / constituentsCount) : base.baseReturns.d;
    const liveIndexValue = +(base.baseIndex * (1 + avgConstituentChange / 100)).toFixed(2);
    const liveChangeVal = +(liveIndexValue - base.baseIndex).toFixed(2);
    const liveChangePct = +avgConstituentChange.toFixed(2);
    const isSectorUp = liveChangePct >= 0;

    // Rating vs All-Share benchmark
    let rating = 'neutral';
    let ratingLabel = 'Market Perform';
    if (liveChangePct > allShareBenchmarkChange + 0.3) {
      rating = 'outperform';
      ratingLabel = 'Outperform';
    } else if (liveChangePct < allShareBenchmarkChange - 0.3) {
      rating = 'underperform';
      ratingLabel = 'Underperform';
    }

    // Dynamic Returns
    const liveReturns = {
      d: (liveChangePct >= 0 ? '+' : '') + liveChangePct.toFixed(2) + '%',
      w: (base.baseReturns.w + liveChangePct * 0.3 >= 0 ? '+' : '') + (base.baseReturns.w + liveChangePct * 0.3).toFixed(2) + '%',
      m: (base.baseReturns.m + liveChangePct * 0.5 >= 0 ? '+' : '') + (base.baseReturns.m + liveChangePct * 0.5).toFixed(2) + '%',
      ytd: (base.baseReturns.ytd + liveChangePct >= 0 ? '+' : '') + (base.baseReturns.ytd + liveChangePct).toFixed(2) + '%',
      dVal: liveChangePct,
      wVal: +(base.baseReturns.w + liveChangePct * 0.3).toFixed(2),
      mVal: +(base.baseReturns.m + liveChangePct * 0.5).toFixed(2),
      ytdVal: +(base.baseReturns.ytd + liveChangePct).toFixed(2)
    };

    // Calculate dynamic sector market cap and volume
    const dynamicMktCap = '$' + (base.mktCapNum * (1 + liveChangePct / 200)).toFixed(1) + 'B';
    const sparklines = generateSectorSparkline(isSectorUp, 300, 60, key.length);

    // Fetch contextual articles from store
    const relatedNews = getSectorNews(key);

    const fullSectorObj = {
      key,
      name: base.name,
      icon: base.icon,
      badgeClass: base.badgeClass,
      sub: base.sub,
      desc: base.desc,
      overview: base.overview,
      index: liveIndexValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      indexRaw: liveIndexValue,
      change: (isSectorUp ? '+' : '') + liveChangePct.toFixed(2) + '%',
      changeVal: liveChangeVal,
      changePct: liveChangePct,
      isUp: isSectorUp,
      rating,
      ratingLabel,
      mktCap: dynamicMktCap,
      pe: base.metrics.avgPE.toFixed(1) + 'x',
      divYield: base.metrics.avgYield.toFixed(1) + '%',
      volume: base.volume,
      sparkline: sparklines,
      metrics: {
        stocks: base.metrics.stocks,
        exchanges: base.metrics.exchanges,
        avgPE: base.metrics.avgPE.toFixed(1) + 'x',
        avgYield: base.metrics.avgYield.toFixed(1) + '%',
        avgROE: base.metrics.avgROE.toFixed(1) + '%',
        avgNPL: base.metrics.avgNPL > 0 ? base.metrics.avgNPL.toFixed(1) + '%' : '—'
      },
      returns: liveReturns,
      constituents: liveConstituents,
      news: relatedNews,
      lastUpdated: new Date().toISOString()
    };

    sectorsResult[key] = fullSectorObj;
    sectorsSummaryList.push({
      key,
      name: fullSectorObj.name,
      icon: fullSectorObj.icon,
      badgeClass: fullSectorObj.badgeClass,
      sub: fullSectorObj.sub,
      index: fullSectorObj.index,
      change: fullSectorObj.change,
      changePct: fullSectorObj.changePct,
      isUp: fullSectorObj.isUp,
      rating: fullSectorObj.rating,
      ratingLabel: fullSectorObj.ratingLabel,
      mktCap: fullSectorObj.mktCap,
      volume: fullSectorObj.volume,
      returns: fullSectorObj.returns,
      sparkline: fullSectorObj.sparkline
    });
  });

  return {
    sectors: sectorsResult,
    sectorsList: sectorsSummaryList,
    benchmarkAllShare: allShareBenchmarkChange,
    timestamp: new Date().toISOString()
  };
}

// Distinct curated image pools for African economic sectors
const SECTOR_IMAGE_POOLS = {
  banking: [
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=380&fit=crop&q=80', // Digital payment & banking
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=380&fit=crop&q=80', // Market charts & trading screens
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=380&fit=crop&q=80', // POS and retail banking
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=380&fit=crop&q=80'  // Currency and central bank reserves
  ],
  telecom: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=380&fit=crop&q=80', // Mobile money & fintech
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=380&fit=crop&q=80', // Global telecom network & satellite
    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&h=380&fit=crop&q=80', // Smartphones & 5G connectivity
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=380&fit=crop&q=80'  // Telecom transmission tower
  ],
  mining: [
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&h=380&fit=crop&q=80', // Heavy mining haul truck
    'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=380&fit=crop&q=80', // Gold bullion bars
    'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=380&fit=crop&q=80', // Copper refining & metallurgy
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=380&fit=crop&q=80'  // Minerals freight & logistics
  ],
  energy: [
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=380&fit=crop&q=80', // Solar PV mega-farm
    'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600&h=380&fit=crop&q=80', // Refinery towers & fuel facilities
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=380&fit=crop&q=80', // LNG and offshore gas
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=380&fit=crop&q=80'  // Renewable wind energy
  ],
  cement: [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=380&fit=crop&q=80', // Concrete infrastructure & bridges
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=380&fit=crop&q=80', // Heavy manufacturing plant
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=380&fit=crop&q=80', // Urban real estate developments
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=380&fit=crop&q=80'  // Industrial clinker engineering
  ],
  tech: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=380&fit=crop&q=80', // Semiconductor & AI compute
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=380&fit=crop&q=80', // Software workspace & developers
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop&q=80', // Data intelligence dashboard
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=380&fit=crop&q=80'  // Tech startup founders
  ]
};

// Curated sector-specific fallback articles (with full content for reader)
const SECTOR_CURATED_ARTICLES = {
  banking: [
    {
      id: 'sec-banking-1',
      title: 'Nigerian & South African Banks Post Record H1 Profits on FX & Yield Expansion',
      slug: 'nigerian-south-african-banks-record-h1-profits',
      category: 'business',
      categoryLabel: 'Banking & Finance',
      country: 'Nigeria / South Africa',
      summary: 'Tier-1 lenders across Lagos and Johannesburg report over 24% annualized ROE, bolstered by treasury yields and digital banking transaction volumes.',
      content: `Africa's premier commercial and investment banks have registered unprecedented financial results for the first half of the financial year.
      
Leading the continent are Nigeria's GTBank and Zenith Bank, alongside South Africa's FirstRand and Standard Bank, all reporting sustained asset growth, improved net interest margins (NIM), and expanding cross-border remittance revenue streams under the Pan-African Payment and Settlement System (PAPSS).

Key Growth Drivers:
- Acceleration of digital transactions with zero-fee micro-clearing.
- Strong liquidity buffers well exceeding Basel III capital adequacy minimums.
- Expansion of corporate credit lines to green infrastructure and industrial manufacturing.`,
      author: 'Ashley Jordan Chihiya',
      authorTitle: 'Chief Financial Markets Editor',
      authorImage: '/Ashley Jordan Chihiya.jpg',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'Banking',
      tagColor: 'rgba(42,157,143,0.12)',
      tagText: '#2a9d8f',
      img: SECTOR_IMAGE_POOLS.banking[0]
    },
    {
      id: 'sec-banking-2',
      title: 'Central Banks Harmonize Cross-Border Reserve Requirements via PAPSS',
      slug: 'central-banks-harmonize-cross-border-reserves-papss',
      category: 'business',
      categoryLabel: 'Monetary Policy',
      country: 'Pan-African',
      summary: 'Continental central bank governors reach accord on unified settlement corridors, reducing forex friction for intra-African corporate trade.',
      content: `In a landmark summit in Accra, governors representing 28 African central banks ratified enhanced operational protocols for the Pan-African Payment and Settlement System.

The unified clearing mechanism allows commercial banks to settle bilateral trade transactions directly in sovereign currencies, bypassing correspondent banking fees in New York and London.`,
      author: 'Ashley Jordan Chihiya',
      authorTitle: 'Monetary Policy Analyst',
      authorImage: '/Ashley Jordan Chihiya.jpg',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      readTime: '3 min read',
      tag: 'Policy',
      tagColor: 'rgba(38,70,83,0.12)',
      tagText: '#264653',
      img: SECTOR_IMAGE_POOLS.banking[1]
    },
    {
      id: 'sec-banking-3',
      title: 'FirstRand & Standard Bank Beat Consensus Estimates on Strong Corporate ROE',
      slug: 'firstrand-standard-bank-beat-consensus-roe-growth',
      category: 'business',
      categoryLabel: 'Earnings & Equities',
      country: 'South Africa',
      summary: 'Headline earnings per share climb 14% at JSE-listed financial majors as non-interest revenue and retail loan book quality outperform projections.',
      content: `South Africa's major banking institutions FirstRand and Standard Bank have exceeded equity analyst consensus forecasts with double-digit growth in headline earnings per share (HEPS).

Robust corporate banking performance and lower credit impairment charges across Sub-Saharan subsidiaries anchored the stellar quarterly figures.`,
      author: 'Ashley Jordan Chihiya',
      authorTitle: 'Senior Equities Correspondent',
      authorImage: '/Ashley Jordan Chihiya.jpg',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'Earnings',
      tagColor: 'rgba(233,196,106,0.18)',
      tagText: '#b8860b',
      img: SECTOR_IMAGE_POOLS.banking[2]
    }
  ],
  telecom: [
    {
      id: 'sec-telecom-1',
      title: 'MTN & Airtel Expand Pan-African Mobile Money Payment Corridors',
      slug: 'mtn-airtel-expand-mobile-money-corridors',
      category: 'technology',
      categoryLabel: 'Telecoms & Fintech',
      country: 'Nigeria / Kenya',
      summary: 'Continental telecom giants launch interoperable wallet transfers, reducing remittance costs across 14 Sub-Saharan markets.',
      content: `MTN Group and Airtel Africa have signed an infrastructure sharing partnership enabling frictionless, low-cost mobile money transfers across national boundaries.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'Telecom',
      tagColor: 'rgba(38,70,83,0.12)',
      tagText: '#264653',
      img: SECTOR_IMAGE_POOLS.telecom[0]
    },
    {
      id: 'sec-telecom-2',
      title: 'Safaricom & Vodacom Accelerate 5G Rollout Across East & Southern Africa',
      slug: 'safaricom-vodacom-accelerate-5g-rollout',
      category: 'technology',
      categoryLabel: '5G Infrastructure',
      country: 'Kenya / South Africa',
      summary: 'Over 2,500 new high-throughput 5G base stations activated to power enterprise cloud computing and smart city logistics.',
      content: `The rapid deployment of standalone 5G telecommunications arrays is transforming industrial automation and broadband connectivity from Nairobi to Johannesburg.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      readTime: '3 min read',
      tag: '5G',
      tagColor: 'rgba(42,157,143,0.12)',
      tagText: '#2a9d8f',
      img: SECTOR_IMAGE_POOLS.telecom[1]
    },
    {
      id: 'sec-telecom-3',
      title: 'M-PESA Annual Transaction Volume Surpasses $380 Billion',
      slug: 'mpesa-annual-transaction-volume-380-billion',
      category: 'technology',
      categoryLabel: 'Fintech Scale',
      country: 'Kenya / Tanzania',
      summary: 'East Africa’s premier mobile payments platform sets fresh record as merchant digitization and diaspora remittances surge.',
      content: `Safaricom’s M-PESA has processed over $380 billion in annualized gross merchandise value, cementing its status as Africa’s largest digital payments rail.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'Fintech',
      tagColor: 'rgba(244,162,97,0.18)',
      tagText: '#c77733',
      img: SECTOR_IMAGE_POOLS.telecom[2]
    }
  ],
  mining: [
    {
      id: 'sec-mining-1',
      title: 'Gold Spot Rally Lifts Gold Fields & Endeavour Mining Free Cash Flow',
      slug: 'gold-spot-rally-gold-fields-endeavour-mining-cash-flow',
      category: 'mining',
      categoryLabel: 'Precious Metals',
      country: 'Ghana / South Africa',
      summary: 'Surging bullion prices expand operating margins across West and Southern African underground and open-pit gold mines.',
      content: `Buoyed by record international spot gold prices, African gold producers have posted substantial increases in free cash flow and interim shareholder dividends.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'Gold',
      tagColor: 'rgba(233,196,106,0.18)',
      tagText: '#b8860b',
      img: SECTOR_IMAGE_POOLS.mining[1]
    },
    {
      id: 'sec-mining-2',
      title: 'Zambia & DRC Copper Output Surges on New Clean Energy Smelters',
      slug: 'zambia-drc-copper-output-clean-energy-smelters',
      category: 'mining',
      categoryLabel: 'Critical Minerals',
      country: 'Zambia / DRC',
      summary: 'Hydropower and solar-backed cathode smelting plants expand refined copper export volumes along the Lobito Rail Corridor.',
      content: `The Central African Copperbelt is experiencing a renaissance in green mineral processing, enabling domestic cathode refining prior to global export.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      readTime: '5 min read',
      tag: 'Copper',
      tagColor: 'rgba(42,157,143,0.12)',
      tagText: '#2a9d8f',
      img: SECTOR_IMAGE_POOLS.mining[2]
    },
    {
      id: 'sec-mining-3',
      title: 'Anglo American Reorganizes Operations to Accelerate Copper & Iron Ore Growth',
      slug: 'anglo-american-reorganization-copper-iron-ore',
      category: 'mining',
      categoryLabel: 'Mining Strategy',
      country: 'South Africa',
      summary: 'Restructured corporate focus targets energy-transition metals with expanded investments in high-grade African mineral reserves.',
      content: `Anglo American has completed key phases of its strategic portfolio reorganization, directing capital expenditure towards copper, premium iron ore, and crop nutrients.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'PGM',
      tagColor: 'rgba(107,91,149,0.12)',
      tagText: '#6b5b95',
      img: SECTOR_IMAGE_POOLS.mining[0]
    }
  ],
  energy: [
    {
      id: 'sec-energy-1',
      title: 'Dangote Refinery Reaches Full Operational Commercial Output',
      slug: 'dangote-refinery-full-commercial-output',
      category: 'energy',
      categoryLabel: 'Downstream Petroleum',
      country: 'Nigeria',
      summary: '650,000 bpd mega-refinery eliminates fuel import reliance and initiates petroleum product exports across ECOWAS nations.',
      content: `The world’s largest single-train petroleum refinery in Lekki, Lagos has achieved full continuous operational capacity, transforming West African fuel supply chains.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      readTime: '5 min read',
      tag: 'Oil & Gas',
      tagColor: 'rgba(244,162,97,0.18)',
      tagText: '#c77733',
      img: SECTOR_IMAGE_POOLS.energy[1]
    },
    {
      id: 'sec-energy-2',
      title: 'Mozambique LNG Project Restarts Full Construction on Offshore Fields',
      slug: 'mozambique-lng-project-restarts-construction',
      category: 'energy',
      categoryLabel: 'Natural Gas',
      country: 'Mozambique',
      summary: 'Multi-billion dollar offshore natural gas liquefaction trains resume construction with initial export shipments targeted for 2027.',
      content: `TotalEnergies and consortium partners have officially resumed full-scale infrastructure works on the landmark Mozambique LNG export hub in Cabo Delgado.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'LNG',
      tagColor: 'rgba(42,157,143,0.12)',
      tagText: '#2a9d8f',
      img: SECTOR_IMAGE_POOLS.energy[2]
    },
    {
      id: 'sec-energy-3',
      title: 'Kenya Crosses 1.2GW Geothermal Power Output Milestone',
      slug: 'kenya-geothermal-power-milestone-1-2gw',
      category: 'energy',
      categoryLabel: 'Renewables',
      country: 'Kenya',
      summary: 'Olkaria geothermal fields expand grid-connected capacity, powering green data centers and industrial manufacturing.',
      content: `Kenya has solidified its position among the world’s top clean geothermal energy producers, surpassing 1.2 gigawatts of installed baseload geothermal capacity.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'Renewables',
      tagColor: 'rgba(38,70,83,0.12)',
      tagText: '#264653',
      img: SECTOR_IMAGE_POOLS.energy[0]
    }
  ],
  cement: [
    {
      id: 'sec-cement-1',
      title: 'Dangote & BUA Cement Expand Export Corridors Across West & Central Africa',
      slug: 'dangote-bua-cement-expand-export-corridors',
      category: 'business',
      categoryLabel: 'Heavy Industry',
      country: 'Nigeria / Ghana',
      summary: 'High-grade clinker and bagged cement output rises to supply massive road and transport corridors under AfCFTA guidelines.',
      content: `Nigeria’s premier cement manufacturers Dangote Cement and BUA Cement have expanded maritime and overland clinker exports into West and Central African construction hubs.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'Cement',
      tagColor: 'rgba(107,91,149,0.12)',
      tagText: '#6b5b95',
      img: SECTOR_IMAGE_POOLS.cement[1]
    },
    {
      id: 'sec-cement-2',
      title: 'Continental Highway & Rail Construction Projects Accelerate Clinker Demand',
      slug: 'continental-highway-rail-projects-accelerate-clinker-demand',
      category: 'business',
      categoryLabel: 'Infrastructure',
      country: 'Pan-African',
      summary: 'Multimodal transit developments including the Lobito Corridor and Lagos-Calabar Highway drive unprecedented structural materials orders.',
      content: `Mega infrastructure undertakings spanning East, West, and Southern Africa are fueling record multi-year supply contracts for regional cement producers.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'Infra',
      tagColor: 'rgba(42,157,143,0.12)',
      tagText: '#2a9d8f',
      img: SECTOR_IMAGE_POOLS.cement[0]
    },
    {
      id: 'sec-cement-3',
      title: 'Lafarge Africa & PPC Deploy Solar Captive Plants at Key Industrial Factories',
      slug: 'lafarge-ppc-solar-captive-plants-factories',
      category: 'business',
      categoryLabel: 'Industrial ESG',
      country: 'South Africa / Nigeria',
      summary: 'Cement manufacturing facilities cut grid energy costs by 30% through on-site solar PV and heat-recovery generation.',
      content: `Heavy building materials producers are aggressively curbing carbon intensity through dedicated on-site solar farms and waste-heat recovery power generators.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      readTime: '3 min read',
      tag: 'ESG',
      tagColor: 'rgba(233,196,106,0.18)',
      tagText: '#b8860b',
      img: SECTOR_IMAGE_POOLS.cement[2]
    }
  ],
  tech: [
    {
      id: 'sec-tech-1',
      title: 'African Fintech Unicorns Process Over $1.4 Trillion in Annualized Volume',
      slug: 'african-fintech-unicorns-process-1-4-trillion',
      category: 'technology',
      categoryLabel: 'Fintech & Cloud',
      country: 'Nigeria / Kenya / South Africa',
      summary: 'Flutterwave, Paystack, OPay, and Chipper Cash report massive growth in cross-border SME commerce and merchant payment APIs.',
      content: `The pan-African fintech ecosystem has crossed a major threshold with top payment processors recording over $1.4 trillion in combined annualized payment velocity.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      readTime: '5 min read',
      tag: 'Fintech',
      tagColor: 'rgba(38,70,83,0.12)',
      tagText: '#264653',
      img: SECTOR_IMAGE_POOLS.tech[1]
    },
    {
      id: 'sec-tech-2',
      title: 'Pan-African Sovereign AI Cloud Infrastructure Attracts $1.2B in Funding',
      slug: 'pan-african-sovereign-ai-cloud-funding-1-2b',
      category: 'technology',
      categoryLabel: 'Artificial Intelligence',
      country: 'Kenya / Nigeria / South Africa',
      summary: 'Localized large language models and geothermal-powered hyperscale data center campuses expand enterprise AI compute.',
      content: `International investors and sovereign development funds have committed $1.2 billion to construct state-of-the-art AI cloud compute campuses in Kenya, Nigeria, and South Africa.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'AI',
      tagColor: 'rgba(42,157,143,0.12)',
      tagText: '#2a9d8f',
      img: SECTOR_IMAGE_POOLS.tech[0]
    },
    {
      id: 'sec-tech-3',
      title: 'Jumia & Logistics Innovators Expand Fast Fulfillment Hubs Across Secondary Cities',
      slug: 'jumia-logistics-innovators-expand-fulfillment-hubs',
      category: 'technology',
      categoryLabel: 'E-Commerce',
      country: 'Nigeria / Egypt / Ivory Coast',
      summary: 'Digital retail adoption accelerates outside major capitals backed by AI route optimization and automated local sorting centers.',
      content: `Pan-African e-commerce platforms are recording double-digit order growth by extending automated logistics hubs into secondary cities and agricultural trade centers.`,
      author: 'Ashley Jordan Chihiya',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      readTime: '4 min read',
      tag: 'E-commerce',
      tagColor: 'rgba(244,162,97,0.18)',
      tagText: '#c77733',
      img: SECTOR_IMAGE_POOLS.tech[2]
    }
  ]
};

// Auto-register curated sector articles in articlesStore so they are fully readable
(function ensureCuratedArticlesInStore() {
  if (Array.isArray(articlesStore)) {
    Object.values(SECTOR_CURATED_ARTICLES).forEach(list => {
      list.forEach(item => {
        const exists = articlesStore.some(a => a.id === item.id || a.slug === item.slug);
        if (!exists) {
          articlesStore.push(item);
        }
      });
    });
  }
})();

// Fetch relevant sector news with unique images and active links
function getSectorNews(sectorKey) {
  const articles = articlesStore || [];
  const keywordMap = {
    banking: ['banking', 'bank ', 'banks', 'cbn', 'lender', 'lenders', 'papss', 'treasury bill', 'reserve bank', 'monetary policy', 'zenith', 'firstrand', 'standard bank', 'equity bank', 'access bank', 'ecobank'],
    telecom: ['telecom', 'telecommunications', '5g', 'mtn', 'airtel', 'safaricom', 'm-pesa', 'spectrum', 'broadband', 'vodacom', 'mobile money', 'telco', 'telcos'],
    mining: ['mining', 'gold ', 'copper', 'platinum', 'minerals', 'cobalt', 'lithium', 'extractive', 'anglo american', 'smelter', 'ore ', 'gold fields', 'sibanye', 'bauxite', 'critical minerals'],
    energy: ['refinery', 'crude', 'lng', 'solar power', 'geothermal', 'petroleum', 'clean energy', 'renewable energy', 'dangote refinery', 'offshore gas', 'electricity grid', 'hydropower', 'oil and gas'],
    cement: ['cement', 'dangote cement', 'construction', 'bua cement', 'lafarge', 'clinker', 'building materials', 'quarry', 'road project', 'concrete'],
    tech: ['fintech', 'artificial intelligence', 'cloud compute', 'software', 'flutterwave', 'paystack', 'jumia', 'startup', 'startups', 'venture capital', 'data center', 'cybersecurity', 'saas']
  };

  const pool = SECTOR_IMAGE_POOLS[sectorKey] || SECTOR_IMAGE_POOLS.banking;
  const keywords = keywordMap[sectorKey] || ['market', 'africa'];

  // Filter matched articles
  const matched = articles.filter(a => {
    const text = (a.title + ' ' + (a.summary || '') + ' ' + (a.tags ? a.tags.join(' ') : '')).toLowerCase();
    return keywords.some(k => text.includes(k));
  }).slice(0, 3);

  if (matched.length >= 3) {
    return matched.map((a, idx) => {
      // Pick a distinct high-res photo from the curated pool
      let img = a.image;
      if (!img || img.includes('photo-1486406146926') || img.includes('photo-1590283603385')) {
        img = pool[idx % pool.length];
      }

      // Clean title and extract publisher if present
      let cleanTitle = a.title || '';
      let sourceName = a.author && a.author !== 'NewsHub Continental Desk' ? a.author : '';
      if (cleanTitle.includes(' - ')) {
        const parts = cleanTitle.split(' - ');
        if (parts.length > 1) {
          const suffix = parts.pop().trim();
          if (suffix.length < 30 && !suffix.toLowerCase().includes('part')) {
            sourceName = suffix;
            cleanTitle = parts.join(' - ').trim();
          }
        }
      }

      const timeAgo = formatTimeAgo(a.publishedAt);
      const meta = sourceName ? `${sourceName} • ${timeAgo}` : timeAgo;

      return {
        id: a.id,
        title: cleanTitle,
        slug: a.slug,
        tag: (a.tags && a.tags[0]) || a.categoryLabel || sectorKey.toUpperCase(),
        tagColor: getTagColor(sectorKey, idx),
        tagText: getTagTextColor(sectorKey, idx),
        meta: meta,
        img: img,
        sourceUrl: a.sourceUrl || null
      };
    });
  }

  // Fallback to curated sector articles
  const curated = SECTOR_CURATED_ARTICLES[sectorKey] || SECTOR_CURATED_ARTICLES.banking;
  return curated.map((item, idx) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    tag: item.tag || sectorKey.toUpperCase(),
    tagColor: item.tagColor || getTagColor(sectorKey, idx),
    tagText: item.tagText || getTagTextColor(sectorKey, idx),
    meta: formatTimeAgo(item.publishedAt),
    img: pool[idx % pool.length],
    sourceUrl: null
  }));
}

function getTagColor(sectorKey, idx) {
  const colors = [
    'rgba(42,157,143,0.12)',
    'rgba(38,70,83,0.12)',
    'rgba(233,196,106,0.18)',
    'rgba(107,91,149,0.12)'
  ];
  return colors[idx % colors.length];
}

function getTagTextColor(sectorKey, idx) {
  const textColors = [
    '#2a9d8f',
    '#264653',
    '#b8860b',
    '#6b5b95'
  ];
  return textColors[idx % textColors.length];
}

function formatTimeAgo(isoString) {
  if (!isoString) return 'Today';
  const diff = Math.max(0, Date.now() - new Date(isoString).getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return 'Just now';
  if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? '1 day ago' : `${days} days ago`;
}

export function getSectorDetails(sectorKey = 'banking', timeframe = '1M') {
  const liveData = getLiveSectorsData();
  const normalizedKey = sectorKey.toLowerCase();
  const sector = liveData.sectors[normalizedKey] || liveData.sectors.banking;
  const timeSeries = generateSectorTimeSeries(sector.key, timeframe, sector.indexRaw, sector.changePct);

  return {
    success: true,
    sectorKey: sector.key,
    sector,
    allSectors: liveData.sectorsList,
    timeframe,
    timeSeries,
    timestamp: liveData.timestamp
  };
}
