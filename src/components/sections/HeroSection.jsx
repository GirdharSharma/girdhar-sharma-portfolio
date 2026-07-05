"use client";

import { useEffect, useRef } from "react";
import { FiMapPin } from "react-icons/fi";

const TECHNOLOGIES = [
  "React",
  "Next.js",
  "JavaScript",
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
];

export default function HeroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
          });

          tl.from(".hero-badge", {
            y: 20,
            opacity: 0,
            duration: 0.6,
          })
            .from(
              ".hero-headline",
              {
                y: 32,
                opacity: 0,
                duration: 0.7,
              },
              "-=0.3"
            )
            .from(
              ".hero-stats > div",
              {
                y: 20,
                opacity: 0,
                stagger: 0.12,
                duration: 0.5,
              },
              "-=0.4"
            )
            .from(
              ".hero-tech-label",
              {
                y: 12,
                opacity: 0,
                duration: 0.4,
              },
              "-=0.3"
            )
            .from(
              ".hero-pill",
              {
                y: 10,
                opacity: 0,
                stagger: 0.06,
                duration: 0.4,
              },
              "-=0.2"
            );
        }, sectionRef);
      });
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="section flex min-h-screen flex-col justify-center pt-[72px] pb-[72px]"
    >
      {/* Author Badge */}
      <div className="hero-badge mb-10 flex items-center gap-3">
        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[var(--accent-border)] bg-[var(--accent-dim)]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <div>
          <p className=" text-[16px] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
            Girdhar Sharma
          </p>

          <p className="mt-[2px] flex items-center gap-1 text-[14px] text-[var(--text-secondary)]">
            <FiMapPin size={10} />
            Frontend Developer · Ahmedabad, India
          </p>
        </div>
      </div>

      {/* Heading */}
      <h1 className="hero-headline mb-11 max-w-[680px] text-[clamp(40px,5.6vw,68px)] font-bold leading-[1.07] tracking-[-0.04em] text-[var(--text-primary)]">
        I&apos;m building{" "}
        <span className="inline-block rounded-[14px] bg-[var(--accent)] px-[22px] pt-[2px] pb-[5px] font-bold text-black">
          websites
        </span>
        <br />
        <span className="text-[var(--accent)]">&amp; products</span> people love
      </h1>

      {/* Stats */}
      <div className="hero-stats mb-12 flex flex-wrap gap-10">
        {[
          { num: "2+", label: "Year of experience" },
          { num: "10+", label: "Projects shipped" },
          { num: "2", label: "Roles at AeronFly" },
        ].map(({ num, label }) => (
          <div key={label}>
            <p className="text-[38px] font-bold leading-none tracking-[-0.04em] text-[var(--text-primary)]">
              {num}
            </p>

            <p className="mt-1 text-[14px] text-[var(--text-secondary)]">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Tech Label */}
      <p className="hero-tech-label mb-3 flex items-center gap-2 text-[14px] text-[var(--text-muted)]">
        <span className="inline-block h-px w-[18px] bg-[var(--text-muted)]" />
        Technologies I work with
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {TECHNOLOGIES.map((tech) => (
          <span
            key={tech}
            className="hero-pill cursor-default rounded-full border border-[var(--border)] bg-white/5 px-[14px] py-[5px] text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
