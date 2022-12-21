import MainNav from 'components/MainNav';
import marketingConfig from 'config/marketing';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between py-4">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className="relative inline-flex h-8 items-center rounded-md border border-transparent bg-brand-700 px-6 py-1 text-sm font-medium text-white hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  );
}
