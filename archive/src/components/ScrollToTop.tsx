import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
