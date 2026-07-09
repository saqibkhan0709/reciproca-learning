const express = require("express");
const router = express.Router();

const profileController = require("./profileController");

router.post("/create", profileController.createProfile);

router.get("/editors", profileController.getAllEditors);

router.get("/all", profileController.getAllEditors);

router.get("/:username", profileController.getProfileByUsername);

router.put("/update/:id", profileController.updateProfile);

router.delete("/delete/:id", profileController.deleteProfile);

module.exports = router;
