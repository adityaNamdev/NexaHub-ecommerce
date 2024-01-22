const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');


router.post('/saveContactData', contactController.saveContactData);

module.exports = router;
