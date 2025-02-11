const express = require("express");
const router = express.Router();
const validate= require("../validation/validation")
const validation= require("../middleware/validationMiddleware")

const userController = require("../controllers/userTeamController");

router.post("/insert", validation.validateBody(validate.validateUser()),userController.Insert);
router.get("/", userController.findAll);
router.get("/:id", userController.findUsersByTeamName);
module.exports = router;