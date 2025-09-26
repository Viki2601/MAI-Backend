const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationsRoute');
const { errorHandler } = require('./middlewares/errorMiddleware');
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// Static folder for resumes
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api", jobRoutes);
app.use('/api', applicationRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));