import { useRef } from 'react';
export const useThrottle = <T extends (...args: any[]) => {} | void>(fn: T, delay: number) => {
  const timer = useRef<null | NodeJS.Timeout>(null);
  return (...args: Parameters<T>) => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        fn(...args);
        timer.current = null;
      }, delay);
    }
  };
};
