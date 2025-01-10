const axios = require('axios');
const Crypto = require('../models/Crypto');

const fetchCryptoPrices = async () => {
    try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'bitcoin,ethereum,matic-network',
                vs_currencies: 'usd',
                include_market_cap: 'true',
                include_24hr_change: 'true',
            },
        });

        const cryptoData = [
            { name: 'Bitcoin', symbol: 'BTC', ...data.bitcoin },
            { name: 'Ethereum', symbol: 'ETH', ...data.ethereum },
            { name: 'Matic', symbol: 'MATIC', ...data['matic-network'] },
        ];

        for (const crypto of cryptoData) {
            const existingCrypto = await Crypto.findOne({ symbol: crypto.symbol });

            if (existingCrypto) {
                // Update the record and append the price to historical_prices
                existingCrypto.historical_prices.push(crypto.usd);
                if (existingCrypto.historical_prices.length > 100) {
                    existingCrypto.historical_prices.shift(); // Keep only last 100 records
                }
                existingCrypto.current_price = crypto.usd;
                existingCrypto.market_cap = crypto.usd_market_cap;
                existingCrypto.price_change_percentage_24h = crypto.usd_24h_change;
                existingCrypto.updated_at = Date.now();
                await existingCrypto.save();
            } else {
                // Create a new record
                await Crypto.create({
                    name: crypto.name,
                    symbol: crypto.symbol,
                    current_price: crypto.usd,
                    market_cap: crypto.usd_market_cap,
                    price_change_percentage_24h: crypto.usd_24h_change,
                    historical_prices: [crypto.usd],
                });
            }
        }

        console.log('Cryptocurrency prices updated successfully.');
    } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error.message);
    }
};

module.exports = fetchCryptoPrices;
