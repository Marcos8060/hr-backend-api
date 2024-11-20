const Application = require("../models/application-model");

// create a new job
const applyJob = async (req, res) => {
  try {
    // Ensure that a file has been uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Resume is required" });
      }

      // Access the file (resume) from req.file
    const resume = req.file.path;

    // Combine the file path with other form fields
    const applicationData = {
        jobId: req.body.jobId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        yearsOfExperience: req.body.yearsOfExperience,
        resume: resume, // Add the resume field
      };

    await Application.create(applicationData);
    return res.status(201).json({ message: "Application sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyJob,
};
