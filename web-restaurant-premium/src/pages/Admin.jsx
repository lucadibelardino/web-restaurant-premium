import { motion } from 'framer-motion';
import Dashboard from '../features/CMS/Dashboard';

const Admin = () => {
    return (
        <motion.div
            className="page-container container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-xl)', minHeight: '80vh' }}
        >
            <header style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-sm)' }}>Admin Dashboard</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Manage your digital menu with ease.</p>
            </header>

            <Dashboard />
        </motion.div>
    );
};

export default Admin;
