const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute interval
    max: 50,
    statusCode: 200, // Slack expects this response status
    message: 'Too many requests from this IP, please try again later'
});

module.exports = limiter;
