const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
  name: String,

  field: String,     // event field (eventType, priorityHint etc.)
  operator: String,  // equals, contains
  value: String,     // comparison value

  action: {
    type: String,
    enum: ["NOW", "LATER", "NEVER"],
  },

  reason: String,

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rule", RuleSchema);