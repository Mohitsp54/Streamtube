import { useState, createContext, useContext, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const DropdownMenuContext = createContext();

export function DropdownMenu({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
            <div className="relative inline-block text-left">
                {children}
            </div>
        </DropdownMenuContext.Provider>
    );
}

export const DropdownMenuTrigger = forwardRef(({ className, children, asChild, ...props }, ref) => {
    const { setIsOpen } = useContext(DropdownMenuContext);

    const handleClick = () => {
        setIsOpen(prev => !prev);
    };

    if (asChild && children) {
        const child = children;
        return (
            <div onClick={handleClick} ref={ref}>
                {child}
            </div>
        );
    }

    return (
        <button
            ref={ref}
            onClick={handleClick}
            className={cn('outline-none', className)}
            {...props}
        >
            {children}
        </button>
    );
});
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export function DropdownMenuContent({ className, align = 'center', children, ...props }) {
    const { isOpen, setIsOpen } = useContext(DropdownMenuContext);

    if (!isOpen) return null;

    const alignmentClasses = {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0'
    };

    return (
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
            />
            <div
                className={cn(
                    'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-gray-100 p-1 text-gray-900 shadow-md',
                    alignmentClasses[align],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </>
    );
}

export function DropdownMenuItem({ className, onClick, ...props }) {
    const { setIsOpen } = useContext(DropdownMenuContext);

    const handleClick = (e) => {
        onClick?.(e);
        setIsOpen(false);
    };

    return (
        <div
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                className
            )}
            onClick={handleClick}
            {...props}
        />
    );
}

export function DropdownMenuSeparator({ className, ...props }) {
    return (
        <div
            className={cn('-mx-1 my-1 h-px bg-muted', className)}
            {...props}
        />
    );
}
