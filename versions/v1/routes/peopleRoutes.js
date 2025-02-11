const express = require('express');
const upload= require("../utils/storageUtils");
const router = express.Router();
const peopleController = require("../controllers/peopleController");
const validateMiddleware=require("../middleware/validationMiddleware")
const validate=require("../validation/validation")
// Route for getting all people
router.get('/',peopleController.getAllPeople);
router.post('/', upload.single("attachment"),validateMiddleware.validateBody(validate.validatePeopleInsert()),peopleController.insertPeople);

module.exports = router;