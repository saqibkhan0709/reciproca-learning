const Review = require("./Review");
const EditorProfile = require("./EditorProfile");

// ADD REVIEW
exports.addReview = async (req, res) => {
try {

    const {
        editorId,
        clientId,
        rating,
        review
    } = req.body;

    const newReview =
        await Review.create({
            editorId,
            clientId,
            rating,
            review
        });

    const editor =
        await EditorProfile.findById(
            editorId
        );

    if (editor) {

        editor.reputationPoints += 20;

        if (rating >= 5) {
            editor.reputationPoints += 15;
            editor.diamondCount += 1;
        }

        await editor.save();
    }

    res.status(201).json({
        success: true,
        message:
            "Review Added Successfully",
        review: newReview
    });

} catch (error) {

    console.error(error);

    res.status(500).json({
        success: false,
        message: "Server Error"
    });

}

};

// GET REVIEWS OF EDITOR
exports.getEditorReviews =
async (req, res) => {
try {

        const reviews =
            await Review.find({
                editorId:
                    req.params.editorId
            });

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};