import {useState, useEffect, useCallback} from 'react';
import {debounce} from 'lodash';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedSetValue = useCallback(
    debounce((newValue: T) => {
      setDebouncedValue(newValue);
    }, delay),
    [delay]
  );

  useEffect(() => {
    debouncedSetValue(value);
    return debouncedSetValue.cancel;
  }, [value, debouncedSetValue]);

  return debouncedValue;
}
