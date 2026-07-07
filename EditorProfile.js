const mongoose = require("mongoose");

const editorProfileSchema = new mongoose.Schema({
    name: String,
    username: String,
    bio: String,
    skills: String,
    experience: String,
    pricing: String,
    country: String,
    languages: String,
    sampleTitle: String,
    sampleDescription: String,
    sampleVideo: String,
    email: String,
    phone: String,
    whatsapp: String,
    diamonds: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("EditorProfile", editorProfileSchema);
