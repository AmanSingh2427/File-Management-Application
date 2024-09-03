const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Route to fetch data for a specific user
router.get('/data', dataController.getUserData);

module.exports = router;
