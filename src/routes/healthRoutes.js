const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const aiService = require("../services/aiService");

router.get("/", async (req, res) => {
  try {

    const dbStatus =
      mongoose.connection.readyState === 1 ? "UP" : "DOWN";

    const aiStatus = aiService.getAIStatus();

    res.json({
      status: "OK",
      timestamp: new Date(),
      uptime: process.uptime(),

      database: dbStatus,

      ai: {
        circuitOpen: aiStatus.circuitOpen,
        failures: aiStatus.failureCount,
        lastFailureTime: aiStatus.lastFailureTime,
      },
    });

  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      error: error.message,
    });
  }
});

module.exports = router;