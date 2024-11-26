const Job = require("../models/jobs-model");
const Application = require('../models/application-model')

const applyJob = async (req, res) => {
  try {
    // Ensure that a file has been uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // Validate jobId
    const jobId = req.body.jobId;
    const job = await Job.findByPk(jobId); // Check if the job exists
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Combine the file path with other form fields
    const applicationData = {
      jobId: jobId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      yearsOfExperience: req.body.yearsOfExperience,
      resume: req.file.path, // Use the uploaded file path
    };

    // Create the application
    await Application.create(applicationData);
    return res.status(201).json({ message: "Application sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  applyJob,
}
