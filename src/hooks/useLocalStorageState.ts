import { useEffect, useState } from "react";

export function useLocalStorageState<T>(
  initialState: () => T,
  key: string,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(function () {
    const sortedValue = localStorage.getItem(key);
    return sortedValue ? JSON.parse(sortedValue) : initialState();
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
