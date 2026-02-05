import { Link } from 'react-router-dom';
import { formatViewCount, formatDuration, formatRelativeTime } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useVideo } from '@/contexts/VideoContext';
import { Check, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'; // New import for date formatting

export function VideoCard({ video }) {
    const { toggleWatchLater, isInWatchLater } = useVideo();

    // Map API fields if necessary
    const displayVideo = {
        ...video,
        id: video._id || video.id,
        duration: video.duration || '0:00', // Assuming duration is already formatted or will be used as is
        uploadDate: video.createdAt || video.uploadDate,
        channel: video.userId ? {
            name: video.userId.username,
            avatar: video.userId.avatar
        } : (video.channel || { name: 'Unknown', avatar: '' })
    };

    return (
        <Link to={`/watch/${displayVideo.id}`} className="group space-y-3">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
                <img
                    src={displayVideo.thumbnailUrl || displayVideo.thumbnail}
                    alt={displayVideo.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs font-medium rounded">
                    {displayVideo.duration}
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWatchLater(displayVideo.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    {isInWatchLater(displayVideo.id) ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Clock className="h-4 w-4" />
                    )}
                </button>
            </div>

            <div className="flex gap-3">
                <Avatar className="h-9 w-9 mt-0.5">
                    <AvatarImage src={displayVideo.channel.avatar} alt={displayVideo.channel.name} />
                    <AvatarFallback>{displayVideo.channel.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {displayVideo.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 hover:text-foreground">
                        {displayVideo.channel.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{formatViewCount(displayVideo.views)} views</span>
                        <span className="text-[10px]">•</span>
                        <span>{formatDistanceToNow(new Date(displayVideo.uploadDate), { addSuffix: true })}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
