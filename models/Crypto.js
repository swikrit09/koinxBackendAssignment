const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
    updated_at: { type: Date, default: Date.now },
    historical_prices: { type: [Number], default: [] }, // Array to store past prices
});

module.exports = mongoose.model('Crypto', CryptoSchema);
