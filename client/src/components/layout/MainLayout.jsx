import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function MainLayout({ children, hideSidebar = false }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-background">
            <Header onMenuClick={() => setSidebarOpen(true)} />

            {user && !hideSidebar && (
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            )}

            <main
                className={cn(
                    'pt-16 min-h-screen transition-all duration-300',
                    user && !hideSidebar ? 'lg:pl-64' : ''
                )}
            >
                {children}
            </main>
        </div>
    );
}
