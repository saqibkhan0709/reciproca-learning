const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const EditorProfile = require("./EditorProfile");

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, {
        recursive: true
    });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        const extension = path
            .extname(file.originalname)
            .toLowerCase();

        const originalName = path
            .basename(file.originalname, extension)
            .replace(/[^a-zA-Z0-9-_]/g, "-");

        const filename =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            "-" +
            originalName +
            extension;

        cb(null, filename);
    }
});

const photoUpload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(
                new Error(
                    "Only JPG, PNG and WEBP images are allowed"
                )
            );
        }

        cb(null, true);
    }
});

const videoUpload = multer({
    storage,

    limits: {
        fileSize: 100 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {
        const allowedTypes = [
            "video/mp4",
            "video/webm",
            "video/quicktime"
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(
                new Error(
                    "Only MP4, WEBM and MOV videos are allowed"
                )
            );
        }

        cb(null, true);
    }
});

// PROFILE PHOTO UPLOAD
router.post(
    "/profile-photo/:profileId",

    function (req, res, next) {
        photoUpload.single("photo")(
            req,
            res,
            function (error) {
                if (error) {
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }

                next();
            }
        );
    },

    async function (req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No profile photo received"
                });
            }

            const profile =
                await EditorProfile.findById(
                    req.params.profileId
                );

            if (!profile) {
                return res.status(404).json({
                    success: false,
                    message: "Profile Not Found"
                });
            }

            profile.profilePhoto =
                "/uploads/" + req.file.filename;

            profile.markModified("profilePhoto");

            await profile.save();

            const updatedProfile =
                await EditorProfile.findById(
                    req.params.profileId
                );

            return res.status(200).json({
                success: true,
                message:
                    "Profile photo uploaded successfully",
                profilePhoto:
                    updatedProfile.profilePhoto,
                profile: updatedProfile
            });

        } catch (error) {
            console.error(
                "PROFILE PHOTO UPLOAD ERROR:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    }
);

// SAMPLE VIDEO UPLOAD
router.post(
    "/sample-work/:profileId",

    function (req, res, next) {
        videoUpload.single("video")(
            req,
            res,
            function (error) {
                if (error) {
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }

                next();
            }
        );
    },

    async function (req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No video file received"
                });
            }

            const profile =
                await EditorProfile.findById(
                    req.params.profileId
                );

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
                title:
                    req.body.title ||
                    "Sample Work",

                videoUrl:
                    "/uploads/" +
                    req.file.filename,

                category:
                    req.body.category ||
                    "General"
            });

            profile.markModified("sampleWorks");

            await profile.save();

            const updatedProfile =
                await EditorProfile.findById(
                    req.params.profileId
                );

            return res.status(200).json({
                success: true,
                message:
                    "Sample Work Uploaded Successfully",
                sampleWorks:
                    updatedProfile.sampleWorks,
                profile: updatedProfile
            });

        } catch (error) {
            console.error(
                "SAMPLE WORK UPLOAD ERROR:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    }
);

module.exports = router;
