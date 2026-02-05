import { useState, createContext, useContext } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const DialogContext = createContext();

export function Dialog({ children, open, onOpenChange }) {
    const [isOpen, setIsOpen] = useState(open || false);

    const handleOpenChange = (value) => {
        setIsOpen(value);
        onOpenChange?.(value);
    };

    return (
        <DialogContext.Provider value={{ isOpen, setIsOpen: handleOpenChange }}>
            {children}
        </DialogContext.Provider>
    );
}

export function DialogTrigger({ children, asChild }) {
    const { setIsOpen } = useContext(DialogContext);

    const handleClick = () => {
        setIsOpen(true);
    };

    if (asChild && children) {
        return <div onClick={handleClick}>{children}</div>;
    }

    return <button onClick={handleClick}>{children}</button>;
}

export function DialogContent({ className, children, ...props }) {
    const { isOpen, setIsOpen } = useContext(DialogContext);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* Dialog */}
            <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-lg">
                <div
                    className={cn(
                        'relative bg-background border rounded-lg shadow-lg p-6',
                        className
                    )}
                    onClick={(e) => e.stopPropagation()}
                    {...props}
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
}

export function DialogHeader({ className, ...props }) {
    return (
        <div
            className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
            {...props}
        />
    );
}

export function DialogTitle({ className, ...props }) {
    return (
        <h2
            className={cn('text-lg font-semibold leading-none tracking-tight', className)}
            {...props}
        />
    );
}

export function DialogDescription({ className, ...props }) {
    return (
        <p
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
}
