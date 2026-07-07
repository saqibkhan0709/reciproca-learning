const express = require("express");
const router = express.Router();

const {
    createProfile,
    getAllProfiles,
    getProfileById
} = require("./profileController");

router.post("/create", createProfile);

router.get("/all", getAllProfiles);

router.get("/:id", getProfileById);

module.exports = router;
