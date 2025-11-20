import { motion } from 'framer-motion';
import ParallaxSection from '../components/UI/ParallaxSection';

const Story = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ParallaxSection
                image="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000"
                className="story-hero"
            >
                <div className="container" style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    <h1 style={{ fontSize: 'var(--font-size-display)', marginBottom: 'var(--space-md)' }}>Our Story</h1>
                    <p style={{ fontSize: 'var(--font-size-xl)' }}>A journey of taste and tradition.</p>
                </div>
            </ParallaxSection>

            <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-lg)', color: 'var(--color-accent-gold)', textAlign: 'center' }}>The Beginning</h2>
                    <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1.8, marginBottom: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                        Lu was born from a simple yet ambitious idea: to reimagine the dining experience by blending the warmth of traditional hospitality with the precision of modern design.
                        Founded in 2024, our restaurant is a testament to the belief that food is not just sustenance, but an art form that engages all senses.
                    </p>

                    <div style={{ margin: 'var(--space-2xl) 0', height: '400px', overflow: 'hidden', borderRadius: '4px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000"
                            alt="Chef plating a dish"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-lg)', color: 'var(--color-accent-gold)', textAlign: 'center' }}>Philosophy</h2>
                    <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1.8, marginBottom: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                        We believe in "Luxury Minimalism". Our dishes are stripped of the unnecessary, leaving only the essential flavors to shine.
                        We source our ingredients from local artisans who share our commitment to quality and sustainability.
                        Every plate that leaves our kitchen is a curated expression of this philosophy.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Story;
