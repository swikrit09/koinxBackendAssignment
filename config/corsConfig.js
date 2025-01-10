const cors = require('cors');

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests from specific origins
        const allowedOrigins = [
            'http://localhost:3000', // Frontend in development
            'https://your-production-site.com', // Your production site
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Block the request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies and credentials
};

module.exports = cors(corsOptions);
