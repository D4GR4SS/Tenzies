import React, { useEffect, useState } from 'react';
import { LuTimer, LuTrophy } from 'react-icons/lu';

export default function Time({
  startTime,
  onTimeUpdate,
  elapsedTime,
  tenzies,
}) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (startTime && !tenzies) {
      const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        setCurrentTime(elapsedTime);
      }, 100); // Aggiorna ogni 100 millisecondi

      return () => clearInterval(intervalId);
    }
  }, [startTime, tenzies]);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;
    return `${minutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
  };

  return (
    <div className='times-cointainer'>
      <h2>Time</h2>
      <p className='current-time'>
        <LuTimer />
        <span>{formatTime(currentTime)}</span>
      </p>
      <p className='record-time'>
        <LuTrophy />
        <span>{formatTime(elapsedTime)}</span>
      </p>
    </div>
  );
}
