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
    title: "Multiplication 4-in-a-Row (MIPS)",
    description:
      "Turn-based 6×6 multiplication game for the MARS simulator. Implements ASCII UI, slider input, win and tie detection, modular assembly procedures, and a simple AI that evaluates winning moves and validates state.",
    cover: "/projects/mips_4inarow.jpg", // ← change to .png if your file is PNG
    screenshots: [],                      // simple tile, no gallery
    tags: ["MIPS", "Assembly", "MARS", "Algorithms", "Game Dev"],
    codeUrl: "https://github.com/HenryWinNguyen/MIPS-Assembly-Multplication-Game",
    disableFlip: true,
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
