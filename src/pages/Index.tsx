
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IphoneFrame from "@/components/IphoneFrame";
import AppIcon from "@/components/AppIcon";

const Index = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  // Update time every second
  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000);
  
  const handleAppClick = (appPath: string) => {
    navigate(appPath);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <IphoneFrame>
        <div className="flex flex-col h-full">
          {/* Status bar */}
          <div className="flex justify-between items-center p-2 text-xs">
            <span>{currentTime}</span>
            <div className="flex space-x-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>
          
          {/* App grid */}
          <div className="flex-1 grid grid-cols-4 gap-4 p-6">
            <AppIcon 
              name="Часы" 
              iconEmoji="🕰️" 
              onClick={() => handleAppClick('/clock')} 
              bgColor="bg-black"
            />
            <AppIcon 
              name="Яндекс" 
              iconEmoji="🔍" 
              onClick={() => handleAppClick('/yandex')} 
              bgColor="bg-yellow-500"
            />
            <AppIcon 
              name="Stickman" 
              iconEmoji="🏃" 
              onClick={() => handleAppClick('/stickman')} 
              bgColor="bg-blue-500"
            />
            <AppIcon 
              name="Вирус" 
              iconEmoji="☠️" 
              onClick={() => handleAppClick('/virus')} 
              bgColor="bg-purple-800"
            />
          </div>
          
          {/* Dock */}
          <div className="h-16 flex justify-center items-center border-t border-gray-200">
            <div className="w-32 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </IphoneFrame>
    </div>
  );
};

export default Index;
