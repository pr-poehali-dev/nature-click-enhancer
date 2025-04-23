
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const Timer = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setTimeLeft(minutes * 60 + seconds);
  }, [minutes, seconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(minutes * 60 + seconds);
  };

  const handleMinutesChange = (value: number[]) => {
    setMinutes(value[0]);
  };

  const handleSecondsChange = (value: number[]) => {
    setSeconds(value[0]);
  };

  return (
    <div className="flex flex-col h-full items-center justify-center gap-8">
      <div className="text-6xl font-mono">{formatTime(timeLeft)}</div>
      
      {!isRunning && (
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Минуты: {minutes}</p>
            <Slider
              disabled={isRunning}
              value={[minutes]}
              min={0}
              max={60}
              step={1}
              onValueChange={handleMinutesChange}
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Секунды: {seconds}</p>
            <Slider
              disabled={isRunning}
              value={[seconds]}
              min={0}
              max={59}
              step={1}
              onValueChange={handleSecondsChange}
            />
          </div>
        </div>
      )}
      
      <div className="flex gap-4">
        {isRunning ? (
          <Button onClick={handlePause}>Пауза</Button>
        ) : (
          <Button onClick={handleStart}>Старт</Button>
        )}
        <Button variant="outline" onClick={handleReset}>Сброс</Button>
      </div>
    </div>
  );
};

export default Timer;
