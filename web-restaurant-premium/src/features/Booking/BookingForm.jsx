import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/UI/Button';
import Calendar from './Calendar';
import './BookingForm.css';
import { supabase } from '../../supabaseClient'; // Import the client we will create

const BookingForm = () => {
    const [step, setStep] = useState(1);
    const [isChecking, setIsChecking] = useState(false);
    const [formData, setFormData] = useState({
        date: null,
        time: '',
        guests: 2,
        name: '',
        email: '',
        phone: ''
    });
    const [aiSuggestion, setAiSuggestion] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);

    // Generate time slots based on selected date
    useEffect(() => {
        if (!formData.date) return;

        const times = [];
        const now = new Date();
        const isToday = formData.date.getDate() === now.getDate() &&
            formData.date.getMonth() === now.getMonth() &&
            formData.date.getFullYear() === now.getFullYear();

        let startHour = 18; // Restaurant opens at 18:00
        let startMinute = 0;

        if (isToday) {
            // If today, start from current time + 30 mins, rounded up to next 30 min slot
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();

            let nextSlot = new Date(now);
            nextSlot.setMinutes(nextSlot.getMinutes() + 30);

            // Round to next 30 min
            const remainder = nextSlot.getMinutes() % 30;
            if (remainder !== 0) {
                nextSlot.setMinutes(nextSlot.getMinutes() + (30 - remainder));
            }
            nextSlot.setSeconds(0);
            nextSlot.setMilliseconds(0);

            startHour = nextSlot.getHours();
            startMinute = nextSlot.getMinutes();

            // If it's past closing time (e.g. 23:00), no slots available
            if (startHour >= 23) {
                setAvailableTimes([]);
                return;
            }

            // If it's before opening, start at opening
            if (startHour < 18) {
                startHour = 18;
                startMinute = 0;
            }
        }

        // Generate slots until 22:30
        for (let h = startHour; h <= 22; h++) {
            for (let m = (h === startHour ? startMinute : 0); m < 60; m += 30) {
                const timeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                times.push(timeString);
            }
        }

        setAvailableTimes(times);
        setFormData(prev => ({ ...prev, time: '' })); // Reset time when date changes
    }, [formData.date]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateSelect = (date) => {
        setFormData(prev => ({ ...prev, date }));
    };

    const handleTimeSelect = (time) => {
        setFormData(prev => ({ ...prev, time }));
    };

    const checkAvailability = () => {
        setIsChecking(true);
        // Simulate AI checking
        setTimeout(() => {
            setIsChecking(false);
            // Randomly simulate "busy" times to show AI suggestion
            if (Math.random() > 0.7) {
                setAiSuggestion("The selected time is in high demand. We have a prime table available at 21:00. Would you like to secure it?");
            } else {
                setStep(2);
            }
        }, 1500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Format date as YYYY-MM-DD
            const dateStr = formData.date.toISOString().split('T')[0];

            const { data, error } = await supabase
                .from('reservations')
                .insert([
                    {
                        user_email: formData.email,
                        reservation_date: dateStr,
                        reservation_time: formData.time,
                        service_type: 'dinner', // Defaulting to dinner as it's a restaurant
                        status: 'pending',
                        notes: `Guests: ${formData.guests}, Name: ${formData.name}, Phone: ${formData.phone}`
                    }
                ]);

            if (error) throw error;

            console.log('Reservation saved:', data);
            setStep(3);
        } catch (error) {
            console.error('Error saving reservation:', error);
            alert('Failed to save reservation: ' + error.message);
        }
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
                            <label>Select Date</label>
                            <Calendar selectedDate={formData.date} onDateSelect={handleDateSelect} />
                        </div>

                        {formData.date && (
                            <motion.div
                                className="form-group"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <label>Select Time</label>
                                {availableTimes.length > 0 ? (
                                    <div className="time-grid">
                                        {availableTimes.map(time => (
                                            <button
                                                key={time}
                                                className={`time-slot ${formData.time === time ? 'selected' : ''}`}
                                                onClick={() => handleTimeSelect(time)}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-slots">No tables available for this date.</p>
                                )}
                            </motion.div>
                        )}

                        <div className="form-group">
                            <label>Guests</label>
                            <select name="guests" value={formData.guests} onChange={handleInputChange} className="guest-select">
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
                            className="full-width-btn"
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
                        <div className="summary-card">
                            <p><strong>Date:</strong> {formData.date?.toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {formData.time}</p>
                            <p><strong>Guests:</strong> {formData.guests}</p>
                        </div>
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
