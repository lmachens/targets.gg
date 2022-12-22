import siteConfig from 'config/site';
import Icons from './Icons';

export default function SiteFooter() {
  return (
    <footer className="container bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-300">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-t-slate-200 dark:border-t-slate-600  py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Join the community on{' '}
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Discord
            </a>
            .
          </p>
        </div>
        <p className="text-center text-sm md:text-left">
          The source code is available on{' '}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
