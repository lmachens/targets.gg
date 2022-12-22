import siteConfig from 'config/site';
import Link from 'next/link';

export default function Community() {
  return (
    <section className="container grid justify-center gap-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex flex-col gap-4 md:max-w-[52rem] ">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-3xl md:text-6xl">
          Join the community
        </h2>
        <p className="max-w-[85%] leading-normal text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-7">
          Find, share and discuss tactics with other competitive gamers on{' '}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Discord
          </Link>
          .
        </p>
        <iframe
          src={siteConfig.links.discordWidget}
          height="330"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </section>
  );
}
