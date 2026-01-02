'use client';

import ProjectCard, { Project } from './ProjectCard';

const projects: Project[] = [
  
  {
    title: 'Momentum Chrome Extension',
    description:
    "A lightweight Google Chrome extension for personal use that keeps simple daily tasks, assignments, and to-dos at your fingertips in the browser. Available on the Chrome Web Store (pending review).",
  
    cover: '/projects/momentum_cover.png',
    screenshots: [
      '/projects/momentum_tasks.png',
      '/projects/momentum_wins.png',
    ],
    tags: ['React', 'TypeScript', 'Tailwind', 'Chrome APIs'],
    codeUrl: "https://github.com/HenryWinNguyen/momentum-extension",
    storeUrl: '', // paste the store link here when approved
  },

  {
    title: "NBA Muse",
    description:
      "I used to sports bet a lot, so I built NBA Muse, a personal stats explorer that surfaces any player’s box score data from 1997–2024. It combines a structured data pipeline with a performant Turso backend to deliver instant lookups.",
    cover: "/projects/nba-muse_cover.png", // make sure this file is inside /public
    screenshots: [
      '/public/projects.nba-muse_cover.png',
    ],
    tags: ["Turso", "Data Modeling", "Query Optimization", "Data Pipeline"],
    codeUrl: "https://github.com/HenryWinNguyen/nba-muse",
    storeUrl: "https://nba-muse.vercel.app/app.html", 
    disableFlip: true,
  },

  {
    title: "Smart Shot Coach",
    description:
      "A C++ powered basketball analytics engine that evaluates shot selection using spatial data, expected value modeling, and play context to recommend higher efficiency scoring decisions.",
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
    disableFlip: true
  },
  
  {
    title: "Multiplication 4-in-a-Row (MIPS)",
    description:
      "Turn-based 6×6 multiplication game for the MARS simulator. Implements ASCII UI, slider input, win and tie detection, modular assembly procedures, and a simple AI that evaluates winning moves and validates state.",
    cover: "/projects/mips_4inarow.jpg", 
    screenshots: [],                      // simple tile, no gallery
    tags: ["MIPS", "Assembly", "MARS", "Algorithms", "Game Dev"],
    codeUrl: "https://github.com/HenryWinNguyen/MIPS-Assembly-Multplication-Game",
    disableFlip: true,
  }, 

  {
    title: "CloudNotes",
    description:
      "A local-first notebook for runnable code snippets. Each note executes Python or JavaScript inside a Docker sandbox, giving fast feedback while studying without polluting my local environment.",
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
      "Full-stack app to manage internship applications with filtering, sorting, and status tracking. Built with TypeScript, Tailwind, and localStorage persistence. Includes responsive design, micro-animations, and planned AI auto-categorization.",
    cover: "/projects/internship-tracker_cover.png",  // ✅ briefcase icon
    screenshots: ["/projects/internship-tracker_ss.png"], // ✅ UI screenshot
    tags: [
      "Next.js",
      "REST API",
      "Framer Motion",
      "Responsive Design",
      "AI Integration"
    ],
    codeUrl: "https://github.com/HenryWinNguyen/Internship-Tracker",
    disableFlip: false
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
