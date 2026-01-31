const express = require('express');
const { addVehicle, assignDriver}= require('../controllers/vehicle.controller.js');
const rateLimiter = require('../middlewares/rateLimiter.js');
const router = express.Router();

router.post('/add', rateLimiter, addVehicle);
router.post('/assign-driver/:vehicleId', assignDriver);
module.exports = router;