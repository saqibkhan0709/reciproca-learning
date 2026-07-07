const EditorProfile = require("./EditorProfile");

exports.createProfile = async (req, res) => {
    try {
        const {
            userId,
            name,
            bio,
            experience,
            pricing,
            country,
            languages,
            skills,
            specialization,
            phone,
            whatsapp,
            email,
            profilePhoto,
            showreelVideo,
            sampleVideos
        } = req.body;

        const profile = await EditorProfile.create({
            userId,
            name,
            bio,
            experience,
            pricing,
            country,
            languages,
            skills,
            specialization,
            phone,
            whatsapp,
            email,
            profilePhoto,
            showreelVideo,
            sampleVideos
        });

        res.status(201).json({
            success: true,
            message: "Editor profile created successfully",
            profile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await EditorProfile.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: profiles.length,
            profiles
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.getProfileById = async (req, res) => {
    try {
        const profile = await EditorProfile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        res.status(200).json({
            success: true,
            profile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
