"use client";

import { useState, useEffect, useRef } from "react";
import { FiMessageSquare, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TESTIMONIALS = [
  {
    quote:
      "Replace this with a real testimonial from a colleague, client, or manager. A strong quote mentioning your technical skills and work ethic will go a long way with recruiters.",
    name: "Placeholder — Your Colleague",
    role: "Add a real testimonial here",
  },
  {
    quote:
      "Another placeholder testimonial. Ask teammates at AeronFly or professors at JNVU for a quote about your work quality, reliability, and frontend skills.",
    name: "Placeholder — Another Person",
    role: "Add a real testimonial here",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  function prev() {
    setCurrent((c) => Math.max(0, c - 1));
  }

  function next() {
    setCurrent((c) => Math.min(TESTIMONIALS.length - 1, c + 1));
  }

  useEffect(() => {
    let ctx;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.from(".tes-animate", {
            y: 24,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 82%",
            },
          });
        }, ref);
      });
    });

    return () => ctx?.revert();
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section border-t border-[var(--border)]"
    >
      {/* Label */}
      <div className="tes-animate flex items-center gap-1 items-center text-[16px] text-[var(--text-secondary)] mb-3">
        <FiMessageSquare size={15} />
        Testimonials
      </div>
      <div className="grid items-center grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
        {/* Stats */}
        <div className="h-full flex flex-col justify-center">
          <h2 className="mb-9 text-[clamp(24px,3.4vw,42px)] font-bold leading-[1.2] tracking-[-0.03em] text-[var(--text-secondary)]">
            See what people are saying about my work
          </h2>

          <div className="tes-animate mb-10 flex gap-10 ">
            {[
              { num: "10+", label: "Projects delivered" },
              { num: "100%", label: "Client satisfaction" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-[36px] font-bold leading-none tracking-[-0.04em] text-[var(--text-primary)]">
                  {num}
                </p>
                <p className="mt-1 text-[12px] text-[var(--text-secondary)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Block */}
        <div className="tes-animate">
          {/* Quote mark */}
          <div className="mb-4 text-[38px] font-bold leading-none text-[var(--accent)] font-['EB_Garamond']">
            “
          </div>

          {/* Quote text */}
          <h4 className="mb-5 text-[clamp(17px,2.2vw,22px)] font-semibold leading-[1.35] tracking-[-0.02em] text-[var(--text-primary)]">
            {t.quote}
          </h4>

          {/* Name */}
          <p className="text-[14px] font-semibold text-[var(--text-primary)]">
            {t.name}
          </p>

          {/* Role */}
          <p className="mt-[2px] text-[12px] text-[var(--text-secondary)]">
            {t.role}
          </p>

          {/* Controls */}
          <div className="mt-6 flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={prev}
              disabled={current === 0}
              className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[var(--bg-card-border)] text-[var(--text-secondary)] transition-colors ${
                current === 0
                  ? "cursor-not-allowed opacity-35"
                  : "hover:bg-[var(--accent-dim)] hover:text-[var(--accent)] cursor-pointer"
              }`}
            >
              <FiChevronLeft size={14} />
            </button>

            {/* Next */}
            <button
              onClick={next}
              disabled={current === TESTIMONIALS.length - 1}
              className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[var(--bg-card-border)] text-[var(--text-secondary)] transition-colors ${
                current === TESTIMONIALS.length - 1
                  ? "cursor-not-allowed opacity-35"
                  : "hover:bg-[var(--accent-dim)] hover:text-[var(--accent)] cursor-pointer"
              }`}
            >
              <FiChevronRight size={14} />
            </button>

            {/* Counter */}
            <span className="text-[12px] text-[var(--text-muted)]">
              <span className="font-medium text-[var(--text-secondary)]">
                {current + 1}
              </span>
              {" / "}
              {TESTIMONIALS.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
