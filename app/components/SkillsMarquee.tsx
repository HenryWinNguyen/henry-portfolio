'use client';

import Image from "next/image";
import { motion } from "framer-motion";

type Item = { label: string; src: string };

export const skillItems: Item[] = [
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

export default function SkillsMarquee() {
  const loop = [...skillItems, ...skillItems];

  return (
    <motion.section
      aria-label="Technical Skills"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative isolate py-14"
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Toolkit
        </p>
        <h2 className="mb-8 text-center text-4xl font-semibold tracking-tight text-ink">
          Technical Skills
        </h2>

        {/* Marquee container */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated pt-5 pb-7 px-5 shadow-card">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          {/* fades on edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-surface-elevated to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-surface-elevated to-transparent" />

          {/* Scrolling track */}
          <div className="marquee flex w-max items-center gap-6 hover:[animation-play-state:paused]">
            {loop.map((it, i) => (
              <LogoPill key={i} item={it} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function LogoPill({ item }: { item: Item }) {
    return (
      <div
        className="group relative flex items-center justify-center rounded-xl border border-border bg-surface p-3 transition hover:border-border-hover hover:bg-surface-elevated-hover"
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
  
  
