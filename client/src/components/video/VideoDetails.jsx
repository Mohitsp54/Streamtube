import { ThumbsUp, ThumbsDown, Share2, Clock, MoreVertical } from 'lucide-react';
import { formatViewCount, formatRelativeTime, getInitial } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useVideo } from '@/contexts/VideoContext';
import { useState } from 'react';

export function VideoDetails({ video }) {
    const { isLiked, toggleLike, isInWatchLater, toggleWatchLater } = useVideo();
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Normalize video data (same logic as VideoCard)
    const displayVideo = {
        ...video,
        id: video._id || video.id,
        channel: (video.userId && typeof video.userId === 'object') ? {
            name: video.userId.username || 'User',
            avatar: video.userId.avatar || '',
            subscribers: video.userId.subscribers || 0
        } : (video.channel || { name: 'User', avatar: '', subscribers: 0 })
    };

    const liked = isLiked(displayVideo.id);
    const inWatchLater = isInWatchLater(displayVideo.id);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: video.title,
                text: video.description,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="space-y-4">
            {/* Title */}
            <h1 className="text-xl font-bold">{displayVideo.title}</h1>

            {/* Channel info and actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Channel */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={displayVideo.channel.avatar} alt={displayVideo.channel.name} />
                        <AvatarFallback>{getInitial(displayVideo.channel?.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{displayVideo.channel.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {formatViewCount(displayVideo.channel.subscribers)} subscribers
                        </p>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                    <Button
                        variant={liked ? 'default' : 'secondary'}
                        size="sm"
                        onClick={() => toggleLike(displayVideo.id)}
                        className="gap-2"
                    >
                        <ThumbsUp className="h-4 w-4" />
                        {formatViewCount((displayVideo.likes || 0) + (liked ? 1 : 0))}
                    </Button>

                    <Button variant="secondary" size="sm" className="gap-2">
                        <ThumbsDown className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={inWatchLater ? 'default' : 'secondary'}
                        size="sm"
                        onClick={() => toggleWatchLater(displayVideo.id)}
                        className="gap-2"
                    >
                        <Clock className="h-4 w-4" />
                        {inWatchLater ? 'Saved' : 'Save'}
                    </Button>

                    <Button variant="secondary" size="sm" onClick={handleShare} className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                </div>
            </div>

            {/* Description */}
            <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <span>{formatViewCount(displayVideo.views || 0)} views</span>
                    <span>•</span>
                    <span>{formatRelativeTime(displayVideo.uploadDate || displayVideo.createdAt)}</span>
                </div>
                <p className={`text-sm whitespace-pre-wrap ${!showFullDescription && 'line-clamp-2'}`}>
                    {displayVideo.description}
                </p>
                <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-sm font-semibold mt-2 hover:text-primary transition-colors"
                >
                    {showFullDescription ? 'Show less' : 'Show more'}
                </button>
            </div>
        </div>
    );
}
