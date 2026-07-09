const mongoose = require("mongoose");

const editorProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },

    fullName: String,
    name: String,
    username: String,
    bio: String,

    skills: {
        type: [String],
        default: []
    },

    experience: {
        type: Number,
        default: 0
    },

    pricing: {
        type: Number,
        default: 0
    },

    country: String,

    languages: {
        type: [String],
        default: []
    },

    sampleTitle: String,
    sampleDescription: String,
    sampleVideo: String,

    phone: String,
    whatsapp: String,
    email: String,

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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("EditorProfile", editorProfileSchema);
