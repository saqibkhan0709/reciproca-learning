const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const jobRoutes = require("./jobRoutes");
const applicationRoutes = require("./applicationRoutes");
const leadRoutes = require("./leadRoutes");
const reviewRoutes = require("./reviewRoutes");
const uploadRoutes = require("./uploadRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(__dirname));

// Uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Frontend routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
    res.redirect("/new-register.html");
});

app.get("/register", (req, res) => {
    res.redirect("/new-register.html");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/lead", leadRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
