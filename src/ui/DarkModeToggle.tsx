import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/context/DarkModeContext";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      variant={"ghost"}
      className="hover:bg-sidebar-accent"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </Button>
  );
}
