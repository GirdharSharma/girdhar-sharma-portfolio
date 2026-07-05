"use client";

import { useEffect, useRef, useState } from "react";
import { FiStar, FiArrowUpRight } from "react-icons/fi";

const PROJECTS = [
  {
    num: "01",
    title: "Project Alpha",
    desc: "A full-featured web application built with React and Node.js. Replace this with your actual project description.",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2025",
    href: "#",
    image: "/projects/work-1.webp",
  },
  {
    num: "02",
    title: "Project Beta",
    desc: "A Next.js powered platform with server-side rendering and Tailwind CSS. Replace with your actual project.",
    tags: ["Next.js", "Tailwind CSS", "Express"],
    year: "2024",
    href: "#",
    image: "/projects/work-2.webp",
  },
  {
    num: "03",
    title: "Project Gamma",
    desc: "A responsive dashboard with data visualizations and REST API integration. Replace with your actual project.",
    tags: ["React", "Bootstrap", "MySQL"],
    year: "2024",
    href: "#",
    image: "/projects/work-3.webp",
  },
];

export default function WorkSection() {
  const sectionRef = useRef(null);
  const previewRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);
  const [hovered, setHovered] = useState(null);

  // Scroll-in animation for rows
  useEffect(() => {
    let ctx;
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.from(".work-row", {
            y: 28,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          });
        }, sectionRef);
      });
    });
    return () => ctx?.revert();
  }, []);

  // Set up cursor-following preview (desktop only)
  useEffect(() => {
    let gsapInstance;
    import("gsap").then(({ gsap }) => {
      gsapInstance = gsap;
      gsap.set(previewRef.current, {
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0.92,
      });
      quickX.current = gsap.quickTo(previewRef.current, "x", {
        duration: 0.55,
        ease: "power3.out",
      });
      quickY.current = gsap.quickTo(previewRef.current, "y", {
        duration: 0.55,
        ease: "power3.out",
      });
    });
  }, []);

  const handleMouseMove = (e) => {
    quickX.current?.(e.clientX + 30);
    quickY.current?.(e.clientY - 20);
  };

  const showPreview = (project) => {
    setHovered(project);
    import("gsap").then(({ gsap }) => {
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    });
  };

  const hidePreview = () => {
    import("gsap").then(({ gsap }) => {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 0.3,
        ease: "power2.inOut",
      });
    });
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section relative border-t border-[var(--border)]"
      onMouseMove={handleMouseMove}
    >
      <div className="sect-label">
        <FiStar size={11} />
        Work Highlights
      </div>

      <div>
        {PROJECTS.map((p, i) => (
          <div
            key={p.num}
            onMouseEnter={() => showPreview(p)}
            onMouseLeave={hidePreview}
            className={`work-row group flex cursor-pointer gap-5 py-[26px] transition-[padding-left] duration-300 ease-in-out hover:pl-[10px] ${
              i === 0
                ? "border-y border-[var(--border)]"
                : "border-b border-[var(--border)]"
            }`}
          >
            {/* Number */}
            <span className="mt-1 w-[26px] shrink-0 text-[11px] font-semibold tracking-[0.06em] text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--accent)]">
              {p.num}
            </span>

            {/* Mobile-only thumbnail */}
            <div className="block h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5 md:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="text-[22px] font-bold text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--accent)]">
                  {p.title}
                </h3>
                <div className="flex shrink-0 items-center gap-[10px]">
                  <span className="text-[12px] text-[var(--text-muted)]">
                    {p.year}
                  </span>
                  <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[var(--bg-card-border)] text-[var(--text-muted)] transition-colors duration-200 group-hover:bg-[var(--accent)] group-hover:text-black">
                    <FiArrowUpRight size={13} />
                  </div>
                </div>
              </div>

              <p className="mb-3 max-w-[480px] text-[13px] leading-[1.65] text-[var(--text-secondary)]">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-[6px]">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-white/5 px-[11px] py-[3px] text-[11px] font-medium text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cursor-following image preview — desktop only */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[190px] w-[260px] overflow-hidden rounded-xl border border-white/10 opacity-0 shadow-ll shadow-black/60 md:block"
      >
        {hovered && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hovered.image}
            alt={hovered.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </section>
  );
}
