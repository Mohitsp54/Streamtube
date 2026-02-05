import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Clock, ThumbsUp, PlaySquare, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const publicNavItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
];

const userNavItems = [
    { icon: PlaySquare, label: 'Your Videos', path: '/profile' },
    { icon: Clock, label: 'Watch Later', path: '/watch-later' },
    { icon: ThumbsUp, label: 'Liked Videos', path: '/liked' },
];

export function Sidebar({ isOpen, onClose }) {
    const location = useLocation();
    const { user } = useAuth();

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-16 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300',
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                {/* Mobile close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-sidebar-accent transition-colors lg:hidden"
                >
                    <X className="h-5 w-5" />
                </button>

                <nav className="p-4 pt-8 lg:pt-4 space-y-2">
                    {publicNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={cn(
                                'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors',
                                location.pathname === item.path
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                            )}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}

                    {user && (
                        <>
                            <div className="pt-4 pb-2">
                                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Library
                                </p>
                            </div>

                            {userNavItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={cn(
                                        'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors',
                                        location.pathname === item.path
                                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                                    )}
                                >
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            ))}

                            <div className="pt-4">
                                <Link
                                    to="/settings"
                                    onClick={onClose}
                                    className={cn(
                                        'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors',
                                        location.pathname === '/settings'
                                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                                    )}
                                >
                                    <Settings className="h-5 w-5 shrink-0" />
                                    <span className="font-medium">Settings</span>
                                </Link>
                            </div>
                        </>
                    )}
                </nav>
            </aside>
        </>
    );
}
