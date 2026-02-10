import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const VideoContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function VideoProvider({ children }) {
    const [videos, setVideos] = useState([]);
    const [likedVideos, setLikedVideos] = useState([]);
    const [watchLater, setWatchLater] = useState([]);
    const [userVideos, setUserVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load initial data
    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/videos`);
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();

        // Load saved data from localStorage
        const savedLiked = localStorage.getItem('streamtube_liked');
        const savedWatchLater = localStorage.getItem('streamtube_watch_later');
        const savedUserVideos = localStorage.getItem('streamtube_user_videos');

        if (savedLiked) {
            try {
                setLikedVideos(JSON.parse(savedLiked));
            } catch (error) {
                console.error('Error parsing liked videos:', error);
            }
        }

        if (savedWatchLater) {
            try {
                setWatchLater(JSON.parse(savedWatchLater));
            } catch (error) {
                console.error('Error parsing watch later:', error);
            }
        }

        if (savedUserVideos) {
            try {
                setUserVideos(JSON.parse(savedUserVideos));
            } catch (error) {
                console.error('Error parsing user videos:', error);
            }
        }
    }, []);

    const toggleLike = (videoId) => {
        setLikedVideos(prev => {
            const newLiked = prev.includes(videoId)
                ? prev.filter(id => id !== videoId)
                : [...prev, videoId];
            localStorage.setItem('streamtube_liked', JSON.stringify(newLiked));
            return newLiked;
        });
    };

    const toggleWatchLater = (videoId) => {
        setWatchLater(prev => {
            const newWatchLater = prev.includes(videoId)
                ? prev.filter(id => id !== videoId)
                : [...prev, videoId];
            localStorage.setItem('streamtube_watch_later', JSON.stringify(newWatchLater));
            return newWatchLater;
        });
    };

    const uploadVideo = async (formData) => {
        try {
            const token = localStorage.getItem('streamtube_token');
            const response = await axios.post(`${API_URL}/videos/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            const newVideo = response.data;

            setUserVideos(prev => {
                const updated = [...prev, newVideo];
                localStorage.setItem('streamtube_user_videos', JSON.stringify(updated));
                return updated;
            });

            setVideos(prev => [newVideo, ...prev]);

            return newVideo;
        } catch (error) {
            console.error('Video upload error:', error);
            throw error;
        }
    };

    const getLikedVideos = () => {
        return videos.filter(video => likedVideos.includes(video._id || video.id));
    };

    const getWatchLaterVideos = () => {
        return videos.filter(video => watchLater.includes(video._id || video.id));
    };

    const isLiked = (videoId) => likedVideos.includes(videoId);
    const isInWatchLater = (videoId) => watchLater.includes(videoId);

    const value = {
        videos,
        likedVideos,
        watchLater,
        userVideos,
        loading,
        toggleLike,
        toggleWatchLater,
        uploadVideo,
        getLikedVideos,
        getWatchLaterVideos,
        isLiked,
        isInWatchLater
    };

    return (
        <VideoContext.Provider value={value}>
            {children}
        </VideoContext.Provider>
    );
}

export function useVideo() {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error('useVideo must be used within a VideoProvider');
    }
    return context;
}
