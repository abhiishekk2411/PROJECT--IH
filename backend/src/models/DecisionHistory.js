const mongoose = require('mongoose');

const decisionHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'demo_farmer_001',
    index: true
  },
  cropId: {
    type: String,
    required: true
  },
  varietyId: {
    type: String,
    required: true
  },
  quantityKg: {
    type: Number,
    required: true
  },
  farmerLocation: {
    type: String,
    required: true
  },
  selectedMandiId: {
    type: String,
    required: true
  },
  selectedMandiName: {
    type: String,
    required: true
  },
  selectedMandiPrice: {
    type: Number,
    required: true
  },
  expectedRevenue: {
    type: Number,
    required: true
  },
  transportCost: {
    type: Number,
    required: true
  },
  riskPenalty: {
    type: Number,
    required: true
  },
  expectedNetReturn: {
    type: Number,
    required: true
  },
  trend: {
    type: String
  },
  trendPercentage: {
    type: Number
  },
  sell_now_vs_wait: {
    type: String
  },
  weatherRiskLevel: {
    type: String
  },
  weatherRiskPercentage: {
    type: Number
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('DecisionHistory', decisionHistorySchema);
