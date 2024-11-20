const multer = require("multer");
const path = require("path");

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save the file
  },
  filename: (req, file, cb) => {
    // Set the filename to avoid conflicts
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with file size limit and storage configuration
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for resume
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx|txt/; // Accept only these file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, DOCX, and TXT files are allowed"));
    }
  }
});

// Reusable middleware to handle resume upload
const uploadResume = upload.single("resume"); // This handles the 'resume' field in the form

module.exports = uploadResume;
