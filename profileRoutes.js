const express = require("express");
const router = express.Router();

const {
    createProfile,
    getAllEditors,
    getProfileByUsername,
    updateProfile,
    deleteProfile
} = require("./profileController");

router.post("/create", createProfile);

router.get("/editors", getAllEditors);

router.get("/:username", getProfileByUsername);

router.put("/update/:id", updateProfile);

router.delete("/delete/:id", deleteProfile);

module.exports = router;