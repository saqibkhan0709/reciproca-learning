const express = require("express");

const router = express.Router();

const {
addReview,
getEditorReviews
} = require("./reviewController");

router.post("/add", addReview);

router.get(
"/editor/",
getEditorReviews
);

module.exports = router;