import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import ParallaxSection from '../components/UI/ParallaxSection';

const Events = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ParallaxSection
                image="https://images.unsplash.com/photo-1519671482538-518b5c2c681c?auto=format&fit=crop&q=80&w=2000"
                className="events-hero"
            >
                <div className="container" style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    <h1 style={{ fontSize: 'var(--font-size-display)', marginBottom: 'var(--space-md)' }}>Private Events</h1>
                    <p style={{ fontSize: 'var(--font-size-xl)' }}>Celebrate in style.</p>
                </div>
            </ParallaxSection>

            <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>

                    <div style={{ border: '1px solid var(--color-border-subtle)', padding: 'var(--space-lg)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-accent-gold)', marginBottom: 'var(--space-md)' }}>The Gold Room</h3>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                            An intimate setting for exclusive gatherings. Features a private bar and dedicated service staff.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            <li>• Capacity: 12 Guests</li>
                            <li>• Private Entrance</li>
                            <li>• Custom Menu Design</li>
                        </ul>
                        <Button variant="outline">Inquire Now</Button>
                    </div>

                    <div style={{ border: '1px solid var(--color-border-subtle)', padding: 'var(--space-lg)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-accent-gold)', marginBottom: 'var(--space-md)' }}>The Terrace</h3>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                            Al fresco dining with panoramic views. Perfect for cocktail receptions and summer soirées.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            <li>• Capacity: 40 Guests</li>
                            <li>• Outdoor Heating</li>
                            <li>• Ambient Lighting</li>
                        </ul>
                        <Button variant="outline">Inquire Now</Button>
                    </div>

                </div>

                <div style={{ marginTop: 'var(--space-3xl)', textAlign: 'center', padding: 'var(--space-xl)', background: 'var(--color-bg-secondary)' }}>
                    <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-md)' }}>Plan Your Event</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
                        Contact our events team to discuss your requirements.
                    </p>
                    <a href="mailto:events@lu-restaurant.com" style={{ textDecoration: 'none' }}>
                        <Button variant="primary">Email Us</Button>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default Events;
