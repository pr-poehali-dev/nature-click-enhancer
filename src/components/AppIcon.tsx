
interface AppIconProps {
  name: string;
  iconEmoji: string;
  onClick: () => void;
  bgColor?: string;
}

const AppIcon = ({ name, iconEmoji, onClick, bgColor = "bg-blue-500" }: AppIconProps) => {
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <div 
        className={`${bgColor} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl cursor-pointer shadow-md hover:shadow-lg transition-transform transform hover:scale-105`}
      >
        <span>{iconEmoji}</span>
      </div>
      <p className="mt-1 text-xs text-center">{name}</p>
    </div>
  );
};

export default AppIcon;
