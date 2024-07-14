const multer = require("multer");
const path = require('path');

// Configuration de Multer pour l'upload des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const absolutePath = path.join(__dirname, '../../public/images');
    cb(null, absolutePath);
  },
  filename: function (req, file, cb) {
    const uniqueIdentifier = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueIdentifier + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
