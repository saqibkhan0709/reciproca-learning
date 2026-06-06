const mongoose = require("mongoose");

const sampleWorkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    videoUrl: {
        type: String,
        required: true
    },

    thumbnailUrl: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: "General"
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const editorProfileSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fullName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        unique: true,
        required: true
    },

    bio: {
        type: String
    },

    skills: [{
        type: String
    }],

    experience: {
        type: Number,
        default: 0
    },

    pricing: {
        type: Number,
        default: 0
    },

    country: {
        type: String
    },

    languages: [{
        type: String
    }],

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

    badges: [{
        type: String
    }],

    sampleWorks: [sampleWorkSchema]

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "EditorProfile",
    editorProfileSchema
);