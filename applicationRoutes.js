const express = require("express");

const router = express.Router();

const {
    applyToJob,
    getAllApplications,
    getApplicationsByJob,
    updateApplicationStatus,
    getApplicationsByStatus
} = require("./applicationController");

// APPLY
router.post("/apply", applyToJob);

// GET ALL
router.get("/all", getAllApplications);

// GET BY JOB
router.get("/job/:jobId", getApplicationsByJob);

// UPDATE STATUS
router.put("/status/:id", updateApplicationStatus);

// GET BY STATUS
router.get("/status/:status", getApplicationsByStatus);

module.exports = router;