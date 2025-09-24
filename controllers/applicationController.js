const Application = require('../models/Applications');

// Submit Application
const submitApplication = async (req, res, next) => {
    try {
        const { name, email, phone, message, jobId } = req.body;
        const resumePath = req.file ? req.file.path : null;

        const application = new Application({
            jobId,
            name,
            email,
            phone,
            message,
            resumePath,
        });

        await application.save();
        res.status(201).json({ success: true, message: "Application submitted successfully", application });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitApplication };