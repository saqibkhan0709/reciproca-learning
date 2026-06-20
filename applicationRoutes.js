const express = require("express");
const router = express.Router();

const {
    applyToJob,
    getAllApplications,
    getApplicationsByJob,
    updateApplicationStatus,
    getApplicationsByStatus
} = require("./applicationController");

router.post("/apply", applyToJob);
router.get("/all", getAllApplications);
router.get("/job/:jobId", getApplicationsByJob);
router.put("/status/:id", updateApplicationStatus);
router.get("/status/:status", getApplicationsByStatus);

module.exports = router;
