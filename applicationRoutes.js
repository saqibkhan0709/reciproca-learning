const express = require("express");
const router = express.Router();

const appController = require("./applicationController");

console.log("applyToJob =", typeof appController.applyToJob);
console.log("getAllApplications =", typeof appController.getAllApplications);
console.log("getApplicationsByJob =", typeof appController.getApplicationsByJob);
console.log("updateApplicationStatus =", typeof appController.updateApplicationStatus);
console.log("getApplicationsByStatus =", typeof appController.getApplicationsByStatus);

router.post("/apply", appController.applyToJob);
router.get("/all", appController.getAllApplications);
router.get("/job/:jobId", appController.getApplicationsByJob);
router.put("/status/:id", appController.updateApplicationStatus);
router.get("/status/:status", appController.getApplicationsByStatus);

module.exports = router;
