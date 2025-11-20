import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h2>LU</h2>
                        <p>Experience the art of dining.</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h3>Explore</h3>
                            <a href="#menu">Menu</a>
                            <a href="#reservations">Reservations</a>
                            <a href="#events">Private Events</a>
                        </div>
                        <div className="footer-column">
                            <h3>Contact</h3>
                            <p>Via Roma 123, Milano</p>
                            <p>+39 02 1234 5678</p>
                            <p>info@lu-restaurant.com</p>
                        </div>
                    </div>

                    <div className="footer-newsletter">
                        <h3>Stay Updated</h3>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Your email address" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} LU Restaurant. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
