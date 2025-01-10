const express = require('express');
const connectDB = require('./config/db');
const fetchCryptoPrices = require('./jobs/fetchPrices');
const schedule = require('node-schedule');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Schedule background job to run every 2 hours
schedule.scheduleJob('0 */2 * * *', fetchCryptoPrices);

// Middleware for parsing JSON
app.use(express.json());

//Testing route
app.get("/", (req, res) => {
    res.send("Server is running");
})


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
