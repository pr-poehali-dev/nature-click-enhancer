
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps(prevLaps => [...prevLaps, time]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="text-center py-6">
        <div className="text-5xl font-mono">{formatTime(time)}</div>
      </div>
      
      <div className="flex justify-center gap-4 mb-6">
        <Button onClick={handleStartStop}>
          {isRunning ? 'Стоп' : 'Старт'}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Сброс
        </Button>
        {isRunning && (
          <Button variant="secondary" onClick={handleLap}>
            Круг
          </Button>
        )}
      </div>
      
      {laps.length > 0 && (
        <div className="overflow-auto flex-1">
          <h3 className="text-sm font-medium mb-2">Круги:</h3>
          <ul className="space-y-2">
            {laps.map((lap, index) => (
              <li key={index} className="flex justify-between border-b pb-1">
                <span>Круг {laps.length - index}</span>
                <span className="font-mono">{formatTime(lap)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
