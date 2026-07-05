"use client";

import { useEffect, useRef } from "react";
import {
  FiStar,
  FiArrowUpRight,
  FiGithub,
  FiExternalLink,
} from "react-icons/fi";

/* ─────────────────────────────────────────────────────────
   REPLACE with your real projects:
   - image: put a screenshot in /public/projects/ and link it
   - liveUrl: your deployed site URL
   - githubUrl: your GitHub repo URL
───────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    num: "01",
    title: "Project Alpha",
    subtitle: "Full-Stack Web Application",
    desc: "A production-ready web application with real-time features, authentication, and a clean dashboard UI. Replace this with your actual project description.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    year: "2025",
    liveUrl: "#",
    githubUrl: "#",
    /* Gradient shown until you add a real screenshot */
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accentColor: "#3b82f6",
  },
  {
    num: "02",
    title: "Project Beta",
    subtitle: "Next.js Platform",
    desc: "A server-side rendered platform with optimised performance, Tailwind CSS design system, and REST API integration. Replace with your actual project.",
    tags: ["Next.js", "Tailwind CSS", "Express", "MySQL"],
    year: "2024",
    liveUrl: "#",
    githubUrl: "#",
    gradient: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)",
    accentColor: "#22c55e",
  },
  {
    num: "03",
    title: "Project Gamma",
    subtitle: "Analytics Dashboard",
    desc: "A responsive analytics dashboard with data visualisations, role-based access, and REST API integration. Replace with your actual project.",
    tags: ["React", "Bootstrap", "MySQL", "Chart.js"],
    year: "2024",
    liveUrl: "#",
    githubUrl: "#",
    gradient: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 50%, #3b0f87 100%)",
    accentColor: "#a855f7",
  },
];

export default function WorkSection() {
  const ref = useRef(null);

  useEffect(() => {
    let ctx;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          /* ── Each card animates independently on scroll ── */
          document.querySelectorAll(".work-card").forEach((card, i) => {
            const img = card.querySelector(".work-img-wrap");
            const content = card.querySelector(".work-content");
            const isEven = i % 2 === 0;

            /* Card reveal — clips in from bottom */
            gsap.fromTo(
              card,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                },
              }
            );

            /* Image: clip-path wipe left→right */
            gsap.fromTo(
              img,
              { clipPath: "inset(0 100% 0 0)", opacity: 0.6 },
              {
                clipPath: "inset(0 0% 0 0)",
                opacity: 1,
                duration: 0.9,
                ease: "power3.inOut",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                },
              }
            );

            /* Content: staggered children */
            gsap.from(content.children, {
              y: 22,
              opacity: 0,
              stagger: 0.08,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 76%",
              },
            });
          });

          /* Section label */
          gsap.from(".work-label", {
            y: 16,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 88%" },
          });
        }, ref);
      });
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="work"
      ref={ref}
      className="section border-t border-[var(--border)]"
    >
      {/* Section label */}
      <div className="work-label sect-label">
        <FiStar size={11} />
        Work Highlights
      </div>

      {/* Project cards */}
      <div className="flex flex-col gap-6">
        {PROJECTS.map((project) => (
          <WorkCard key={project.num} project={project} />
        ))}
      </div>
    </section>
  );
}

/* ── Single project card ── */
function WorkCard({ project }) {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="work-card group overflow-hidden rounded-2xl border border-[var(--border)] transition-all duration-500 hover:border-[var(--accent-border)]"
      style={{ background: "var(--bg-card)" }}
    >
      {/* ── Top: image area ── */}
      <div className="relative overflow-hidden">
        <div
          className="work-img-wrap relative h-[220px] w-full overflow-hidden"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          {/*
           * ── HOW TO ADD YOUR PROJECT SCREENSHOT ──────────────────────
           * Replace the gradient div below with:
           * <img src="/projects/your-screenshot.png"
           *      alt="Project Name"
           *      className="h-full w-full object-cover object-top
           *                 transition-transform duration-700 group-hover:scale-105" />
           * ─────────────────────────────────────────────────────────────
           */}
          <div
            className="h-full w-full transition-transform duration-700 group-hover:scale-105"
            style={{ background: project.gradient }}
          >
            {/* Decorative grid overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,.06) 40px,rgba(255,255,255,.06) 41px),
                   repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,.06) 40px,rgba(255,255,255,.06) 41px)`,
              }}
            />
            {/* Placeholder text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p
                className="rounded-xl border px-5 py-2.5 text-[13px] font-medium"
                style={{
                  borderColor: `${project.accentColor}40`,
                  color: project.accentColor,
                  background: `${project.accentColor}15`,
                }}
              >
                Add your screenshot → /public/projects/
              </p>
            </div>
          </div>
        </div>

        {/* Year badge */}
        <div
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {project.year}
        </div>

        {/* Number badge */}
        <div
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.45)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {project.num}
        </div>
      </div>

      {/* ── Bottom: content area ── */}
      <div className="work-content p-6">
        {/* Subtitle */}
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {project.subtitle}
        </p>

        {/* Title */}
        <h3 className="mb-3 font-['Space_Grotesk'] text-[22px] font-bold leading-tight tracking-[-0.03em] text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent)]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 max-w-[520px] text-[13px] leading-[1.7] text-[var(--text-secondary)]">
          {project.desc}
        </p>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-[11px] font-medium text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-[var(--border)]" />

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {/* Live link */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 hover:opacity-85"
            style={{
              background: "var(--accent)",
              color: "#000",
            }}
          >
            <FiExternalLink size={13} />
            Live Demo
          </a>

          {/* GitHub */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[var(--border-strong)] px-4 py-2.5 text-[13px] font-medium text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
            style={{ background: "var(--bg-card-border)" }}
          >
            <FiGithub size={13} />
            GitHub
          </a>

          {/* Arrow hint */}
          <div
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-muted)] transition-all duration-200 group-hover:bg-[var(--accent-dim)] group-hover:text-[var(--accent)]"
            style={{ background: "var(--bg-card-border)" }}
          >
            <FiArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
