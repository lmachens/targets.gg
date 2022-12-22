import Hero from 'components/marketing/Hero';
import Community from 'components/marketing/Community';
import OpenSource from 'components/marketing/OpenSource';

export default async function Home() {
  return (
    <>
      <Hero />
      <hr className="border-slate-200  dark:border-slate-600" />
      <Community />
      <hr className="border-slate-200 dark:border-slate-600" />
      <OpenSource />
    </>
  );
}
