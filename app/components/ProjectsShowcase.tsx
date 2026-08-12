'use client';

import ProjectCard, { Project } from './ProjectCard';

const projects: Project[] = [
  
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
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-4 py-24 border-t border-white/10">
      <h2 className="mb-10 text-center text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          My Projects
        </span>
      </h2>

      {/* Center if one; grid to 3 across when many */}
      <div className={single
        ? 'flex justify-center'
        : 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center'}>
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
