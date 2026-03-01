const mongoose = require("mongoose");

const LaterQueueSchema = new mongoose.Schema({
  eventId: String,

  processAt: Date,

  status: {
    type: String,
    default: "PENDING",
  },

  retries: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LaterQueue", LaterQueueSchema);