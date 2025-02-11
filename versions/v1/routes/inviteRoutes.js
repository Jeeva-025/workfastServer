// routes/peopleRoutes.js
const express = require('express');
const router = express.Router();
const validation= require("../validation/validation");
const validUmiddleware= require("../middleware/validationMiddleware")
const inviteController = require("../controllers/inviteController")

// Route for getting all people
router.get('/', inviteController.invitedPeople);
router.post('/', validUmiddleware.validateBody(validation.validateInvitation()),inviteController.insertPeople);
router.post('/delete',inviteController.delete);

module.exports = router;