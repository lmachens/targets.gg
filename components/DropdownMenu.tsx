'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from 'lib/utils';
import { forwardRef } from 'react';

type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuProps;

export default function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root {...props} />;
}

DropdownMenu.Trigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuPrimitive.DropdownMenuTriggerProps
>(function DropdownMenuTrigger({ ...props }, ref) {
  return <DropdownMenuPrimitive.Trigger {...props} ref={ref} />;
});

DropdownMenu.Portal = DropdownMenuPrimitive.Portal;

DropdownMenu.Content = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.MenuContentProps
>(function DropdownMenuContent({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Content
      ref={ref}
      align="end"
      className={cn(
        'overflow-hidden rounded-md border border-slate-50 bg-white dark:bg-zinc-900 shadow-md animate-in slide-in-from-top-1 md:w-32',
        className
      )}
      {...props}
    />
  );
});

DropdownMenu.Item = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuItemProps
>(function DropdownMenuItem({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        'flex cursor-default select-none items-center py-2 px-3 text-sm text-slate-600 dark:text-slate-200 outline-none focus:bg-slate-50 focus:text-black',
        className
      )}
      {...props}
    />
  );
});

DropdownMenu.Separator = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuSeparatorProps
>(function DropdownMenuItem({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn('h-px bg-slate-200', className)}
      {...props}
    />
  );
});
