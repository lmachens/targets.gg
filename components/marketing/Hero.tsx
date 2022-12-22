import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container grid items-center justify-center gap-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-16 lg:pb-24">
      {/* <Image src={hero} width={250} alt="Hero image" priority /> */}
      <div className="mx-auto flex flex-col items-start gap-4 lg:w-[52rem]">
        <h1 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-5xl md:text-6xl">
          Prepare yourself!
        </h1>
        <p className="max-w-[42rem] leading-normal text-slate-600 dark:text-slate-300 sm:text-xl sm:leading-8">
          An interactive tactical whiteboard which allows you to prepare your
          next competitive match, raid or war.
        </p>
      </div>
      <Link
        href="/login"
        className="relative inline-flex w-fit h-11 items-center rounded-md border border-transparent bg-brand-500 px-8 py-2 font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Get Started
      </Link>
    </section>
  );
}
