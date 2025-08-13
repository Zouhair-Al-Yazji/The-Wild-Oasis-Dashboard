import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DarkModeToggle from "./DarkModeToggle";
import HeaderMenu from "./HeaderMenu";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-sidebar border-border sticky top-0 z-50 col-span-full flex items-center justify-between border-b px-4 py-2 lg:col-start-2 lg:row-start-1 lg:px-12">
      <div className="flex items-center gap-2 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"}>
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <DarkModeToggle />
        <HeaderMenu />
      </div>
    </header>
  );
}
