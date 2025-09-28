import { useRef } from 'react';

export const useDebounce = () => {
  return useRef(
    <T extends unknown>(func: (...args: T[]) => void, delay: number) => {
      let timer: ReturnType<typeof setTimeout>;
      return (...args: T[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func(...args);
        }, delay);
      };
    },
  ).current;
};
