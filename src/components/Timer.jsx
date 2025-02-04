import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Timer = ({date}) => {
  const targetDate = new Date(date).getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(targetDate - new Date().getTime());
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsRunning(false);
      setTimeLeft(0);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, targetDate]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  return (
    <p className="text-xl text-primary">{formatTime(timeLeft)}</p>
  );
};
Timer.propTypes = {
  date: PropTypes.string,
};

export default Timer;