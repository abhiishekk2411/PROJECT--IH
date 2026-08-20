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
    analyzeNote: 'Analysis uses the latest market rates, weather data, and other insights.',
    imageInput: '📷 Take a Photo',
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

  // --- Tags and Explanations ---
  tags: {
    sell_now: 'It is better to sell now',
    wait: 'It might be better to wait a little',
    weather_risk_high: 'Rain risk is high',
    weather_risk_moderate: 'Rain risk is moderate',
    weather_risk_low: 'Weather is clear',
    weather_data_unavailable: 'Weather information is currently unavailable',
    price_trend_increasing: 'Prices are increasing at this mandi',
    price_trend_decreasing: 'Prices are decreasing at this mandi',
    price_trend_stable: 'Prices are stable at this mandi',
    better_net_return: 'Your net return is higher if you sell here',
    weather_supports_early_sale: 'Given the weather risk, it is safer to sell early'
  },

  ux: {
    bestMandiHeading: 'The Best Mandi for You',
    netReturnDesc: 'After deducting all transport costs and potential weather risks',
    approximateReturn: 'Selling here can give you an approximate net return of',
    approximateReturnEnd: '',
    ourAdvice: 'Our Advice',
    sellNowReason: 'Considering the weather risk, falling prices, or better immediate returns, it is safer to sell now.',
    waitReason: 'Considering the potential for higher prices and low weather risk, waiting might be better.',
    whyThisMandi: 'Why is this mandi better for you?',
    moneyBreakdownTitle: 'How did we calculate your earnings?',
    cropAmount: 'Crop Quantity',
    totalSale: 'Total Sale',
    trendPastDays: 'Mandi Prices over the Last 30 Days',
    trendIncreasingExp: 'Prices have been increasing over the last few days.',
    trendDecreasingExp: 'Prices have been decreasing over the last few days.',
    trendStableExp: 'Prices have been relatively stable over the last few days.',
    weatherHighExp: 'There is a high chance of rain in the next 24 hours. Delaying your sale increases the risk of crop damage.',
    weatherModerateExp: 'There is some chance of rain. It would be wise to consider the weather in your selling decision.',
    weatherLowExp: 'There is currently no significant weather risk for selling your crop.',
    rankBest: 'Best Option',
    rankGood: 'Good Option',
    rankLow: 'Lower Profit'
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
    tapToSpeak: '🎤 Tap microphone and speak',
    listening: '🔴 Listening... speak now',
    processing: 'Processing speech...',
    success: '✓ Information extracted. Please review.',
    error: 'Could not understand. Please try again.',
    unsupported: 'Voice input is not supported in this browser. Please type manually.',
    permissionDenied: 'Microphone permission denied. Please allow microphone access.',
    missingCrop: 'Could not detect crop. Please mention your crop.',
    missingLocation: 'Could not detect location. Please mention your city.',
    missingQuantity: 'Could not detect quantity. Please speak clearly, e.g. "I have 800 kg tomato."',
    example: 'Example: "I have 800 kg hybrid tomato and I live in Nashik"'
  },

  // --- Image Input ---
  imageInput: {
    title: 'Take a photo of your crop',
    subtitle: 'Take a clear photo or select one from your gallery.',
    camera: '📷 Open Camera',
    choose: '🖼️ Choose Photo',
    change: 'Change Photo',
    remove: 'Remove Photo',
    ready: 'Photo Ready',
    guidanceTitle: 'For a good photo:',
    guidance1: 'Ensure the crop is clearly visible',
    guidance2: 'Ensure adequate lighting',
    guidance3: 'Show the entire plant/fruit part',
    guidance4: 'Ensure the photo is not blurry',
    notAnalyzed: 'Automatic crop detection is currently disabled. Please confirm your crop details below.',
    errorInvalid: 'Invalid file. Please select a JPG or PNG image.',
    errorLarge: 'Photo is too large. Please select a smaller photo.'
  },

  // --- TTS Voice ---
  tts: {
    listenRecommendation: '🔊 Listen to Recommendation',
    stopListening: '⏹️ Stop',
    speechIntro: 'The best market for you is {{mandi}}.',
    speechReturn: 'Selling here could give you an approximate net return of {{amount}} rupees.',
    speechAdvice: 'Our advice is to {{advice}}.',
    speechWeather: 'Regarding weather, {{weather}}.'
  }
};

export default en;
