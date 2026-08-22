const DecisionHistory = require('../../models/DecisionHistory');
const mongoose = require('mongoose');

const FALLBACK_HISTORY = [
  {
    _id: 'mock-hist-1',
    userId: 'demo_farmer_001',
    cropId: 'tomato',
    varietyId: 'hybrid',
    quantityKg: 800,
    farmerLocation: 'Nashik',
    selectedMandiId: 'pimpalgaon',
    selectedMandiName: 'Pimpalgaon Mandi',
    selectedMandiPrice: 24,
    expectedRevenue: 19200,
    transportCost: 1080,
    riskPenalty: 200,
    expectedNetReturn: 17920,
    trend: 'increasing',
    trendPercentage: 4.2,
    sell_now_vs_wait: 'sell_now',
    weatherRiskLevel: 'moderate',
    weatherRiskPercentage: 5,
    createdAt: new Date(Date.now() - 3600000 * 2)
  },
  {
    _id: 'mock-hist-2',
    userId: 'demo_farmer_001',
    cropId: 'onion',
    varietyId: 'red',
    quantityKg: 1500,
    farmerLocation: 'Nashik',
    selectedMandiId: 'lasalgaon',
    selectedMandiName: 'Lasalgaon Mandi',
    selectedMandiPrice: 22,
    expectedRevenue: 33000,
    transportCost: 1800,
    riskPenalty: 500,
    expectedNetReturn: 30700,
    trend: 'stable',
    trendPercentage: 0.5,
    sell_now_vs_wait: 'sell_now',
    weatherRiskLevel: 'low',
    weatherRiskPercentage: 2,
    createdAt: new Date(Date.now() - 3600000 * 24 * 2)
  },
  {
    _id: 'mock-hist-3',
    userId: 'demo_farmer_001',
    cropId: 'potato',
    varietyId: 'jyoti',
    quantityKg: 1000,
    farmerLocation: 'Pune',
    selectedMandiId: 'sinnar',
    selectedMandiName: 'Sinnar Mandi',
    selectedMandiPrice: 20,
    expectedRevenue: 20000,
    transportCost: 1200,
    riskPenalty: 0,
    expectedNetReturn: 18800,
    trend: 'increasing',
    trendPercentage: 3.1,
    sell_now_vs_wait: 'wait',
    weatherRiskLevel: 'low',
    weatherRiskPercentage: 0,
    createdAt: new Date(Date.now() - 3600000 * 24 * 5)
  }
];

const getDashboardSummary = async (userId) => {
  let history = [];
  try {
    if (mongoose.connection.readyState === 1) {
      history = await DecisionHistory.find({ userId }).sort({ createdAt: -1 }).lean();
    }
  } catch (err) {
    console.warn("DB Query Warning in dashboardService:", err.message);
  }
  
  // Use realistic fallback history if DB is empty or disconnected
  if (!history || history.length === 0) {
    history = FALLBACK_HISTORY;
  }

  const totalAnalyses = history.length;
  const latestAnalysis = history[0];
  
  const totalNetReturn = history.reduce((sum, record) => sum + (record.expectedNetReturn || 0), 0);
  const averageNetReturn = Math.round(totalNetReturn / totalAnalyses);

  return {
    totalAnalyses,
    latestCrop: latestAnalysis.cropId,
    latestMandi: latestAnalysis.selectedMandiName,
    latestNetReturn: latestAnalysis.expectedNetReturn,
    averageNetReturn,
    totalBuyers: 3, // PS 26132 buyer integration
    recentAnalyses: history.slice(0, 5)
  };
};

module.exports = {
  getDashboardSummary
};
