import { useId } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useDarkMode } from "@/context/DarkModeContext";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function DarkModeSwitch() {
  const id = useId();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="inline-flex items-center gap-1 sm:gap-2">
      <Switch
        id={id}
        checked={isDarkMode}
        onCheckedChange={toggleDarkMode}
        aria-label="Toggle switch"
        className="cursor-pointer"
      />
      <Label htmlFor={id} className="flex items-center">
        <span className="sr-only">Toggle switch</span>
        {!isDarkMode ? (
          <SunIcon
            size={16}
            aria-hidden="true"
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        ) : (
          <MoonIcon
            size={16}
            aria-hidden="true"
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        )}
      </Label>
    </div>
  );
}
