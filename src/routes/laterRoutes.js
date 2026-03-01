const express = require("express");
const router = express.Router();

const { getLaterQueue } = require("../controllers/laterController");

router.get("/", getLaterQueue);

module.exports = router;