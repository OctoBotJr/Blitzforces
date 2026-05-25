const { pool } = require("./db"); // Adjust path as needed

//test b connection to the database
async function testConnection() {
  try {
    const res = await pool.query(`
  SELECT 
    current_database() AS db, 
    NOW() AS time
`);
    console.log("✅ Connected to:", res.rows[0].db);
    console.log("🕒 Server Time:", res.rows[0].time);
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection Error:", err.message);
    process.exit(1);
  }
}

testConnection();

// const redis = require('./src/config/redis');
