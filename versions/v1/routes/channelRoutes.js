const express = require('express');
const router = express.Router();
const validation= require("../validation/validation")
const validUmiddleware= require("../middleware/validationMiddleware")
const channelController = require("../controllers/channelController");

// Route for getting all people
router.get('/', channelController.channels);
router.post('/',validUmiddleware.validateBody(validation.validateChannel()),channelController.Insert);

module.exports = router;