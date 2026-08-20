const express = require('express');
const router = express.Router();
const { getMarkets, getMarketTrend } = require('../controllers/marketController');

router.get('/trend', getMarketTrend);
router.get('/', getMarkets);

module.exports = router;
