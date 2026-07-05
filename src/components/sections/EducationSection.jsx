"use client";

import { useEffect, useRef } from "react";
import { FiBookOpen, FiBriefcase } from "react-icons/fi";

const TIMELINE = [
  {
    period: "Jan 2025 – Present",
    role: "Frontend Developer",
    org: "AeronFly International Pvt Ltd",
    desc: "Full-time frontend developer building production UIs with React and Next.js. Also contributed to backend development using Node.js, Express.js, and MySQL.",
    type: "work",
    current: true,
  },
  {
    period: "Oct 2024 – Jan 2025",
    role: "Frontend Developer Intern",
    org: "AeronFly International Pvt Ltd",
    desc: "Completed a 3-month internship focused on frontend development. Consistent performance led to a direct full-time offer.",
    type: "work",
  },
  {
    period: "2021 – 2024",
    role: "BCA — Bachelor of Computer Applications",
    org: "Jai Narayan Vyas University (JNVU)",
    desc: "Studied computer applications with a focus on software development. Simultaneously pursued a full-stack web development course to build real-world skills.",
    type: "edu",
  },
  {
    period: "Up to 2021",
    role: "Higher Secondary — 12th Grade",
    org: "Emmanuel Mission Sr. Sec. School",
    desc: "Completed senior secondary education with Science and Computer subjects, building a strong foundation for further studies.",
    type: "edu",
  },
];

export default function EducationSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    let ctx;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // Items fade/slide in
          gsap.from(".tl-item", {
            x: -20,
            opacity: 0,
            stagger: 0.18,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          });

          // Line draws downward as the section scrolls through view
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "bottom 60%",
                scrub: 0.6,
              },
            }
          );
        }, sectionRef);
      });
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section border-t border-[var(--border)]"
    >
      {/* Section Label */}
      <div className="sect-label">
        <FiBookOpen size={12} />
        Education &amp; Experience
      </div>

      {/* Timeline */}
      <div className="relative pl-9">
        {/* Track (static, faint) */}
        <div className="absolute left-[13px] top-2 bottom-2 w-px bg-[var(--border)]" />

        {/* Fill (animates in on scroll) */}
        <div
          ref={lineRef}
          className="absolute left-[13px] top-2 bottom-2 w-px origin-top bg-[var(--accent)]"
          style={{ transform: "scaleY(0)" }}
        />

        {TIMELINE.map((item, i) => {
          const Icon = item.type === "work" ? FiBriefcase : FiBookOpen;
          const isLast = i === TIMELINE.length - 1;

          return (
            <div
              key={i}
              className={`tl-item relative ${!isLast ? "pb-10" : ""}`}
            >
              {/* Icon marker */}
              <div
                className={`absolute left-[-36px] top-0 flex h-[27px] w-[27px] items-center justify-center rounded-full border ${
                  item.type === "work"
                    ? "border-[var(--accent)]/40 bg-[var(--accent-dim)] text-[var(--accent)]"
                    : "border-[var(--border-strong)] bg-[var(--bg-card-border)] text-[var(--text-muted)]"
                }`}
              >
                <Icon size={12} />
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-8">
                {/* Period column */}
                <p className="pt-[3px] text-[11px] font-medium tracking-[0.04em] text-[var(--text-muted)]">
                  {item.period}
                </p>

                {/* Card */}
                <div className="rounded-xl border border-[var(--border)] bg-white/[0.015] p-4 transition-colors duration-200 hover:border-[var(--border-strong)] hover:bg-white/[0.03] sm:-mt-[3px]">
                  <div className="mb-[3px] flex flex-wrap items-center gap-[10px]">
                    <h4 className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                      {item.role}
                    </h4>
                    {item.current && (
                      <span className="rounded-full bg-[var(--accent-dim)] px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--accent)]">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="mb-2 text-[12px] font-medium text-[var(--accent)]">
                    {item.org}
                  </p>

                  <p className="text-[13px] leading-[1.65] text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
