import { Link } from 'react-router-dom';
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
                    <Link to="/">LU</Link>
                </div>

                <div className="navbar-links">
                    <Link to="/menu">Menu</Link>
                    <Link to="/#story">Story</Link>
                    <Link to="/#events">Events</Link>
                </div>

                <div className="navbar-actions">
                    <Link to="/reservations">
                        <Button variant="primary">Book Table</Button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
