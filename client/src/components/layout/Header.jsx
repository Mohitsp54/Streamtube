import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Play, Search, Upload, Menu, User, LogOut, Settings, X } from 'lucide-react';

export function Header({ onMenuClick }) {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const getInitials = (email) => {
        if (!email) return 'U';
        return email.charAt(0).toUpperCase();
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-lg border-b border-border z-50">
            <div className="flex items-center justify-between h-full px-4 gap-4">
                {/* Left section */}
                <div className="flex items-center gap-4">
                    {user && (
                        <button
                            onClick={onMenuClick}
                            className="p-2 rounded-lg hover:bg-secondary transition-colors lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    )}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <div className="p-1.5 rounded-lg bg-primary">
                            <Play className="h-5 w-5 text-primary-foreground fill-current" />
                        </div>
                        <span className="text-xl font-bold hidden sm:block">StreamTube</span>
                    </Link>
                </div>

                {/* Center section - Search */}
                <form
                    onSubmit={handleSearch}
                    className={`${showMobileSearch
                        ? 'absolute inset-x-4 top-1/2 -translate-y-1/2 flex'
                        : 'hidden md:flex'
                        } flex-1 max-w-xl`}
                >
                    <div className="relative w-full flex">
                        <Input
                            type="text"
                            placeholder="Search videos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pr-12 rounded-r-none"
                        />
                        <Button
                            type="submit"
                            variant="secondary"
                            className="rounded-l-none px-4"
                        >
                            <Search className="h-4 w-4" />
                        </Button>
                        {showMobileSearch && (
                            <button
                                type="button"
                                onClick={() => setShowMobileSearch(false)}
                                className="ml-2 p-2 hover:bg-secondary rounded-lg"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </form>

                {/* Right section */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowMobileSearch(true)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors md:hidden"
                    >
                        <Search className="h-5 w-5" />
                    </button>

                    {user ? (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate('/upload')}
                                className="hidden sm:flex"
                            >
                                <Upload className="h-5 w-5" />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="rounded-full ring-2 ring-transparent hover:ring-primary/50 transition-all">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={undefined} />
                                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                                {getInitials(user.email)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="px-3 py-2">
                                        <p className="text-sm font-medium truncate">{user.email}</p>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                                        <User className="mr-2 h-4 w-4" />
                                        Your Channel
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate('/upload')} className="sm:hidden">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Video
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        location.pathname !== '/auth' && (
                            <Button onClick={() => navigate('/auth')} className="btn-gradient">
                                Sign In
                            </Button>
                        )
                    )}
                </div>
            </div>
        </header>
    );
}
