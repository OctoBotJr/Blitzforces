const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../config/db");
const { syncUser } = require("../cf/cf.sync");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "7d";

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

function formatUser(row) {
  return {
    id: row.id,
    email: row.email,
    cfHandle: row.cf_handle,
    cfRating: row.cf_rating,
    cfTier: row.cf_tier,
    blitzforcePoints: row.blitzforce_points,
    mode: "registered",
  };
}

async function register({ email, password, cfHandle }) {
  // 1. Check duplicates
  const existing = await pool.query(
    "SELECT id FROM users WHERE email = $1 OR cf_handle = $2",
    [email, cfHandle],
  );
  if (existing.rows.length > 0) {
    throw new Error("Email or CF handle already registered");
  }

  // 2. Hash password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // 3. Insert user
  const { rows } = await pool.query(
    `INSERT INTO users (email, password_hash, cf_handle)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [email, passwordHash, cfHandle],
  );
  const user = rows[0];

  // 4. Sync CF data (rating + solved problems) — non-blocking on failure
  try {
    await syncUser(user.id, cfHandle);
    // Re-fetch to get updated rating/tier after sync
    const updated = await pool.query("SELECT * FROM users WHERE id = $1", [
      user.id,
    ]);
    const token = generateToken(user.id);
    return { user: formatUser(updated.rows[0]), token };
  } catch (err) {
    console.error("[auth] CF sync failed on register:", err.message);
    // Still let user in — sync will retry on next login
    const token = generateToken(user.id);
    return { user: formatUser(user), token };
  }
}

async function login({ email, password }) {
  // 1. Find user
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (rows.length === 0) throw new Error("Invalid email or password");

  const user = rows[0];

  // 2. Verify password
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Invalid email or password");

  // 3. Sync CF data on login (non-blocking on failure)
  try {
    await syncUser(user.id, user.cf_handle);
    const updated = await pool.query("SELECT * FROM users WHERE id = $1", [
      user.id,
    ]);
    const token = generateToken(user.id);
    return { user: formatUser(updated.rows[0]), token };
  } catch (err) {
    console.error("[auth] CF sync failed on login:", err.message);
    const token = generateToken(user.id);
    return { user: formatUser(user), token };
  }
}

module.exports = { register, login };
