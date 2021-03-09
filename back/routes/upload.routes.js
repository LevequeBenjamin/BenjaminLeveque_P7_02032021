/* ******************** upload.routes ******************** */

// imports
const router = require('express').Router();
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const upload = multer();

// routes
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

// exports
module.exports = router;