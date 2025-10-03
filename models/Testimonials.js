const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        email: { type: String },
        profilePic: { type: String },
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);