import { useParams, Navigate } from 'react-router-dom';
import { useVideo } from '@/contexts/VideoContext';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { VideoDetails } from '@/components/video/VideoDetails';
import { VideoGrid } from '@/components/video/VideoGrid';

export function VideoPage() {
    const { id } = useParams();
    const { videos, loading } = useVideo();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const video = videos.find(v => (v._id || v.id) === id);

    if (!video) {
        return <Navigate to="/" replace />;
    }

    // Get related videos (exclude current video)
    const relatedVideos = videos.filter(v => (v._id || v.id) !== id).slice(0, 8);

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-4">
                    <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl || video.thumbnail} />
                    <VideoDetails video={video} />
                </div>

                {/* Related videos sidebar */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Related Videos</h2>
                    <div className="space-y-3">
                        {relatedVideos.map(relatedVideo => (
                            <VideoGrid key={relatedVideo.id} videos={[relatedVideo]} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
