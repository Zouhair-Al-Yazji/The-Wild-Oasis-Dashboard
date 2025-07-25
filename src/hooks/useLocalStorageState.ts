import { useEffect, useState } from "react";

export function useLocalStorageState(initialState: () => void, key: string) {
  const [value, setValue] = useState(function () {
    const sortedValue = localStorage.getItem(key);
    return sortedValue ? JSON.parse(sortedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value],
  );

  return [value, setValue];
}
