'use client';

import type { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import siteConfig from 'config/site';
import DropdownMenu from 'components/DropdownMenu';
import type { HTMLAttributes } from 'react';
import { UserAvatar } from './UserAvatar';

type UserAccountNavProps = HTMLAttributes<HTMLDivElement> & {
  user: Pick<User, 'name' | 'image' | 'email'>;
};

export default function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger className="flex items-center gap-2 overflow-hidden focus:ring-2 focus:ring-brand-900 focus:ring-offset-2 focus-visible:outline-none">
        <UserAvatar user={user} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-2 md:w-[240px]" align="end">
          <div className="flex items-center justify-start gap-2 p-4">
            <div className="flex flex-col space-y-1 leading-none">
              {user.name && <p className="font-medium">{user.name}</p>}
            </div>
          </div>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Link
              href={siteConfig.links.discord}
              className="w-full"
              target="_blank"
            >
              Discord
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link
              href={siteConfig.links.github}
              className="w-full"
              target="_blank"
            >
              GitHub
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault();
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              });
            }}
          >
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
}
