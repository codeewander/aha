import { FC } from 'react';
import useScreenSize from '@/hooks/useScreenSize';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';

type MobileNavbarProps = {
  page: 'home' | 'tags' | 'results';
  action?: () => void;
};

const MobileNavbar: FC<MobileNavbarProps> = ({ action, page }) => {
  const { isMobileScreen } = useScreenSize();

  return (
    isMobileScreen && (
      <nav className="w-full h-[72px] fixed top-0 flex items-center z-[2] bg-dark">
        {page === 'home' ? (
          <div className="logo xs:hidden xs:inline-block py-7">LOGO</div>
        ) : (
          <div className={`flex items-center ${page === 'tags' ? 'px-[24px]' : null}`}>
            <ArrowBackIcon
              sx={{
                color: 'white',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={action}
            />
            <span className="text-white text-2xl pl-[14px]">Home Page</span>
          </div>
        )}
      </nav>
    )
  );
};

export default MobileNavbar;
