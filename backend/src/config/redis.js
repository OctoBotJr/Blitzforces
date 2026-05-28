const { createClient } = require("redis");

const redis = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

redis.on("error", (err) => console.error("Redis error:", err));

(async () => await redis.connect())();
console.log("connected");
module.exports = redis;
