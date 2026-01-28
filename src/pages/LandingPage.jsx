import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import VivaCountdown from '../components/LandingPage/VivaCountdown';
import AboutViva from '../components/LandingPage/AboutViva';
import AboutTheme from '../components/LandingPage/AboutTheme';
import '../styles/LandingPage.css';

gsap.registerPlugin(ScrollTrigger);

const framesGlob = import.meta.glob('../assets/landingPage/gate-animation/frame_*.png', { eager: true, import: 'default' });
const frameKeys = Object.keys(framesGlob).sort((a, b) => {
    const numA = parseInt(a.match(/frame_(\d+)/)[1]);
    const numB = parseInt(b.match(/frame_(\d+)/)[1]);
    return numA - numB;
});
const frameUrls = frameKeys.map(key => framesGlob[key]);

const LandingPage = () => {
    const mainRef = useRef(null);
    const triggerRef = useRef(null);
    const canvasRef = useRef(null);
    const aboutVivaRef = useRef(null);
    const aboutThemeRef = useRef(null);
    const zoomOverlayRef = useRef(null);

    // Image preloading and canvas rendering
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const images = [];
        const totalFrames = frameUrls.length;
        let imagesLoaded = 0;

        // Define animation state object to be tweened
        const frameState = { index: 0 };

        // Preload images
        frameUrls.forEach((url, i) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === 1 && i === 0) {
                    // Draw first frame immediately when loaded
                    renderFrame(0);
                }
            };
            images.push(img);
        });

        const renderFrame = (index) => {
            const img = images[Math.round(index)];
            if (img && img.complete) {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            }
        };

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        const ctxGsap = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=150%",
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1
                }
            });

            // 1. Scrub through frames
            tl.to(frameState, {
                index: totalFrames - 1,
                ease: "power2.out",
                duration: 0.8,
                onUpdate: () => {
                    renderFrame(frameState.index);
                }
            }, 0);

            // 2. Zoom gate effect
            gsap.set(canvasRef.current, { scale: 1.15 });
            tl.to(canvasRef.current, {
                scale: 18,
                duration: 6,
                ease: "power2.in"
            }, 0);

            // 3. SNEAK PEEK REVEAL
            tl.fromTo(aboutVivaRef.current,
                { opacity: 0, scale: 1.8, y: 150 },
                { opacity: 1, scale: 1, y: 0, duration: 6, ease: "power1.out" },
                0
            );

            // 4. Short Pause for About Viva
            tl.to({}, { duration: 2 });

            // 5. Transition from About Viva to About Theme
            tl.to(aboutVivaRef.current, {
                opacity: 0,
                scale: 1.1,
                duration: 2,
                ease: "power2.in"
            });

            tl.fromTo(aboutThemeRef.current,
                { opacity: 0, scale: 0.8, y: 50 },
                { opacity: 1, scale: 1, y: 0, duration: 2, ease: "power2.out" }
            );

            // 6. Short Pause
            tl.to({}, { duration: 2 });

            // 7. Exit Transition
            const exitStartTime = tl.duration();

            tl.to(canvasRef.current, {
                scale: 1,
                duration: 6,
                ease: "power2.inOut"
            }, exitStartTime);

            tl.to(frameState, {
                index: 0,
                duration: 6,
                ease: "none",
                onUpdate: () => {
                    renderFrame(frameState.index);
                }
            }, exitStartTime);

            tl.to(aboutThemeRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 5,
                ease: "power1.in"
            }, exitStartTime);

            // Reset
            tl.to({}, { duration: 0.5 });

        }, mainRef);

        return () => {
            ctxGsap.revert();
            lenis.destroy();
        };
    }, []);

    return (
        <div className="landing-page-container" ref={mainRef}>
            {/* Section 1: Countdown */}
            <VivaCountdown />

            {/* Section 2: Immersive Transition */}
            <div className="transition-container" ref={triggerRef}>

                {/* Content revealed inside the zoom */}
                <div className="reveal-container">
                    <div className="reveal-item" ref={aboutVivaRef}>
                        <AboutViva />
                    </div>
                    <div className="reveal-item" ref={aboutThemeRef}>
                        <AboutTheme />
                    </div>
                </div>

                {/* The Stamp Interface */}
                <div className="stamp-assembly">
                    <div className="door-canvas-wrapper">
                        <canvas
                            ref={canvasRef}
                            className="gate-visual"
                        />
                    </div>
                </div>

                {/* Overlay for cinematic zoom */}
                <div className="zoom-overlay" ref={zoomOverlayRef}></div>
            </div>
        </div>
    );
};

export default LandingPage;