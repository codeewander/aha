import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (callback: IntersectionObserverCallback, options: IntersectionObserverInit) => {
  const [element, setElement] = useState<Element | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (element) {
      observerRef.current = new IntersectionObserver(callback, options);
      observerRef.current.observe(element);
    }

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [element, callback, options]);

  return setElement;
};

export default useIntersectionObserver;
