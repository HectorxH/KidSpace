import { useState } from 'react';

export default function useLocalStorage<T>(keyName: string, defaultValue: T|null)
// eslint-disable-next-line no-unused-vars
: [T | null, (newValue: T | null) => void] {
  const [storedValue, setStoredValue] = useState<T|null>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      }
      window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: T|null) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (e) {
      console.log(e);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
}
