"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const WORDS = ["Developer", "React Dev", "Frontend Dev"];
const CTA_GAP = 10; // must match the gap-[10px] on the CTA row

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.843L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <g opacity="0.72">
        <path
          opacity="0.2"
          d="M1.51502 11.2356L1.55752 4.87313C1.56502 3.72125 2.37065 2.73375 3.48252 2.51375L9.6269 1.29563C11.1031 1.00313 12.4738 2.15813 12.4638 3.6875L12.4213 10.0513C12.4131 11.2025 11.6075 12.1894 10.4956 12.41L4.35127 13.6281C2.87502 13.9206 1.50502 12.7656 1.51502 11.2356Z"
          fill="currentColor"
        />
        <path
          opacity="0.5"
          d="M4.52563 13.7744L4.56813 7.41062C4.575 6.25999 5.38125 5.27312 6.49313 5.05249L12.6375 3.83499C14.1138 3.54249 15.4844 4.69749 15.4744 6.22687L15.4319 12.5906C15.4244 13.7419 14.6188 14.7287 13.5069 14.9494L7.3625 16.1675C5.88625 16.46 4.51563 15.305 4.52563 13.7756V13.7744Z"
          fill="currentColor"
        />
        <path
          opacity="0.8"
          d="M7.53625 16.3125L7.57875 9.94875C7.58625 8.79687 8.39187 7.81062 9.50375 7.59L15.6481 6.37187C17.1244 6.07937 18.495 7.23437 18.485 8.76375L18.4425 15.1275C18.435 16.2794 17.6294 17.2662 16.5175 17.4862L10.3731 18.7044C8.89687 18.9969 7.52625 17.8419 7.53625 16.3125Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

const SOCIALS = [
  { label: "X", icon: <XIcon />, href: "#" },
  {
    label: "LinkedIn",
    icon: <LinkedInIcon />,
    href: "https://linkedin.com/in/",
  },
  { label: "Threads", icon: <ThreadsIcon />, href: "#" },
];

