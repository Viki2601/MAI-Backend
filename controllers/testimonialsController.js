const Testimonial = require("../models/Testimonials");

exports.createTestimonial = async (req, res) => {
    try {
        const { userId, name, email, profilePic, message } = req.body;
        const testimonial = await Testimonial.create({ userId, name, email, profilePic, message, });

        res.status(201).json(testimonial);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find()
            .populate("userId", "name email profilePic")
            .sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};