import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[16.25rem_1fr]">
      <Header />

      <div className="hidden md:col-start-1 md:row-start-1 md:row-end-3 md:block">
        <Sidebar />
      </div>

      <main className="bg-background row-start-2 overflow-auto px-12 pt-10 pb-16 md:col-start-2">
        <div className="mx-auto my-0 flex max-w-[1200px] flex-col gap-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
