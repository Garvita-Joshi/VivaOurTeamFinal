import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgAbout from '../../assets/landingPage/bgAbout.png';
import woodFrame from '../../assets/landingPage/woodFrame.png';
import aboutVivaTitle from '../../assets/landingPage/aboutViva.png';
import leftHand from '../../assets/landingPage/leftHand.png';
import rightHand from '../../assets/landingPage/rightHand.png';
import nimbuMirchi from '../../assets/landingPage/nimbuMirchi.png';
import uncle from '../../assets/landingPage/uncle.png';
import '../../styles/AboutViva.css';

gsap.registerPlugin(ScrollTrigger);

const AboutViva = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const handLeftRef = useRef(null);
    const handRightRef = useRef(null);
    const uncleRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main elements animation timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(cardRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
            )
                .fromTo(titleRef.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.5"
                )
                .fromTo(textRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo([handLeftRef.current, handRightRef.current],
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
                    "-=0.6"
                )
                .fromTo(uncleRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.6"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-section" ref={sectionRef}>
            <div className="purple-stamp-container">

                <div className="content-container">
                    <div
                        className="about-card"
                        ref={cardRef}
                        style={{
                            background: 'linear-gradient(180deg, #841457 0%, #DA2828 100%)',
                            WebkitMaskImage: `url(${bgAbout})`,
                            maskImage: `url(${bgAbout})`,
                            WebkitMaskSize: '100% 100%',
                            maskSize: '100% 100%',
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat'
                        }}
                    >
                        {/* Wood Frame Overlay */}
                        <img
                            src={woodFrame}
                            alt="Frame"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '90%',
                                height: '90%',
                                objectFit: 'fill',
                                zIndex: 5,
                                pointerEvents: 'none'
                            }}
                        />

                        {/* Hanging Nimbu Mirchi */}
                        <div className="hanging-decor left">
                            <img src={nimbuMirchi} alt="nimbu-mirchi" className="nimbu-mirchi" />
                        </div>
                        <div className="hanging-decor right">
                            <img src={nimbuMirchi} alt="nimbu-mirchi" className="nimbu-mirchi" />
                        </div>

                        {/* Title Image */}
                        <div className="title-wrapper" ref={titleRef}>
                            <img src={aboutVivaTitle} alt="ABOUT VIVACITY" className="about-title-img" />
                        </div>

                        {/* Text Block */}
                        <div className="text-content" ref={textRef}>
                            <p>
                                Vivacity, the annual cultural fest of LNMIIT, embodies the vibrant spirit of Gen Z and Millennials, presenting an enticing mix of music, dance, and numerous engaging activities. With exhilarating performances and insightful exhibitions, Vivacity captures the true essence of a lively and memorable cultural celebration.
                            </p>
                        </div>

                        {/* Bottom Decor: Hands */}
                        <div className="decorative-hand hand-left" ref={handLeftRef}>
                            <img src={leftHand} alt="hand icon" />
                        </div>
                        <div className="decorative-hand hand-right" ref={handRightRef}>
                            <img src={rightHand} alt="hand icon" />
                        </div>

                        {/* Bottom Character: Uncle */}
                        <div className="bottom-character" ref={uncleRef}>
                            <img src={uncle} alt="Rajasthani character" className="uncle-img" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutViva;
