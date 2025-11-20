import { motion } from 'framer-motion';
import Button from '../components/UI/Button';

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
                padding: '0 1rem'
            }}>
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
                    <Button variant="primary">View Menu</Button>
                </motion.div>
            </section>

            {/* Placeholder for other sections */}
            <section style={{ height: '50vh', padding: 'var(--space-xl) 0', textAlign: 'center' }}>
                <h2>Our Story</h2>
                <p>Coming soon...</p>
            </section>
        </main>
    );
};

export default Home;
