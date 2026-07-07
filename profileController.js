const EditorProfile = require("./EditorProfile");

exports.createProfile = async (req, res) => {
    try {
        const profile = await EditorProfile.create(req.body);

        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            profile
        });

    } catch (error) {
        console.error("PROFILE CREATE ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await EditorProfile.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            profiles
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
