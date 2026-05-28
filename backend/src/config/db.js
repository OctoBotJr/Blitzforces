const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

console.log("CWD:", process.cwd());
console.log("ENV:", process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Max connections in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: { rejectUnauthorized: false },
  family: 4, // Force IPv4 to avoid IPv6 issues with Supabase
});

console.log(
  process.env.DATABASE_URL ? "Connected to DB" : "DATABASE_URL not set",
);
module.exports = pool;
