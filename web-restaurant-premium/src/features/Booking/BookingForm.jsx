import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/UI/Button';
import './BookingForm.css';

const BookingForm = () => {
    const [step, setStep] = useState(1);
    const [isChecking, setIsChecking] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: 2,
        name: '',
        email: '',
        phone: ''
    });
    const [aiSuggestion, setAiSuggestion] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const checkAvailability = () => {
        setIsChecking(true);
        // Simulate AI checking
        setTimeout(() => {
            setIsChecking(false);
            // Randomly simulate "busy" times to show AI suggestion
            if (Math.random() > 0.5) {
                setAiSuggestion("The selected time is in high demand. We have a prime table available at 21:00. Would you like to secure it?");
            } else {
                setStep(2);
            }
        }, 1500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setStep(3);
    };

    return (
        <div className="booking-container">
            <AnimatePresence mode='wait'>
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="booking-step"
                    >
                        <h2>Reserve Your Table</h2>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Time</label>
                            <input type="time" name="time" value={formData.time} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Guests</label>
                            <select name="guests" value={formData.guests} onChange={handleInputChange}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} Guests</option>)}
                            </select>
                        </div>

                        {aiSuggestion && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="ai-suggestion"
                            >
                                <p>✨ AI Insight: {aiSuggestion}</p>
                                <div className="suggestion-actions">
                                    <button onClick={() => { setFormData({ ...formData, time: '21:00' }); setAiSuggestion(null); setStep(2); }}>Accept 21:00</button>
                                    <button onClick={() => setAiSuggestion(null)}>No, keep waitlist</button>
                                </div>
                            </motion.div>
                        )}

                        <Button
                            variant="primary"
                            onClick={checkAvailability}
                            disabled={isChecking || !formData.date || !formData.time}
                        >
                            {isChecking ? 'AI Checking Availability...' : 'Check Availability'}
                        </Button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="booking-step"
                    >
                        <h2>Contact Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} />
                            </div>
                            <div className="form-actions">
                                <Button variant="secondary" onClick={() => setStep(1)} type="button">Back</Button>
                                <Button variant="primary" type="submit">Confirm Reservation</Button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="booking-success"
                    >
                        <div className="success-icon">✨</div>
                        <h2>Reservation Confirmed</h2>
                        <p>We look forward to welcoming you, {formData.name}.</p>
                        <p>A confirmation has been sent to {formData.email}.</p>
                        <Button variant="secondary" onClick={() => window.location.href = '/'}>Return Home</Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookingForm;
