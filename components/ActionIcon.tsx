import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from 'lib/utils';

type ActionIconProps = {
  children?: ReactNode;
  variant?: 'filled' | 'subtle';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ActionIcon({
  children,
  className,
  variant = 'filled',
  ...props
}: ActionIconProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'rounded-full p-1',
        className,
        variant === 'filled' && 'bg-gray-600'
      )}
    >
      {children}
    </button>
  );
}
