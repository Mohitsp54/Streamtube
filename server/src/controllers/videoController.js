const Video = require('../models/Video');

const uploadVideo = async (req, res) => {
    try {
        console.log('Upload request received');
        console.log('User:', req.user);

        if (!req.files || !req.files.video) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'User not authenticated or ID missing' });
        }

        const { title, description } = req.body;
        const videoFile = req.files.video[0];
        const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;

        // Nginx will serve files from http://localhost:8080/videos/ and http://localhost:8080/thumbnails/
        const publicUrl = `http://localhost:8080/videos/${videoFile.filename}`;

        let thumbUrl = `https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80`; // default
        if (thumbnailFile) {
            thumbUrl = `http://localhost:8080/thumbnails/${thumbnailFile.filename}`;
        }

        console.log('Local upload finished. Public URL:', publicUrl);
        if (thumbnailFile) console.log('Thumbnail URL:', thumbUrl);

        let video = await Video.create({
            title: title || videoFile.originalname,
            description: description || '',
            videoUrl: publicUrl,
            thumbnailUrl: thumbUrl,
            userId: req.user.id,
        });

        // Populate userId to avoid frontend errors before next fetch
        video = await video.populate('userId', 'username avatar');

        console.log('Video metadata saved to DB:', video._id);
        res.status(201).json(video);
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
