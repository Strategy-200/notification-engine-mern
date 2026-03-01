const Rule = require("../models/Rule");

// Get all rules
exports.getRules = async (req, res) => {
  const rules = await Rule.find().sort({ createdAt: -1 });
  res.json(rules);
};

// Create rule
exports.createRule = async (req, res) => {
  const rule = await Rule.create(req.body);
  res.json(rule);
};

// Delete rule
exports.deleteRule = async (req, res) => {
  await Rule.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};