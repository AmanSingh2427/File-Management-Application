const express = require('express');
const { getItems } = require('../controllers/someController');

const router = express.Router();

router.get('/', getItems);

module.exports = router;