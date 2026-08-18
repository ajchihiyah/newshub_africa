/**
 * NewsHub Africa - Events Interactive Engine & Experience
 * Powers dynamic event card clicks, event details modal, agenda, speaker profiles,
 * interactive RSVP ticket registration, .ics/Google Calendar export, bookmarking, and search/filtering.
 */

(function () {
  'use strict';

  // Comprehensive Event Knowledge Base for all 29 Events
  const eventsDatabase = [
    {
      id: 1,
      title: 'Africa Tech Summit Nairobi 2026',
      organization: 'Africa Tech Summit Global',
      sector: 'tech',
      sectorLabel: 'Technology',
      region: 'east-africa',
      regionLabel: 'East Africa',
      city: 'Nairobi',
      country: 'Kenya',
      venue: 'Kenyatta International Convention Centre (KICC) & Sarit Expo Centre',
      date: '2026-08-15',
      dateDisplay: 'Aug 15–17, 2026',
      targetCountdown: '2026-08-15T09:00:00',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
      attendees: '2,000+ Founders, VCs & Tech Executives',
      speakersCount: '120+ Global & Pan-African Speakers',
      countriesCount: '45+ Countries Represented',
      ticketPrice: '$450 (Delegate) / Free (Virtual Stream)',
      summary: "East Africa's premier technology and investment conference bringing together global investors, technology giants, founders, and regulators for three days of high-stakes deal-making, innovation showcases, and ecosystem acceleration.",
      overview: `Africa Tech Summit Nairobi 2026 is the undisputed hub for African tech leadership. Over three action-packed days, delegates connect across three dedicated tracks: Africa Money & DeFi Summit, Africa ClimateTech Forum, and Enterprise AI & Cloud Summit.\n\nFeaturing curated 1-on-1 investor matchmaking lounges, 50+ startup exhibition booths, and closed-door ministerial roundtable discussions on cross-border fintech regulation and AI sovereign infrastructure.`,
      speakers: [
        { name: 'Paula Ingabire', role: 'Minister of ICT and Innovation', org: 'Republic of Rwanda', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop' },
        { name: 'Olugbenga Agboola', role: 'Founder & CEO', org: 'Flutterwave', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop' },
        { name: 'Dr. Bitange Ndemo', role: 'Ambassador to Belgium & EU', org: 'Govt of Kenya / Tech Visionary', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' },
        { name: 'Ashley Jordan Chihiya', role: 'Chief Markets Analyst', org: 'NewsHub Africa', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Aug 15)', time: '09:00 - 11:30', title: 'Opening Plenary: Unlocking Africa’s Sovereign AI & Cloud Ecosystem', room: 'Main Auditorium' },
        { day: 'Day 1 (Aug 15)', time: '13:00 - 15:30', title: 'Fintech & Cross-Border Payments: The AfCFTA Digital Settlement Reality', room: 'Track A - Money & DeFi' },
        { day: 'Day 2 (Aug 16)', time: '10:00 - 12:30', title: 'ClimateTech & Green Mobility: Financing Seed-to-Scale Ventures', room: 'Track B - Green Innovation' },
        { day: 'Day 2 (Aug 16)', time: '14:30 - 17:00', title: 'Africa Seedstars Live Pitch: 12 Top Startups Pitching $5M in Syndicate Capital', room: 'Pitch Stage' },
        { day: 'Day 3 (Aug 17)', time: '10:00 - 13:00', title: 'Ministerial Roundtables & The Nairobi Tech Declaration 2026', room: 'Diplomatic Hall' }
      ],
      website: 'https://www.africatechsummit.com'
    },
    {
      id: 2,
      title: 'Mining Indaba 2026',
      organization: 'Investing in African Mining Indaba',
      sector: 'mining',
      sectorLabel: 'Mining',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Cape Town',
      country: 'South Africa',
      venue: 'Cape Town International Convention Centre (CTICC)',
      date: '2026-09-08',
      dateDisplay: 'Sep 8–11, 2026',
      targetCountdown: '2026-09-08T08:30:00',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop',
      attendees: '8,500+ Mining Executives, Investors & Ministers',
      speakersCount: '150+ Heads of State & Industry Leaders',
      countriesCount: '100+ Global Delegations',
      ticketPrice: '$1,200 (Full Delegate) / $450 (Explorer)',
      summary: "Africa's largest mining investment conference connecting miners, global sovereign funds, governments, and junior exploration companies navigating the critical minerals energy transition.",
      overview: `Investing in African Mining Indaba is the world's premier gathering dedicated to the capitalization and sustainable development of African mining.\n\nThe 2026 edition centers on 'Critical Minerals & Continental Value Addition'—moving beyond raw ore extraction toward domestic battery processing, lithium refining, and platinum-group metals stewardship.`,
      speakers: [
        { name: 'Gwede Mantashe', role: 'Minister of Mineral Resources & Energy', org: 'Republic of South Africa', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop' },
        { name: 'Mark Bristow', role: 'President & CEO', org: 'Barrick Gold Corporation', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop' },
        { name: 'Dr. Marit Kitaw', role: 'Interim Director', org: 'African Minerals Development Centre (AU)', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Sep 8)', time: '09:00 - 12:00', title: 'Presidential Address: Driving ESG & Value Addition in African Mining', room: 'Auditorium 1' },
        { day: 'Day 2 (Sep 9)', time: '11:00 - 13:30', title: 'Critical Minerals for Global Transition: Copper, Cobalt, Lithium & PGMs', room: 'Hall 3' },
        { day: 'Day 3 (Sep 10)', time: '14:00 - 16:30', title: 'Junior Mining Showcase & Private Capital Allocation Lounge', room: 'Exhibition Arena' }
      ],
      website: 'https://miningindaba.com'
    },
    {
      id: 3,
      title: 'AfDB Annual Meetings 2026',
      organization: 'African Development Bank Group',
      sector: 'finance',
      sectorLabel: 'Finance',
      region: 'west-africa',
      regionLabel: 'West Africa',
      city: 'Abidjan',
      country: 'Ivory Coast',
      venue: 'Sofitel Abidjan Hôtel Ivoire Convention Complex',
      date: '2026-10-20',
      dateDisplay: 'Oct 20–24, 2026',
      targetCountdown: '2026-10-20T09:00:00',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=500&fit=crop',
      attendees: '4,000+ Governors, Central Bankers & Multilaterals',
      speakersCount: '80+ Finance Ministers & Economists',
      countriesCount: '81 Member Countries',
      ticketPrice: 'Accreditation Required / Free for Official Observers',
      summary: "The African Development Bank's flagship annual gathering focusing on sovereign debt sustainability, multi-billion dollar infrastructure financing, and climate resilience.",
      overview: `The Annual Meetings of the AfDB represent the premier decision-making forum on African development economics. Leaders will evaluate capital adequacy frameworks, Special Drawing Rights reallocations, and public-private blended finance instruments across energy and transport corridors.`,
      speakers: [
        { name: 'Dr. Akinwumi Adesina', role: 'President', org: 'African Development Bank Group', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' },
        { name: 'Wamkele Mene', role: 'Secretary-General', org: 'AfCFTA Secretariat', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Oct 20)', time: '09:30 - 12:30', title: 'High-Level Dialogue: Financing Africa’s Transformation Under Climate Realities', room: 'Palais des Congrès' },
        { day: 'Day 2 (Oct 21)', time: '14:00 - 17:00', title: 'Mobilizing Private Sector Capital for Continental Infrastructure Pipelines', room: 'Salon Cocody' }
      ],
      website: 'https://www.afdb.org'
    },
    {
      id: 4,
      title: 'Africa Agri-Investment Summit',
      organization: 'Alliance for a Green Revolution in Africa (AGRA)',
      sector: 'agriculture',
      sectorLabel: 'Agriculture',
      region: 'west-africa',
      regionLabel: 'West Africa',
      city: 'Accra',
      country: 'Ghana',
      venue: 'Accra International Conference Centre (AICC)',
      date: '2026-11-05',
      dateDisplay: 'Nov 5–7, 2026',
      targetCountdown: '2026-11-05T09:00:00',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=500&fit=crop',
      attendees: '1,800+ Agribusiness Leaders, Farmers & Investors',
      speakersCount: '65+ AgTech Innovators & Agronomists',
      countriesCount: '35+ Countries',
      ticketPrice: '$350 (Delegate) / $150 (Agri-Cooperative)',
      summary: "Connecting agribusiness investors with scalable farming ventures across the continent's grain, cocoa, horticulture, and food processing value chains.",
      overview: `Focusing on mechanized agriculture, climate-smart seeds, cold-chain logistics, and trade finance for smallholder cooperatives. Includes an AgTech demo day showcasing drone spraying, soil sensors, and micro-insurance.`,
      speakers: [
        { name: 'Dr. Agnes Kalibata', role: 'President', org: 'AGRA', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Nov 5)', time: '09:00 - 12:00', title: 'Scaling Continental Food Sovereignty & Agri-Corridors', room: 'Main Hall' },
        { day: 'Day 2 (Nov 6)', time: '14:00 - 16:30', title: 'AgTech & Precision Farming: Drones, Sensors & Yield Optimization', room: 'Hall B' }
      ],
      website: 'https://agra.org'
    },
    {
      id: 5,
      title: 'Africa Energy Forum 2026',
      organization: 'EnergyNet Global',
      sector: 'energy',
      sectorLabel: 'Energy',
      region: 'north-africa',
      regionLabel: 'North Africa',
      city: 'Marrakech',
      country: 'Morocco',
      venue: 'Palais des Congrès de Marrakech',
      date: '2026-12-01',
      dateDisplay: 'Dec 1–3, 2026',
      targetCountdown: '2026-12-01T09:00:00',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=500&fit=crop',
      attendees: '3,200+ Power Developers, Utilities & Financiers',
      speakersCount: '110+ Energy Ministers & IPPs',
      countriesCount: '60+ Countries',
      ticketPrice: '$850 (Standard) / $1,400 (VIP Executive)',
      summary: "The continent's leading energy conference covering power generation, grid transmission, renewables, and cross-border power pooling.",
      overview: `Bringing together public utilities, independent power producers (IPPs), and sovereign wealth funds to sign PPAs for solar, wind, geothermal, and gas-to-power baseload infrastructure.`,
      speakers: [
        { name: 'Hon. Leila Benali', role: 'Minister of Energy Transition & Sustainable Dev', org: 'Kingdom of Morocco', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Dec 1)', time: '09:30 - 12:00', title: 'The Pan-African Power Grid: Interconnections & Renewable Integration', room: 'Atlas Hall' }
      ],
      website: 'https://www.africa-energy-forum.com'
    },
    {
      id: 6,
      title: 'Africa Fintech Summit Lagos',
      organization: 'Africa Fintech Network',
      sector: 'finance',
      sectorLabel: 'Finance',
      region: 'west-africa',
      regionLabel: 'West Africa',
      city: 'Lagos',
      country: 'Nigeria',
      venue: 'Eko Convention Centre, Victoria Island',
      date: '2027-01-18',
      dateDisplay: 'Jan 18–20, 2027',
      targetCountdown: '2027-01-18T09:00:00',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=500&fit=crop',
      attendees: '2,500+ Fintech Founders, Regulators & VCs',
      speakersCount: '90+ Leaders in Digital Banking',
      countriesCount: '40+ Countries',
      ticketPrice: '$350 (Regular) / $600 (VIP)',
      summary: "West Africa's definitive fintech gathering exploring digital payments, blockchain interoperability, cross-border remittances, and open banking frameworks.",
      overview: `A convergence of unicorn executives, payment service providers, banking regulators, and angel investors analyzing stablecoin adoption, AI-powered credit scoring, and API banking.`,
      speakers: [
        { name: 'Shola Akinlade', role: 'Co-Founder & CEO', org: 'Paystack', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Jan 18)', time: '09:00 - 12:30', title: 'Open Banking & Real-Time Rails across African Financial Hubs', room: 'Eko Grand Hall' }
      ],
      website: 'https://africafintechsummit.com'
    },
    {
      id: 7,
      title: 'ZimTrade International Expo 2026',
      organization: 'ZimTrade',
      sector: 'business',
      sectorLabel: 'Business & Trade',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Harare',
      country: 'Zimbabwe',
      venue: 'Harare International Conference Centre (HICC)',
      date: '2026-09-25',
      dateDisplay: 'Sep 25–27, 2026',
      targetCountdown: '2026-09-25T08:30:00',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=500&fit=crop',
      attendees: '1,500+ Buyers, Exporters & Industrialists',
      speakersCount: '50+ Trade Experts',
      countriesCount: '25+ Trade Delegations',
      ticketPrice: '$200 (Delegate) / Free for Accredited Buyers',
      summary: "Zimbabwe's flagship trade exhibition showcasing manufacturing, horticulture, mining equipment, and value-added exports to regional and global buyers.",
      overview: `Dedicated to growing Zimbabwean non-mineral exports under AfCFTA and bilateral agreements with SADC, COMESA, and European retail partners.`,
      speakers: [
        { name: 'Allan Majuru', role: 'Chief Executive Officer', org: 'ZimTrade', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Sep 25)', time: '09:00 - 11:30', title: 'Official Opening: Expanding Zimbabwean Footprint Across AfCFTA', room: 'Main Auditorium' }
      ],
      website: 'https://www.tradezimbabwe.com'
    },
    {
      id: 8,
      title: 'Zimbabwe International Trade Fair',
      organization: 'ZITF Company',
      sector: 'business',
      sectorLabel: 'Business & Trade',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Bulawayo',
      country: 'Zimbabwe',
      venue: 'ZITF Exhibition Grounds, Bulawayo',
      date: '2026-10-12',
      dateDisplay: 'Oct 12–16, 2026',
      targetCountdown: '2026-10-12T09:00:00',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop',
      attendees: '15,000+ Trade Visitors & Exhibitors',
      speakersCount: '80+ Industrial Leaders',
      countriesCount: '30+ International Pavilions',
      ticketPrice: '$250 (Business Conference) / $20 (Public Days)',
      summary: "Southern Africa's longest-running trade fair connecting Zimbabwean manufacturers and heavy industrialists with regional import-export networks.",
      overview: `Featuring multi-hall exhibitions, the annual ZITF International Business Conference, Diplomats Forum, and Innovators Forum in Zimbabwe’s industrial heartland.`,
      speakers: [
        { name: 'Dr. Evelyn Ndlovu', role: 'Minister of Industry & Commerce', org: 'Govt of Zimbabwe', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Oct 12)', time: '08:30 - 12:00', title: 'ZITF International Business Conference: Industrialization & Value Chains', room: 'Hall 2' }
      ],
      website: 'https://zitf.co.zw'
    },
    {
      id: 9,
      title: 'Transform Africa Summit 2026',
      organization: 'Smart Africa Alliance',
      sector: 'tech',
      sectorLabel: 'Technology',
      region: 'east-africa',
      regionLabel: 'East Africa',
      city: 'Kigali',
      country: 'Rwanda',
      venue: 'Kigali Convention Centre',
      date: '2026-11-18',
      dateDisplay: 'Nov 18–20, 2026',
      targetCountdown: '2026-11-18T09:00:00',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop',
      attendees: '5,000+ Heads of State, Ministers & Tech Pioneers',
      speakersCount: '130+ International Speakers',
      countriesCount: '100+ Nations',
      ticketPrice: '$500 (Standard) / $1,000 (VIP)',
      summary: "The Smart Africa Alliance's flagship conference on digital single market harmonization, broadband connectivity, e-government, and sovereign AI.",
      overview: `Focusing on uniting 38 African member states with over 1 billion citizens into a single digital market with harmonized data governance and payment rails.`,
      speakers: [
        { name: 'Lacina Koné', role: 'Director General & CEO', org: 'Smart Africa Alliance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Nov 18)', time: '09:00 - 12:00', title: 'Smart Africa Presidential Panel: The Continental Digital Compact', room: 'Auditorium' }
      ],
      website: 'https://smartafrica.org'
    },
    {
      id: 10,
      title: 'Africa Investment Forum 2026',
      organization: 'AfDB, Afreximbank, TDB, AFC',
      sector: 'finance',
      sectorLabel: 'Finance',
      region: 'north-africa',
      regionLabel: 'North Africa',
      city: 'Casablanca',
      country: 'Morocco',
      venue: 'Casablanca Finance City & Hyatt Regency',
      date: '2026-12-08',
      dateDisplay: 'Dec 8–10, 2026',
      targetCountdown: '2026-12-08T09:00:00',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=500&fit=crop',
      attendees: '2,200+ Institutional Investors & Fund Managers',
      speakersCount: '70+ Lead Transactors',
      countriesCount: '50+ Countries',
      ticketPrice: 'By Institutional Invitation & Accreditation',
      summary: "Africa's transactional deal marketplace bringing bankable deals from transport, green energy, and agri-processing to financial closure.",
      overview: `A pure transaction-driven gathering where closed-door boardroom sessions advance $30B+ in structured debt and equity financing pipelines.`,
      speakers: [
        { name: 'Samaila Zubairu', role: 'President & CEO', org: 'Africa Finance Corporation (AFC)', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Dec 8)', time: '09:30 - 13:00', title: 'Boardroom Deal Sessions: Strategic Corridors & Port Logistics', room: 'Deal Suite A' }
      ],
      website: 'https://www.africainvestmentforum.com'
    },
    {
      id: 11,
      title: 'Africa CEO Forum 2027',
      organization: 'Jeune Afrique Media Group & IFC',
      sector: 'business',
      sectorLabel: 'Business & Leadership',
      region: 'west-africa',
      regionLabel: 'West Africa',
      city: 'Abidjan',
      country: 'Ivory Coast',
      venue: 'Radisson Blu Hotel & Abidjan Conference Complex',
      date: '2027-02-10',
      dateDisplay: 'Feb 10–12, 2027',
      targetCountdown: '2027-02-10T09:00:00',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop',
      attendees: '2,000+ CEOs, Investors & Heads of State',
      speakersCount: '100+ C-Suite Panellists',
      countriesCount: '70+ Countries',
      ticketPrice: '$1,500 (CEO Delegate)',
      summary: "The flagship annual summit for African enterprise leaders, sovereign champions, and global multinationals shaping continental commerce.",
      overview: `High-level debates on AfCFTA integration, AI business strategy, sovereign wealth partnerships, and building resilient African supply chains.`,
      speakers: [
        { name: 'Makhtar Diop', role: 'Managing Director', org: 'International Finance Corporation (IFC)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Feb 10)', time: '09:00 - 12:00', title: 'CEO Plenary: Navigating Macro Turbulence and Building Continental Multinationals', room: 'Grand Amphitheatre' }
      ],
      website: 'https://www.theafricaceoforum.com'
    },
    {
      id: 12,
      title: 'African Union Summit 2027',
      organization: 'African Union Commission',
      sector: 'business',
      sectorLabel: 'Governance & Trade',
      region: 'east-africa',
      regionLabel: 'East Africa',
      city: 'Addis Ababa',
      country: 'Ethiopia',
      venue: 'African Union Headquarters (Nelson Mandela Hall)',
      date: '2027-03-15',
      dateDisplay: 'Mar 15–18, 2027',
      targetCountdown: '2027-03-15T09:00:00',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=500&fit=crop',
      attendees: '3,500+ Diplomats, Ministers & Observers',
      speakersCount: '55 Heads of State & Government',
      countriesCount: '55 AU Member States',
      ticketPrice: 'Official Diplomatic & Media Accreditation',
      summary: "The ordinary session of the Assembly of Heads of State and Government of the African Union addressing continental peace, trade integration, and Agenda 2063.",
      overview: `The supreme policy body of the continent reviews progress on the AfCFTA Protocol on Digital Trade, continental passport rollouts, and infrastructure corridors.`,
      speakers: [
        { name: 'Moussa Faki Mahamat', role: 'Chairperson', org: 'African Union Commission', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Mar 15)', time: '10:00 - 13:00', title: 'Opening Assembly: Advancing Agenda 2063 Flagship Priorities', room: 'Nelson Mandela Hall' }
      ],
      website: 'https://au.int'
    },
    {
      id: 13,
      title: 'AfricaTech Festival AfricaCom 2027',
      organization: 'Informa Tech',
      sector: 'tech',
      sectorLabel: 'Telecom & Tech',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Cape Town',
      country: 'South Africa',
      venue: 'CTICC Cape Town',
      date: '2027-04-22',
      dateDisplay: 'Apr 22–25, 2027',
      targetCountdown: '2027-04-22T09:00:00',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
      attendees: '15,000+ Telecom Operators, Tech Titans & Startups',
      speakersCount: '300+ Industry Experts',
      countriesCount: '120+ Countries',
      ticketPrice: '$495 (Delegate) / Free (Visitor Pass)',
      summary: "Africa's largest telecommunications, digital media, fiber connectivity, and enterprise technology festival.",
      overview: `Covering 5G network rollouts, submarine cable landings, satellite constellations, edge data centers, and enterprise AI transformation across Africa.`,
      speakers: [
        { name: 'Ralph Mupita', role: 'President & CEO', org: 'MTN Group', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Apr 22)', time: '09:00 - 12:30', title: 'Keynote Arena: The Next 1 Billion Connected Africans', room: 'Auditorium 1' }
      ],
      website: 'https://tmt.knect365.com/africacom'
    },
    {
      id: 14,
      title: 'Zimbabwe Mining & Minerals Conference',
      organization: 'Chamber of Mines of Zimbabwe',
      sector: 'mining',
      sectorLabel: 'Mining',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Victoria Falls',
      country: 'Zimbabwe',
      venue: 'Elephant Hills Resort & Victoria Falls Hotel',
      date: '2027-05-05',
      dateDisplay: 'May 5–7, 2027',
      targetCountdown: '2027-05-05T09:00:00',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&h=500&fit=crop',
      attendees: '1,200+ Mining Executives, Geologists & Financiers',
      speakersCount: '45+ Mining Leaders',
      countriesCount: '20+ Nations',
      ticketPrice: '$550 (Delegate)',
      summary: "The apex conference for Zimbabwe's multi-billion dollar mining economy focusing on platinum, lithium beneficiation, gold, and nickel.",
      overview: `Uniting producers, government ministries, power utilities, and financiers to discuss policy frameworks, fiscal incentives, and downstream value addition.`,
      speakers: [
        { name: 'Hon. Winston Chitando', role: 'Minister of Mines & Mining Development', org: 'Govt of Zimbabwe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (May 5)', time: '09:00 - 12:00', title: 'Presidential & Ministerial Address: Achieving $12B+ Mining Economy Targets', room: 'Zambezi Ballroom' }
      ],
      website: 'https://chamberofminesofzimbabwe.com'
    },
    {
      id: 15,
      title: 'African Green Revolution Forum 2027',
      organization: 'AGRF Partner Group',
      sector: 'agriculture',
      sectorLabel: 'Agriculture',
      region: 'east-africa',
      regionLabel: 'East Africa',
      city: 'Nairobi',
      country: 'Kenya',
      venue: 'UN Complex Gigiri & KICC',
      date: '2027-06-20',
      dateDisplay: 'Jun 20–23, 2027',
      targetCountdown: '2027-06-20T09:00:00',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=500&fit=crop',
      attendees: '3,000+ Agricultural Ministers, Scientists & Donors',
      speakersCount: '90+ Keynotes',
      countriesCount: '50+ Countries',
      ticketPrice: '$300 (Standard) / Free (Accredited Farmers)',
      summary: "The world's premier forum on African agriculture, accelerating food systems resilience and inclusive agribusiness value chains.",
      overview: `Deep dives into regenerative agriculture, carbon farming credits, fertilizer supply resilience, and regional food commodity corridors.`,
      speakers: [
        { name: 'Dr. Agnes Kalibata', role: 'President', org: 'AGRA', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Jun 20)', time: '09:00 - 12:30', title: 'Unlocking Agricultural Trade under the AfCFTA Guided Initiative', room: 'Gigiri Hall' }
      ],
      website: 'https://agrf.org'
    },
    {
      id: 16,
      title: 'Africa Internet Governance Forum 2027',
      organization: 'AfIGF Secretariat & UNECA',
      sector: 'tech',
      sectorLabel: 'Technology',
      region: 'west-africa',
      regionLabel: 'West Africa',
      city: 'Dakar',
      country: 'Senegal',
      venue: 'King Fahd Palace Hotel, Dakar',
      date: '2027-07-15',
      dateDisplay: 'Jul 15–17, 2027',
      targetCountdown: '2027-07-15T09:00:00',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop',
      attendees: '1,400+ Cybersecurity Experts, Regulators & Civil Society',
      speakersCount: '60+ Digital Rights Specialists',
      countriesCount: '40+ Countries',
      ticketPrice: 'Open & Free Registration',
      summary: "Convening digital rights stakeholders, telcos, and internet service providers to deliberate cybersecurity, data sovereignty, and AI safety.",
      overview: `A multi-stakeholder platform on affordable internet access, submarine cable redundancy, and ethical AI regulation across African jurisdictions.`,
      speakers: [
        { name: 'Dr. Nnenna Nwakanma', role: 'Digital Rights & Policy Advocate', org: 'AfIGF', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Jul 15)', time: '09:30 - 12:00', title: 'Securing Africa’s Cyber Infrastructure & Data Sovereignty', room: 'Grand Amphitheatre' }
      ],
      website: 'https://afigf.africa'
    },
    {
      id: 17,
      title: 'Zimbabwe Tourism & Hospitality Expo',
      organization: 'Zimbabwe Tourism Authority (ZTA)',
      sector: 'business',
      sectorLabel: 'Tourism & Business',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Victoria Falls',
      country: 'Zimbabwe',
      venue: 'Victoria Falls Safari Lodge & Conference Pavilion',
      date: '2027-08-20',
      dateDisplay: 'Aug 20–22, 2027',
      targetCountdown: '2027-08-20T09:00:00',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=500&fit=crop',
      attendees: '2,000+ Travel Buyers, Tour Operators & Hoteliers',
      speakersCount: '40+ Tourism Directors',
      countriesCount: '35+ Buyer Countries',
      ticketPrice: '$250 (Delegate) / Hosted Buyer Program',
      summary: "Showcasing world-class eco-tourism, safari lodges, heritage circuits, and aviation routes linking Zimbabwe with global destinations.",
      overview: `Business-to-business matchmaking connecting African luxury lodge operators and tour agencies with international travel buyers from Europe, Americas, and Asia.`,
      speakers: [
        { name: 'Winnie Muchanyuka', role: 'Chief Executive', org: 'Zimbabwe Tourism Authority', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Aug 20)', time: '09:00 - 12:00', title: 'Sustainable Safari & Eco-Tourism Investments in Southern Africa', room: 'Zambezi Pavilion' }
      ],
      website: 'https://zimbabwetourism.net'
    },
    {
      id: 18,
      title: 'Africa SME Summit 2027',
      organization: 'African Union SME Development Forum',
      sector: 'business',
      sectorLabel: 'Business & SMEs',
      region: 'west-africa',
      regionLabel: 'West Africa',
      city: 'Lagos',
      country: 'Nigeria',
      venue: 'Landmark Centre, Victoria Island, Lagos',
      date: '2027-09-10',
      dateDisplay: 'Sep 10–12, 2027',
      targetCountdown: '2027-09-10T09:00:00',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop',
      attendees: '4,000+ Entrepreneurs, Micro-lenders & VCs',
      speakersCount: '75+ Founders & Angel Investors',
      countriesCount: '30+ Countries',
      ticketPrice: '$50 (Entrepreneur Pass) / $250 (Corporate)',
      summary: "Empowering small and medium enterprises with working capital loans, digital tools, supply chain access, and cross-border export training.",
      overview: `Workshops on factoring, inventory financing, digital accounting, and getting SME certified for AfCFTA preferential tariff trading.`,
      speakers: [
        { name: 'Tony Elumelu', role: 'Chairman', org: 'Heirs Holdings & TEF', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Sep 10)', time: '10:00 - 13:00', title: 'Financing the Missing Middle: Innovative Credit for Growth SMEs', room: 'Main Expo Hall' }
      ],
      website: 'https://www.tonyelumelufoundation.org'
    },
    {
      id: 19,
      title: 'Powering Africa Summit 2027',
      organization: 'EnergyNet',
      sector: 'energy',
      sectorLabel: 'Energy',
      region: 'east-africa',
      regionLabel: 'East Africa',
      city: 'Kigali',
      country: 'Rwanda',
      venue: 'Kigali Marriott Hotel & Convention Centre',
      date: '2027-10-05',
      dateDisplay: 'Oct 5–7, 2027',
      targetCountdown: '2027-10-05T09:00:00',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=500&fit=crop',
      attendees: '1,800+ Grid Operators, DFIs & Solar Developers',
      speakersCount: '60+ Energy Execs',
      countriesCount: '45+ Countries',
      ticketPrice: '$750 (Delegate)',
      summary: "Catalyzing investment in off-grid solar, mini-grids, transmission interconnectors, and commercial energy storage across Eastern Africa.",
      overview: `Focusing on battery energy storage systems (BESS), smart metering, and blended finance to achieve universal electricity access by 2030.`,
      speakers: [
        { name: 'Dr. Valentine Uwamariya', role: 'Minister of Environment', org: 'Republic of Rwanda', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Oct 5)', time: '09:30 - 12:00', title: 'Mini-Grids and Commercial Solar C&I: Unlocking Rural & Industrial Power', room: 'Ballroom A' }
      ],
      website: 'https://www.poweringafrica-summit.com'
    },
    {
      id: 20,
      title: 'Africa Data Centres & Cloud Summit',
      organization: 'Data Centre Dynamics (DCD)',
      sector: 'tech',
      sectorLabel: 'Technology',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Johannesburg',
      country: 'South Africa',
      venue: 'Sandton Convention Centre, Johannesburg',
      date: '2027-11-15',
      dateDisplay: 'Nov 15–17, 2027',
      targetCountdown: '2027-11-15T09:00:00',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
      attendees: '2,000+ Data Centre Engineers, Hyperscalers & ISPs',
      speakersCount: '70+ Cloud Architects',
      countriesCount: '35+ Countries',
      ticketPrice: '$600 (Delegate)',
      summary: "Africa's premier hyperscale infrastructure conference covering server farms, renewable cooling, fiber interconnects, and AI cloud clusters.",
      overview: `A gathering of Equinix, Teraco, Vantage, Microsoft Azure, AWS, and local telecom giants scaling carrier-neutral digital real estate.`,
      speakers: [
        { name: 'Jan Hnizdo', role: 'CEO', org: 'Teraco Data Environments', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Nov 15)', time: '09:00 - 12:30', title: 'Hyperscale Capacity & Power Resilience: Building Terawatt-Ready Africa', room: 'Hall 1' }
      ],
      website: 'https://www.datacenterdynamics.com'
    },
    {
      id: 21,
      title: 'Zimbabwe Business Investment Forum',
      organization: 'Zimbabwe Investment & Development Agency (ZIDA)',
      sector: 'business',
      sectorLabel: 'Business & Investment',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Harare',
      country: 'Zimbabwe',
      venue: 'Rainbow Towers Hotel & Conference Centre, Harare',
      date: '2027-12-01',
      dateDisplay: 'Dec 1–3, 2027',
      targetCountdown: '2027-12-01T09:00:00',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
      attendees: '1,500+ Diaspora Investors, Fund Managers & Developers',
      speakersCount: '50+ Investment Transactors',
      countriesCount: '30+ Countries',
      ticketPrice: '$300 (Standard) / $600 (VIP Dealmaker)',
      summary: "Highlighting Special Economic Zones (SEZs), diaspora remittances, renewable energy IPPs, and agro-processing opportunities in Zimbabwe.",
      overview: `A high-impact investment forum connecting global capital and Zimbabwean diaspora syndicates directly with approved ZIDA projects.`,
      speakers: [
        { name: 'Tafadzwa Chinamo', role: 'Chief Executive Officer', org: 'ZIDA', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Dec 1)', time: '09:00 - 12:00', title: 'ZIDA Project Pipeline: Fast-Tracking Foreign Direct Investment Deals', room: 'Jacaranda Room' }
      ],
      website: 'https://www.zidainvest.com'
    },
    {
      id: 22,
      title: 'DRC Mining Week 2026',
      organization: 'Vuka Group',
      sector: 'mining',
      sectorLabel: 'Mining',
      region: 'central-africa',
      regionLabel: 'Central Africa',
      city: 'Lubumbashi',
      country: 'DRC',
      venue: 'Grand Karavia Hotel & Mining Expo Grounds, Lubumbashi',
      date: '2026-10-05',
      dateDisplay: 'Oct 5–7, 2026',
      targetCountdown: '2026-10-05T09:00:00',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
      attendees: '5,000+ Mining Giants, Equipment Vendors & Regulators',
      speakersCount: '80+ Mineral Industry Leaders',
      countriesCount: '45+ Countries',
      ticketPrice: '$800 (Delegate Pass)',
      summary: "The definitive gathering for DRC's copper and cobalt belt, connecting miners with investors amid global electric vehicle energy transition demand.",
      overview: `Addressing logistics corridors along the Lobito Railway, hydro-power for smelters, local community content, and responsible critical mineral tracing.`,
      speakers: [
        { name: 'Hon. Kizito Pakabomba', role: 'Minister of Mines', org: 'Democratic Republic of Congo', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Oct 5)', time: '09:00 - 12:30', title: 'Copper & Cobalt Super-Cycle: Infrastructure and Sustainable Extraction', room: 'Karavia Ballroom' }
      ],
      website: 'https://www.drcminingweek.com'
    },
    {
      id: 23,
      title: 'Botswana Diamond & Resources Summit',
      organization: 'Ministry of Minerals & Energy, Botswana',
      sector: 'mining',
      sectorLabel: 'Mining & Gems',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Gaborone',
      country: 'Botswana',
      venue: 'Gaborone International Convention Centre (GICC)',
      date: '2026-11-22',
      dateDisplay: 'Nov 22–24, 2026',
      targetCountdown: '2026-11-22T09:00:00',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop',
      attendees: '1,600+ Diamond Traders, Mineralogists & Sovereign Funds',
      speakersCount: '50+ Diamond Experts',
      countriesCount: '30+ Countries',
      ticketPrice: '$650 (Delegate)',
      summary: "Exploring the future of diamond beneficiation, cutting & polishing factories, Debswana partnerships, and Botswana's mineral diversification.",
      overview: `A focused examination of natural gemstone provenance, rough diamond auctions, and scaling Botswana’s sovereign minerals investment fund.`,
      speakers: [
        { name: 'Hon. Lefoko Moagi', role: 'Minister of Mineral Resources', org: 'Republic of Botswana', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Nov 22)', time: '09:00 - 12:00', title: 'Diamond Beneficiation: Moving Up the Luxury Value Chain in Africa', room: 'Main Plenary' }
      ],
      website: 'https://gov.bw'
    },
    {
      id: 24,
      title: 'Mozambique Gas & LNG Summit 2026',
      organization: 'dmg events',
      sector: 'energy',
      sectorLabel: 'Energy & LNG',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Maputo',
      country: 'Mozambique',
      venue: 'Joaquim Chissano International Conference Centre (JCICC)',
      date: '2026-12-15',
      dateDisplay: 'Dec 15–17, 2026',
      targetCountdown: '2026-12-15T09:00:00',
      image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=500&fit=crop',
      attendees: '2,800+ Oil & Gas Majors, Financiers & EPC Contractors',
      speakersCount: '75+ Energy Executives',
      countriesCount: '40+ Countries',
      ticketPrice: '$1,100 (Full Delegate)',
      summary: "Unlocking the Rovuma Basin's multi-trillion cubic feet LNG potential with TotalEnergies, ENI, ExxonMobil, and regional off-takers.",
      overview: `High-level project updates on Coral Sul FLNG, Mozambique LNG Area 1, and Rovuma Area 4 developments driving domestic power and gas exports.`,
      speakers: [
        { name: 'Hon. Carlos Zacarias', role: 'Minister of Mineral Resources & Energy', org: 'Republic of Mozambique', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Dec 15)', time: '09:30 - 12:30', title: 'Rovuma Basin LNG: Accelerating Mega-Projects for Southern African Power', room: 'Grande Auditório' }
      ],
      website: 'https://www.mozambique-gas-summit.com'
    },
    {
      id: 25,
      title: 'Namibia Economic & Green Hydrogen Summit',
      organization: 'Namibia Investment Promotion & Development Board (NIPDB)',
      sector: 'energy',
      sectorLabel: 'Energy & Hydrogen',
      region: 'southern-africa',
      regionLabel: 'Southern Africa',
      city: 'Windhoek',
      country: 'Namibia',
      venue: 'Windhoek Country Club Resort',
      date: '2027-01-25',
      dateDisplay: 'Jan 25–27, 2027',
      targetCountdown: '2027-01-25T09:00:00',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
      attendees: '1,900+ Green Hydrogen Pioneers, European Off-takers & DFIs',
      speakersCount: '60+ Clean Energy Leaders',
      countriesCount: '35+ Countries',
      ticketPrice: '$500 (Delegate)',
      summary: "Positioning Namibia as Africa's green hydrogen hub with world-class wind and solar resources for green ammonia export to Europe and Asia.",
      overview: `Examining the $10B Hyphen Hydrogen Energy project in Tsau //Khaeb National Park, port infrastructure in Lüderitz, and sovereign synthetic fuel frameworks.`,
      speakers: [
        { name: 'Nangula Uaandja', role: 'CEO & Chairperson', org: 'NIPDB', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Jan 25)', time: '09:00 - 12:00', title: 'Green Hydrogen Commercialization: Pipelines, Port Infrastructure & Off-take Agreements', room: 'Kalahari Hall' }
      ],
      website: 'https://nipdb.com'
    },
    {
      id: 26,
      title: 'Tanzania Agri-Business & Food Security Forum',
      organization: 'Tanzania Investment Centre (TIC)',
      sector: 'agriculture',
      sectorLabel: 'Agriculture',
      region: 'east-africa',
      regionLabel: 'East Africa',
      city: 'Dar es Salaam',
      country: 'Tanzania',
      venue: 'Julius Nyerere International Convention Centre (JNICC)',
      date: '2027-02-28',
      dateDisplay: 'Feb 28 – Mar 2, 2027',
      targetCountdown: '2027-02-28T09:00:00',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
      attendees: '2,200+ Agribusiness Investors, Millers & Exporters',
      speakersCount: '55+ Agro-Industrialists',
      countriesCount: '30+ Countries',
      ticketPrice: '$350 (Standard)',
      summary: "Scaling Tanzania's agricultural potential from the Southern Agricultural Growth Corridor (SAGCOT) to coastal export terminals for cashew, coffee, and rice.",
      overview: `Connecting commercial irrigation developers, seed producers, and cold storage logistics operators with concessional agricultural financing.`,
      speakers: [
        { name: 'Hon. Hussein Bashe', role: 'Minister of Agriculture', org: 'United Republic of Tanzania', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Feb 28)', time: '09:30 - 12:30', title: 'SAGCOT Agribusiness Investment: Irrigation, Processing and Regional Grain Reserves', room: 'Main Plenary' }
      ],
      website: 'https://www.tic.go.tz'
    },
    {
      id: 27,
      title: 'Mauritius Fintech & Digital Innovation Week',
      organization: 'Mauritius Africa FinTech Hub (MAFH)',
      sector: 'finance',
      sectorLabel: 'Fintech & Wealth',
      region: 'east-africa',
      regionLabel: 'East Africa / Islands',
      city: 'Port Louis',
      country: 'Mauritius',
      venue: 'Swami Vivekananda International Convention Centre (SVICC)',
      date: '2027-03-30',
      dateDisplay: 'Mar 30 – Apr 1, 2027',
      targetCountdown: '2027-03-30T09:00:00',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop',
      attendees: '1,800+ Fund Managers, Digital Asset Custodians & Insurtechs',
      speakersCount: '65+ Fintech Leaders',
      countriesCount: '45+ Countries',
      ticketPrice: '$450 (Delegate)',
      summary: "Leveraging Mauritius as Africa's premier international financial centre for cross-border fund domiciliation, digital wealth, and regulatory sandboxes.",
      overview: `Bridging capital flows between Asia and Africa, licensing virtual assets under the VAIT Act, and cross-border digital taxation.`,
      speakers: [
        { name: 'Michal Szymanski', role: 'CEO', org: 'Mauritius Africa FinTech Hub', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Mar 30)', time: '09:00 - 12:00', title: 'Mauritius IFC: Structuring Cross-Border Private Equity & Digital Assets', room: 'SVICC Grand Hall' }
      ],
      website: 'https://mauritiusfintech.org'
    },
    {
      id: 28,
      title: 'Uganda Business & Investment Forum 2027',
      organization: 'Uganda Investment Authority (UIA)',
      sector: 'business',
      sectorLabel: 'Business & Energy',
      region: 'east-africa',
      regionLabel: 'East Africa',
      city: 'Kampala',
      country: 'Uganda',
      venue: 'Munyonyo Commonwealth Resort, Kampala',
      date: '2027-05-18',
      dateDisplay: 'May 18–20, 2027',
      targetCountdown: '2027-05-18T09:00:00',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=500&fit=crop',
      attendees: '2,100+ Investors, EPC Contractors & Industrialists',
      speakersCount: '55+ Leaders',
      countriesCount: '35+ Countries',
      ticketPrice: '$350 (Delegate)',
      summary: "East Africa's fastest-growing economy opens its doors to industrial parks, Tilenga/Kingfisher oil & gas pipelines, and ICT infrastructure.",
      overview: `Covering EACOP infrastructure opportunities, mineral beneficiation (rare earths & iron ore), and agro-industrial business parks.`,
      speakers: [
        { name: 'Robert Mukiza', role: 'Director General', org: 'Uganda Investment Authority', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (May 18)', time: '09:00 - 12:00', title: 'Uganda’s Industrialization Era: Oil Commercialization & Manufacturing SEZs', room: 'Speke Ballroom' }
      ],
      website: 'https://www.ugandainvest.go.ug'
    },
    {
      id: 29,
      title: 'Angola Oil & Gas Conference 2027',
      organization: 'Energy Capital & Power',
      sector: 'energy',
      sectorLabel: 'Energy & Offshore',
      region: 'central-africa',
      regionLabel: 'Central Africa',
      city: 'Luanda',
      country: 'Angola',
      venue: 'Centro de Convenções de Talatona (CCTA), Luanda',
      date: '2027-06-28',
      dateDisplay: 'Jun 28–30, 2027',
      targetCountdown: '2027-06-28T09:00:00',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop',
      attendees: '3,000+ Deepwater Operators, Regulators & Maritime Execs',
      speakersCount: '80+ Oil & Gas Authorities',
      countriesCount: '50+ Countries',
      ticketPrice: '$1,200 (Delegate)',
      summary: "Exploring Angola's post-OPEC diversification, deepwater pre-salt blocks, refining self-sufficiency, and the Lobito Corridor's regional logistics.",
      overview: `A premium gathering of ANPG, Sonangol, Chevron, Azule Energy, TotalEnergies, and ExxonMobil driving exploration and renewable power.`,
      speakers: [
        { name: 'Hon. Diamantino Azevedo', role: 'Minister of Mineral Resources, Oil & Gas', org: 'Republic of Angola', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop' }
      ],
      agenda: [
        { day: 'Day 1 (Jun 28)', time: '09:30 - 12:30', title: 'Offshore Exploration & Lobito Corridor: Unlocking Regional Energy Interdependence', room: 'Auditorium Principal' }
      ],
      website: 'https://energycapitalpower.com'
    }
  ];

  // Helper: Bookmarks state stored in localStorage
  function getSavedBookmarks() {
    try {
      const data = localStorage.getItem('nh_saved_events');
      return data ? JSON.parse(data) : [1, 2];
    } catch (e) {
      return [1, 2];
    }
  }

  function isEventBookmarked(id) {
    const list = getSavedBookmarks();
    return list.includes(Number(id));
  }

  function toggleEventBookmark(id) {
    let list = getSavedBookmarks();
    const numId = Number(id);
    const index = list.indexOf(numId);
    let added = false;
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(numId);
      added = true;
    }
    try {
      localStorage.setItem('nh_saved_events', JSON.stringify(list));
    } catch (e) {}
    updateBookmarkButtons();
    return added;
  }

  function updateBookmarkButtons() {
    document.querySelectorAll('[data-bookmark-btn]').forEach(btn => {
      const eventId = Number(btn.getAttribute('data-bookmark-btn'));
      const active = isEventBookmarked(eventId);
      if (active) {
        btn.classList.add('bookmarked');
        btn.setAttribute('title', 'Saved in Bookmarks');
      } else {
        btn.classList.remove('bookmarked');
        btn.setAttribute('title', 'Save to Bookmarks');
      }
    });
  }

  // Toast Notification Engine
  function showToast(message, type = 'success') {
    let container = document.getElementById('nhToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'nhToastContainer';
      container.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 100000;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    const isInfo = type === 'info';
    const bg = isSuccess ? '#0033cc' : isInfo ? '#0a0a0a' : '#2a9d8f';

    toast.style.cssText = `
      background: ${bg};
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 8px 24px rgba(0,0,0,0.25);
      border: 1px solid rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: auto;
      max-width: 380px;
    `;

    toast.innerHTML = `
      <span>${isSuccess ? '✓' : isInfo ? 'ℹ' : '★'}</span>
      <div>${message}</div>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(10px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // Calendar Export Logic
  function exportEventICS(eventId) {
    const event = eventsDatabase.find(e => e.id === Number(eventId)) || eventsDatabase[0];
    const startDateFormatted = event.date.replace(/-/g, '') + 'T090000Z';
    const endDateFormatted = event.date.replace(/-/g, '') + 'T170000Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NewsHub Africa//Events Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:newshub-event-${event.id}-${Date.now()}@newshub.africa`,
      `DTSTAMP:${startDateFormatted}`,
      `DTSTART:${startDateFormatted}`,
      `DTEND:${endDateFormatted}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.summary.replace(/,/g, '\\,')}\\n\\nOrganized by: ${event.organization}\\nOfficial Website: ${event.website}`,
      `LOCATION:${event.venue}\\, ${event.city}\\, ${event.country}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloaded .ics calendar invite for "${event.title}"!`, 'success');
  }

  function openGoogleCalendar(eventId) {
    const event = eventsDatabase.find(e => e.id === Number(eventId)) || eventsDatabase[0];
    const startStr = event.date.replace(/-/g, '') + 'T090000Z';
    const endStr = event.date.replace(/-/g, '') + 'T170000Z';
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.summary}\n\nOrganized by: ${event.organization}\nWebsite: ${event.website}`);
    const location = encodeURIComponent(`${event.venue}, ${event.city}, ${event.country}`);

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
    window.open(gcalUrl, '_blank');
    showToast(`Opening Google Calendar for "${event.title}"...`, 'info');
  }

  // Interactive Modal Creation & Controller
  let modalOverlay = null;

  function ensureModalDOM() {
    if (document.getElementById('nhEventModalOverlay')) {
      return document.getElementById('nhEventModalOverlay');
    }

    const overlay = document.createElement('div');
    overlay.id = 'nhEventModalOverlay';
    overlay.className = 'nh-event-modal-overlay';
    overlay.innerHTML = `
      <div class="nh-event-modal-dialog" role="dialog" aria-modal="true" id="nhEventModalDialog">
        <div class="nh-event-modal-header" id="modalHeaderSection">
          <div class="nh-modal-banner-img" id="modalBannerImg"></div>
          <button class="nh-event-modal-close" onclick="window.NewsHubEvents.closeModal()" aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <div class="nh-modal-header-content">
            <div class="nh-modal-badges">
              <span class="nh-modal-badge sector" id="modalSectorBadge">Technology</span>
              <span class="nh-modal-badge region" id="modalRegionBadge">East Africa</span>
              <span class="nh-modal-badge countdown" id="modalCountdownBadge">Upcoming</span>
            </div>
            <h2 id="modalEventTitle" class="nh-modal-title">Event Title Here</h2>
            <div class="nh-modal-meta-row">
              <div class="meta-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span id="modalEventDate">Aug 15–17, 2026</span>
              </div>
              <div class="meta-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span id="modalEventLocation">Nairobi, Kenya</span>
              </div>
              <div class="meta-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>
                <span id="modalEventAttendees">2,000+ Attendees</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="nh-modal-tabs">
          <button class="nh-modal-tab active" data-tab="overview" onclick="window.NewsHubEvents.switchTab('overview')">Overview</button>
          <button class="nh-modal-tab" data-tab="speakers" onclick="window.NewsHubEvents.switchTab('speakers')">Keynote Speakers</button>
          <button class="nh-modal-tab" data-tab="agenda" onclick="window.NewsHubEvents.switchTab('agenda')">Agenda & Tracks</button>
          <button class="nh-modal-tab highlight" data-tab="register" onclick="window.NewsHubEvents.switchTab('register')">🎟️ Register / RSVP</button>
        </div>

        <!-- Modal Body Content Panels -->
        <div class="nh-modal-body" id="modalBodyContainer">
          
          <!-- TAB: Overview -->
          <div class="nh-tab-pane active" id="tabPaneOverview">
            <div class="nh-overview-card">
              <h3>Executive Briefing</h3>
              <p id="modalOverviewText" style="white-space: pre-line; line-height: 1.7; font-size: 14.5px;"></p>
            </div>

            <div class="nh-details-grid">
              <div class="nh-detail-box">
                <div class="detail-label">Organized By</div>
                <div class="detail-val" id="modalOrganizer">Africa Tech Summit</div>
              </div>
              <div class="detail-box">
                <div class="detail-label">Exact Venue</div>
                <div class="detail-val" id="modalExactVenue">KICC Convention Centre</div>
              </div>
              <div class="detail-box">
                <div class="detail-label">Format</div>
                <div class="detail-val">In-Person & Global Live Stream</div>
              </div>
              <div class="detail-box">
                <div class="detail-label">Pricing</div>
                <div class="detail-val" id="modalTicketPrice">$450 (Delegate)</div>
              </div>
            </div>
          </div>

          <!-- TAB: Speakers -->
          <div class="nh-tab-pane" id="tabPaneSpeakers">
            <h3 style="margin-bottom: 16px; font-size: 17px; font-weight: 600;">Featured Keynotes & Panellists</h3>
            <div class="nh-speakers-grid" id="modalSpeakersList"></div>
          </div>

          <!-- TAB: Agenda -->
          <div class="nh-tab-pane" id="tabPaneAgenda">
            <h3 style="margin-bottom: 16px; font-size: 17px; font-weight: 600;">Conference Schedule & Tracks</h3>
            <div class="nh-agenda-list" id="modalAgendaList"></div>
          </div>

          <!-- TAB: Register / RSVP -->
          <div class="nh-tab-pane" id="tabPaneRegister">
            <div class="nh-registration-wrap" id="registrationFormWrap">
              <div class="reg-intro">
                <h3>Reserve Your Delegate Pass</h3>
                <p>Join ministers, institutional investors, and continental tech champions.</p>
              </div>

              <div class="nh-ticket-tiers">
                <label class="nh-ticket-tier selected" onclick="window.NewsHubEvents.selectTier(this, 'Delegate Pass ($450)')">
                  <input type="radio" name="ticketTier" value="delegate" checked style="display:none">
                  <div class="tier-top">
                    <span class="tier-name">Full Delegate Pass</span>
                    <span class="tier-price" id="tierPriceLabel">$450</span>
                  </div>
                  <div class="tier-desc">All-access 3 days, investor networking lounge, lunch & gala reception.</div>
                </label>

                <label class="nh-ticket-tier" onclick="window.NewsHubEvents.selectTier(this, 'VIP Investor Access ($950)')">
                  <input type="radio" name="ticketTier" value="vip" style="display:none">
                  <div class="tier-top">
                    <span class="tier-name">VIP Investor & Executive</span>
                    <span class="tier-price">$950</span>
                  </div>
                  <div class="tier-desc">Private deal room access, 1-on-1 ministerial meetings, VIP transport.</div>
                </label>

                <label class="nh-ticket-tier" onclick="window.NewsHubEvents.selectTier(this, 'Virtual Pass (Free)')">
                  <input type="radio" name="ticketTier" value="virtual" style="display:none">
                  <div class="tier-top">
                    <span class="tier-name">Virtual Stream Pass</span>
                    <span class="tier-price">Free</span>
                  </div>
                  <div class="tier-desc">HD live streaming of all keynotes, pitch stage, and virtual networking chat.</div>
                </label>
              </div>

              <form class="nh-rsvp-form" id="nhRsvpForm" onsubmit="window.NewsHubEvents.handleRsvpSubmit(event)">
                <div class="form-row">
                  <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" id="rsvpName" required placeholder="e.g. Tendai Moyo">
                  </div>
                  <div class="form-group">
                    <label>Work Email *</label>
                    <input type="email" id="rsvpEmail" required placeholder="e.g. tendai@enterprise.co.zw">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Organization / Company *</label>
                    <input type="text" id="rsvpOrg" required placeholder="e.g. Standard Chartered / Tech Startup">
                  </div>
                  <div class="form-group">
                    <label>Job Title / Position</label>
                    <input type="text" id="rsvpJob" placeholder="e.g. Managing Director">
                  </div>
                </div>
                <button type="submit" class="nh-btn-primary" style="width:100%; padding:14px; margin-top:12px; font-size:15px; font-weight:600; border-radius:8px; cursor:pointer;">
                  Confirm Registration & Generate Digital Pass ➔
                </button>
              </form>
            </div>

            <!-- Confirmation Badge (Hidden by default) -->
            <div id="rsvpConfirmationResult" style="display:none; text-align:center; padding: 24px 16px;">
              <div style="width:64px; height:64px; border-radius:50%; background:rgba(42,157,143,0.15); color:#2a9d8f; font-size:32px; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
                ✓
              </div>
              <h3 style="font-size:22px; margin-bottom:8px; color:var(--nh-text-primary);">Registration Confirmed!</h3>
              <p style="color:var(--nh-text-secondary); margin-bottom:20px; font-size:14px;">Your digital delegate pass has been issued and sent to your email.</p>

              <div class="nh-pass-card" id="digitalPassCard">
                <div class="pass-header">
                  <span class="pass-brand">NewsHub Africa &middot; Official Event Pass</span>
                  <span class="pass-status">CONFIRMED</span>
                </div>
                <div class="pass-body">
                  <h4 id="passEventTitle">Africa Tech Summit Nairobi</h4>
                  <div class="pass-details">
                    <div><strong>Delegate:</strong> <span id="passDelegateName">Tendai Moyo</span></div>
                    <div><strong>Organization:</strong> <span id="passDelegateOrg">Enterprise Africa</span></div>
                    <div><strong>Tier:</strong> <span id="passTierName">Full Delegate Pass</span></div>
                    <div><strong>Ref ID:</strong> <span id="passRefId">NH-EVT-89241</span></div>
                  </div>
                </div>
                <div class="pass-footer">
                  <button class="nh-btn-sm" onclick="window.NewsHubEvents.exportCalendarFromModal()">📅 Add to Calendar (.ics)</button>
                  <button class="nh-btn-sm" onclick="window.NewsHubEvents.printPass()">🖨️ Print Pass</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Modal Footer Actions -->
        <div class="nh-event-modal-footer">
          <div class="footer-left">
            <button class="nh-btn-secondary" id="btnModalBookmark" onclick="window.NewsHubEvents.toggleModalBookmark()">
              <span id="modalBookmarkIcon">♡</span> <span id="modalBookmarkText">Save Event</span>
            </button>
            <button class="nh-btn-secondary" onclick="window.NewsHubEvents.exportCalendarFromModal()">
              📅 Add to Calendar (.ics)
            </button>
            <button class="nh-btn-secondary" onclick="window.NewsHubEvents.openGCalFromModal()">
              Google Cal
            </button>
          </div>
          <div class="footer-right">
            <button class="nh-btn-secondary" onclick="window.NewsHubEvents.shareCurrentEvent()">
              🔗 Share Link
            </button>
            <a href="#" id="modalOfficialLink" target="_blank" rel="noopener noreferrer" class="nh-btn-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
              Official Site &rarr;
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        window.NewsHubEvents.closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.NewsHubEvents.closeModal();
      }
    });

    return overlay;
  }

  let currentActiveEvent = null;

  function openEventModal(eventId, initialTab = 'overview') {
    const event = eventsDatabase.find(e => e.id === Number(eventId)) || eventsDatabase[0];
    currentActiveEvent = event;

    const overlay = ensureModalDOM();

    // Populate header
    document.getElementById('modalEventTitle').textContent = event.title;
    document.getElementById('modalEventDate').textContent = event.dateDisplay;
    document.getElementById('modalEventLocation').textContent = `${event.city}, ${event.country}`;
    document.getElementById('modalEventAttendees').textContent = event.attendees;
    document.getElementById('modalSectorBadge').textContent = event.sectorLabel;
    document.getElementById('modalRegionBadge').textContent = event.regionLabel;
    document.getElementById('modalOrganizer').textContent = event.organization;
    document.getElementById('modalExactVenue').textContent = event.venue;
    document.getElementById('modalTicketPrice').textContent = event.ticketPrice;
    document.getElementById('modalOverviewText').textContent = event.overview || event.summary;
    document.getElementById('modalOfficialLink').href = event.website || '#';

    // Banner image
    const banner = document.getElementById('modalBannerImg');
    banner.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%), url('${event.image}')`;

    // Speakers list
    const speakersList = document.getElementById('modalSpeakersList');
    if (event.speakers && event.speakers.length > 0) {
      speakersList.innerHTML = event.speakers.map(s => `
        <div class="nh-speaker-card">
          <img src="${s.avatar}" alt="${s.name}" class="speaker-avatar">
          <div class="speaker-info">
            <div class="speaker-name">${s.name}</div>
            <div class="speaker-role">${s.role}</div>
            <div class="speaker-org">${s.org}</div>
          </div>
        </div>
      `).join('');
    } else {
      speakersList.innerHTML = `
        <div class="nh-speaker-card">
          <div class="speaker-avatar" style="background:var(--nh-blue);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">NH</div>
          <div class="speaker-info">
            <div class="speaker-name">Keynote Delegations</div>
            <div class="speaker-role">Continental Industry Leaders & Ministers</div>
            <div class="speaker-org">${event.organization}</div>
          </div>
        </div>
      `;
    }

    // Agenda list
    const agendaList = document.getElementById('modalAgendaList');
    if (event.agenda && event.agenda.length > 0) {
      agendaList.innerHTML = event.agenda.map(a => `
        <div class="nh-agenda-item">
          <div class="agenda-time-badge">${a.time}</div>
          <div class="agenda-details">
            <div class="agenda-day">${a.day} &middot; <span class="agenda-room">${a.room}</span></div>
            <div class="agenda-title">${a.title}</div>
          </div>
        </div>
      `).join('');
    } else {
      agendaList.innerHTML = `
        <div class="nh-agenda-item">
          <div class="agenda-time-badge">09:00 - 17:00</div>
          <div class="agenda-details">
            <div class="agenda-day">${event.dateDisplay}</div>
            <div class="agenda-title">Plenary Sessions, Networking Roundtables & Exhibition</div>
          </div>
        </div>
      `;
    }

    // Reset RSVP Form
    const formWrap = document.getElementById('registrationFormWrap');
    const confirmResult = document.getElementById('rsvpConfirmationResult');
    if (formWrap) formWrap.style.display = 'block';
    if (confirmResult) confirmResult.style.display = 'none';

    // Update bookmark button state
    updateModalBookmarkBtn(event.id);

    // Switch to initial tab
    switchTab(initialTab);

    // Open overlay
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = document.getElementById('nhEventModalOverlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  function switchTab(tabId) {
    document.querySelectorAll('.nh-modal-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    const panes = {
      overview: document.getElementById('tabPaneOverview'),
      speakers: document.getElementById('tabPaneSpeakers'),
      agenda: document.getElementById('tabPaneAgenda'),
      register: document.getElementById('tabPaneRegister')
    };

    Object.keys(panes).forEach(k => {
      if (panes[k]) {
        panes[k].classList.toggle('active', k === tabId);
      }
    });
  }

  let currentSelectedTier = 'Full Delegate Pass ($450)';

  function selectTier(element, tierName) {
    document.querySelectorAll('.nh-ticket-tier').forEach(t => t.classList.remove('selected'));
    element.classList.add('selected');
    currentSelectedTier = tierName;
  }

  function handleRsvpSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('rsvpName').value;
    const email = document.getElementById('rsvpEmail').value;
    const org = document.getElementById('rsvpOrg').value;
    const event = currentActiveEvent || eventsDatabase[0];

    const refId = `NH-${event.id}-${Math.floor(10000 + Math.random() * 90000)}`;

    document.getElementById('passEventTitle').textContent = event.title;
    document.getElementById('passDelegateName').textContent = name;
    document.getElementById('passDelegateOrg').textContent = org;
    document.getElementById('passTierName').textContent = currentSelectedTier;
    document.getElementById('passRefId').textContent = refId;

    document.getElementById('registrationFormWrap').style.display = 'none';
    document.getElementById('rsvpConfirmationResult').style.display = 'block';

    showToast(`Registration confirmed for ${name}! Pass #${refId}`, 'success');
  }

  function printPass() {
    window.print();
  }

  function updateModalBookmarkBtn(eventId) {
    const active = isEventBookmarked(eventId);
    const icon = document.getElementById('modalBookmarkIcon');
    const text = document.getElementById('modalBookmarkText');
    const btn = document.getElementById('btnModalBookmark');
    if (icon) icon.textContent = active ? '♥' : '♡';
    if (text) text.textContent = active ? 'Saved' : 'Save Event';
    if (btn) {
      if (active) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  }

  function toggleModalBookmark() {
    if (!currentActiveEvent) return;
    const added = toggleEventBookmark(currentActiveEvent.id);
    updateModalBookmarkBtn(currentActiveEvent.id);
    showToast(
      added ? `Saved "${currentActiveEvent.title}" to bookmarks!` : `Removed "${currentActiveEvent.title}" from bookmarks.`,
      added ? 'success' : 'info'
    );
  }

  function exportCalendarFromModal() {
    if (!currentActiveEvent) return;
    exportEventICS(currentActiveEvent.id);
  }

  function openGCalFromModal() {
    if (!currentActiveEvent) return;
    openGoogleCalendar(currentActiveEvent.id);
  }

  function shareCurrentEvent() {
    if (!currentActiveEvent) return;
    const url = `${window.location.origin}${window.location.pathname}#event-${currentActiveEvent.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Direct link to event copied to clipboard!', 'success');
      }).catch(() => {
        showToast(`Event link: ${url}`, 'info');
      });
    } else {
      showToast(`Event link: ${url}`, 'info');
    }
  }

  // Bind All Event Cards & Filter Engine
  function initEventCards() {
    const cards = document.querySelectorAll('.nh-events-grid .nh-event-card, .nh-event-card');
    cards.forEach((card, index) => {
      const cardId = card.getAttribute('data-id') || (index + 1);
      card.setAttribute('data-id', cardId);
      card.style.cursor = 'pointer';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View event details for event ${cardId}`);

      // Ensure card has quick actions if not present
      if (!card.querySelector('.nh-card-actions')) {
        const body = card.querySelector('.nh-event-card-body');
        if (body) {
          const actionRow = document.createElement('div');
          actionRow.className = 'nh-card-actions';
          actionRow.innerHTML = `
            <button class="nh-btn-card-primary" onclick="event.stopPropagation(); window.NewsHubEvents.openModal(${cardId});">
              View Details &rarr;
            </button>
            <button class="nh-btn-card-rsvp" onclick="event.stopPropagation(); window.NewsHubEvents.openModal(${cardId}, 'register');" title="Register / RSVP">
              🎟️ RSVP
            </button>
            <button class="nh-btn-card-cal" onclick="event.stopPropagation(); window.NewsHubEvents.exportICS(${cardId});" title="Add to Calendar">
              📅
            </button>
            <button class="nh-btn-card-bookmark" data-bookmark-btn="${cardId}" onclick="event.stopPropagation(); window.NewsHubEvents.toggleBookmark(${cardId}, this);" title="Bookmark">
              ♥
            </button>
          `;
          body.appendChild(actionRow);
        }
      }

      // Card click listener
      card.addEventListener('click', function (e) {
        if (e.target.closest('a') || e.target.closest('button')) return;
        openEventModal(cardId);
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openEventModal(cardId);
        }
      });
    });

    // Bind Hero Buttons
    const heroRegBtn = document.querySelector('a[href="#register"]');
    if (heroRegBtn) {
      heroRegBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openEventModal(1, 'register');
      });
    }

    const heroAgendaBtn = document.querySelector('a[href="#agenda"]');
    if (heroAgendaBtn) {
      heroAgendaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openEventModal(1, 'agenda');
      });
    }

    // Bind Header and Newsletter Subscribe Buttons
    document.querySelectorAll('.nh-btn').forEach(btn => {
      if (btn.textContent.trim() === 'Subscribe' && !btn.hasAttribute('data-wired')) {
        btn.setAttribute('data-wired', 'true');
        btn.removeAttribute('onclick');
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          showToast('Thank you for subscribing to NewsHub Africa Business Briefings!', 'success');
        });
      }
    });

    const newsletterForm = document.querySelector('.nh-newsletter-form');
    if (newsletterForm && !newsletterForm.hasAttribute('data-wired')) {
      newsletterForm.setAttribute('data-wired', 'true');
      newsletterForm.removeAttribute('onsubmit');
      newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value : '';
        if (emailInput) emailInput.value = '';
        showToast(`Subscribed ${email} to NewsHub Africa Daily Intelligence!`, 'success');
      });
    }

    // Update bookmark icons across the page
    updateBookmarkButtons();

    // Global Document Click Delegation for All Event Cards and Actions
    document.addEventListener('click', function (e) {
      // 1. Check if an action button inside a card was clicked
      const primaryBtn = e.target.closest('.nh-btn-card-primary');
      if (primaryBtn) {
        e.preventDefault();
        e.stopPropagation();
        const card = primaryBtn.closest('.nh-event-card');
        const id = card ? card.getAttribute('data-id') : 1;
        openEventModal(id);
        return;
      }

      const rsvpBtn = e.target.closest('.nh-btn-card-rsvp');
      if (rsvpBtn) {
        e.preventDefault();
        e.stopPropagation();
        const card = rsvpBtn.closest('.nh-event-card');
        const id = card ? card.getAttribute('data-id') : 1;
        openEventModal(id, 'register');
        return;
      }

      const calBtn = e.target.closest('.nh-btn-card-cal');
      if (calBtn) {
        e.preventDefault();
        e.stopPropagation();
        const card = calBtn.closest('.nh-event-card');
        const id = card ? card.getAttribute('data-id') : 1;
        exportEventICS(id);
        return;
      }

      const bookmarkBtn = e.target.closest('.nh-btn-card-bookmark');
      if (bookmarkBtn) {
        e.preventDefault();
        e.stopPropagation();
        const card = bookmarkBtn.closest('.nh-event-card');
        const id = card ? card.getAttribute('data-id') : 1;
        window.NewsHubEvents.toggleBookmark(id, bookmarkBtn);
        return;
      }

      // 2. Check if the card itself (or its title/image/body) was clicked
      const eventCard = e.target.closest('.nh-event-card');
      if (eventCard && !e.target.closest('a') && !e.target.closest('button')) {
        const id = eventCard.getAttribute('data-id') || 1;
        openEventModal(id);
        return;
      }
    });

    // Check URL Hash for direct modal linking e.g. #event-1
    if (window.location.hash) {
      const match = window.location.hash.match(/#event-(\d+)/);
      if (match && match[1]) {
        openEventModal(match[1]);
      }
    }
  }

  // Filter Engine
  let activeFilters = { sector: 'all', time: 'all', region: 'all', search: '' };

  function applyFilters() {
    const cards = document.querySelectorAll('.nh-events-grid .nh-event-card');
    let visible = 0;

    cards.forEach((card, index) => {
      const id = Number(card.getAttribute('data-id') || (index + 1));
      const ev = eventsDatabase.find(e => e.id === id);
      if (!ev) {
        card.classList.remove('hidden');
        visible++;
        return;
      }

      let show = true;
      if (activeFilters.sector !== 'all' && ev.sector !== activeFilters.sector) show = false;
      if (activeFilters.region !== 'all' && ev.region !== activeFilters.region) show = false;

      if (activeFilters.time !== 'all') {
        const now = new Date('2026-08-01');
        const d = new Date(ev.date);
        const days = Math.ceil((d - now) / 86400000);
        if (activeFilters.time === 'this-month') {
          if (!(d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear())) show = false;
        } else if (activeFilters.time === 'next-3') {
          if (!(days >= 0 && days <= 90)) show = false;
        } else if (activeFilters.time === '2027') {
          if (d.getFullYear() !== 2027) show = false;
        }
      }

      if (activeFilters.search) {
        const q = activeFilters.search.toLowerCase();
        const haystack = `${ev.title} ${ev.city} ${ev.country} ${ev.sectorLabel} ${ev.organization} ${ev.summary}`.toLowerCase();
        if (!haystack.includes(q)) show = false;
      }

      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    const countEl = document.getElementById('resultsCount');
    if (countEl) {
      countEl.innerHTML = `<strong>${visible}</strong> event${visible !== 1 ? 's' : ''} found`;
    }

    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
      const hasActive = activeFilters.sector !== 'all' || activeFilters.time !== 'all' || activeFilters.region !== 'all' || activeFilters.search !== '';
      clearBtn.style.display = hasActive ? 'inline-block' : 'none';
    }
  }

  function initFilterBar() {
    // Sector and Time pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', function () {
        const group = this.dataset.group;
        document.querySelectorAll(`.filter-pill[data-group="${group}"]`).forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        activeFilters[group] = this.dataset.filter;
        applyFilters();
      });
    });

    // Region Select
    const regionSelect = document.getElementById('regionSelect');
    if (regionSelect) {
      regionSelect.addEventListener('change', function () {
        activeFilters.region = this.value;
        applyFilters();
      });
    }

    // Search input
    const eventSearch = document.getElementById('eventSearch');
    if (eventSearch) {
      let timer;
      eventSearch.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
          activeFilters.search = this.value.trim();
          applyFilters();
        }, 150);
      });
    }

    // Header search
    const headerSearch = document.querySelector('.nh-search input');
    if (headerSearch) {
      headerSearch.addEventListener('input', function () {
        if (eventSearch) eventSearch.value = this.value;
        activeFilters.search = this.value.trim();
        applyFilters();
      });
    }

    // Clear Filters
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        activeFilters = { sector: 'all', time: 'all', region: 'all', search: '' };
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.filter-pill[data-filter="all"]').forEach(p => p.classList.add('active'));
        if (regionSelect) regionSelect.value = 'all';
        if (eventSearch) eventSearch.value = '';
        if (headerSearch) headerSearch.value = '';
        applyFilters();
      });
    }
  }

  // Global namespace for public calls
  window.NewsHubEvents = {
    database: eventsDatabase,
    openModal: openEventModal,
    closeModal: closeModal,
    switchTab: switchTab,
    selectTier: selectTier,
    handleRsvpSubmit: handleRsvpSubmit,
    printPass: printPass,
    exportICS: exportEventICS,
    exportCalendarFromModal: exportCalendarFromModal,
    openGCal: openGoogleCalendar,
    openGCalFromModal: openGCalFromModal,
    toggleBookmark: function (id, btn) {
      const added = toggleEventBookmark(id);
      showToast(
        added ? 'Saved to your bookmarked events!' : 'Removed from bookmarks.',
        added ? 'success' : 'info'
      );
    },
    toggleModalBookmark: toggleModalBookmark,
    shareCurrentEvent: shareCurrentEvent,
    showToast: showToast
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initEventCards();
      initFilterBar();
    });
  } else {
    initEventCards();
    initFilterBar();
  }

})();
