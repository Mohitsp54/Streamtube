const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    duration: {
        type: Number,
        default: 0,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
