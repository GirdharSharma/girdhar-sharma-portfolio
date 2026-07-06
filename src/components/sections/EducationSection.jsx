"use client";

import { useEffect, useRef, useState } from "react";
import { FiBookOpen, FiBriefcase, FiArrowUpRight } from "react-icons/fi";

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
  const dotRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   let ctx;

  //   import("gsap").then(({ gsap }) => {
  //     import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
  //       gsap.registerPlugin(ScrollTrigger);

  //       ctx = gsap.context(() => {
  //         gsap.from(".tl-item", {
  //           y: 32,
  //           opacity: 0,
  //           stagger: 0.15,
  //           duration: 0.7,
  //           ease: "power3.out",
  //           scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
  //         });

  //         // Line fills downward as you scroll through the section
  //         gsap.fromTo(
  //           lineRef.current,
  //           { scaleY: 0 },
  //           {
  //             scaleY: 1,
  //             ease: "none",
  //             scrollTrigger: {
  //               trigger: sectionRef.current,
  //               start: "top 70%",
  //               end: "bottom 55%",
  //               scrub: 0.6,
  //             },
  //           }
  //         );

  //         // Glowing dot rides the leading edge of the line
  //         gsap.fromTo(
  //           dotRef.current,
  //           { top: "0%" },
  //           {
  //             top: "100%",
  //             ease: "none",
  //             scrollTrigger: {
  //               trigger: sectionRef.current,
  //               start: "top 70%",
  //               end: "bottom 55%",
  //               scrub: 0.6,
  //             },
  //           }
  //         );
  //       }, sectionRef);
  //     });

  //   });

  //   return () => ctx?.revert();
  // }, []);

  useEffect(() => {
    let ctx;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // entry animation
          gsap.from(".tl-item", {
            y: 32,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          });

          // timeline line
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 55%",
                scrub: 0.6,
              },
            }
          );

          // dot movement
          gsap.fromTo(
            dotRef.current,
            { top: "0%" },
            {
              top: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 55%",
                scrub: 0.6,
              },
            }
          );

          // ✅ FIXED: correct trigger binding
          itemRefs.current.forEach((el, index) => {
            if (!el) return;

            ScrollTrigger.create({
              trigger: el,
              start: "top 75%", // 👈 key fix
              end: "bottom 75%",
              onEnter: () => setActiveIndex(index),
              onEnterBack: () => setActiveIndex(index),
            });
          });
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
      <div className="sect-label">
        <FiBookOpen size={12} />
        Education &amp; Experience
      </div>

      <div className="relative mt-10 pl-[52px] sm:pl-[64px]">
        {/* Track */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-[var(--border)] sm:left-[19px]" />
        {/* Fill */}
        <div
          ref={lineRef}
          className="absolute left-[15px] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[var(--accent)] to-[var(--accent)]/20 sm:left-[19px]"
          style={{ transform: "scaleY(0)" }}
        />
        {/* Traveling glow marker */}
        <div
          ref={dotRef}
          className="absolute left-[15px] z-10 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] sm:left-[19px]"
          style={{
            boxShadow: "0 0 12px 3px var(--accent-glow, var(--accent))",
          }}
        />

        <div className="flex flex-col gap-14">
          {TIMELINE.map((item, i) => {
            const Icon = item.type === "work" ? FiBriefcase : FiBookOpen;

            return (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className="tl-item relative"
              >
                {/* Number/icon marker on the track */}
                <div
                  className={`absolute left-[-52px] top-0 flex h-[32px] w-[32px] items-center justify-center rounded-full text-[13px] font-semibold sm:left-[-64px] ${
                    i <= activeIndex
                      ? "bg-[var(--accent)] text-black"
                      : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-strong)]"
                  }`}
                >
                  <Icon size={13} />
                </div>

                {/* Eyebrow row: period + current pill */}
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[12px] tracking-wide text-[var(--text-muted)]">
                    {item.period}
                  </span>
                  {item.current && (
                    <span className="flex items-center gap-[6px] text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                      <span className="relative flex h-[6px] w-[6px]">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                        <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-[var(--accent)]" />
                      </span>
                      Current
                    </span>
                  )}
                </div>

                {/* Card — glass, no heavy border-box like before */}
                <div
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                    item.current
                      ? "bg-gradient-to-br from-[var(--accent-dim)] to-transparent ring-1 ring-[var(--accent-border)]"
                      : "bg-white/[0.02] ring-1 ring-[var(--border)] hover:ring-[var(--border-strong)] hover:bg-white/[0.035]"
                  }`}
                >
                  <div className="mb-1 flex items-start justify-between gap-4">
                    <h4 className="text-[19px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                      {item.role}
                    </h4>
                    <FiArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-[var(--text-muted)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                    />
                  </div>

                  <p className="mb-3 text-[13px] font-medium text-[var(--accent)]">
                    {item.org}
                  </p>

                  <p className="max-w-[560px] text-[14px] leading-[1.7] text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
