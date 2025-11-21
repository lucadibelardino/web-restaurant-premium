import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Button from '../components/UI/Button';

const Section = ({ children, image, align = 'center' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // "Walking" effect: Zoom in (Scale) and slight opacity change
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

    // Parallax Y for a subtle movement to counter the sticky feeling slightly, giving depth
    // const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]); 

    return (
        <section ref={ref} style={{
            height: '300vh', // Very tall to make the "walk" feel slow and deliberate
            position: 'relative',
        }}>
            {/* Sticky Background - Stays fixed while scrolling through the section */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
                zIndex: 0
            }}>
                <motion.div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    scale, // Apply zoom effect
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', // Darker overlay for better text contrast
                    zIndex: 1
                }} />
            </div>

            {/* Sticky Content - Overlays the background */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                marginTop: '-100vh', // Pull content up to overlap the sticky background
                display: 'flex',
                alignItems: 'center',
                justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
                zIndex: 2,
                padding: '0 var(--space-2xl)',
                pointerEvents: 'none'
            }}>
                <motion.div style={{
                    maxWidth: '600px',
                    textAlign: align === 'center' ? 'center' : 'left',
                    color: 'white',
                    opacity, // Fade in/out based on scroll position
                    pointerEvents: 'auto'
                }}>
                    {children}
                </motion.div>
            </div>
        </section>
    );
};

const Home = () => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (videoRef.current && videoRef.current.duration) {
            // Map scroll progress (0-1) to video duration (e.g., 7s)
            // Ensure we don't exceed duration
            const time = latest * videoRef.current.duration;
            if (isFinite(time)) {
                videoRef.current.currentTime = time;
            }
        }
    });

    return (
        <main ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
            {/* Fixed Video Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: -1,
                overflow: 'hidden'
            }}>
                <video
                    ref={videoRef}
                    id="background-video"
                    src="/web-restaurant-premium/video-scroll.mp4" // Path relative to public, with base path
                    muted
                    playsInline
                    preload="auto"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                {/* Overlay for text readability */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.3)',
                    zIndex: 1
                }} />
            </div>

            {/* Scrollable Content Overlay */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                paddingTop: '40vh', // Start content lower down
                paddingBottom: '40vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '80vh', // Space out text sections to match video progression
                pointerEvents: 'none' // Let clicks pass through to video if needed, but usually we want text interaction
            }}>
                {/* Section 1: Entrance */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', pointerEvents: 'auto' }}
                >
                    <h1 style={{ fontSize: 'var(--font-size-display)', color: 'white', marginBottom: 'var(--space-md)' }}>LU</h1>
                    <p style={{ fontSize: 'var(--font-size-xl)', color: 'white' }}>Welcome to the Experience</p>
                </motion.div>

                {/* Section 2: The Journey */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', pointerEvents: 'auto', maxWidth: '600px', padding: '0 var(--space-md)' }}
                >
                    <h2 style={{ fontSize: 'var(--font-size-4xl)', color: 'var(--color-accent-gold)', marginBottom: 'var(--space-md)' }}>The Journey</h2>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'white', lineHeight: 1.6 }}>
                        From the bustling street to the serene table. Every step is part of the story.
                    </p>
                </motion.div>

                {/* Section 3: The Culmination */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', pointerEvents: 'auto' }}
                >
                    <h2 style={{ fontSize: 'var(--font-size-4xl)', color: 'var(--color-accent-gold)', marginBottom: 'var(--space-md)' }}>A Masterpiece</h2>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'white', marginBottom: 'var(--space-xl)' }}>
                        Taste the perfection.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                        <Link to="/menu">
                            <Button variant="primary">View Menu</Button>
                        </Link>
                        <Link to="/reservations">
                            <Button variant="outline">Book Table</Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default Home;
