import DarkModeToggle from "./DarkModeToggle";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  return (
    <header className="bg-sidebar dark:border-border border-border flex items-center justify-end gap-4 border-b px-12 py-2">
      <DarkModeToggle />
      <HeaderMenu />
    </header>
  );
}
