
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Clicker = () => {
  const [clicks, setClicks] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [upgradePrice, setUpgradePrice] = useState<number>(100);
  
  // Загрузка сохраненных данных при запуске
  useEffect(() => {
    const savedClicks = localStorage.getItem("clicks");
    const savedMultiplier = localStorage.getItem("multiplier");
    const savedUpgradePrice = localStorage.getItem("upgradePrice");
    
    if (savedClicks) setClicks(Number(savedClicks));
    if (savedMultiplier) setMultiplier(Number(savedMultiplier));
    if (savedUpgradePrice) setUpgradePrice(Number(savedUpgradePrice));
  }, []);
  
  // Сохранение данных при изменении
  useEffect(() => {
    localStorage.setItem("clicks", clicks.toString());
    localStorage.setItem("multiplier", multiplier.toString());
    localStorage.setItem("upgradePrice", upgradePrice.toString());
  }, [clicks, multiplier, upgradePrice]);
  
  const handleClick = () => {
    setClicks(prev => prev + multiplier);
  };
  
  const handleUpgrade = () => {
    if (clicks >= upgradePrice) {
      setClicks(prev => prev - upgradePrice);
      setMultiplier(prev => prev * 2);
      setUpgradePrice(prev => prev * 3);
    }
  };
  
  return (
    <Card className="p-6 w-full max-w-sm mx-auto backdrop-blur-sm bg-white/20 border-none shadow-xl">
      <div className="flex flex-col items-center gap-8">
        {/* Счетчик кликов */}
        <div className="text-3xl font-bold text-white bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full">
          {clicks.toLocaleString()} кликов
        </div>
        
        {/* Кнопка клика */}
        <Button 
          className={cn(
            "w-32 h-32 rounded-full bg-red-600 hover:bg-red-700 text-white text-2xl shadow-lg transform transition-transform",
            "active:scale-95 animate-pulse",
            "border-4 border-red-400"
          )}
          onClick={handleClick}
        >
          +{multiplier}
        </Button>
        
        {/* Улучшение */}
        <Button
          variant={clicks >= upgradePrice ? "default" : "outline"}
          className={cn(
            "w-full py-6 text-lg",
            clicks >= upgradePrice 
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-600/50 text-gray-300 cursor-not-allowed"
          )}
          onClick={handleUpgrade}
          disabled={clicks < upgradePrice}
        >
          Улучшение ×2 ({upgradePrice} кликов)
        </Button>
        
        {multiplier > 1 && (
          <div className="text-md text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            Текущий множитель: ×{multiplier}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Clicker;
