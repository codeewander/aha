import { useState, useEffect, useMemo } from 'react';
import { MOBILE_SCREEN, LARGE_SCREEN } from '@/constants/mediaQueries';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileScreen = useMemo(() => {
    return screenSize.width <= MOBILE_SCREEN;
  }, [screenSize]);

  const isWideScreen = useMemo(() => {
    return screenSize.width >= LARGE_SCREEN;
  }, [screenSize]);

  return { screenSize, isMobileScreen, isWideScreen };
};

export default useScreenSize;
