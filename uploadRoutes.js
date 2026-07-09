const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const EditorProfile = require("./EditorProfile");

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        const safeFileName = file.originalname.replace(/\s+/g, "-");

        cb(
            null,
            Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + safeFileName
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
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No video file received"
                });
            }

            const profile = await EditorProfile.findById(req.params.profileId);

            if (!profile) {
                return res.status(404).json({
                    success: false,
                    message: "Profile Not Found"
                });
            }

            if (!Array.isArray(profile.sampleWorks)) {
                profile.sampleWorks = [];
            }

            profile.sampleWorks.push({
                title: req.body.title || "Sample Work",
                videoUrl: "/uploads/" + req.file.filename,
                category: req.body.category || "General"
            });

            await profile.save();

            res.status(200).json({
                success: true,
                message: "Sample Work Uploaded Successfully",
                sampleWorks: profile.sampleWorks
            });

        } catch (error) {
            console.error("UPLOAD ERROR:", error);

            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    }
);

module.exports = router;
