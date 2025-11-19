'use client';

import Image from "next/image";

type Item = { label: string; src: string };

export default function SkillsMarquee() {
  // Updated skills list
  const items: Item[] = [
    { label: 'TypeScript', src: '/skills/typescript.png' },
    { label: 'React', src: '/skills/react.png' },
    { label: 'Next.js', src: '/skills/nextjs.png' },
    { label: 'Node.js', src: '/skills/nodejs.png' },
    { label: 'PostgreSQL', src: '/skills/postgresql.png' },
    { label: 'Tailwind CSS', src: '/skills/tailwind.png' },
    { label: 'Framer Motion', src: '/skills/framer.png' },
    { label: 'Python', src: '/skills/python.png' },
    { label: 'C/C++', src: '/skills/c-cpp.png' },
    { label: 'Java', src: '/skills/java.png' },
    { label: 'Docker', src: '/skills/docker.png' },
    { label: 'Git', src: '/skills/git.png' },
  ];

  const loop = [...items, ...items];

  return (
    <section aria-label="Technical Skills" className="relative isolate py-14">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl">
        <div className="mx-auto h-48 w-[90%] rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>

        {/* Glassy marquee container */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 pt-5 pb-7 px-5 shadow-lg backdrop-blur">
          {/* gradient fades on edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent" />

          {/* Scrolling track */}
          <div className="marquee flex w-max items-center gap-6 hover:[animation-play-state:paused]">
            {loop.map((it, i) => (
              <LogoPill key={i} item={it} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoPill({ item }: { item: Item }) {
    return (
      <div
        className="group relative flex items-center justify-center rounded-xl border border-white/10 bg-white/10 p-3 shadow-md backdrop-blur transition hover:bg-white/20 hover:scale-105"
        aria-label={item.label}
      >
        {/* Full-color logo (no grayscale) */}
        <Image
          src={item.src}
          alt={item.label}
          width={36}
          height={36}
          className="object-contain opacity-95 transition group-hover:opacity-100"
          priority
        />
  
        {/* Tooltip BELOW so it won't be clipped by overflow-hidden */}
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2
                     rounded-md border border-white/10 bg-black/90 px-3 py-1
                     text-[11px] text-white shadow-lg
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     whitespace-nowrap max-w-[260px] z-50"
        >
          {item.label}
        </div>
      </div>
    );
  }
  
  
