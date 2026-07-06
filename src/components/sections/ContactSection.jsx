"use client";

import { useEffect, useRef, useState } from "react";
import { FiSend, FiArrowUpRight, FiMapPin, FiPhone } from "react-icons/fi";

export default function ContactSection() {
  const ref = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    let ctx;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.from(".contact-animate", {
            y: 24,
            opacity: 0,
            stagger: 0.13,
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

  const inputBase =
    "w-full rounded-[12px] border border-[var(--border)] bg-white/5 px-4 py-[13px] text-[14px] font-[Inter] text-[var(--text-primary)] outline-none transition-colors duration-200";

  const inputFocus =
    "focus:border-[var(--accent-border)] focus:bg-[var(--accent-dim)]";

  return (
    <section
      id="contact"
      ref={ref}
      className="section border-t border-[var(--border)] grid items-center grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2"
    >
      <div>
        {/* Label */}
        <div className="contact-animate sect-label">
          <FiSend size={14} />
          Contact
        </div>

        {/* Heading */}
        <h2 className="contact-animate mb-3 text-[clamp(26px,4vw,44px)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]">
          Got a project in mind?{" "}
          <span className="text-[var(--text-secondary)]">
            Let&apos;s build something great together.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="contact-animate mb-9 text-[16px] text-[var(--text-secondary)]">
          Are you ready to take your project to the next level? Whether you’re
          looking for a new website a web application, or simply need advice.
        </p>
        <div className="contact-animate mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="border-l-2 border-[var(--accent)] pl-5">
            <div className="mb-2 flex items-center gap-2 text-[var(--accent)]">
              <FiMapPin size={18} />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                Address
              </span>
            </div>

            <p className="text-lg font-medium text-[var(--text-primary)]">
              Ahmedabad, Gujarat
            </p>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">India</p>
          </div>

          <div className="border-l-2 border-[var(--accent)] pl-5">
            <div className="mb-2 flex items-center gap-2 text-[var(--accent)]">
              <FiPhone size={18} />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                Phone
              </span>
            </div>

            <a
              href="tel:+918619458031"
              className="text-lg font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
            >
              +91 86194-58031
            </a>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="contact-animate flex flex-col gap-4 w-full rounded-[12px] border border-[var(--border)] bg-white/5 px-[40px] py-[40px] text-[14px] text-[var(--text-primary)] outline-none transition-colors duration-200">
        <p className="text-[var(--text-secondary)] mb-2 text-[16px]">
          Fill out the form below to connect with me. I’ll get back to you soon
          to discuss your project or answer any questions.
        </p>
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={form.firstName}
            onChange={handleChange}
            className={`${inputBase} ${inputFocus}`}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={form.lastName}
            onChange={handleChange}
            className={`${inputBase} ${inputFocus}`}
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={handleChange}
            className={`${inputBase} ${inputFocus}`}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={handleChange}
            className={`${inputBase} ${inputFocus}`}
          />
        </div>

        {/* Message */}
        <textarea
          name="message"
          rows={5}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={handleChange}
          className={`${inputBase} ${inputFocus} min-h-[150px] resize-none`}
        />

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-[12px] bg-[var(--accent)] px-6 py-3 text-[13px] font-semibold text-black transition-opacity hover:opacity-85 hover:cursor-pointer"
          >
            Send Message <FiArrowUpRight size={13} />
          </button>

          <a
            href="mailto:your@email.com"
            className="text-[14px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
          >
            girdhar0702@email.com
          </a>
        </div>
      </div>
    </section>
  );
}
