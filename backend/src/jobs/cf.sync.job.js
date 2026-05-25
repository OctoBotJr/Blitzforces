const cron = require("node-cron");
const pool = require("../config/db");
const redis = require("../config/redis");
const { syncUser } = require("../modules/cf/cf.sync");

const SIX_HOURS = 6 * 60 * 60 * 1000;

// Runs every hour, syncs users whose last_sync > 6hrs ago
cron.schedule("0 * * * *", async () => {
  console.log("[cf.sync.job] Starting periodic sync...");

  const { rows: users } = await pool.query(`SELECT id, cf_handle FROM users`);

  for (const user of users) {
    const lastSync = await redis.get(`user:${user.id}:last_sync`);
    const due = !lastSync || Date.now() - Number(lastSync) > SIX_HOURS;
    if (!due) continue;

    try {
      await syncUser(user.id, user.cf_handle);
    } catch (err) {
      console.error(`[cf.sync.job] Failed for ${user.cf_handle}:`, err.message);
      // Don't throw — continue syncing other users
    }
  }
});
