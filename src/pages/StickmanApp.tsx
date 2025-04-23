
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IphoneFrame from "@/components/IphoneFrame";

const StickmanApp = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 100, y: 200 });
  const [isJumping, setIsJumping] = useState(false);
  const [direction, setDirection] = useState(0); // -1 left, 0 still, 1 right

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    
    ctx.fillStyle = '#3A5F0B';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 10);
    
    // Draw stickman
    ctx.fillStyle = '#000';
    
    // Head
    ctx.beginPath();
    ctx.arc(position.x, position.y - 30, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Body
    ctx.beginPath();
    ctx.moveTo(position.x, position.y - 20);
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
    
    // Arms
    ctx.beginPath();
    ctx.moveTo(position.x, position.y - 15);
    // Different arm positions based on movement
    if (direction === -1) {
      // Left arm forward when moving left
      ctx.lineTo(position.x - 15, position.y - 5);
      ctx.moveTo(position.x, position.y - 15);
      ctx.lineTo(position.x + 10, position.y - 10);
    } else if (direction === 1) {
      // Right arm forward when moving right
      ctx.lineTo(position.x + 15, position.y - 5);
      ctx.moveTo(position.x, position.y - 15);
      ctx.lineTo(position.x - 10, position.y - 10);
    } else {
      // Both arms down when still
      ctx.lineTo(position.x - 10, position.y - 5);
      ctx.moveTo(position.x, position.y - 15);
      ctx.lineTo(position.x + 10, position.y - 5);
    }
    ctx.stroke();
    
    // Legs
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    if (isJumping) {
      // Legs spread when jumping
      ctx.lineTo(position.x - 10, position.y + 15);
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(position.x + 10, position.y + 15);
    } else if (direction !== 0) {
      // Animated walking
      const legOffset = Date.now() % 500 > 250 ? 1 : -1;
      ctx.lineTo(position.x - 10 * legOffset, position.y + 20);
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(position.x + 10 * legOffset, position.y + 20);
    } else {
      // Standing still
      ctx.lineTo(position.x - 10, position.y + 20);
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(position.x + 10, position.y + 20);
    }
    ctx.stroke();
    
  }, [position, isJumping, direction]);

  useEffect(() => {
    // Gravity effect
    const gravity = setInterval(() => {
      setPosition(prev => {
        // Don't go below ground
        if (prev.y >= canvasRef.current!.height - 70) {
          setIsJumping(false);
          return { ...prev, y: canvasRef.current!.height - 70 };
        }
        return { ...prev, y: prev.y + 5 };
      });
    }, 100);
    
    // Movement based on direction
    const movement = setInterval(() => {
      if (direction !== 0) {
        setPosition(prev => {
          const newX = prev.x + direction * 5;
          // Keep within canvas bounds
          if (newX < 20) return { ...prev, x: 20 };
          if (newX > canvasRef.current!.width - 20) return { ...prev, x: canvasRef.current!.width - 20 };
          return { ...prev, x: newX };
        });
      }
    }, 50);
    
    return () => {
      clearInterval(gravity);
      clearInterval(movement);
    };
  }, [direction]);

  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setPosition(prev => ({ ...prev, y: prev.y - 50 }));
    }
  };

  const handleMoveLeft = () => {
    setDirection(-1);
  };

  const handleMoveRight = () => {
    setDirection(1);
  };

  const handleStopMoving = () => {
    setDirection(0);
  };

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
            <h1 className="text-lg font-medium">Stickman</h1>
            <div className="w-16"></div>
          </div>
          
          {/* Game canvas */}
          <div className="flex-1 relative">
            <canvas 
              ref={canvasRef} 
              width={300} 
              height={400}
              className="w-full h-full bg-sky-200"
            />
          </div>
          
          {/* Controls */}
          <div className="p-4 bg-gray-100 grid grid-cols-3 gap-2">
            <Button 
              onTouchStart={handleMoveLeft}
              onMouseDown={handleMoveLeft}
              onTouchEnd={handleStopMoving}
              onMouseUp={handleStopMoving}
              onMouseLeave={handleStopMoving}
              className="h-16"
            >
              ⬅️
            </Button>
            <Button 
              onClick={handleJump}
              className="h-16"
            >
              ⬆️
            </Button>
            <Button 
              onTouchStart={handleMoveRight}
              onMouseDown={handleMoveRight}
              onTouchEnd={handleStopMoving}
              onMouseUp={handleStopMoving}
              onMouseLeave={handleStopMoving}
              className="h-16"
            >
              ➡️
            </Button>
          </div>
        </div>
      </IphoneFrame>
    </div>
  );
};

export default StickmanApp;
