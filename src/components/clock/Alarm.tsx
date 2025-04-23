
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";

interface AlarmType {
  id: number;
  time: string;
  enabled: boolean;
  days: string[];
}

const Alarm = () => {
  const [alarms, setAlarms] = useState<AlarmType[]>([
    { id: 1, time: "07:00", enabled: true, days: ["Пн", "Вт", "Ср", "Чт", "Пт"] },
    { id: 2, time: "09:30", enabled: false, days: ["Сб", "Вс"] },
  ]);
  const [newAlarmTime, setNewAlarmTime] = useState("08:00");
  
  const toggleAlarm = (id: number) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };
  
  const deleteAlarm = (id: number) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };
  
  const addAlarm = () => {
    const newAlarm: AlarmType = {
      id: Date.now(),
      time: newAlarmTime,
      enabled: true,
      days: ["Пн", "Вт", "Ср", "Чт", "Пт"]
    };
    
    setAlarms([...alarms, newAlarm]);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <input
          type="time"
          value={newAlarmTime}
          onChange={(e) => setNewAlarmTime(e.target.value)}
          className="border rounded p-2"
        />
        <Button onClick={addAlarm}>Добавить</Button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <h3 className="text-sm font-medium mb-2">Будильники</h3>
        
        {alarms.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Нет будильников</p>
        ) : (
          <ul className="space-y-3">
            {alarms.map(alarm => (
              <li key={alarm.id} className="flex justify-between items-center border rounded-md p-3">
                <div>
                  <div className="text-xl font-mono">{alarm.time}</div>
                  <div className="text-xs text-gray-500">
                    {alarm.days.join(", ")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={alarm.enabled}
                    onCheckedChange={() => toggleAlarm(alarm.id)}
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteAlarm(alarm.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Alarm;
