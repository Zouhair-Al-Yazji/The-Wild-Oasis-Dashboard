import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-[16.25rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="bg-background overflow-auto px-12 pt-10 pb-16 transition-colors duration-300">
        <div className="mx-auto my-0 flex max-w-[1200px] flex-col gap-8 transition-colors duration-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
