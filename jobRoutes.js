const express = require("express");

const router = express.Router();

const {
    createJob,
    getAllJobs,
    getJobById
} = require("../jobController");

router.post("/create", createJob);

router.get("/all", getAllJobs);

router.get("/:id", getJobById);

module.exports = router;