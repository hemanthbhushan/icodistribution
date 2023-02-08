import React from 'react';
import { useState, useEffect } from 'react';

const TimerCard = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [weeks, setWeeks] = useState(0);
  const [time, setTime] = useState(false)

  const deadline = "June, 16, 2023";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setWeeks(Math.floor(days/7));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  // if(days<=7)setTime(true);

    useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
<>
<h3>Ico will end in</h3>

 weeks:{weeks} days:{days} hours:{time} minutes:{minutes} seconds : {seconds}
</>
   
  );
};

export default TimerCard;