import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { createContext, ReactNode, use, useEffect } from "react";

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    [isDarkMode],
  );

  return (
    <DarkModeContext value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext>
  );
}

function useDarkMode() {
  const context = use(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }

  return context;
}

export { DarkModeProvider, useDarkMode };
