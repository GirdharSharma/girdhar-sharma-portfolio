"use client";
export default function Footer() {
  return (
    <footer className="section w-full text-white/80 px-[24px] py-[80px] pb-10">
      {/* Quote Section */}
      <div className="max-w-5xl mx-auto mb-[60px]">
        <p className="text-[36px] md:text-[36px] leading-[1.2] text-white/70 font-light font-['EB_Garamond']">
          <span className="text-white/50">“</span>
          Design is not just what it looks like and feels like. Design is how it
          works.
          <span className="text-white/50">“</span>
        </p>

        <p className="mt-[14px] text-right text-white/50 text-[24px] font-['EB_Garamond']">
          Steve Jobs
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />
      <div className="flex flex-wrap items-center justify-between gap-3 pt-7">
        <p className="text-[15px] text-[var(--text-muted)]">
          © {new Date().getFullYear()} Girdhar Sharma. All rights reserved.
        </p>

        <p className="text-[15px] italic text-[var(--text-muted)]">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
