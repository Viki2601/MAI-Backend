const Job = require('../models/Job');

// Create Job
const createJob = async (req, res, next) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json({ success: true, message: "Job Posted Successfully", job });
    } catch (error) {
        next(error);
    }
};

// Get All Jobs
const getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json({ success: true, jobs });
    } catch (error) {
        next(error);
    }
};

// Get Job By ID
const getJobById = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });
        res.json({ success: true, job });
    } catch (error) {
        next(error);
    }
};

// Update Job
const updateJob = async (req, res, next) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, updatedJob });
    } catch (error) {
        next(error);
    }
};

// Delete Job
const deleteJob = async (req, res, next) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Job Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };