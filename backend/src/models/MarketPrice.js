const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema({
  cropId: { type: String, required: true },
  mandiId: { type: String, required: true },
  varietyId: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: Date, default: Date.now },
  source: { type: String, default: 'demo' }
}, {
  timestamps: true
});

// Index to quickly find prices for a specific crop/variety in a mandi
marketPriceSchema.index({ cropId: 1, varietyId: 1, mandiId: 1 });

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
