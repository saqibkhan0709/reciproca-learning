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

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

// MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

// Home Route
app.get("/", (req, res) => {
    res.send("RECIPROCA Backend Running");
});

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/job", jobRoutes);

app.use(
    "/api/application",
    applicationRoutes
);

app.use("/api/lead", leadRoutes);

app.use("/api/review", reviewRoutes);

app.use("/api/upload", uploadRoutes);

// Start Server
const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});