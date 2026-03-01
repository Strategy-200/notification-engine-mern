const express = require("express");
const router = express.Router();

const { getAudits } = require("../controllers/auditController");

router.get("/", getAudits);

module.exports = router;