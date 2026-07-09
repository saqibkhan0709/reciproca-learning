const EditorProfile = require("./EditorProfile");

exports.createProfile = async (req, res) => {
    try {
        const data = req.body;

        if (typeof data.skills === "string") {
            data.skills = data.skills.split(",").map(s => s.trim());
        }

        if (typeof data.languages === "string") {
            data.languages = data.languages.split(",").map(l => l.trim());
        }

        const profile = await EditorProfile.create(data);

        res.status(201).json({
            success: true,
            message: "Profile Created",
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

exports.getAllEditors = async (req, res) => {
    try {
        const editors = await EditorProfile.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: editors.length,
            editors,
            profiles: editors
        });

    } catch (error) {
        console.error("GET EDITORS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.getProfileByUsername = async (req, res) => {
    try {
        const profile = await EditorProfile.findOne({
            username: req.params.username
        });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile Not Found"
            });
        }

        res.status(200).json({
            success: true,
            profile
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profile = await EditorProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile Updated",
            profile
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const profile = await EditorProfile.findByIdAndDelete(req.params.id);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile Deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
