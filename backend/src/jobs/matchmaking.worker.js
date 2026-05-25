const { processQueue } = require("../modules/matchmaking/matchmaking.service");

// Run matchmaking worker every 5 seconds
setInterval(async () => {
  try {
    await processQueue();
  } catch (err) {
    console.error("[matchmaking.worker] Error:", err.message);
  }
}, 5000);

console.log("[matchmaking.worker] Started");
