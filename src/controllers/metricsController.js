const Event = require("../models/Event");
const LaterQueue = require("../models/LaterQueue");
const Audit = require("../models/Audit");

exports.getMetrics = async (req, res) => {
  try {

    const totalEvents = await Event.countDocuments();

    const nowCount = await Event.countDocuments({
      classification: "NOW",
    });

    const laterCount = await Event.countDocuments({
      classification: "LATER",
    });

    const neverCount = await Event.countDocuments({
      classification: "NEVER",
    });

    const queueSize = await LaterQueue.countDocuments({
      status: "PENDING",
    });

    res.json({
      totalEvents,
      nowCount,
      laterCount,
      neverCount,
      queueSize,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Metrics error",
    });
  }
};