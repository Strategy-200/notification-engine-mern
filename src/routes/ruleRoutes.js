const express = require("express");
const router = express.Router();

const {
  getRules,
  createRule,
  deleteRule,
} = require("../controllers/ruleController");

router.get("/", getRules);
router.post("/", createRule);
router.delete("/:id", deleteRule);

module.exports = router;