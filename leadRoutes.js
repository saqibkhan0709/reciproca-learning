const express = require("express");

const router = express.Router();

const {
    unlockLead,
    getUnlockedContact
} = require("../leadController");

router.post("/unlock", unlockLead);

router.get(
    "/contact/:clientId/:editorId",
    getUnlockedContact
);

module.exports = router;