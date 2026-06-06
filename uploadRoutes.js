const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const EditorProfile = require("../models/EditorProfile");

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname)
        );
    }
});

const upload = multer({
    storage: storage
});

router.post(
    "/sample-work/:profileId",
    upload.single("video"),
    async (req, res) => {
        try {

            console.log("BODY:", req.body);
            console.log("FILE:", req.file);

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No video file received. In Thunder Client, use Body > Form and select Files."
                });
            }

            const profile = await EditorProfile.findById(
                req.params.profileId
            );

            if (!profile) {
                return res.status(404).json({
                    success: false,
                    message: "Profile Not Found"
                });
            }

            profile.sampleWorks.push({
                title: req.body.title || "Untitled Sample",
                videoUrl: "/uploads/" + req.file.filename,
                category: req.body.category || "General"
            });

            await profile.save();

            res.status(200).json({
                success: true,
                message: "Sample Work Uploaded",
                sampleWorks: profile.sampleWorks
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                success: false,
                message: "Server Error"
            });
        }
    }
);

module.exports = router;