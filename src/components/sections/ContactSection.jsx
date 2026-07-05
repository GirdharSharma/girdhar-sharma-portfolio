'use client';

import { useEffect, useRef, useState } from 'react';
import { FiSend, FiArrowUpRight } from 'react-icons/fi';

export default function ContactSection() {
    const ref = useRef(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        let ctx;

        import('gsap').then(({ gsap }) => {
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);

                ctx = gsap.context(() => {
                    gsap.from('.contact-animate', {
                        y: 24,
                        opacity: 0,
                        stagger: 0.13,
                        duration: 0.7,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: ref.current,
                            start: 'top 82%',
                        },
                    });
                }, ref);
            });
        });

        return () => ctx?.revert();
    }, []);

    const inputBase =
        'w-full rounded-[12px] border border-[var(--border)] bg-white/5 px-4 py-[13px] text-[14px] font-[Inter] text-[var(--text-primary)] outline-none transition-colors duration-200';

    const inputFocus =
        'focus:border-[var(--accent-border)] focus:bg-[var(--accent-dim)]';

    return (
        <section
            id="contact"
            ref={ref}
            className="section border-t border-[var(--border)]"
        >
            {/* Label */}
            <div className="contact-animate sect-label">
                <FiSend size={11} />
                Contact
            </div>

            {/* Heading */}
            <h2 className="contact-animate mb-3 text-[clamp(26px,4vw,44px)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]">
                Got a project in mind?{' '}
                <span className="text-[var(--text-secondary)]">
                    Let&apos;s build something great together.
                </span>
            </h2>

            {/* Subtitle */}
            <p className="contact-animate mb-9 text-[14px] text-[var(--text-secondary)]">
                Available for freelance work and full-time opportunities.
            </p>

            {/* Form */}
            <div className="contact-animate flex flex-col gap-[11px]">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={handleChange}
                    className={`${inputBase} ${inputFocus}`}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={handleChange}
                    className={`${inputBase} ${inputFocus}`}
                />

                <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputBase} ${inputFocus} min-h-[120px] resize-y`}
                />

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-[14px]">
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-[12px] bg-[var(--accent)] px-6 py-3 text-[13px] font-semibold text-black transition-opacity hover:opacity-85"
                    >
                        Send Message <FiArrowUpRight size={13} />
                    </button>

                    <a
                        href="mailto:your@email.com"
                        className="text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                    >
                        your@email.com
                    </a>
                </div>
            </div>

            {/* Footer */}
           
        </section>
    );
}