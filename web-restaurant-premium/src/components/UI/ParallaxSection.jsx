import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxSection.css';

const ParallaxSection = ({ children, image, offset = 50, className = '' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

    return (
        <div ref={ref} className={`parallax-section ${className}`}>
            <motion.div
                className="parallax-bg"
                style={{ y, backgroundImage: `url(${image})` }}
            />
            <div className="parallax-content">
                {children}
            </div>
        </div>
    );
};

export default ParallaxSection;
