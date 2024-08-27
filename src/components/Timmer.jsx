import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeout }) => {
  const [seconds, setSeconds] = useState(duration * 60);

  useEffect(() => {
    let intervalId;

    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else {
      onTimeout(); // Invoke onTimeout function when seconds reach zero
    }

    return () => clearInterval(intervalId);
  }, [seconds, onTimeout]);

  // Format the remaining seconds into HH:MM:SS format
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Determine if a fourth of the duration is remaining
  const isFourthRemaining = seconds <= duration * 60 * 0.25;

  return (
    <div>
      <h1 className={`text-xl md:text-4xl font-bold ${isFourthRemaining ? 'blinking' : ''}`} style={{ color: isFourthRemaining ? 'red' : 'inherit' }}>
        {formatTime(seconds)}
      </h1>
    </div>
  );
};

export default Timer;
