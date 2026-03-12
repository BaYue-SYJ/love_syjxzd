const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadPhoto, listPhotos } = require('../controllers/albumController');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '.jpg');
    cb(null, `${Date.now()}_${Math.floor(Math.random() * 10000)}${ext}`);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadPhoto);
router.get('/list', listPhotos);

module.exports = router;
