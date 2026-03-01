const mongoose = require("mongoose");

const AuditSchema = new mongoose.Schema({
  eventId: String,

  decision: {
    type: String,
    enum: ["NOW", "LATER", "NEVER"],
  },

  reason: String,

  ruleName: String,

  aiUsed: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Audit", AuditSchema);