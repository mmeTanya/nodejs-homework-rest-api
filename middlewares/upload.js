const multer = require("multer");
const path = require("path");

const { basedir } = global;

const tempDir = path.join(basedir, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2500,
  },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
