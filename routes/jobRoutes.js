const express = require('express');
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');
const { submitApplication } = require('../controllers/applicationController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Job Routes
router.post('/createJob', createJob);
router.get('/getJobs', getJobs);
router.get('/jobs/slug/:slug', getJobById);
router.put('/updateJob/:slug', updateJob);
router.delete('/deleteJobs/:slug', deleteJob);

// Applications
router.post('/apply', upload.single('resume'), submitApplication);

module.exports = router;