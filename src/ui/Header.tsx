import DarkModeToggle from "./DarkModeToggle";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  return (
    <header className="flex items-center justify-end gap-4 border-b border-gray-200 px-12 py-2">
      <DarkModeToggle />
      <HeaderMenu />
    </header>
  );
}
