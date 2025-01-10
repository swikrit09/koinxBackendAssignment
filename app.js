const express = require('express');
const connectDB = require('./config/db');
const fetchCryptoPrices = require('./jobs/fetchPrices');
const schedule = require('node-schedule');
const statsRouter = require('./routes/stats')
const deviationRouter = require('./routes/deviation')
const corsOptions = require('./config/corsConfig')
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

//Cors configurations
app.use(corsOptions)


// Schedule background job to run every 2 hours
schedule.scheduleJob('0 */2 * * *', fetchCryptoPrices);

// Middleware for parsing JSON
app.use(express.json());

//Testing route
app.get("/", (req, res) => {
    res.send("Server is running");
})

// API routes
app.use('/api/v1', statsRouter);
app.use('/api/v1', deviationRouter);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
