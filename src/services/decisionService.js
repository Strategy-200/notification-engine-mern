const Event = require("../models/Event");
const Rule = require("../models/Rule");

exports.processEvent = async (eventData) => {

  // Dedup + fatigue logic same as before...

  // -----------------------
  // Dynamic Rules
  // -----------------------

  const rules = await Rule.find({ isActive: true });

  for (const rule of rules) {
    const eventValue = eventData[rule.field];

    if (!eventValue) continue;

    let match = false;

    if (rule.operator === "equals") {
      match = eventValue === rule.value;
    }

    if (rule.operator === "contains") {
      match = eventValue.includes(rule.value);
    }

    if (match) {
      return {
        decision: rule.action,
        reason: rule.reason,
        ruleName: rule.name,
      };
    }
  }

  // Default

  return {
    decision: "NOW",
    reason: "Default decision",
    ruleName: "default",
  };
};