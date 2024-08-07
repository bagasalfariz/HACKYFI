// routes/mission.js
const express = require("express");
const router = express.Router();
const Mission = require("../models/Mission");
const User = require("../models/User");

router.post("/complete", async (req, res) => {
  const { userId, missionId } = req.body;
  try {
    const user = await User.findById(userId);
    const mission = await Mission.findById(missionId);
    if (!user || !mission) {
      return res.status(404).send("User or Mission not found");
    }
    user.coins += mission.reward;
    user.missionsCompleted += 1;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
