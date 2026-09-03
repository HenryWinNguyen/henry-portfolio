'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export type Project = {
  title: string;
  description: string;
  cover: string;
  screenshots: string[];
  tags: string[];
  codeUrl: string;
  storeUrl?: string; // '' = pending review; set = Chrome Web Store or a live-app link
  featured?: boolean;
  coverFit?: 'cover' | 'contain'; // 'contain' pads a non-photo/logo cover so it doesn't get cropped
};

const primaryBtn =
  'inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-[var(--color-accent-ink)] transition hover:brightness-110';
const secondaryBtn =
  'inline-flex items-center justify-center rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface-elevated-hover';
const pendingPill =
  'inline-flex items-center justify-center rounded-lg border border-dashed border-border px-4 py-2 text-sm text-ink-faint';

export default function ProjectCard(props: Project) {
  const { title, description, cover, screenshots, tags, codeUrl, storeUrl, featured, coverFit = 'cover' } = props;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const hasScreenshots = screenshots.length > 0;
  const hasStore = typeof storeUrl === 'string' && storeUrl.length > 0;
  const storePending = storeUrl === '';
  const isChromeStore = hasStore && /chromewebstore|chrome\.google\.com/.test(storeUrl!);

  const openLightbox = (startIndex = 0) => {
    setIdx(startIndex);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const next = () => setIdx((i) => (i + 1) % screenshots.length);
  const prev = () => setIdx((i) => (i - 1 + screenshots.length) % screenshots.length);

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
      <div className="group flex h-full w-full max-w-[380px] flex-col overflow-hidden rounded-2xl border border-ink bg-surface-elevated shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover">
        {/* Cover — 5 of the 7 project images are exactly square (checked the actual
           files), so a square box + object-cover fills edge to edge with zero crop for
           those, and only a mild crop for the two non-square outliers — much closer to
           lossless than forcing every image into a wide banner strip. */}
        <div className="relative aspect-square w-full shrink-0 overflow-hidden">
          <Image
            src={cover}
            alt={`${title} cover`}
            fill
            sizes="380px"
            className={`transition-transform duration-500 group-hover:scale-105 ${
              coverFit === 'contain' ? 'object-contain p-10' : 'object-cover'
            }`}
            priority
          />

          {featured && (
            <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-[var(--color-accent-ink)] shadow-card">
              Featured
            </span>
          )}

          {hasScreenshots && (
            <button
              onClick={() => openLightbox(0)}
              aria-label="View screenshots"
              title="View screenshots"
              className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="14" height="14" rx="2" />
                <path d="M7 21h11a2 2 0 0 0 2-2V7" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 px-6 py-6">
          <div>
            <h3 className="text-xl font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-3">{description}</p>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t, idx) => (
                <span
                  key={t}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                    idx === 0
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-border text-ink-faint"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* CTAs, pinned to the bottom regardless of description/tag length */}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            {isChromeStore && (
              <a href={storeUrl} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                View on Chrome Web Store
              </a>
            )}

            {hasStore && !isChromeStore && (
              <a href={storeUrl} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                Open app
              </a>
            )}

            {!hasStore && storePending && <span className={pendingPill}>Chrome Store, pending review</span>}

            {!hasStore && !storePending && codeUrl && (
              <a href={codeUrl} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                View code
              </a>
            )}

            {(hasStore || storePending) && codeUrl && (
              <a href={codeUrl} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
                View code
              </a>
            )}
          </div>
        </div>
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

              <div className="mt-4 flex justify-center gap-2">
                {screenshots.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full ${i === idx ? 'bg-accent' : 'bg-white/40'}`}
                  />
                ))}
              </div>

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
