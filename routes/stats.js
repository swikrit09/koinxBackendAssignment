const express = require('express');
const Crypto = require('../models/Crypto');

const router = express.Router();

// Get latest data for a cryptocurrency
router.get('/stats', async (req, res) => {
    const { coin } = req.query;
    console.log(coin)
    try {
        const crypto = await Crypto.findOne({ name: new RegExp(`^${coin}$`, 'i') });

        if (!crypto) {
            return res.status(404).json({ error: 'Cryptocurrency not found' });
        }

        return res.json({
            price: crypto.current_price,
            marketCap: crypto.market_cap,
            '24hChange': crypto.price_change_percentage_24h,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
