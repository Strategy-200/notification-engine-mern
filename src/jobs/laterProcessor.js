const cron = require("node-cron");
const LaterQueue = require("../models/LaterQueue");

const startLaterProcessor = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Running Later Queue Processor...");

    const now = new Date();

    const items = await LaterQueue.find({
      status: "PENDING",
      processAt: { $lte: now },
    });

    for (const item of items) {
      try {
        console.log("Processing item:", item.eventId);

        // Mark completed
        item.status = "DONE";
        await item.save();

      } catch (error) {
        console.error("Processing failed:", error);

        item.retries += 1;
        await item.save();
      }
    }
  });
};

module.exports = startLaterProcessor;