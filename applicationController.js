const Application = require("./Application");

// APPLY TO JOB
const applyToJob = async (req, res) => {
    try {
        const { jobId, editorId, coverLetter } = req.body;

        const existingApplication = await Application.findOne({
            jobId,
            editorId
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied to this job"
            });
        }

        const application = await Application.create({
            jobId,
            editorId,
            coverLetter,
            status: "Pending"
        });

        res.status(201).json({
            success: true,
            message: "Application Submitted",
            application
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// GET ALL APPLICATIONS
const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate("jobId")
            .populate("editorId");

        res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// GET APPLICATIONS FOR A JOB
const getApplicationsByJob = async (req, res) => {
    try {
        const applications = await Application.find({
            jobId: req.params.jobId
        }).populate("editorId");

        res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// UPDATE APPLICATION STATUS
const updateApplicationStatus = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Application Updated",
            application
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// GET APPLICATIONS BY STATUS
const getApplicationsByStatus = async (req, res) => {
    try {
        const applications = await Application.find({
            status: req.params.status
        });

        res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    applyToJob,
    getAllApplications,
    getApplicationsByJob,
    updateApplicationStatus,
    getApplicationsByStatus
};
