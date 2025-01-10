const express = require('express');
const Crypto = require('../models/Crypto');

const router = express.Router();

// Calculate standard deviation for the last 100 prices
router.get('/deviation', async (req, res) => {
    const { coin } = req.query;

    try {
        const crypto = await Crypto.findOne({ name: new RegExp(`^${coin}$`, 'i') });

        if (!crypto || crypto.historical_prices.length === 0) {
            return res.status(404).json({ error: 'No price data available for this cryptocurrency' });
        }

        const prices = crypto.historical_prices;
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
        const stdDeviation = Math.sqrt(variance);

        return res.json({ deviation: parseFloat(stdDeviation.toFixed(2)) });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
