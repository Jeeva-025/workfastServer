const express = require("express");
const router = express.Router();

// Import Controllers

const inviteRoutes = require("./routes/inviteRoutes");
const peopleRoutes = require("./routes/peopleRoutes");
const channelRoutes=require("./routes/channelRoutes");
const userTeam=require("./routes/userTeamRoutes");
const team=require("./routes/teamRoutes");

// Use Controllers as Routes

router.use("/invite", inviteRoutes);
router.use("/people", peopleRoutes);
router.use("/channels", channelRoutes);

router.use("/user", userTeam);
router.use("/team", team);

module.exports = router; 