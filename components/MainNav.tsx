'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import type { MainNavItem } from 'types';
import { cn } from 'lib/utils';
import MobileNav from 'components/MobileNav';
import siteConfig from 'config/site';
import IconLogo from './IconLogo';
import Icons from './Icons';

type MainNavProps = {
  items: MainNavItem[];
  children?: React.ReactNode;
};

export default function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <IconLogo />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.disabled ? '#' : item.href}
            className={cn(
              'flex items-center text-lg font-semibold text-slate-600 sm:text-sm',
              item.href.startsWith(`/${segment}`) && 'text-slate-900',
              item.disabled && 'cursor-not-allowed opacity-80'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && <MobileNav items={items}>{children}</MobileNav>}
    </div>
  );
}
