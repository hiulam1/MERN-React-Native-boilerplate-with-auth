import { useState, useEffect } from "react";

interface CountdownTimerReturn {
  seconds: number;
  resetCounter: () => void;
  disabled: boolean;
}
export default function useCountdownTimer(
  initialSeconds: number
): CountdownTimerReturn {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (seconds > 0 && isTimerActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setIsTimerActive(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [seconds, isTimerActive]);
  const resetCounter = () => {
    setSeconds(initialSeconds);
    setIsTimerActive(true);
  };
  return { seconds, resetCounter, disabled: !isTimerActive };
}
