const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  buyerId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  isDemo: {
    type: Boolean,
    default: false
  },
  requirements: [{
    cropId: String,
    varietyId: String,
    quantityRequiredKg: Number,
    offeredPricePerKg: Number,
    qualityGrade: String
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Buyer', buyerSchema);
