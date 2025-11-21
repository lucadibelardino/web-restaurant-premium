
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Button from '../components/UI/Button';

const Home = () => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [duration, setDuration] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll progress to prevent video jitter
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 15,
        mass: 0.1,
        stiffness: 50
    });

    // Update video time based on smoothed progress
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (videoRef.current && videoRef.current.duration) {
            // Ensure we have duration (sometimes it's NaN initially)
            const vidDuration = videoRef.current.duration || duration;
            if (vidDuration) {
                const time = latest * vidDuration;
                // Use requestAnimationFrame for smoother visual updates if possible,
                // but setting currentTime directly is standard.
                // The spring helps significantly.
                if (isFinite(time)) {
                    videoRef.current.currentTime = time;
                }
            }
        }
    });

    // Capture duration when metadata loads
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    // Opacity transforms for different text sections
    // Section 1: 0% - 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Section 2: 30% - 50%
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.35], [50, 0]);

    // Section 3: 60% - 80%
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.85, 0.95], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.6, 0.7], [50, 0]);

    // Section 4: 90% - 100% (Final CTA)
    const opacity4 = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
    const y4 = useTransform(scrollYProgress, [0.9, 1], [50, 0]);

    return (
        <main ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
            {/* Fixed Video Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 0,
                overflow: 'hidden'
            }}>
                <video
                    ref={videoRef}
                    id="background-video"
                    src="/web-restaurant-premium/video-scroll.mp4"
                    muted
                    playsInline
                    preload="auto"
                    onLoadedMetadata={handleLoadedMetadata}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                {/* Dark overlay for text readability */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.4)',
                    zIndex: 1
                }} />
            </div>

            {/* Fixed Content Container - Text stays static in center */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none' // Allow scroll through
            }}>

                {/* Section 1: Entrance */}
                <motion.div style={{
                    position: 'absolute',
                    textAlign: 'center',
                    opacity: opacity1,
                    y: y1,
                    pointerEvents: 'auto'
                }}>
                    <h1 style={{ fontSize: 'var(--font-size-display)', color: 'white', marginBottom: 'var(--space-md)' }}>LU</h1>
                    <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-secondary)' }}>Where Atmosphere Meets Taste</p>
                </motion.div>

                {/* Section 2: The Journey */}
                <motion.div style={{
                    position: 'absolute',
                    textAlign: 'center',
                    maxWidth: '600px',
                    opacity: opacity2,
                    y: y2,
                    pointerEvents: 'auto'
                }}>
                    <h2 style={{ fontSize: 'var(--font-size-4xl)', color: 'var(--color-accent-gold)', marginBottom: 'var(--space-md)' }}>The Journey</h2>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'white', lineHeight: 1.6 }}>
                        Step away from the noise. Enter a sanctuary designed for the senses.
                    </p>
                </motion.div>

                {/* Section 3: The Details */}
                <motion.div style={{
                    position: 'absolute',
                    textAlign: 'center',
                    maxWidth: '600px',
                    opacity: opacity3,
                    y: y3,
                    pointerEvents: 'auto'
                }}>
                    <h2 style={{ fontSize: 'var(--font-size-4xl)', color: 'var(--color-accent-gold)', marginBottom: 'var(--space-md)' }}>The Craft</h2>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'white', lineHeight: 1.6, marginBottom: 'var(--space-lg)' }}>
                        Every detail, from the lighting to the plating, is a deliberate stroke of art.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                        <Link to="/story">
                            <Button variant="outline">Our Philosophy</Button>
                        </Link>
                        <Link to="/events">
                            <Button variant="outline">Private Events</Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Section 4: Final CTA */}
                <motion.div style={{
                    position: 'absolute',
                    textAlign: 'center',
                    opacity: opacity4,
                    y: y4,
                    pointerEvents: 'auto'
                }}>
                    <h2 style={{ fontSize: 'var(--font-size-5xl)', color: 'white', marginBottom: 'var(--space-lg)' }}>Experience Lu</h2>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                        <Link to="/menu">
                            <Button variant="primary">View Menu</Button>
                        </Link>
                        <Link to="/reservations">
                            <Button variant="primary">Book Your Table</Button>
                        </Link>
                    </div>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    left: '50%',
                    x: '-50%',
                    color: 'white',
                    opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
                    zIndex: 3
                }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <span style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '2px' }}>Scroll to Explore</span>
            </motion.div>
        </main>
    );
};

export default Home;
