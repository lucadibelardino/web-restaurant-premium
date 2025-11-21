import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Button from '../components/UI/Button';

const Section = ({ children, image, align = 'center' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the background
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} style={{
            height: '200vh', // Tall section for scrolling space
            position: 'relative',
            // overflow: 'hidden' REMOVED to allow sticky to work relative to viewport
        }}>
            {/* Background Wrapper - Handles clipping */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                overflow: 'hidden',
                zIndex: -1
            }}>
                <motion.div style={{
                    position: 'absolute',
                    top: '-10%', left: 0, right: 0, bottom: '-10%', // Extend to allow parallax movement
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    y,
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.4)',
                    zIndex: 1
                }} />
            </div>

            {/* Sticky Content Wrapper */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
                zIndex: 1,
                padding: '0 var(--space-2xl)',
                pointerEvents: 'none' // Allow clicks to pass through if needed, but buttons need pointer-events: auto
            }}>
                <motion.div style={{
                    maxWidth: '600px',
                    textAlign: align === 'center' ? 'center' : 'left',
                    color: 'white',
                    opacity,
                    pointerEvents: 'auto' // Re-enable clicks for content
                }}>
                    {children}
                </motion.div>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <main>
            {/* Hero / Entrance */}
            <Section image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ fontSize: 'var(--font-size-display)', marginBottom: 'var(--space-md)' }}
                >
                    LU
                </motion.h1>
                <p style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-lg)' }}>
                    Enter a world where taste meets art.
                </p>
                <Link to="/menu">
                    <Button variant="primary">Begin Journey</Button>
                </Link>
            </Section>

            {/* The Dining Room */}
            <Section image="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=2000" align="left">
                <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-md)', color: 'var(--color-accent-gold)' }}>The Atmosphere</h2>
                <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1.6 }}>
                    Designed for intimacy and grandeur. Our dining room is a sanctuary of calm, where every detail is curated to enhance your culinary experience.
                </p>
            </Section>

            {/* The Kitchen */}
            <Section image="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=2000" align="right">
                <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-md)', color: 'var(--color-accent-gold)' }}>The Craft</h2>
                <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1.6 }}>
                    Precision. Passion. Perfection. Our chefs transform the finest local ingredients into edible masterpieces.
                </p>
            </Section>

            {/* The Experience / Call to Action */}
            <Section image="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000">
                <h2 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-md)' }}>Your Table Awaits</h2>
                <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-xl)' }}>
                    Join us for an unforgettable evening.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                    <Link to="/reservations">
                        <Button variant="primary">Book Now</Button>
                    </Link>
                    <Link to="/story">
                        <Button variant="outline">Read Our Story</Button>
                    </Link>
                </div>
            </Section>
        </main>
    );
};

export default Home;
