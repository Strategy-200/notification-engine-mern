const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  eventType: String,
  message: String,
  source: String,
  priorityHint: String,
  channel: String,
  metadata: Object,
  dedupeKey: String,

  classification: {
    type: String,
    enum: ["NOW", "LATER", "NEVER"],
    default: "NOW",
  },

  status: {
    type: String,
    default: "NEW",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", EventSchema);