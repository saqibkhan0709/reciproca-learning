const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    editorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EditorProfile",
        required: true
    },

    coverLetter: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Shortlisted",
            "Accepted",
            "Rejected"
        ],
        default: "Pending"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Application",
    applicationSchema
);