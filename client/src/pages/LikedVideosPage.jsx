import { useVideo } from '@/contexts/VideoContext';
import { VideoGrid } from '@/components/video/VideoGrid';

export function LikedVideosPage() {
    const { getLikedVideos } = useVideo();
    const likedVideos = getLikedVideos();

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Liked Videos</h1>
            {likedVideos.length > 0 ? (
                <VideoGrid videos={likedVideos} />
            ) : (
                <div className="text-center py-12 bg-secondary/20 rounded-lg">
                    <p className="text-muted-foreground">No liked videos yet</p>
                </div>
            )}
        </div>
    );
}
