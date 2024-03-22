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
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setDisabled(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [seconds, disabled]);
  const resetCounter = () => {
    setSeconds(initialSeconds);
    setDisabled(true);
  };
  return { seconds, resetCounter, disabled };
}
