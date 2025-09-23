const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Job = require('../models/Job');
const Application = require('../models/Applications');

// Temporary CORS headers for each route (Vercel-safe)
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://mai-corporation.vercel.app'); // frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});


// Posting Jobs
router.post('/jobs', async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json({ message: "Job Posted Successfully", Job: newJob });
    } catch (error) {
        res.status(500).json({ error: "Failed to post job", details: error.message });
    }
});

// Get All Jobs
router.get('/getJobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Job by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: "Error fetching job" });
    }
});

// Delete Job Posting
router.delete('/delete/:id', async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        console.log("first")
        res.json({ message: "Job Deleted Successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Job Posting
router.put('/update/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (err) {
        res.status(500).json(err);
    }
});






// Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

//Check for folder exists
const fs = require('fs');
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');


// Applications
router.post('/apply', upload.single('resume'), async (req, res) => {
    try {
        const { name, email, phone, message, jobId } = req.body;
        const resume = req.file?.filename;
        const application = new Application({
            jobId,
            name,
            email,
            phone,
            message,
            resume
        });

        await application.save();
        res.status(200).json({ message: "Application submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to submit application" });
    }
});

module.exports = router;