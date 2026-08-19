// ============================================================================
// MOCK DATA — FasalNirnay Frontend
// ============================================================================
// This file contains ALL mock data used throughout the frontend.
// Replace with real backend API calls when the backend is ready.
// Every function in src/services/ currently returns data from this file.
// ============================================================================

// ----- CROP DATA -----
export const currentCrop = {
  crop: 'tomato',
  variety: 'hybrid',
  quantity: 800,
  unit: 'kg',
  location: 'nashik',
  imageUrl: null, // Will be set when user uploads
};

// ----- MANDI LIST WITH DECISION DATA -----
// Ranked by expected net return (descending)
// Note: Best mandi is NOT the one with highest price — it's the one with best net return
export const mandiList = [
  {
    id: 'm1',
    name: 'pimpalgaon',
    district: 'nashik',
    price: 24, // ₹ per kg
    pricePerQuintal: 2400,
    distance: 32, // km
    transportCost: 1080, // ₹
    revenue: 19200, // price × quantity
    riskPenalty: 200,
    netReturn: 17920, // revenue - transportCost - riskPenalty
    trend: 'increasing',
    trendPercent: +4.2,
    risk: 'low',
    rank: 1,
    isRecommended: true,
  },
  {
    id: 'm2',
    name: 'lasalgaon',
    district: 'nashik',
    price: 23,
    pricePerQuintal: 2300,
    distance: 14,
    transportCost: 520,
    revenue: 18400,
    riskPenalty: 100,
    netReturn: 17780,
    trend: 'stable',
    trendPercent: +0.8,
    risk: 'low',
    rank: 2,
    isRecommended: false,
  },
  {
    id: 'm3',
    name: 'sinnar',
    district: 'nashik',
    price: 26,
    pricePerQuintal: 2600,
    distance: 65,
    transportCost: 2100,
    revenue: 20800,
    riskPenalty: 1200,
    netReturn: 17500,
    trend: 'decreasing',
    trendPercent: -5.1,
    risk: 'moderate',
    rank: 3,
    isRecommended: false,
  },
  {
    id: 'm4',
    name: 'dindori',
    district: 'nashik',
    price: 25,
    pricePerQuintal: 2500,
    distance: 72,
    transportCost: 2400,
    revenue: 20000,
    riskPenalty: 300,
    netReturn: 17300,
    trend: 'increasing',
    trendPercent: +3.0,
    risk: 'low',
    rank: 4,
    isRecommended: false,
  },
  {
    id: 'm5',
    name: 'manmad',
    district: 'nashik',
    price: 22,
    pricePerQuintal: 2200,
    distance: 48,
    transportCost: 1560,
    revenue: 17600,
    riskPenalty: 150,
    netReturn: 15890,
    trend: 'stable',
    trendPercent: -0.5,
    risk: 'low',
    rank: 5,
    isRecommended: false,
  },
];

// ----- RECOMMENDATION -----
export const recommendation = {
  bestMandi: mandiList[0],
  crop: currentCrop,
  sellNowVsWait: 'sellNow',
  reasoningTags: [
    'best_net_return',
    'low_transport_cost',
    'increasing_price_trend',
    'low_risk',
  ],
};

// ----- PRICE HISTORY (30 days) -----
// Used for the trend chart in Results page
export const priceHistory = [
  { date: 'Jul 21', price: 20, avg: 21 },
  { date: 'Jul 22', price: 19, avg: 20.5 },
  { date: 'Jul 23', price: 21, avg: 20.7 },
  { date: 'Jul 24', price: 20, avg: 20.5 },
  { date: 'Jul 25', price: 22, avg: 20.8 },
  { date: 'Jul 26', price: 21, avg: 20.9 },
  { date: 'Jul 27', price: 23, avg: 21.3 },
  { date: 'Jul 28', price: 22, avg: 21.5 },
  { date: 'Jul 29', price: 21, avg: 21.4 },
  { date: 'Jul 30', price: 22, avg: 21.6 },
  { date: 'Jul 31', price: 23, avg: 21.9 },
  { date: 'Aug 01', price: 22, avg: 21.8 },
  { date: 'Aug 02', price: 21, avg: 21.7 },
  { date: 'Aug 03', price: 23, avg: 22.0 },
  { date: 'Aug 04', price: 24, avg: 22.3 },
  { date: 'Aug 05', price: 22, avg: 22.1 },
  { date: 'Aug 06', price: 23, avg: 22.3 },
  { date: 'Aug 07', price: 24, avg: 22.5 },
  { date: 'Aug 08', price: 23, avg: 22.4 },
  { date: 'Aug 09', price: 22, avg: 22.3 },
  { date: 'Aug 10', price: 24, avg: 22.6 },
  { date: 'Aug 11', price: 25, avg: 22.9 },
  { date: 'Aug 12', price: 24, avg: 23.0 },
  { date: 'Aug 13', price: 23, avg: 22.9 },
  { date: 'Aug 14', price: 24, avg: 23.1 },
  { date: 'Aug 15', price: 25, avg: 23.4 },
  { date: 'Aug 16', price: 24, avg: 23.3 },
  { date: 'Aug 17', price: 23, avg: 23.2 },
  { date: 'Aug 18', price: 24, avg: 23.3 },
  { date: 'Aug 19', price: 24, avg: 23.4 },
];

