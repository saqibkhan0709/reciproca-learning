const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    budget: {
        type: Number,
        required: true
    },

    deadline: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Open"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Job", jobSchema);