
import { useState, useEffect } from "react";

interface ClockInfo {
  city: string;
  timezone: string;
  offset: number;
}

const WorldClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clocks, setClocks] = useState<ClockInfo[]>([
    { city: "Москва", timezone: "Europe/Moscow", offset: 3 },
    { city: "Нью-Йорк", timezone: "America/New_York", offset: -4 },
    { city: "Токио", timezone: "Asia/Tokyo", offset: 9 },
    { city: "Лондон", timezone: "Europe/London", offset: 1 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getTimeForOffset = (offset: number) => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    const newTime = new Date(utc + (3600000 * offset));
    return newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {currentTime.toLocaleTimeString()}
        </h2>
        <p className="text-gray-500">
          {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <h3 className="text-sm font-medium mb-2">Мировое время</h3>
        <ul className="space-y-4">
          {clocks.map((clock, index) => (
            <li key={index} className="flex justify-between border-b pb-2">
              <div>
                <div className="font-medium">{clock.city}</div>
                <div className="text-xs text-gray-500">{clock.timezone}</div>
              </div>
              <div className="text-xl font-mono">
                {getTimeForOffset(clock.offset)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorldClock;
