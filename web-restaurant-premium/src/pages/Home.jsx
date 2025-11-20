import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import ParallaxSection from '../components/UI/ParallaxSection';

const Home = () => {
    return (
        <main>
            {/* Hero Section */}
            <section style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                padding: '0 1rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.3,
                    zIndex: -1
                }} />

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: 'var(--font-size-display)',
                        marginBottom: 'var(--space-md)'
                    }}
                >
                    LU
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        fontSize: 'var(--font-size-xl)',
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--space-lg)',
                        maxWidth: '600px'
                    }}
                >
                    Where culinary art meets digital elegance.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link to="/menu">
                        <Button variant="primary">View Menu</Button>
                    </Link>
                </motion.div>
            </section>

            {/* Story Section with Parallax */}
            <ParallaxSection
                id="story"
                image="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000"
                className="story-section"
            >
                <div style={{
                    background: 'rgba(10, 10, 10, 0.8)',
                    padding: 'var(--space-xl)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--color-border-subtle)',
                    textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)', color: 'var(--color-accent-gold)' }}>Our Story</h2>
                    <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                        Born from a passion for innovation and tradition, Lu represents the convergence of gastronomic excellence and modern aesthetics.
                        Every dish is a masterpiece, every flavor a story waiting to be told.
                    </p>
                </div>
            </ParallaxSection>

            {/* Events Section */}
            <section id="events" style={{ padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-lg)' }}>Private Events</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
                        <div style={{ padding: 'var(--space-md)', border: '1px solid var(--color-border-subtle)' }}>
                            <h3 style={{ color: 'var(--color-accent-gold)', marginBottom: 'var(--space-sm)' }}>The Gold Room</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>Intimate dining for up to 12 guests.</p>
                        </div>
                        <div style={{ padding: 'var(--space-md)', border: '1px solid var(--color-border-subtle)' }}>
                            <h3 style={{ color: 'var(--color-accent-gold)', marginBottom: 'var(--space-sm)' }}>The Terrace</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>Al fresco experience for up to 40 guests.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
