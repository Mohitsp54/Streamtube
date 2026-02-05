const Video = require('../models/Video');
const { bucket } = require('../config/storage');
const { v4: uuidv4 } = require('uuid');

const uploadVideo = async (req, res) => {
    try {
        console.log('Upload request received');
        console.log('User:', req.user);
        console.log('File:', req.file ? {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        } : 'No file');

        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'User not authenticated or ID missing' });
        }

        const { title, description } = req.body;
        const fileName = `videos/${uuidv4()}-${req.file.originalname}`;
        console.log('Uploading to GCS:', fileName);

        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: req.file.mimetype,
        });

        blobStream.on('error', (err) => {
            console.error('GCS Upload Error:', err);
            res.status(500).json({ message: 'Error uploading to GCS', error: err.message });
        });

        blobStream.on('finish', async () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            console.log('GCS upload finished. Public URL:', publicUrl);

            try {
                const video = await Video.create({
                    title: title || req.file.originalname,
                    description: description || '',
                    videoUrl: publicUrl,
                    thumbnailUrl: `https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80`,
                    userId: req.user.id,
                });
                console.log('Video metadata saved to DB:', video._id);
                res.status(201).json(video);
            } catch (dbError) {
                console.error('DB Save Error:', dbError);
                res.status(500).json({ message: 'Error saving video metadata', error: dbError.message });
            }
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: 'Server error during upload', error: error.message });
    }
};

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('userId', 'username avatar').sort({ createdAt: -1 });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error: error.message });
    }
};

const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('userId', 'username avatar');
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video', error: error.message });
    }
};

module.exports = {
    uploadVideo,
    getAllVideos,
    getVideoById,
};
