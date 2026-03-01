require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");
const startLaterProcessor = require("./src/jobs/laterProcessor");

const app = express();

// -----------------------
// Connect Database
// -----------------------

connectDB();

// -----------------------
// Start Background Jobs
// -----------------------

startLaterProcessor();

// -----------------------
// Middleware
// -----------------------

app.use(cors());
app.use(express.json());

// -----------------------
// Routes
// -----------------------

app.use("/api/events", require("./src/routes/eventRoutes"));
app.use("/health", require("./src/routes/healthRoutes"));
app.use("/api/audits", require("./src/routes/auditRoutes"));
app.use("/api/later", require("./src/routes/laterRoutes"));
app.use("/api/rules", require("./src/routes/ruleRoutes"));
app.use("/api/metrics", require("./src/routes/metricsRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("Notification Engine API Running 🚀");
});

// -----------------------
// Start Server
// -----------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});