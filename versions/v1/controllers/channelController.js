const { validateChannel } = require("../validation/validation");
const Channel=require("../models/channelModel");
const moment = require("moment"); // Import moment

const controller = {};


controller.channels = async (req, res) => {
  try {
    const channels = await Channel.findAll();
    res.json(channels);
  } catch (error) {
    console.error("Error fetching channels:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


controller.Insert = async (req, res) => {
  try {
    const {channelName } = req.body;
    const response =await Channel.create({ channelName,});
    res.json(response);
  } catch (error) {
    console.error("Error inserting channel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = controller;