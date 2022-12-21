'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from 'lib/utils';
import { toast } from 'components/Toast';
import Icons from 'components/Icons';

type PostCreateButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export default function PostCreateButton({
  className,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch('/api/tactics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Untitled Post',
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: 'Limit of 3 tactics reached.',
          message: 'Please upgrade to the PRO plan.',
          type: 'error',
        });
      }

      return toast({
        title: 'Something went wrong.',
        message: 'Your tactic was not created. Please try again.',
        type: 'error',
      });
    }

    const tactic = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/editor/${tactic.id}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
        {
          'cursor-not-allowed opacity-60': isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New tactic
    </button>
  );
}
