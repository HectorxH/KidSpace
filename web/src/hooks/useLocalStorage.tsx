import { useEffect, useState } from 'react';

type CallbackFunction = ()=>void;

export default function useLocalStorage<T>(keyName: string, defaultValue: T|null)
// eslint-disable-next-line no-unused-vars
: [T | null, (newValue: T | null, newCallback?:CallbackFunction) => void] {
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

  const [callback, setCallback] = useState<CallbackFunction>(() => () => {});

  const setValue = (newValue: T|null, newCallback:CallbackFunction = () => {}) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (e) {
      console.log(e);
    }
    setStoredValue(newValue);
    setCallback(() => newCallback);
  };

  useEffect(callback, [callback]);

  return [storedValue, setValue];
}
