const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
{
editorId: {
type: mongoose.Schema.Types.ObjectId,
ref: "EditorProfile",
required: true
},

clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},

rating: {
    type: Number,
    required: true
},

review: {
    type: String,
    required: true
}

},
{
timestamps: true
});

module.exports = mongoose.model(
"Review",
reviewSchema
);