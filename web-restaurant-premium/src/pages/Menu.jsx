import { motion } from 'framer-motion';
import InteractiveMenu from '../features/Menu/InteractiveMenu';

const MenuPage = () => {
    return (
        <motion.div
            className="page-container container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-xl)' }}
        >
            <header style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-sm)' }}>Our Menu</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>A symphony of flavors, crafted with passion.</p>
            </header>

            <InteractiveMenu />
        </motion.div>
    );
};

export default MenuPage;
