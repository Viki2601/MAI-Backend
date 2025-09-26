const express = require('express');
const { submitApplication } = require('../controllers/applicationController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/apply', upload.single('resume'), submitApplication);

module.exports = router;