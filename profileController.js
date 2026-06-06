const EditorProfile = require("./EditorProfile");

// CREATE PROFILE
exports.createProfile = async (req, res) => {
    try {

        const profile = await EditorProfile.create(req.body);

        res.status(201).json({
            success: true,
            message: "Profile Created",
            profile
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// GET ALL EDITORS
exports.getAllEditors = async (req, res) => {
    try {

        const editors = await EditorProfile.find();

        res.status(200).json({
            success: true,
            count: editors.length,
            editors
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// GET EDITOR BY USERNAME
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

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try {

        const profile = await EditorProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
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

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// DELETE PROFILE
exports.deleteProfile = async (req, res) => {
    try {

        const profile = await EditorProfile.findByIdAndDelete(
            req.params.id
        );

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

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};