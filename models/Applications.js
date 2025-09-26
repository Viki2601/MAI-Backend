const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        location: { type: String },
        experience: { type: String },
        gender: { type: String, enum: ["Male", "Female", "Other"] },
        noticePeriod: { type: String },
        education: { type: String },
        portfolio: { type: String },
        expectedSalary: { type: String },
        dob: { type: Date },
        message: { type: String },
        resumePath: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);