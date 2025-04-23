
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IphoneFrame from "@/components/IphoneFrame";
import Timer from "@/components/clock/Timer";
import Stopwatch from "@/components/clock/Stopwatch";
import Alarm from "@/components/clock/Alarm";
import WorldClock from "@/components/clock/WorldClock";

const ClockApp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <IphoneFrame>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-blue-500"
            >
              Назад
            </Button>
            <h1 className="text-lg font-medium">Часы</h1>
            <div className="w-16"></div> {/* Placeholder for balance */}
          </div>
          
          {/* App content */}
          <div className="flex-1 overflow-auto">
            <Tabs defaultValue="timer" className="h-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="timer">Таймер</TabsTrigger>
                <TabsTrigger value="stopwatch">Секундомер</TabsTrigger>
                <TabsTrigger value="alarm">Будильник</TabsTrigger>
                <TabsTrigger value="worldclock">Время</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timer" className="p-4 h-[calc(100%-48px)]">
                <Timer />
              </TabsContent>
              
              <TabsContent value="stopwatch" className="p-4 h-[calc(100%-48px)]">
                <Stopwatch />
              </TabsContent>
              
              <TabsContent value="alarm" className="p-4 h-[calc(100%-48px)]">
                <Alarm />
              </TabsContent>
              
              <TabsContent value="worldclock" className="p-4 h-[calc(100%-48px)]">
                <WorldClock />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </IphoneFrame>
    </div>
  );
};

export default ClockApp;
