import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VideoGrid } from '@/components/video/VideoGrid';
import { useVideo } from '@/contexts/VideoContext';

export function HomePage() {
    const [searchParams] = useSearchParams();
    const { videos } = useVideo();
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchQuery = searchParams.get('search');

        setLoading(true);
        setTimeout(() => {
            if (searchQuery) {
                const filtered = videos.filter(video =>
                    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    video.description.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredVideos(filtered);
            } else {
                setFilteredVideos(videos);
            }
            setLoading(false);
        }, 300);
    }, [searchParams, videos]);

    const searchQuery = searchParams.get('search');

    return (
        <div className="p-6">
            {searchQuery && (
                <h1 className="text-2xl font-bold mb-6">
                    Search results for "{searchQuery}"
                </h1>
            )}
            <VideoGrid videos={filteredVideos} loading={loading} />
        </div>
    );
}
