const LeadUnlock = require("./LeadUnlock");
const EditorProfile = require("./EditorProfile");
const User = require("./User");

// UNLOCK LEAD
exports.unlockLead = async (req, res) => {
    try {

        const {
            clientId,
            editorId
        } = req.body;

        const existingUnlock =
            await LeadUnlock.findOne({
                clientId,
                editorId
            });

        if (existingUnlock) {
            return res.status(400).json({
                success: false,
                message:
                    "Lead already unlocked"
            });
        }

        const unlock =
            await LeadUnlock.create({
                clientId,
                editorId,
                amount: 59,
                paymentStatus: "Paid"
            });

        res.status(201).json({
            success: true,
            message:
                "Lead Unlocked Successfully",
            unlock
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// VIEW CONTACT DETAILS
exports.getUnlockedContact =
    async (req, res) => {
        try {

            const {
                clientId,
                editorId
            } = req.params;

            const unlock =
                await LeadUnlock.findOne({
                    clientId,
                    editorId
                });

            if (!unlock) {
                return res.status(403).json({
                    success: false,
                    message:
                        "Lead not unlocked"
                });
            }

            const profile =
                await EditorProfile.findById(
                    editorId
                );

            if (!profile) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Editor not found"
                });
            }

            const user =
                await User.findById(
                    profile.userId
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message:
                        "User not found"
                });
            }

            res.status(200).json({
                success: true,
                contact: {
                    fullName:
                        profile.fullName,
                    email:
                        user.email,
                    phone:
                        user.phone,
                    whatsapp:
                        user.whatsapp
                }
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message: "Server Error"
            });

        }
    };