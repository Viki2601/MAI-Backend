const express = require("express");
const { createTestimonial, getTestimonials } = require("../controllers/testimonialsController");
const router = express.Router();

router.post("/testimonials", createTestimonial);
router.get("/testimonials", getTestimonials);

module.exports = router;