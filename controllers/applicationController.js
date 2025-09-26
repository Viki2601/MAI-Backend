const Application = require('../models/Applications');

// Submit Application
const submitApplication = async (req, res, next) => {
    try {
        const { jobId, name, email, phone, location, experience, gender, noticePeriod, education, portfolio, expectedSalary, dob, message } = req.body;
        console.log(req.body);
        const resumePath = req.file ? req.file.path : null;
        const application = new Application({ jobId, name, email, phone, location, experience, gender, noticePeriod, education, portfolio, expectedSalary, dob, message, resumePath, });
        await application.save();
        res.status(201).json({ success: true, message: "Application submitted successfully", application, });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitApplication };