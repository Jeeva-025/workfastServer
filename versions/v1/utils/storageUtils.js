// utils/storage.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); // Set destination for uploaded files
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const imagename = req.body.imagename || 'default'; // Fallback if imagename is undefined
    const timestamp = now.toISOString().replace(/[-:.]/g, ''); // Remove unwanted characters from the timestamp
    const extension = path.extname(file.originalname); // Get file extension (e.g., .png, .jpg)

    const newimagename = imagename + '-' + timestamp + extension; // Append imagename and timestamp to create the new filename
    cb(null, newimagename); // Set the file name
  }
});

const upload = multer({ storage: storage });

module.exports = upload;