const rateLimiters = {};
const rateLimiter = (req, res , next)=>{
    const ip = req.ip;
    const now = Date.now();
    if(!rateLimiters[ip]) rateLimiters[ip] = [];
    rateLimiters[ip] = rateLimiters[ip].filter(t => now - t < 60000);
    if(rateLimiters[ip].length >= 3){
        return res.status(429).json({error:"Too many requests, please try again later."});
    }
    rateLimiters[ip].push(now);
    next();
};
module.exports = rateLimiter;