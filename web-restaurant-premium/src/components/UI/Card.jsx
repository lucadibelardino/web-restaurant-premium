import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ children, className = '', ...props }) => {
    return (
        <motion.div
            className={`card-glass ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
