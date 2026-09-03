'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ProjectsShowcase, { projects } from "./components/ProjectsShowcase";
import SkillsMarquee, { skillItems } from "./components/SkillsMarquee";

/* ===== Experience data (most recent first) ===== */
type Exp = {
  company: string;
  role: string;
  period: string;
  location?: string;
  logo: string;
  summary: string;
  tech?: string[];
  logoScale?: number; // fine-tune visual size per logo
};

const experiences: Exp[] = [
  {
    company: "Spectrum",
    role: "Software Engineer Intern",
    period: "May 2026 – Aug 2026",
    location: "Greenwood Village, CO",
    logo: "/spectrum.png",
    summary:
      "Built a RAG-based semantic search pipeline using vector embeddings and OpenSearch, cutting search times by 30%. Deployed a distributed Kubernetes service batching LLM calls through an OpenAI gateway, cutting token costs by 50%. Redesigned Spectrum's internal API gateway with GraphQL and Datadog observability, improving latency by 35%.",
    tech: ["RAG", "OpenSearch", "Kubernetes", "GraphQL", "Datadog"],
    logoScale: 1,
  },
  {
    company: "Imagine Communications",
    role: "IT Specialist Intern",
    period: "Jan 2025 – May 2026",
    location: "Plano, TX",
    logo: "/imagine-communications.png",
    summary:
      "Optimized Oracle and Salesforce SQL for faster reporting, built Power BI dashboards tracking 100+ devices and cross-department KPIs, automated provisioning with Terraform, and provided secure hands-on support across hardware, software, networking, and onboarding.",
    tech: ["SQL", "Oracle", "Salesforce", "Power BI", "Terraform"],
    logoScale: 1.15,
  },
  {
    company: "Outlier",
    role: "AI Model Trainer (Contract)",
    period: "Dec 2024 – Present",
    location: "Remote",
    logo: "/outlier.jpg",
    summary:
      "Evaluated and improved LLM outputs across 150+ STEM/coding prompts—surfacing logical flaws and edge cases—and partnered with researchers to fine-tune models, boosting accuracy, reliability, and adaptability across applications.",
    tech: ["LLMs", "Python", "Evaluation", "Fine-tuning"],
    logoScale: 2.4,
  },
  {
    company: "ECOM",
    role: "Programmer",
    period: "May 2023 – Aug 2023",
    location: "Remote",
    logo: "/1631362159713.jpg",
    summary:
      "Built an application backed by SQL to organize and schedule user-specific events, using efficient queries and data handling to meet requests. Worked in an agile-style flow with other interns—code reviews, progress updates, and iterative feature delivery to hit deadlines.",
    tech: ["SQL", "Agile", "Code Reviews"],
    logoScale: 2.4,
  },
  {
    company: "Kumon",
    role: "Center Assistant",
    period: "Jan 2020 – Jan 2022",
    location: "Plano, TX",
    logo: "/logo_img_01.png",
    summary:
      "Applied data-guided learning plans that improved K-12 results in math and English. Supported 100+ students and families with consistent feedback, while maintaining detailed progress records to pinpoint gaps and target support.",
    tech: ["Student Support", "Data Tracking", "Communication"],
    logoScale: 2.5,
  },
];

/* ===== Motion presets ===== */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const primaryBtn =
  "inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-[var(--color-accent-ink)] transition hover:brightness-110";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-surface-elevated hover:border-border-hover";

/* ===== Thin top scroll-progress bar ===== */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
    />
  );
}