export const trendSummary = {
  trend: 'increasing',
  trendPercent: +4.2,
  estimatedRange: [23, 26],
  movingAvg7Day: 23.4,
};

// ----- WEATHER DATA -----
export const weatherData = {
  location: 'nashik',
  temperature: 28,
  humidity: 78,
  condition: 'partlyCloudy',
  rainProbability: 65,
  riskLevel: 'moderate',
  forecast: [
    { day: 'today', temp: 28, rain: 40, condition: 'partlyCloudy' },
    { day: 'tomorrow', temp: 26, rain: 75, condition: 'rainExpected' },
    { day: 'dayAfter', temp: 25, rain: 60, condition: 'showers' },
  ],
};

// ----- CROP IMAGE ANALYSIS -----
export const imageAnalysis = {
  quality: 'good',
  diseaseSuspected: 'noIssue',
  confidence: 'medium',
  riskLevel: 'low',
};

// ----- CHAT MESSAGES -----
export const chatMessages = [
  {
    id: 'c1',
    sender: 'user',
    text: 'chatMsg.msg1',
    timestamp: '10:30 AM',
  },
  {
    id: 'c2',
    sender: 'assistant',
    text: 'chatMsg.msg2',
    timestamp: '10:30 AM',
  },
  {
    id: 'c3',
    sender: 'user',
    text: 'chatMsg.msg3',
    timestamp: '10:31 AM',
  },
  {
    id: 'c4',
    sender: 'assistant',
    text: 'chatMsg.msg4',
    timestamp: '10:31 AM',
  },
];

export const chatSuggestions = [
  'bestMandi',
  'sellNow',
  'nearbyPrices',
  'weatherRisk',
  'compareAll',
];

// ----- HISTORY -----
export const historyEntries = [
  {
    id: 'h1',
    date: '2026-08-19',
    crop: 'tomato',
    variety: 'hybrid',
    quantity: 800,
    unit: 'kg',
    location: 'nashik',
    recommendedMandi: 'pimpalgaon',
    netReturn: 17920,
    decision: 'sellNow',
    status: 'completed',
  },
  {
    id: 'h2',
    date: '2026-08-12',
    crop: 'onion',
    variety: 'red',
    quantity: 500,
    unit: 'kg',
    location: 'nashik',
    recommendedMandi: 'lasalgaon',
    netReturn: 14200,
    decision: 'sellNow',
    status: 'completed',
  },
  {
    id: 'h3',
    date: '2026-08-05',
    crop: 'potato',
    variety: 'jyoti',
    quantity: 1200,
    unit: 'kg',
    location: 'nashik',
    recommendedMandi: 'pimpalgaon',
    netReturn: 22800,
    decision: 'wait',
    status: 'completed',
  },
  {
    id: 'h4',
    date: '2026-07-28',
    crop: 'tomato',
    variety: 'local',
    quantity: 400,
    unit: 'kg',
    location: 'nashik',
    recommendedMandi: 'sinnar',
    netReturn: 8600,
    decision: 'sellNow',
    status: 'completed',
  },
];

// ----- CROP OPTIONS -----
export const cropOptions = [
  'tomato',
  'onion',
  'potato',
  'wheat',
  'rice',
  'soybean',
  'cotton',
  'sugarcane',
  'grapes',
  'pomegranate',
];

export const unitOptions = ['kg', 'quintal'];

// ----- DASHBOARD QUICK STATS -----
export const dashboardStats = {
  totalAnalyses: 12,
  avgReturn: 16480,
  bestCrop: 'tomato',
  nearbyMandis: 5,
};
