const mongoose = require("mongoose");

const editorProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    name: String,
    bio: String,
    experience: String,
    pricing: String,
    country: String,
    languages: String,
    skills: String,
    specialization: String,

    profilePhoto: String,
    showreelVideo: String,
    sampleVideos: [String],

    phone: String,
    whatsapp: String,
    email: String,

    diamonds: {
        type: Number,
        default: 0
    },

    reputation: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("EditorProfile", editorProfileSchema);
