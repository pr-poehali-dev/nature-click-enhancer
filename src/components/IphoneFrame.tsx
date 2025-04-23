
import { ReactNode } from "react";

interface IphoneFrameProps {
  children: ReactNode;
}

const IphoneFrame = ({ children }: IphoneFrameProps) => {
  return (
    <div className="relative w-[320px] h-[650px] bg-black rounded-[50px] overflow-hidden shadow-2xl border-8 border-gray-800">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-20 flex justify-center items-end pb-1">
        <div className="w-16 h-2 bg-gray-800 rounded-full"></div>
      </div>
      
      {/* Screen */}
      <div className="absolute inset-0 bg-white z-10 rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default IphoneFrame;
