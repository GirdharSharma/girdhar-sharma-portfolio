"use client";

import { useEffect, useRef } from "react";
import { FiUser } from "react-icons/fi";

// Each segment is a chunk of text; bold: true renders it as your highlighted names
const PARA_1 = [
  {
    text: "I'm a Frontend Developer from Ahmedabad, India, passionate about turning ideas into clean, fast web applications. I hold a",
  },
  { text: "BCA from Jai Narayan Vyas University (JNVU)", bold: true },
  {
    text: "and sharpened my skills with a dedicated full-stack web development course taken during college.",
  },
];

const PARA_2 = [
  { text: "Currently working full-time as a Frontend Developer at" },
  { text: "AeronFly International Pvt Ltd", bold: true },
  {
    text: ", building production-grade UIs and contributing to backend systems with Node.js, Express.js, and MySQL — giving me a solid full-stack perspective.",
  },
];

// Splits segments into individual word spans, preserving real space text nodes
// between them so lines still wrap naturally. Bold segments get an extra
// wrapper so we can slide an accent underline in beneath them.
function renderWords(segments, prefix) {
  const nodes = [];
  segments.forEach((seg, si) => {
    const words = seg.text.split(" ").filter(Boolean);
    words.forEach((w, wi) => {
      nodes.push(
        <span
          key={`${prefix}-${si}-${wi}`}
          className={`word relative inline-block opacity-0 ${
            seg.bold ? "highlight font-semibold text-[var(--text-primary)]" : ""
          }`}
          style={{ filter: "blur(6px)", transform: "translateY(14px)" }}
        >
          {w}
          {seg.bold && (
            <span className="underline-fill absolute left-0 -bottom-[3px] h-[2px] w-full origin-left scale-x-0 bg-[var(--accent)]" />
          )}
        </span>
      );
      nodes.push(" ");
    });
  });
  return nodes;
}

export default function AboutSection() {
  const ref = useRef(null);
  const bodyRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    let ctx;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // Label + heading — fade/slide in
          gsap.from(".about-animate", {
            y: 28,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 82%",
            },
          });

          // Heading — subtle animated gradient sweep, looping
          gsap.to(headingRef.current, {
            backgroundPosition: "200% center",
            duration: 6,
            repeat: -1,
            ease: "none",
          });

          // Body copy — word-by-word scrub reveal: blur clears, words rise into place
          //   const words = gsap.utils.toArray(".word", bodyRef.current);

          //   words.forEach((word) => {
          //     gsap.to(word, {
          //       opacity: 1,
          //       filter: "blur(0px)",
          //       y: 0,
          //       duration: 0.45,
          //       ease: "power2.out",
          //       scrollTrigger: {
          //         trigger: word,
          //         start: "top 92%",
          //         toggleActions: "play none none reverse",
          //       },
          //     });
          //   });
          const words = gsap.utils.toArray(".word", bodyRef.current);

          gsap.fromTo(
            words,
            {
              opacity: 0,
              y: 14,
              filter: "blur(6px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              stagger: 0.05,
              ease: "none",
              scrollTrigger: {
                trigger: bodyRef.current,
                start: "top bottom", // starts when section enters viewport
                end: "bottom top", // ends when section leaves viewport
                scrub: 1,
              },
            }
          );

          // Accent underline sliding in beneath the highlighted names, once revealed
          gsap.to(".underline-fill", {
            scaleX: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bodyRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 0.6,
            },
          });
        }, ref);
      });
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="section relative flex flex-col items-center overflow-hidden border-t border-[var(--border)]"
    >
      {/* ── Background depth: faint grid + glow blob ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full opacity-20 blur-[110px]"
        style={{ background: "var(--accent)" }}
      />

      {/* Section Label */}
      <div className="text-[16px] mb-3 text-[var(--text-secondary)] about-animate relative z-10 flex items-center gap-2">
        <FiUser size={16} />
        About
      </div>

      {/* Heading — animated gradient text */}
      <h2
        ref={headingRef}
        className="about-animate relative z-10 mb-6 bg-clip-text text-transparent text-[clamp(27px,3.8vw,30px)] font-bold leading-[1.14]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--text-primary) 0%, var(--accent) 25%, var(--text-primary) 50%, var(--accent) 75%, var(--text-primary) 100%)",
          backgroundSize: "200% auto",
          backgroundPosition: "0% center",
        }}
      >
        WHERE DESIGN MEETS DEVELOPMENT
      </h2>

      {/* Body — word-by-word blur+rise reveal, unified type scale */}
      <div ref={bodyRef} className="relative z-10 max-w-[860px]">
        <p className="mb-6 text-center text-[clamp(30px,4vw,52px)] leading-[1.55] text-[var(--text-primary)]">
          {renderWords(PARA_1, "p1")}
        </p>

        <p className="text-center text-[clamp(30px,4vw,52px)] leading-[1.55] text-[var(--text-primary)]">
          {renderWords(PARA_2, "p2")}
        </p>
      </div>
    </section>
  );
}
