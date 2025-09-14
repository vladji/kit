import { useRef } from 'react';

export const useDebounce = <T extends unknown>(
  func: (args: T) => void,
  delay: number,
) => {
  return useRef(() => {
    let timer: number;
    return (args: T) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(args);
      }, delay);
    };
  }).current;
};
