const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const videoDir = path.join(__dirname, '../../uploads/videos');
const thumbDir = path.join(__dirname, '../../uploads/thumbnails');

[videoDir, thumbDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'video') {
            cb(null, videoDir);
        } else if (file.fieldname === 'thumbnail') {
            cb(null, thumbDir);
        } else {
            cb(new Error('Invalid field name'), null);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'video') {
            if (file.mimetype.startsWith('video/')) {
                cb(null, true);
            } else {
                cb(new Error('Only video files are allowed for video field!'), false);
            }
        } else if (file.fieldname === 'thumbnail') {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed for thumbnail field!'), false);
            }
        } else {
            cb(new Error('Invalid field name'), false);
        }
    },
});

module.exports = upload;
