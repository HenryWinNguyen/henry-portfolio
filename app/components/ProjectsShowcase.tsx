'use client';

import { motion } from 'framer-motion';
import ProjectCard, { Project } from './ProjectCard';

export const projects: Project[] = [

  {
    title: 'Sentry Load',
    description:
      'A distributed load-testing platform in Go coordinating a multi-region worker fleet over Redis Streams, with Prometheus/Grafana observability and capacity-aware admission control that cut failed test runs by 40%.',
    cover: '/projects/sentry-load_cover.svg',
    screenshots: [],
    tags: ['Go', 'Redis Streams', 'Prometheus/Grafana', 'Docker'],
    codeUrl: 'https://github.com/HenryWinNguyen/sentry-load',
    storeUrl: 'https://sentry-load.vercel.app',
    featured: true,
  },

  {
    title: 'Momentum Chrome Extension',
    description:
      'A lightweight Chrome extension that keeps daily tasks, assignments, and to-dos at your fingertips in the browser.',
    cover: '/projects/momentum_cover.png',
    screenshots: [
      '/projects/momentum_tasks.png',
      '/projects/momentum_wins.png',
    ],
    tags: ['React', 'TypeScript', 'Tailwind', 'Chrome APIs'],
    codeUrl: "https://github.com/HenryWinNguyen/momentum-extension",
    storeUrl: 'https://chromewebstore.google.com/detail/momentum/ndccoajkpdpckpfaijfbobeodloefjkn',
  },

  {
    title: "NBA Muse",
    description:
      "I used to sports bet a lot, so I built a stats explorer for any NBA player's box score data from 1997–2024, backed by Turso.",
    cover: "/projects/nba-muse_cover.png",
    screenshots: [],
    tags: ["Turso", "Data Modeling", "Query Optimization", "Data Pipeline"],
    codeUrl: "https://github.com/HenryWinNguyen/nba-muse",
    storeUrl: "https://nba-muse.vercel.app/app.html",
  },

  {
    title: "Smart Shot Coach",
    description:
      "A C++ analytics engine that evaluates basketball shot selection using spatial data and expected value modeling.",
    cover: "/projects/smart-shot-cover.png",
    screenshots: [],
    tags: [
      "C++",
      "Algorithms",
      "Data Structures",
      "Spatial Analysis",
    ],
    codeUrl: "https://github.com/HenryWinNguyen/smart-shot-coach",
    storeUrl: "https://smart-shot-coach.vercel.app",
  },

  {
    title: 'JobFill',
    description:
    'A Chrome extension that auto-fills Workday and similar job application forms to save you time.',
    cover: '/projects/jobfill_cover.png',
    coverFit: 'contain',
    screenshots: [
      '/projects/jobfill_settings.png',
    ],
    tags: ['JavaScript', 'DOM Manipulation', 'Async/Await', 'Reverse Engineering'],
    codeUrl: 'https://github.com/HenryWinNguyen/JobFill',
    storeUrl: 'https://chromewebstore.google.com/detail/jobfill/kopfpgidbllmikfbjbcnknccpjmknmgf',
  },
  
  {
    title: "Multiplication 4-in-a-Row (MIPS)",
    description:
      "A turn-based 6×6 multiplication game for the MARS simulator, with an ASCII UI and a simple AI opponent.",
    cover: "/projects/mips_4inarow.jpg",
    coverFit: 'contain',
    screenshots: [],
    tags: ["MIPS", "Assembly", "Computer Architecture", "Low-Level Programming"],
    codeUrl: "https://github.com/HenryWinNguyen/MIPS-Assembly-Multplication-Game",
  },

  {
    title: "CloudNotes",
    description:
      "A local-first notebook for runnable code snippets, executing Python or JavaScript inside an isolated Docker sandbox.",
    cover: "/projects/cloudnotes_cover.png",
    screenshots: [
      "/projects/cloudnotes_ss1.png",
      "/projects/cloudnotes_ss2.png", 
    ],
    tags: ["Docker", "Containers", "Sandboxed Execution", "Dev Tooling"],
    codeUrl: "https://github.com/HenryWinNguyen/cloudnotes",
  },
  
  {
    title: "Internship Tracker",
    description:
      "Full-stack app to manage internship applications, with filtering, sorting, status tracking, and micro-animations.",
    cover: "/projects/internship-tracker_cover.png",
    screenshots: ["/projects/internship-tracker_ss.png"],
    tags: [
      "Next.js",
      "REST API",
      "Framer Motion",
      "Responsive Design",
    ],
    codeUrl: "https://github.com/HenryWinNguyen/Internship-Tracker",
  },
  
  
  
  
  
];

export default function ProjectsShowcase() {
  const single = projects.length === 1;

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 mx-auto max-w-6xl px-4 py-24"
    >
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        Selected Work
      </p>
      <h2 className="mb-10 text-center text-4xl font-semibold tracking-tight text-ink">
        My Projects
      </h2>

      {/* Center if one; grid to 3 across when many */}
      <div className={single
        ? 'flex justify-center'
        : 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center'}>
        {projects.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: (idx % 3) * 0.08 }}
            className="w-full max-w-[380px]"
          >
            <ProjectCard {...p} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
