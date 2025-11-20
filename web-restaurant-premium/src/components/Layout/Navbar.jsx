import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Button from '../UI/Button';
import './Navbar.css';

const Navbar = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
        >
            <div className="navbar-container container">
                <div className="navbar-logo">
                    <a href="/">LU</a>
                </div>

                <div className="navbar-links">
                    <a href="#menu">Menu</a>
                    <a href="#story">Story</a>
                    <a href="#events">Events</a>
                </div>

                <div className="navbar-actions">
                    <Button variant="primary">Book Table</Button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
