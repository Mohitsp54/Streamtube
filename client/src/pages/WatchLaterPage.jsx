import { useVideo } from '@/contexts/VideoContext';
import { VideoGrid } from '@/components/video/VideoGrid';

export function WatchLaterPage() {
    const { getWatchLaterVideos } = useVideo();
    const watchLaterVideos = getWatchLaterVideos();

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Watch Later</h1>
            {watchLaterVideos.length > 0 ? (
                <VideoGrid videos={watchLaterVideos} />
            ) : (
                <div className="text-center py-12 bg-secondary/20 rounded-lg">
                    <p className="text-muted-foreground">No videos saved for later</p>
                </div>
            )}
        </div>
    );
}