/* ===== Header that gains a background once you scroll past the hero ===== */
function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  return (
    <header className="sticky top-0 z-40">
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 border-b border-border bg-surface/85 backdrop-blur-md"
      />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between p-4">
        <span className="flex items-center gap-2 text-base font-medium tracking-tight">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Henry Nguyen
        </span>
        <ul className="hidden items-center gap-8 text-sm text-ink-muted sm:flex">
          <li><a href="#about" className="transition hover:text-ink">About</a></li>
          <li><a href="#projects" className="transition hover:text-ink">Projects</a></li>
          <li><a href="#experience" className="transition hover:text-ink">Experience</a></li>
          <li><a href="#contact" className="transition hover:text-ink">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

/* ===== Experience Carousel ===== */
function ExperienceCarousel() {
  const [i, setI] = useState(0);
  const exp = experiences[i];
  const canPrev = i > 0;
  const canNext = i < experiences.length - 1;

  return (
    <motion.section
      {...reveal}
      id="experience"
      className="relative z-10 mx-auto max-w-6xl px-4 py-24"
    >
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        Work
      </p>
      <h2 className="mb-10 text-center text-4xl font-semibold tracking-tight text-ink">
        Experience
      </h2>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 shadow-card">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        {/* Left arrow */}
        <button
          onClick={() => canPrev && setI((v) => v - 1)}
          className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition hover:border-border-hover hover:bg-surface-elevated-hover ${canPrev ? "" : "opacity-30 pointer-events-none"}`}
          aria-label="Previous experience"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-ink">
            <path fill="currentColor" d="M14.7 17.3L10.4 13l4.3-4.3-1.4-1.4L7.6 13l5.7 5.7z"/>
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => canNext && setI((v) => v + 1)}
          className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition hover:border-border-hover hover:bg-surface-elevated-hover ${canNext ? "" : "opacity-30 pointer-events-none"}`}
          aria-label="Next experience"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-ink">
            <path fill="currentColor" d="M9.3 6.7L13.6 11l-4.3 4.3 1.4 1.4L16.4 11 10.7 5.3z"/>
          </svg>
        </button>

        {/* Slide */}
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="grid items-center gap-8 md:grid-cols-[520px,1fr]">
            {/* Uniform logo stage */}
            <div className="h-72 sm:h-80 w-full rounded-xl bg-transparent p-0 flex items-center justify-center">
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1024px) 520px, 90vw"
                className="max-h-[85%] max-w-[85%] w-auto h-auto object-contain"
                style={{ transform: `scale(${exp.logoScale ?? 1})` }}
              />
            </div>

            {/* Text */}
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-3xl font-semibold text-ink">{exp.company}</h3>
                <span className="text-ink-faint">•</span>
                <p className="text-ink-muted">{exp.role}</p>
              </div>
              <p className="mt-1 text-ink-faint">
                {exp.period}{exp.location ? ` · ${exp.location}` : ""}
              </p>

              <p className="mt-4 text-ink-muted leading-relaxed">{exp.summary}</p>

              {exp.tech && exp.tech.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-ink-muted font-medium mr-1">Tech:</span>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5">
            {experiences.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1.5 rounded-full transition-all ${
                  dotIdx === i ? "w-5 bg-accent" : "w-1.5 bg-border-hover"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(heroProgress, [0, 1], [0, 40]);

  return (
    <main className="relative min-h-screen bg-surface text-ink">
      <ScrollProgressBar />

      {/* ---- Top bar ---- */}
      <Header />

      {/* ---- HERO ---- */}
      <section
        ref={heroRef}
        id="about"
        className="relative mx-auto max-w-4xl px-4 pt-24 sm:pt-32 pb-20 sm:pb-24 text-center"
      >
        {/* Ambient glow — a single soft accent light, not a rainbow blob field */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center"
        >
          <div className="h-[420px] w-[420px] rounded-full bg-accent/[0.20] blur-[110px]" />
        </div>

        {/* portrait — a true circle, sized moderately */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ y: portraitY }}
          className="relative mx-auto mb-8 h-52 w-52 sm:h-60 sm:w-60"
        >
          <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-border shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]">
            <Image
              src="/profile.jpg"
              alt="Photo of Henry Nguyen"
              width={400}
              height={400}
              priority
              className="h-full w-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* text */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mx-auto max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-ink-muted shadow-card">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            CS Student @ UTD
          </span>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
            Henry Nguyen
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Hello! I am currently a student @ UTD pursuing a CS degree with a minor in
            cybersecurity, focused on software, AI, and data-driven development.
          </p>

          {/* buttons row */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={primaryBtn}>
              View Resume
            </a>
            <a href="#experience" className={secondaryBtn}>
              See experience
            </a>
            <a href="#contact" className={secondaryBtn}>
              Contact
            </a>
          </motion.div>

          {/* Quick stats — computed from the actual data below, not hardcoded */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="mt-12 flex items-center justify-center divide-x divide-border"
          >
            {[
              { label: "Projects", value: projects.length },
              { label: "Roles", value: experiences.length },
              { label: "Technologies", value: skillItems.length },
            ].map((s) => (
              <div key={s.label} className="px-6 text-center first:pl-0 last:pr-0 sm:px-10">
                <div className="text-3xl font-semibold text-ink">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-ink-faint">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ---- SKILLS STRIP ---- */}
      <SkillsMarquee />

      {/* ---- EXPERIENCE CAROUSEL ---- */}
      <ExperienceCarousel />

      {/* ---- PROJECTS ---- */}
      <ProjectsShowcase />

      {/* ---- CONTACT / FOOTER ---- */}
      <motion.footer
        {...reveal}
        id="contact"
        className="relative mx-auto w-full max-w-6xl px-4 py-16"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-8 sm:p-10 shadow-card">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-32 flex justify-center"
          >
            <div className="h-[320px] w-[320px] rounded-full bg-accent/[0.16] blur-[100px]" />
          </div>

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            {/* Contact info */}
            <div className="text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Get In Touch
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-ink">Contact</h2>
              <p className="mt-4 text-lg sm:text-xl text-ink-muted">
                Email:{" "}
                <a
                  href="mailto:henrynguyen2394@gmail.com"
                  className="font-medium text-ink underline decoration-border-hover underline-offset-4 transition hover:text-accent hover:decoration-accent/60"
                >
                  henrynguyen2394@gmail.com
                </a>
              </p>
            </div>

            {/* Socials */}
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-semibold text-ink">Socials</h3>
              <div className="mt-6 flex justify-center gap-5">
                <a
                  href="https://www.linkedin.com/in/henry-nguyen231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-border transition hover:border-border-hover hover:bg-surface-elevated-hover"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7 text-ink">
                    <path d="M4.98 3.5C4.98 5 3.88 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1s2.48 1 2.48 2.5zM.02 8.5h4.95V24H.02V8.5zM8.98 8.5h4.72v2.1h.07c.66-1.25 2.28-2.58 4.69-2.58 5.01 0 5.94 3.3 5.94 7.59V24h-4.94v-6.77c0-1.61-.03-3.69-2.25-3.69-2.26 0-2.6 1.76-2.6 3.57V24H8.98V8.5z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/HenryWinNguyen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-border transition hover:border-border-hover hover:bg-surface-elevated-hover"
                  aria-label="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7 text-ink">
                    <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.09 3.29 9.4 7.86 10.94.58.1.79-.26.79-.57v-2.02c-3.2.7-3.88-1.37-3.88-1.37-.53-1.36-1.3-1.73-1.3-1.73-1.07-.73.08-.71.08-.71 1.18.09 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.43.98.1-.77.41-1.28.75-1.57-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.52.12-3.17 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.64 1.65.24 2.87.12 3.17.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.68.42.37.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.29-5.23-11.5-11.5-11.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
