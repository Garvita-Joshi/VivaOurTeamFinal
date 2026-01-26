import React, { useState, useEffect } from 'react';
import '../../styles/VivaCountdown.css';

const VivaCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Set target date for Vivacity (Placeholder date)
        const targetDate = new Date('2026-02-15T00:00:00').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimerItem = ({ value, label }) => (
        <div className="timer-item">
            <span className="timer-value">{String(value).padStart(2, '0')}</span>
            <span className="timer-label">{label}</span>
        </div>
    );

    return (
        <section className="countdown-section">
            <h2 className="countdown-title">Countdown to Vivacity</h2>
            <div className="countdown-timer">
                <TimerItem value={timeLeft.days} label="Days" />
                <TimerItem value={timeLeft.hours} label="Hours" />
                <TimerItem value={timeLeft.minutes} label="Minutes" />
                <TimerItem value={timeLeft.seconds} label="Seconds" />
            </div>
        </section>
    );
};

export default VivaCountdown;
