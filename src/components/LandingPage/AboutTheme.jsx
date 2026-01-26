import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutThemebg from '../../assets/landingPage/aboutThemebg.png';
import aboutThemeBorder from '../../assets/landingPage/aboutThemeBorder.png';
import aboutThemeTitle from '../../assets/landingPage/aboutTheme.png';
import '../../styles/AboutTheme.css';

gsap.registerPlugin(ScrollTrigger);

const AboutTheme = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const borderRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(containerRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
            )
                .fromTo(borderRef.current,
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" },
                    "-=0.5"
                )
                .fromTo(titleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(textRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.4"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-theme-section" ref={sectionRef}>
            <div className="theme-stamp-container" ref={containerRef} style={{ backgroundImage: `url(${aboutThemebg})` }}>
                <div className="theme-content-wrapper">
                    <img src={aboutThemeBorder} alt="Theme Border" className="theme-border-img" ref={borderRef} />

                    <div className="theme-text-overlay">
                        <div className="theme-title-wrapper" ref={titleRef}>
                            <img src={aboutThemeTitle} alt="ABOUT THEME" className="theme-title-img" />
                        </div>
                        <div className="theme-description" ref={textRef}>
                            <p>
                                Anachronic Mélange presents Vivacity as a timeless cultural experience—where past, present, and creativity merge seamlessly.
                                Inspired by Indian maximalism, truck art, retro Bollywood, and folk traditions, LNMIIT becomes a living stage where culture isn't preserved, it's performed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTheme;
