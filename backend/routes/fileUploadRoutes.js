const express = require('express');
const { upload, handleFileUpload } = require('../controllers/fileUploadController');

const router = express.Router();

router.post('/upload', upload.single('file'), handleFileUpload);

module.exports = router;
