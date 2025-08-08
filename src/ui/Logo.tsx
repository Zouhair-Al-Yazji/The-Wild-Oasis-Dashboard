import { useDarkMode } from "@/context/DarkModeContext";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "logo-dark.png" : "logo-light.png";

  return (
    <div className="text-center">
      <img
        src={src}
        className={cn("inline-block h-24 w-auto", className)}
        alt="The Wild Oasis Logo"
      />
    </div>
  );
}
