import { useDarkMode } from "@/context/DarkModeContext";

export default function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "logo-dark.png" : "logo-light.png";

  return (
    <div className="text-center">
      <img
        src={src}
        className="inline-block h-24 w-auto"
        alt="The Wild Oasis Logo"
      />
    </div>
  );
}
