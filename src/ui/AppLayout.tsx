import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[16.25rem_1fr]">
      <Header />

      <div className="hidden lg:col-start-1 lg:row-start-1 lg:row-end-3 lg:block">
        <Sidebar />
      </div>

      <main className="bg-background row-start-2 overflow-auto px-4 pt-10 pb-16 lg:col-start-2 lg:px-8">
        <div className="mx-auto my-0 flex max-w-[1200px] flex-col gap-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
