import { useVideo } from '@/contexts/VideoContext';
import { VideoGrid } from '@/components/video/VideoGrid';

export function ExplorePage() {
    const { videos } = useVideo();

    // Sort by views for trending
    const trendingVideos = [...videos].sort((a, b) => b.views - a.views);

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-2">Trending</h1>
                <p className="text-muted-foreground">Check out what's popular right now</p>
            </div>
            <VideoGrid videos={trendingVideos} />
        </div>
    );
}
