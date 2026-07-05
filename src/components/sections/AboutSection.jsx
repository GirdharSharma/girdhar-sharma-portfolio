'use client';

import { useEffect, useRef } from 'react';
import { FiUser } from 'react-icons/fi';

export default function AboutSection() {
    const ref = useRef(null);

    useEffect(() => {
        let ctx;

        import('gsap').then(({ gsap }) => {
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);

                ctx = gsap.context(() => {
                    gsap.from('.about-animate', {
                        y: 28,
                        opacity: 0,
                        stagger: 0.15,
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

    return (
        <section
            id="about"
            ref={ref}
            className="section border-t border-[var(--border)]"
        >
            {/* Section Label */}
            <div className="sect-label about-animate flex items-center gap-2">
                <FiUser size={11} />
                About
            </div>

            {/* Heading */}
            <h2 className="about-animate mb-6 text-[clamp(26px,3.8vw,42px)] font-bold leading-[1.14] tracking-[-0.03em] text-[var(--text-secondary)]">
                Designing and building experiences with clarity, speed, and craft
            </h2>

            {/* Paragraph 1 */}
            <p className="about-animate mb-4 text-[15px] leading-[1.8] text-[var(--text-secondary)]">
                I&apos;m a frontend developer from Rajasthan, India, passionate about
                turning ideas into clean, fast web applications. I hold a{' '}
                <strong className="text-[var(--text-primary)]">
                    BCA from Jai Narayan Vyas University (JNVU)
                </strong>{' '}
                and sharpened my skills with a dedicated full-stack web development
                course taken during college.
            </p>

            {/* Paragraph 2 */}
            <p className="about-animate text-[15px] leading-[1.8] text-[var(--text-secondary)]">
                Currently working full-time as a Frontend Developer at{' '}
                <strong className="text-[var(--text-primary)]">
                    AeronFly International Pvt Ltd
                </strong>
                , building production-grade UIs and contributing to backend systems
                with Node.js, Express.js, and MySQL — giving me a solid full-stack
                perspective.
            </p>
        </section>
    );
}