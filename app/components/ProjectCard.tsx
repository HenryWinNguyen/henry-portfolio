'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type Project = {
  title: string;
  description: string;
  cover: string;          // /projects/momentum_cover.png
  screenshots: string[];  // ['/projects/momentum_tasks.png', '/projects/momentum_wins.png']
  tags: string[];
  codeUrl: string;
  storeUrl?: string;      // leave '' or undefined until approved
};

export default function ProjectCard({
  title,
  description,
  cover,
  screenshots,
  tags,
  codeUrl,
  storeUrl,
}: Project) {
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => (i + 1) % screenshots.length);
  const prev = () => setIdx((i) => (i - 1 + screenshots.length) % screenshots.length);

  return (
    <div
      className="relative h-[520px] w-full max-w-[380px]"
      style={{ perspective: '1200px' }}                // 3D perspective
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d] rounded-2xl"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.35)' }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="relative h-48 w-full">
            <Image
              src={cover}
              alt={`${title} cover`}
              fill
              sizes="380px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>

          <div className="p-5">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-neutral-300">{description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100/20 text-yellow-200 border border-yellow-200/30"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-sm hover:bg-white/20 transition"
              >
                View Code
              </a>

              {storeUrl ? (
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-300 transition"
                >
                  Chrome Store
                </a>
              ) : (
                <span className="px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-sm text-neutral-300 cursor-not-allowed">
                  Chrome Store — Soon
                </span>
              )}
            </div>

            <button
              onClick={() => setFlipped(true)}
              className="mt-5 w-full rounded-lg border border-white/15 bg-white/5 py-2 text-sm hover:bg-white/10 transition"
            >
              View Screenshots
            </button>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="relative h-64 w-full">
            <Image
              src={screenshots[idx]}
              alt={`${title} screenshot ${idx + 1}`}
              fill
              sizes="380px"
              className="object-cover"
            />

            {/* arrows */}
            {screenshots.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-black/45 text-white hover:bg-black/60"
                  aria-label="Previous screenshot"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-black/45 text-white hover:bg-black/60"
                  aria-label="Next screenshot"
                >
                  ›
                </button>
              </>
            )}

            {/* dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {screenshots.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i === idx ? 'bg-yellow-400' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          <div className="p-5">
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="mt-1 text-sm text-neutral-300">Click arrows to browse. </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setFlipped(false)}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-sm hover:bg-white/20 transition"
              >
                Back
              </button>

              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-sm hover:bg-white/20 transition"
              >
                Code
              </a>

              {storeUrl ? (
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-300 transition"
                >
                  Store
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
