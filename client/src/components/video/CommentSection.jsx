import { useState } from 'react';
import { formatRelativeTime } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThumbsUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function CommentSection({ comments = [] }) {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [localComments, setLocalComments] = useState(comments);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user) return;

        const comment = {
            id: Math.random().toString(36).substr(2, 9),
            author: user.name,
            avatar: user.avatar,
            text: newComment,
            date: new Date(),
            likes: 0
        };

        setLocalComments([comment, ...localComments]);
        setNewComment('');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold">
                {localComments.length} {localComments.length === 1 ? 'Comment' : 'Comments'}
            </h2>

            {/* Add comment */}
            {user && (
                <form onSubmit={handleSubmit} className="flex gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                        <Input
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                        />
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setNewComment('')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" size="sm" disabled={!newComment.trim()}>
                                Comment
                            </Button>
                        </div>
                    </div>
                </form>
            )}

            {/* Comments list */}
            <div className="space-y-6">
                {localComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage src={comment.avatar} alt={comment.author} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">
                                    {formatRelativeTime(comment.date)}
                                </span>
                            </div>
                            <p className="text-sm">{comment.text}</p>
                            <div className="flex items-center gap-4 pt-1">
                                <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                                    <ThumbsUp className="h-4 w-4" />
                                    {comment.likes > 0 && <span>{comment.likes}</span>}
                                </button>
                                <button className="text-sm font-semibold hover:text-primary transition-colors">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {localComments.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                    No comments yet. Be the first to comment!
                </p>
            )}
        </div>
    );
}
