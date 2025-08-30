'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type Project = {
  title: string;
  description: string;
  cover: string;
  screenshots: string[];
  tags: string[];
  codeUrl: string;
  storeUrl?: string;
};

export default function ProjectCard(props: Project) {
  const { title, description, cover, screenshots, tags, codeUrl, storeUrl } = props;

  const [flipped, setFlipped] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openLightbox = (startIndex = 0) => {
    setIdx(startIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const next = () => setIdx((i) => (i + 1) % screenshots.length);
  const prev = () => setIdx((i) => (i - 1 + screenshots.length) % screenshots.length);

  // keyboard shortcuts for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  return (
    <>
      {/* CARD */}
      <div
        className="group relative h-[520px] w-full max-w-[380px] transition-transform duration-300 hover:scale-[1.03]"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d] rounded-2xl"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* FRONT */}
          <div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            {/* Cover */}
            <div className="relative h-48 w-full">
              <Image src={cover} alt={`${title} cover`} fill sizes="380px" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-transparent" />
            </div>

            {/* Content */}
            <div className="px-6 pb-6 pt-5 text-center">
              <h3 className="text-2xl font-semibold transition-transform duration-200 group-hover:scale-[1.04]">
                {title}
              </h3>

              <p className="mt-3 text-sm text-neutral-300">{description}</p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100/20 text-yellow-200 border border-yellow-200/30"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Store + Rotate */}
              <div className="mt-5 flex items-center justify-center gap-3">
                {storeUrl ? (
                  <a
                    href={storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-300 transition"
                  >
                    View on Chrome Web Store
                  </a>
                ) : (
                  <span className="px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-sm text-neutral-300 cursor-not-allowed">
                    Chrome Store — Pending Review
                  </span>
                )}

                <button
                  aria-label="Flip to screenshots side"
                  onClick={() => setFlipped(true)}
                  className="grid place-items-center h-9 w-9 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 transition"
                  title="View screenshots"
                >
                  ↻
                </button>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
            style={{ transform: 'rotateY(180deg)' }}
          >
            {/* Preview */}
            <div className="relative h-48 w-full">
              <Image
                src={screenshots[0]}
                alt={`${title} preview`}
                fill
                sizes="380px"
                className="object-cover cursor-pointer"
                onClick={() => openLightbox(0)}
              />
              <div className="absolute bottom-3 right-3">
                <button
                  onClick={() => openLightbox(0)}
                  className="px-3 py-1.5 rounded-lg bg-black/55 text-white text-xs hover:bg-black/70 transition"
                >
                  Open Gallery
                </button>
              </div>
            </div>

            {/* Content, centered */}
            <div className="px-6 pb-6 pt-8 flex flex-col items-center justify-center text-center min-h-[260px]">
              <h4 className="text-xl font-semibold mb-3">{title}</h4>

              <p className="text-sm text-neutral-300 max-w-[260px] mb-5">
                Click “Open Gallery” to view full screenshots.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href={codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-sm hover:bg-white/20 transition"
                >
                  View Code
                </a>
                <button
                  onClick={() => setFlipped(false)}
                  aria-label="Flip back"
                  className="grid place-items-center h-9 w-9 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 transition"
                  title="Back"
                >
                  ↻
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 m-6 md:m-12 lg:m-16 grid place-items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-5xl">
              <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
                <Image
                  src={screenshots[idx]}
                  alt={`${title} screenshot ${idx + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* arrows */}
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
                  >
                    ›
                  </button>
                </>
              )}

              {/* dots */}
              <div className="mt-4 flex justify-center gap-2">
                {screenshots.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full ${i === idx ? 'bg-yellow-400' : 'bg-white/40'}`}
                  />
                ))}
              </div>

              {/* close */}
              <div className="absolute -top-4 right-0">
                <button
                  onClick={closeLightbox}
                  aria-label="Close"
                  className="grid place-items-center h-9 w-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
