import 'styles/globals.css';
import { Work_Sans as FontSans } from '@next/font/google';
import { cn } from 'lib/utils';
import type { ReactNode } from 'react';
import Analytics from 'components/Analytics';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        'bg-white dark:bg-zinc-900 font-sans text-zinc-900 dark:text-white',
        fontSans.variable
      )}
    >
      <head />
      <body className="min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
