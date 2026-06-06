const mongoose = require("mongoose");

const leadUnlockSchema = new mongoose.Schema(
{
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    editorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EditorProfile",
        required: true
    },

    amount: {
        type: Number,
        default: 59
    },

    paymentStatus: {
        type: String,
        default: "Paid"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model(
    "LeadUnlock",
    leadUnlockSchema
);