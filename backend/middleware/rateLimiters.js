/*
rate limiter = control the no. of requests a client can send within a period

why?
-- prevents ddos attacks
brute force attacks
automated abuse (bots)
api flooding
unnecesarry server load
*/

// express-rate-limit = take note/record of the number of requests being sent
const {rateLimit} = require("express-rate-limit");

// general rate limiter api
const apiLimiter = rateLimit({

    // define the time period used to count requests

    // package = expects a millisecond value
    // How many requests is safe to allow a client to make over a specific time period?
    // What is the time period? convert to milliseconds
    /*
    depends on the type api + type of endpoint

    login = 5/10 requests per 10/15 minutes

    general = 100/15 minutes
    public api = 500/15 minutes

    */

    windowMs: 15 * 60 * 1000,

    limit: 100,

    // adds the standard header
    // header = can tell the client info like the current request limit if requested
    standardHeaders : "draft-8",

    // disable the older x-rateLimit headers
    legacyHeaders: false,

    // res
    // define the res sent when the client exceeds the limit
    handler: (
        req, res
    ) => {
        return res.status(429).json({
            success: false,
            error: "Too many requests. Please try again later."
        });
        }

});

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,

    // allowing for successful requests to hit the api
    // = we are still counting these requests
    skipSuccessfulRequests: false,

    handler: (
        req, res
    ) => {
        return res.status(429).json({
            success: false,
            error: "Too many auth requests. Try again later."
        });
    }
});

module.exports = {
    apiLimiter, authLimiter
};