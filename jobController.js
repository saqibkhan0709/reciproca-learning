const Job = require("./Job");

// CREATE JOB
exports.createJob = async (req, res) => {
    try {

        const {
            clientId,
            title,
            description,
            category,
            budget,
            deadline
        } = req.body;

        const job = await Job.create({
            clientId,
            title,
            description,
            category,
            budget,
            deadline
        });

        res.status(201).json({
            success: true,
            message: "Job Posted Successfully",
            job
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// GET ALL JOBS
exports.getAllJobs = async (req, res) => {
    try {

        const jobs = await Job.find();

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// GET SINGLE JOB
exports.getJobById = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job Not Found"
            });
        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};