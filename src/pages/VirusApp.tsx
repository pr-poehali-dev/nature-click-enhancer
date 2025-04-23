
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IphoneFrame from "@/components/IphoneFrame";

const VirusApp = () => {
  const navigate = useNavigate();
  const [virusTriggered, setVirusTriggered] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Trigger virus effect when component mounts
    setTimeout(() => {
      setVirusTriggered(true);
    }, 500);
    
    // Start countdown when virus is triggered
    if (virusTriggered) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [virusTriggered]);
  
  // Redirect to home when countdown finishes
  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

  if (!virusTriggered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <IphoneFrame>
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="text-purple-500"
              >
                Назад
              </Button>
              <h1 className="text-lg font-medium">Вирус</h1>
              <div className="w-16"></div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-pulse text-6xl mb-4">⚠️</div>
                <p className="text-red-500">Загрузка вируса...</p>
              </div>
            </div>
          </div>
        </IphoneFrame>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <IphoneFrame>
        <div className={`flex flex-col h-full ${countdown === 0 ? 'bg-black' : 'bg-purple-900'}`}>
          {countdown > 0 && (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-9xl animate-pulse mb-8">
                💀
              </div>
              <div className="text-white text-xl mb-4 text-center animate-bounce">
                Ваше устройство заражено
              </div>
              <div className="text-white">
                Самоуничтожение через {countdown} сек...
              </div>
            </div>
          )}
        </div>
      </IphoneFrame>
    </div>
  );
};

export default VirusApp;