export default function Sidebar() {
  /* ── Typing animation state ── */
  const [displayText, setDisplayText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timer = useRef(null);

  /* ── GSAP refs for the CTA swap ── */
  const arrowRef = useRef(null);
  const iconRef = useRef(null);
  const pillRef = useRef(null);

  useEffect(() => {
    const word = WORDS[wordIdx];
    const delay = isDeleting ? 55 : 105;

    timer.current = setTimeout(() => {
      if (!isDeleting) {
        if (charIdx < word.length) {
          setDisplayText(word.slice(0, charIdx + 1));
          setCharIdx((n) => n + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplayText(word.slice(0, charIdx - 1));
          setCharIdx((n) => n - 1);
        } else {
          setIsDeleting(false);
          setWordIdx((i) => (i + 1) % WORDS.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer.current);
  }, [charIdx, isDeleting, wordIdx]);

  /* ── CTA swap, driven entirely by GSAP so it never snaps ──
     Both elements keep their real DOM order; we just translate
     them past each other by their *actual* measured widths, so
     it works regardless of how long "Let's talk" ends up being. */
  function handleCtaEnter() {
    const arrowW = arrowRef.current.offsetWidth;
    const pillW = pillRef.current.offsetWidth;

    gsap.to(arrowRef.current, {
      x: pillW + CTA_GAP,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(pillRef.current, {
      x: -(arrowW + CTA_GAP),
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(iconRef.current, {
      rotate: 45,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  }

  function handleCtaLeave() {
    gsap.to([arrowRef.current, pillRef.current], {
      x: 0,
      duration: 0.45,
      ease: "power3.inOut",
      overwrite: "auto",
    });
    gsap.to(iconRef.current, {
      rotate: 0,
      duration: 0.45,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  }

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen items-center justify-center w-[480px] p-4">
      {/* ══ CARD ══ */}
      <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-[#0f0f0f] border border-white/10">
        {/* ── PHOTO — full bleed background, grayscale by default, color on card hover ── */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(165deg,#1c1c1c_0%,#0a0a0a_100%)]">
            <img
              src="/profile/girdhar-sharma-portfolio.jpeg"
              alt="Girdhar Sharma"
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 scale-[1.03] group-hover:scale-100"
              style={{
                transition: "filter 900ms ease-out, transform 900ms ease-out",
              }}
            />
          </div>

          {/* Gradient overlay — heavy at bottom so text is always readable */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.04)_30%,rgba(0,0,0,0.55)_62%,rgba(0,0,0,0.93)_100%)]" />
        </div>

        {/* ── TOP ROW: logo left — socials right ── */}
        <div className="relative z-10 flex items-start justify-between pt-[14px] px-[14px]">
          <div className="flex gap-3">
            {/* Logo mark */}
            <div className="w-[38px] h-[38px] rounded-[11px] bg-[rgba(8,8,8,0.82)] backdrop-blur-[12px] border border-white/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                {/* < */}
                <path
                  d="M8 7L4 12L8 17"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* / */}
                <path
                  d="M13 5L11 19"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                {/* > */}
                <path
                  d="M16 7L20 12L16 17"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-[8px] h-[8px] rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)] shrink-0 animate-[pulse-dot_2.5s_ease-in-out_infinite]" />
              <span className="text-[12px] font-medium tracking-[0.07em]">
                Available for Work
              </span>
            </div>
          </div>

          {/* Social icons — stacked vertically (exact reference layout) */}
          <div className="flex flex-col gap-2">
            {SOCIALS.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="w-[34px] h-[34px] rounded-full bg-[rgba(14,14,14,0.82)] backdrop-blur-[12px] border border-white/10 flex items-center justify-center text-white/70 no-underline transition-colors duration-200 hover:bg-[var(--accent-dim)] hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── AVAILABLE FOR WORK — rotated left badge ── */}
        {/* <div className="absolute z-10 absolute left-[-30px] top-1/2 -translate-y-1/2 -rotate-90 flex items-center gap-2 whitespace-nowrap">
          <span className="w-[7px] h-[7px] rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)] shrink-0 animate-[pulse-dot_2.5s_ease-in-out_infinite]" />
          <span className="text-[10px] font-medium text-white/60 tracking-[0.07em]">
            Available for Work
          </span>
        </div> */}

        {/* Spacer */}
        <div className="relative z-10 flex-1" />

        {/* ── BOTTOM CONTENT ── */}
        <div className="relative z-10 px-[18px] pb-[18px]">
          {/* Greeting + typing animation */}
          <h2 className="text-[25px] font-bold tracking-[-0.03em] text-white/95 leading-[1.2] mb-[10px] flex items-baseline flex-wrap gap-[6px]">
            <span>Hey, I&apos;m</span>
            <span className="text-white">{displayText}</span>
            {/* Blinking cursor */}
            <span className="inline-block w-[2px] h-[24px] bg-[var(--accent)] align-middle blink" />
          </h2>

          {/* Description */}
          <p className="text-[12px] leading-[1.7] text-white/55 tracking-[0.01em]">
            I build fast, polished web experiences with React &amp; Next.js,
            based in Rajasthan, India.
          </p>

          {/* Divider */}
          <div className="h-px bg-white/10 my-[14px]" />

          {/* CTA row */}
          <div className="flex items-center gap-[10px]">
            <div
              className="flex items-center gap-[10px] w-fit cursor-pointer"
              onMouseEnter={handleCtaEnter}
              onMouseLeave={handleCtaLeave}
            >
              {/* Arrow button — stays first in the DOM, GSAP translates it past the pill */}
              <a
                ref={arrowRef}
                href="#contact"
                aria-label="Go to contact"
                className="w-[40px] h-[40px] rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0 will-change-transform"
              >
                <svg
                  ref={iconRef}
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              {/* Let's talk pill — stays second in the DOM, GSAP translates it past the arrow */}
              <a
                ref={pillRef}
                href="#contact"
                className="bg-[var(--accent)] text-black rounded-full px-[20px] py-[9px] text-[13px] font-semibold font-sans no-underline tracking-[0.01em] will-change-transform"
              >
                Let&apos;s talk
              </a>
            </div>

            {/* Download CV */}
            <a
              href="#"
              className="
              flex items-center gap-[5px]
              text-white/60
              text-[14px]
              font-medium
              font-sans
              no-underline
              whitespace-nowrap
              transition-colors duration-200
              hover:text-white/90
            "
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
