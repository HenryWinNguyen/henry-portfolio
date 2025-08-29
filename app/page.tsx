'use client';

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ProjectsShowcase from "./components/ProjectsShowcase";

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
    company: "Imagine Communications",
    role: "IT Specialist Intern",
    period: "Jan 2025 – Present",
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

/* ===== Simple fade animation ===== */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/* ===== Experience Carousel ===== */
function ExperienceCarousel() {
  const [i, setI] = useState(0);
  const exp = experiences[i];
  const canPrev = i > 0;
  const canNext = i < experiences.length - 1;

  return (
    <section id="experience" className="relative z-10 mx-auto max-w-6xl px-4 py-24 border-t border-white/10">
      <h2 className="mb-10 text-center text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Experience
        </span>
      </h2>

      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur">
        {/* Left arrow */}
        <button
          onClick={() => canPrev && setI((v) => v - 1)}
          className={`group absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur transition hover:bg-white/20 ${canPrev ? "" : "opacity-30 pointer-events-none"}`}
          aria-label="Previous experience"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-white">
            <path fill="currentColor" d="M14.7 17.3L10.4 13l4.3-4.3-1.4-1.4L7.6 13l5.7 5.7z"/>
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => canNext && setI((v) => v + 1)}
          className={`group absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur transition hover:bg-white/20 ${canNext ? "" : "opacity-30 pointer-events-none"}`}
          aria-label="Next experience"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-white">
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
                <h3 className="text-3xl font-bold">{exp.company}</h3>
                <span className="text-neutral-400">•</span>
                <p className="text-neutral-300">{exp.role}</p>
              </div>
              <p className="mt-1 text-neutral-400">
                {exp.period}{exp.location ? ` · ${exp.location}` : ""}
              </p>

              <p className="mt-4 text-neutral-200 leading-relaxed">{exp.summary}</p>

              {exp.tech && exp.tech.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-neutral-300 font-medium mr-1">Tech:</span>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-neutral-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-neutral-400">
            {i + 1} / {experiences.length}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100">
      {/* ---- Page Backdrop (fixed) ---- */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        {/* base matte */}
        <div className="absolute inset-0 bg-neutral-950" />

        {/* HERO BAND (top ~72vh) */}
        <div className="absolute inset-x-0 top-0 h-[72vh]">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-transparent" />
          <div
            className="absolute inset-0 blur-2xl opacity-80"
            style={{
              backgroundImage:
                "radial-gradient(680px 360px at 50% 18%, rgba(59,130,246,0.35), transparent 60%), radial-gradient(520px 280px at 18% 58%, rgba(168,85,247,0.28), transparent 60%), radial-gradient(520px 260px at 82% 52%, rgba(236,72,153,0.24), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>



        {/* BODY depth */}
        <div className="absolute inset-x-0 bottom-0 h-[55vh] bg-[linear-gradient(to_bottom,transparent,rgba(18,18,18,0.40))]" />
      </div>

      {/* ---- Top bar ---- */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-neutral-950/60 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <span className="text-base font-semibold tracking-tight">Henry Nguyen</span>
          <ul className="hidden items-center gap-6 text-sm text-neutral-300 sm:flex">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#projects" className="hover:text-white">Projects</a></li>
            <li><a href="#experience" className="hover:text-white">Experience</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* ---- HERO ---- */}
      <section id="about" className="relative z-10 mx-auto max-w-4xl px-4 pt-28 sm:pt-36 pb-16 sm:pb-20 text-center">
        {/* portrait */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto mb-8 w-60 sm:w-72 md:w-80"
        >
          <div className="relative h-[32rem] w-full overflow-hidden rounded-full ring-1 ring-white/15 shadow-[0_0_60px_rgba(59,130,246,0.35)]">
            <Image
              src="/profile.jpg"
              alt="Photo of Henry Nguyen"
              width={1000}
              height={1400}
              priority
              className="h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-black/10" />
          </div>
        </motion.div>

        {/* text card */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
        >
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Henry Nguyen
            </span>
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-neutral-200">
            Hello! I am currently a student @ UTD pursuing a CS degree with a minor in
            cybersecurity, focused on software, AI, and data-driven development.
          </p>

          {/* buttons row */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-6 flex items-center justify-center gap-4"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-90"
            >
              View Resume
            </a>
            <a
              href="#experience"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-90"
            >
              See experience
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-neutral-100 transition hover:bg-white/10"
            >
              Contact
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ---- EXPERIENCE CAROUSEL ---- */}
      <ExperienceCarousel />

      {/* ---- PROJECTS ---- */}
      <ProjectsShowcase />

      {/* ---- CONTACT / FOOTER ---- */}
      <footer id="contact" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 border-t border-white/10">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent p-8 sm:p-10 backdrop-blur">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Contact info */}
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Contact
                </span>
              </h2>
              <p className="mt-4 text-lg sm:text-xl text-neutral-200">
                Email:{" "}
                <a
                  href="mailto:henrynguyen2394@gmail.com"
                  className="font-medium underline decoration-white/40 underline-offset-4 hover:decoration-transparent hover:text-white transition"
                >
                  henrynguyen2394@gmail.com
                </a>
              </p>
            </div>

            {/* Socials */}
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Socials</h3>
              <div className="mt-6 flex justify-center gap-5">
                <a
                  href="https://www.linkedin.com/in/henry-nguyen231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20 transition"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7 text-white">
                    <path d="M4.98 3.5C4.98 5 3.88 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1s2.48 1 2.48 2.5zM.02 8.5h4.95V24H.02V8.5zM8.98 8.5h4.72v2.1h.07c.66-1.25 2.28-2.58 4.69-2.58 5.01 0 5.94 3.3 5.94 7.59V24h-4.94v-6.77c0-1.61-.03-3.69-2.25-3.69-2.26 0-2.6 1.76-2.6 3.57V24H8.98V8.5z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/HenryWinNguyen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20 transition"
                  aria-label="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7 text-white">
                    <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.09 3.29 9.4 7.86 10.94.58.1.79-.26.79-.57v-2.02c-3.2.7-3.88-1.37-3.88-1.37-.53-1.36-1.3-1.73-1.3-1.73-1.07-.73.08-.71.08-.71 1.18.09 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.43.98.1-.77.41-1.28.75-1.57-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.52.12-3.17 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.64 1.65.24 2.87.12 3.17.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.68.42.37.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.29-5.23-11.5-11.5-11.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
