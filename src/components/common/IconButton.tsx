import { cloneElement, ReactNode, ReactElement, FC } from 'react';

type NavbarButtonProps = {
  text: string;
  isActive: boolean;
  showNotification?: boolean;
  icon: ReactNode;
  showText: boolean;
};

const IconButton: FC<NavbarButtonProps> = ({ text, isActive, showNotification = false, showText = true, icon }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {cloneElement(icon as ReactElement, { fill: isActive ? 'white' : 'gray' })}
        {showNotification && <div className="notification-dot"></div>}
      </div>
      {showText && <span className="text-xs">{text}</span>}
    </div>
  );
};

export default IconButton;
