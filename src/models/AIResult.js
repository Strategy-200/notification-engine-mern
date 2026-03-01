const mongoose = require("mongoose");

const AIResultSchema = new mongoose.Schema({
  eventId: String,
  aiDecision: String,
  confidence: Number,
  fallbackUsed: Boolean,
  model: String,
  rawResponse: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AIResult", AIResultSchema);