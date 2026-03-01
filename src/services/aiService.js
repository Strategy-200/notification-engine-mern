const OpenAI = require("openai");
const AIResult = require("../models/AIResult");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// -----------------------
// Circuit Breaker State
// -----------------------

let failureCount = 0;
let circuitOpen = false;
let lastFailureTime = null;

const FAILURE_THRESHOLD = 3;
const RESET_TIMEOUT = 30000; // 30 seconds

// -----------------------
// Fallback Decision
// -----------------------

const fallbackDecision = (event) => {
  return {
    aiDecision: "NOW",
    confidence: 0.5,
    fallbackUsed: true,
    rawResponse: null,
  };
};

// -----------------------
// Call AI with Circuit Breaker
// -----------------------

const callAI = async (event) => {
  try {

    // Circuit breaker check
    if (circuitOpen) {
      const now = Date.now();

      if (now - lastFailureTime > RESET_TIMEOUT) {
        circuitOpen = false;
        failureCount = 0;
      } else {
        throw new Error("Circuit breaker open");
      }
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Classify the notification into NOW, LATER, or NEVER and provide confidence.",
        },
        {
          role: "user",
          content: JSON.stringify(event),
        },
      ],
    });

    // Reset failure count after success
    failureCount = 0;

    const text = response.choices[0].message.content;

    // For simplicity, we assume NOW
    return {
      aiDecision: "NOW",
      confidence: 0.9,
      fallbackUsed: false,
      rawResponse: text,
    };

  } catch (error) {

    console.error("AI Error:", error.message);

    failureCount++;

    if (failureCount >= FAILURE_THRESHOLD) {
      circuitOpen = true;
      lastFailureTime = Date.now();
    }

    return fallbackDecision(event);
  }
};

// -----------------------
// Async Processing Function
// -----------------------

exports.processAIAsync = async (event) => {
  try {

    const aiResult = await callAI(event);

    await AIResult.create({
      eventId: event._id,
      aiDecision: aiResult.aiDecision,
      confidence: aiResult.confidence,
      fallbackUsed: aiResult.fallbackUsed,
      model: "gpt-4o-mini",
      rawResponse: aiResult.rawResponse,
    });

  } catch (error) {
    console.error("Async AI processing failed:", error);
  }
};

// -----------------------
// Health Status Export
// -----------------------

exports.getAIStatus = () => {
  return {
    circuitOpen,
    failureCount,
    lastFailureTime,
  };
};