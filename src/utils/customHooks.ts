import { useState, useRef, useCallback, useEffect } from 'react';

export function usePrevious<T>(value: T, initial: T | null = null) {
  const ref = useRef(initial);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as NonNullable<typeof ref['current']>;
}

export const useForceUpdate = () => {
  const [, setIt] = useState(false);
  return () => setIt(it => !it);
};

export function useOnChange<T>(value: T, callBack: (last: T) => void) {
  const last = usePrevious(value, value);

  useEffect(() => {
    if (value !== last) {
      callBack(last);
    }
  });
}

/**
 * Returns a throttled value
 *
 * @param value value to be debounced
 * @param limit limit in ms
 */
export function useThrottle<T>(value: T, limit: number) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

export function useGetSet<T>(initialState: T): [() => T, (value: T) => void, T] {
  const [value, set] = useState(initialState);
  const s = useRef(initialState);
  const get = useCallback(() => s.current, []);
  s.current = value;
  return [get, set, value];
}
