import { useAuth } from '@/contexts/AuthContext';
import { useVideo } from '@/contexts/VideoContext';
import { VideoGrid } from '@/components/video/VideoGrid';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { formatViewCount, getInitial } from '@/lib/utils';

export function ProfilePage() {
    const { user } = useAuth();
    const { userVideos } = useVideo();

    if (!user) {
        return null;
    }

    return (
        <div className="p-6 space-y-8">
            {/* Channel header */}
            <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl">{getInitial(user?.name || user?.email)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                    <p className="text-muted-foreground mb-4">
                        {user.email} • {userVideos.length} {userVideos.length === 1 ? 'video' : 'videos'}
                    </p>
                </div>
            </div>

            {/* Videos section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Your Videos</h2>
                {userVideos.length > 0 ? (
                    <VideoGrid videos={userVideos} />
                ) : (
                    <div className="text-center py-12 bg-secondary/20 rounded-lg">
                        <p className="text-muted-foreground mb-4">You haven't uploaded any videos yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
