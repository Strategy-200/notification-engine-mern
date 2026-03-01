const LaterQueue = require("../models/LaterQueue");

exports.getLaterQueue = async (req, res) => {
  try {

    const items = await LaterQueue.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(items);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching queue",
    });
  }
};