const Audit = require("../models/Audit");

exports.getAudits = async (req, res) => {
  try {

    const audits = await Audit.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(audits);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching audits",
    });
  }
};