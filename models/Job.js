const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  department: { type: String, required: true },
  jobDescription: { type: String, required: true },
  qualifications: { type: String, required: true },
  jobType: { type: String, enum: ["Full-Time", "Part-Time", "Internship", "Contract"], required: true },
  deadline: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);