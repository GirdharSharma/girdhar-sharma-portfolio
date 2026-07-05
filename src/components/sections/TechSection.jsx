"use client";

import { useEffect, useRef } from "react";
import { FiLayers } from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
} from "react-icons/si";

const SKILLS = [
  {
    name: "React.js",
    desc: "Component-based UI library",
    pct: 88,
    cat: "Frontend",
    Icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    desc: "Full-stack React framework",
    pct: 85,
    cat: "Frontend",
    Icon: SiNextdotjs,
    color: "#FFFFFF",
  },
  {
    name: "JavaScript",
    desc: "Core scripting language",
    pct: 87,
    cat: "Frontend",
    Icon: SiJavascript,
    color: "#F7DF1E",
  },
  {
    name: "Tailwind CSS",
    desc: "Utility-first styling",
    pct: 90,
    cat: "Frontend",
    Icon: SiTailwindcss,
    color: "#38BDF8",
  },
  {
    name: "Bootstrap",
    desc: "Responsive UI framework",
    pct: 82,
    cat: "Frontend",
    Icon: SiBootstrap,
    color: "#8b5cf6",
  },
  {
    name: "Node.js",
    desc: "JavaScript runtime",
    pct: 70,
    cat: "Backend",
    Icon: SiNodedotjs,
    color: "#8CC84B",
  },
  {
    name: "Express.js",
    desc: "Web application framework",
    pct: 68,
    cat: "Backend",
    Icon: SiExpress,
    color: "#FFFFFF",
  },
  {
    name: "MongoDB",
    desc: "NoSQL database",
    pct: 65,
    cat: "Backend",
    Icon: SiMongodb,
    color: "#4DB33D",
  },
  {
    name: "MySQL",
    desc: "Relational database",
    pct: 62,
    cat: "Backend",
    Icon: SiMysql,
    color: "#4479A1",
  },
];

export default function TechSection() {
  const ref = useRef(null);

  useEffect(() => {
    let ctx;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.from(".skill-bar-inner", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 78%",
            },
          });

          gsap.from(".skill-row", {
            y: 16,
            opacity: 0,
            stagger: 0.07,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
            },
          });
        }, ref);
      });
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="tech"
      ref={ref}
      className="section border-t border-[var(--border)]"
    >
      {/* Label */}
      <div className="sect-label">
        <FiLayers size={11} />
        Tech Stack
      </div>

      {/* Heading */}
      <h2 className="mb-9 text-[clamp(24px,3.4vw,38px)] font-bold leading-[1.2] tracking-[-0.03em] text-[var(--text-secondary)]">
        Tools and tech I build great products with
      </h2>

      {/* Frontend */}
      <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
        Frontend
      </p>

      <div className="mb-10">
        {SKILLS.filter((s) => s.cat === "Frontend").map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </div>

      {/* Backend */}
      <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
        Backend
      </p>

      <div>
        {SKILLS.filter((s) => s.cat === "Backend").map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
}

function SkillRow({ skill }) {
  const { name, desc, pct, cat, Icon, color } = skill;
  const isFrontend = cat === "Frontend";

  return (
    <div className="skill-row mb-4 flex flex-col gap-3 border-b border-[var(--border)] p-4 transition-colors sm:flex-row sm:items-center sm:gap-5 pb-10">
      {/* Icon + text */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}1A` }}
        >
          <Icon size={28} style={{ color }} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[16px] font-semibold text-[var(--text-primary)]">
            {name}
          </p>
          <p className="truncate text-[14px] text-[var(--text-muted)]">
            {desc}
          </p>
        </div>
      </div>

      {/* Pill bar */}
      <div className="relative h-8 w-full shrink-0 overflow-hidden rounded-full bg-white/[0.05] sm:w-[42%]">
        <div
          className={`skill-bar-inner flex h-full items-center justify-end rounded-full pr-[3px] ${
            isFrontend ? "bg-[var(--accent)]" : "bg-white/20"
          }`}
          style={{ width: `${pct}%` }}
        >
          <span
            className={`rounded-full px-2 py-[3px] text-[10.5px] font-semibold ${
              isFrontend
                ? "bg-black/25 text-black"
                : "bg-black/40 text-[var(--text-primary)]"
            }`}
          >
            {pct}%
          </span>
        </div>
      </div>
    </div>
  );
}
