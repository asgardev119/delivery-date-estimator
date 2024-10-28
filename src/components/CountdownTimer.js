import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ cutoffTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const [hours, minutes] = cutoffTime.split(':');
      const target = new Date();
      target.setHours(hours, minutes, 0);

      if (now > target) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target - now;
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      return `${hoursLeft}h ${minutesLeft}m`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [cutoffTime]);

  return (
    <div className="countdown-timer">
      Time left for same-day delivery: {timeLeft}
    </div>
  );
};

export default CountdownTimer;