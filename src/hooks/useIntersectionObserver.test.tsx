import { useEffect } from 'react';
import { render } from '@testing-library/react';
import useIntersectionObserver from './userIntersectionObserver';

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock,
});

describe('useIntersectionObserver', () => {
  it('should observe an element with IntersectionObserver', () => {
    const callback = jest.fn();
    const options = { root: null, rootMargin: '0px', threshold: 0 };

    function TestComponent() {
      const ref = useIntersectionObserver(callback, options);
      useEffect(() => {
        if (ref) {
          ref(document.createElement('div'));
        }
      }, [ref]);

      return <div>Test Component</div>;
    }

    render(<TestComponent />);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should unobserve an element when unmounted', () => {
    const callback = jest.fn();
    const options = { root: null, rootMargin: '0px', threshold: 0 };

    function TestComponent() {
      const ref = useIntersectionObserver(callback, options);
      useEffect(() => {
        if (ref) {
          ref(document.createElement('div'));
        }
      }, [ref]);

      return <div>Test Component</div>;
    }

    const { unmount } = render(<TestComponent />);

    unmount();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
