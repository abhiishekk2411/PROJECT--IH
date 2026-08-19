// ============================================================================
// English Translations — FasalNirnay
// ============================================================================

const en = {
  // --- Brand ---
  auth: {
    mobileNumber: 'Mobile Number',
    enterNumber: 'Enter 10 digit number',
    getOtp: 'Get OTP',
    enterOtp: 'Enter OTP sent to',
    verifyLogin: 'Verify & Login',
    changeNumber: 'Change Mobile Number',
  },
  brand: {
    name: 'FasalNirnay',
    tagline: 'Right Crop. Right Market. Right Decision.',
    footer: 'FasalNirnay © 2026 — Right Crop. Right Market. Right Decision.',
  },

  // --- Navigation ---
  nav: {
    dashboard: 'Dashboard',
    analyze: 'Analyze',
    chat: 'Chat',
    history: 'History',
    results: 'Results',
    login: 'Login',
    getStarted: 'Get Started',
    analyzeCrop: 'Analyze Crop',
  },

  // --- Landing Page ---
  landing: {
    heroTitleCustom: 'Apni fasal ki jaankari bharein',
    heroSubtitleCustom: 'Faisla Aapka, Hisaab Hamara',
    heroTitle1: "Take the guesswork out of the mandi price.",
    heroTitle2: 'Know where and when to sell.',
    heroSubtitle:
      'FasalNirnay compares mandi prices, transport cost, distance, price trends and risk to help you make the best selling decision.',
    analyzeCTA: 'Analyze My Crop',
    demoCTA: 'Try Demo',
    howItWorks: 'How it works',
    step1: 'Enter Crop Details',
    step2: 'Compare Markets',
    step3: 'Calculate Net Return',
    step4: 'Get Best Decision',
    feature1Title: 'Compare Nearby Mandis',
    feature1Desc: 'See prices, distance and transport cost across mandis near you.',
    feature2Title: 'Track Price Trends',
    feature2Desc: 'Understand historical price movements to time your sale better.',
    feature3Title: 'Make Informed Decisions',
    feature3Desc: 'Get a clear recommendation based on net return, not just price.',
    trustStatement: 'Decision support based on market data, historical trends and local conditions.',
  },

  // --- Dashboard ---
  dashboard: {
    welcome: 'Good morning, Farmer',
    welcomeSubtitle: "Let's find the best market for your crop.",
    startNewAnalysis: 'Start New Analysis',
    totalAnalyses: 'Total Analyses',
    avgNetReturn: 'Avg. Net Return',
    bestPerformingCrop: 'Best Performing Crop',
    nearbyMandis: 'Nearby Mandis',
    latestRecommendation: 'Latest Recommendation',
    viewFullAnalysis: 'View Full Analysis',
    quickActions: 'Quick Actions',
    analyzeNewCrop: 'Analyze New Crop',
    compareMarkets: 'Compare Markets',
    askCropAssistant: 'Ask Crop Assistant',
  },

  // --- Analyze Page ---
  analyze: {
    title: 'Tell us about your crop',
    subtitle: 'Enter your crop details to get a personalized selling recommendation.',
    typeDetails: 'Type Details',
    voiceInput: 'Voice Input',
    crop: 'Crop',
    variety: 'Variety',
    quantity: 'Quantity',
    location: 'Location',
    cropImage: 'Crop Image (Optional)',
    locationPlaceholder: 'Enter your village or city',
    varietyPlaceholder: 'e.g. Desi',
    quantityPlaceholder: 'Enter amount',
    analyzeCrop: 'Analyze Crop',
    analyzeNote: 'Your recommendation will consider market price, distance, transport cost, trends and risk.',
  },

  // --- Results Page ---
  results: {
    title: 'Your Selling Recommendation',
    subtitle: 'Based on current market prices, distance, transport cost, trends and risk analysis.',
    mandiComparison: 'Mandi Comparison',
    estimatedPriceRange: 'Estimated Price Range',
    priceRangeDisclaimer: 'Based on historical price trend analysis, not a guaranteed forecast.',
    sellNowOrWait: 'Should you sell now or wait?',
    cropImageAssessment: 'Crop Image Assessment',
    imageDisclaimer: 'Indicative image-based assessment, not a diagnosis.',
    sellNowReason: 'Moderate rain risk in the next 48 hours combined with stable-to-increasing prices at Pimpalgaon make selling now the safer choice. Waiting could expose your crop to weather damage and price drops at further mandis.',
    explanation: 'Although Sinnar Mandi currently offers the highest price (₹26/kg), Pimpalgaon Mandi provides the best expected net return of ₹17,920 after accounting for lower transport cost (₹1,080) and minimal risk. The price trend at Pimpalgaon is also increasing (+4.2%), making it the most favorable option for 800 kg of Hybrid Tomato from Nashik.',
  },

  // --- Chat Page ---
  chat: {
    title: 'Crop Assistant',
    subtitle: 'Ask about prices, markets or when to sell.',
    inputPlaceholder: 'Type your message...',
    voiceComingSoon: 'Voice input coming soon',
  },

  // --- History Page ---
  historyPage: {
    title: 'Decision History',
    subtitle: 'Your previous crop selling recommendations.',
    viewDetails: 'View Details',
    noDecisions: 'No decisions yet',
    noDecisionsSubtitle: 'Start by analyzing your crop to get personalized selling recommendations.',
    startNewAnalysis: 'Start New Analysis',
  },

  // --- Common Labels (shared across components) ---
  common: {
    price: 'Price',
    currentPrice: 'Current Price',
    distance: 'Distance',
    transport: 'Transport',
    transportCost: 'Transport Cost',
    trend: 'Trend',
    priceTrend: 'Price Trend',
    risk: 'Risk',
    weatherRisk: 'Weather Risk',
    netReturn: 'Net Return',
    expectedNetReturn: 'Expected Net Return',
    recommendedMandi: 'Recommended Mandi',
    bestOption: 'Best Option',
    whyThisMandi: 'Why this mandi?',
    increasing: 'Increasing',
    decreasing: 'Decreasing',
    stable: 'Stable',
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    sellNow: 'Sell Now',
    wait: 'Wait',
    perKg: '/kg',
    km: 'km',
    away: 'away',
    thisWeek: 'this week',
    rainProbability: 'rain probability',
    quantity: 'Quantity',
    remove: 'Remove',
    kg: 'kg',
    quintal: 'quintal',
  },

  // --- Data Mappings ---
  crops: {
    tomato: 'Tomato',
    onion: 'Onion',
    potato: 'Potato',
    wheat: 'Wheat',
    rice: 'Rice',
    soybean: 'Soybean',
    cotton: 'Cotton',
    sugarcane: 'Sugarcane',
    grapes: 'Grapes',
    pomegranate: 'Pomegranate',
    maize: 'Maize',
    chilli: 'Chilli',
    brinjal: 'Brinjal',
    cabbage: 'Cabbage',
    cauliflower: 'Cauliflower',
  },

  varieties: {
    hybrid: 'Hybrid',
    red: 'Red',
    jyoti: 'Jyoti',
    local: 'Local',
  },

  mandis: {
    pimpalgaon: 'Pimpalgaon Mandi',
    lasalgaon: 'Lasalgaon Mandi',
    sinnar: 'Sinnar Mandi',
    dindori: 'Dindori Mandi',
    manmad: 'Manmad Mandi',
  },

  locations: {
    nashik: 'Nashik',
  },

  conditions: {
    partlyCloudy: 'Partly Cloudy',
    rainExpected: 'Rain Expected',
    showers: 'Showers',
  },
  
  imageAnalysis: {
    good: 'Good',
    noIssue: 'No significant issue detected',
    medium: 'Medium',
    quality: 'Quality',
    disease: 'Disease',
    confidence: 'Confidence',
  },

  chatMsg: {
    msg1: 'I have 800 kg hybrid tomato near Nashik. Which mandi is better?',
    msg2: 'Based on current market prices, distance and estimated transport cost, Pimpalgaon Mandi currently gives the highest expected net return of ₹17,920 for your 800 kg of Hybrid Tomato. Although Sinnar Mandi has a higher price (₹26/kg), the transport cost and moderate risk reduce its net return.',
    msg3: 'Should I sell now or wait?',
    msg4: 'I recommend selling now. There is moderate rain risk in the next 48 hours which could affect transport and market conditions. The price trend at Pimpalgaon is increasing, but waiting carries weather-related risk. Selling now at Pimpalgaon Mandi gives you the best balance of return and safety.',
  },

  suggestions: {
    bestMandi: 'Best mandi for my crop',
    sellNow: 'Should I sell now?',
    nearbyPrices: 'Show nearby mandi prices',
    weatherRisk: 'Is weather risky?',
    compareAll: 'Compare all markets',
  },

  // --- Weather ---
  weather: {
    title: 'Weather Risk',
    rainProbability: 'Rain Probability',
    temperature: 'Temperature',
    riskLevel: 'Risk Level',
    forecast: 'Forecast',
    today: 'Today',
    tomorrow: 'Tomorrow',
    dayAfter: 'Day After',
    warning: 'Heavy rainfall possible in the next 48 hours. Consider selling soon to avoid transport delays.',
  },

  // --- Trend Chart ---
  trend: {
    historicalPriceTrend: 'Historical Price Trend',
    pricePerKg: 'Price (₹/kg)',
    dailyPrice: 'Daily Price',
    sevenDayAvg: '7-Day Average',
  },

  // --- Image Upload ---
  imageUpload: {
    uploadTitle: 'Upload a clear crop image',
    uploadSubtitle: 'Drag & drop or click to browse',
  },

  // --- Voice Input ---
  voice: {
    tapToSpeak: 'Tap to speak your crop details',
    comingSoon: 'Voice input coming soon',
  },
};

export default en;
