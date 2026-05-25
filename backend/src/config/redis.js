const { createClient } = require("redis");
const { CLIENT_KILL_FILTERS } = require("redis/dist");

const redis = createClient({ url: process.env.REDIS_URL });

redis.on("error", (err) => console.error("Redis error:", err));

(async () => await redis.connect())();
console.log("connected");
module.exports = redis;
