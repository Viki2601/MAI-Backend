const mongoose = require("mongoose");

const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  department: { type: String, required: true },
  jobDescription: { type: String, required: true },
  qualifications: { type: String, required: true },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "internship", "contract"],
    required: true
  },
  deadline: { type: Date, required: true },
  slug: { type: String, unique: true },
}, { timestamps: true });

jobSchema.pre("save", function (next) {
  if (this.isModified("jobTitle")) {
    this.slug = createSlug(this.jobTitle);
  }
  next();
});

module.exports = mongoose.model("Job", jobSchema);