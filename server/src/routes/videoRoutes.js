const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const { uploadVideo, getAllVideos, getVideoById } = require('../controllers/videoController');

// Upload video (Protected)
router.post('/upload', auth, (req, res, next) => {
    upload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 }
    ])(req, res, (err) => {
        if (err) {
            console.error('Multer Error:', err);
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, uploadVideo);

// Get all videos (Public)
router.get('/', getAllVideos);

// Get video by ID (Public)
router.get('/:id', getVideoById);

module.exports = router;
