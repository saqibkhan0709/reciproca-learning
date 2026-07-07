const express = require("express");
const router = express.Router();

const {
    createProfile,
    getAllProfiles
} = require("./profileController");

router.post("/create", createProfile);
router.get("/all", getAllProfiles);

module.exports = router;
