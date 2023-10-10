import { FC } from 'react';
import NavbarButton from '../common/IconButton';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@/assets/HomeIcon';
import useScreenSize from '@/hooks/useScreenSize';

const Navbar: FC = () => {
  const { isMobileScreen } = useScreenSize();

  return (
    <nav className="w-full flex flex-row gap-x-10 h-16 justify-center items-center xs:gap-y-[22px] flex-none xs:justify-start xs:h-screen xs:flex-col xs:w-20 bg-darkGray">
      <div className="logo hidden xs:inline-block	">LOGO</div>
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        {({ isActive }) => (
          <NavbarButton text="Home" isActive={isActive} icon={<HomeIcon />} showText={isActive && !isMobileScreen} />
        )}
      </NavLink>
      <NavLink to="/tags" className={({ isActive }) => (isActive ? 'active' : '')}>
        {({ isActive }) => (
          <NavbarButton
            text="Tag"
            isActive={isActive}
            showNotification={!isMobileScreen}
            showText={isActive && !isMobileScreen}
            icon={<HomeIcon />}
          />
        )}
      </NavLink>
    </nav>
  );
};

export default Navbar;
