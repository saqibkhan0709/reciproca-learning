const mongoose = require("mongoose");

const sampleWorkSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        videoUrl: {
            type: String,
            required: true,
            trim: true
        },

        thumbnailUrl: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            default: "General",
            trim: true
        },

        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: true
    }
);

const editorProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        profilePhoto: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            default: "",
            trim: true
        },

        skills: {
            type: [String],
            default: []
        },

        experience: {
            type: Number,
            default: 0,
            min: 0
        },

        pricing: {
            type: Number,
            default: 0,
            min: 0
        },

        country: {
            type: String,
            default: "",
            trim: true
        },

        languages: {
            type: [String],
            default: []
        },

        reputationPoints: {
            type: Number,
            default: 0
        },

        diamondLevel: {
            type: String,
            default: "Bronze"
        },

        diamondCount: {
            type: Number,
            default: 0
        },

        badges: {
            type: [String],
            default: []
        },

        sampleWorks: {
            type: [sampleWorkSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "EditorProfile",
    editorProfileSchema
);
