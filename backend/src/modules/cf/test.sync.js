require("dotenv").config();
const { syncUser } = require("./cf.sync");

(async () => {
  try {
    await syncUser(1, "tourist"); // replace 1 with your returned id
    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
