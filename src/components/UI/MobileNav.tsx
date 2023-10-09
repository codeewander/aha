import { FC } from 'react';
import useScreenSize from '@/hooks/useScreenSize';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';

type MobileNavbarProps = {
  isHomePage?: boolean;
  action?: () => void;
};

const MobileNavbar: FC<MobileNavbarProps> = ({ action, isHomePage = false }) => {
  const { isMobileScreen } = useScreenSize();

  return (
    isMobileScreen && (
      <nav className="w-full h-[72px] fixed top-0 flex items-center pl-4 z-[2] bg-dark">
        {isHomePage ? (
          <div className="logo xs:hidden xs:inline-block py-7">LOGO</div>
        ) : (
          <button className="cursor-pointer flex items-center" onClick={action}>
            <ArrowBackIcon
              sx={{
                color: 'white',
                position: 'relative',
              }}
            />
            <span className="text-white text-2xl">Home Page</span>
          </button>
        )}
      </nav>
    )
  );
};

export default MobileNavbar;
