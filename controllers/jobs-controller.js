const Job = require("../models/jobs-model");


// create a new job
const createJob = async(req,res) => {
    try {
        await Job.create(req.body);
        return res.status(201).json({ message: "Job created successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const fetchJobs = async(req,res) => {
    try {
        const jobs = await Job.findAll();
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createJob,
    fetchJobs
}