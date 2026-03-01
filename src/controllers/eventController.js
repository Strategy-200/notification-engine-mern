const Event = require("../models/Event");
const Audit = require("../models/Audit");
const LaterQueue = require("../models/LaterQueue");
const decisionService = require("../services/decisionService");
const aiService = require("../services/aiService");

exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;

    // -----------------------
    // Decision Pipeline
    // -----------------------

    const { decision, reason, ruleName } =
      await decisionService.processEvent(eventData);

    // -----------------------
    // Save Event
    // -----------------------

    const event = await Event.create({
      ...eventData,
      classification: decision,
    });

    // -----------------------
    // Save Audit Log
    // -----------------------

    await Audit.create({
      eventId: event._id,
      decision,
      reason,
      ruleName,
      aiUsed: true,
    });

    // -----------------------
    // Push to Later Queue
    // -----------------------

    if (decision === "LATER") {
      await LaterQueue.create({
        eventId: event._id,
        processAt: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes later
        status: "PENDING",
        retries: 0,
      });
    }

    // -----------------------
    // Trigger AI Async (NON-BLOCKING)
    // -----------------------

    aiService.processAIAsync(event);

    // -----------------------
    // Response Immediately
    // -----------------------

    res.status(201).json({
      success: true,
      decision,
      reason,
      ruleName,
      data: event,
    });

  } catch (error) {
    console.error("Event Processing Error:", error);

    res.status(500).json({
      success: false,
      message: "Error processing event",
    });
  }
};