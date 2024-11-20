import { useEffect, useState } from 'react';
import '../../styles/clock.css';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds() * 6;
  const minutes = time.getMinutes() * 6 + seconds / 60;
  const hours = time.getHours() % 12 * 30 + minutes / 12;

  return (
    <div className="clock">
      <div className="hand hour" style={{ transform: `rotate(${hours}deg)` }}></div>
      <div className="hand minute" style={{ transform: `rotate(${minutes}deg)` }}></div>
      <div className="hand second" style={{ transform: `rotate(${seconds}deg)` }}></div>
      <div className="center-dot"></div>
      {[...Array(12)].map((_, i) => (
        <div key={i} className="hour-mark" style={{ transform: `rotate(${i * 30}deg)` }}></div>
      ))}
    </div>
  );
};
