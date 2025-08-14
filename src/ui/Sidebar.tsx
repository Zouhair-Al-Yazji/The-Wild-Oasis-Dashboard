import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "@/data/Uploader";

export default function Sidebar() {
  return (
    <aside className="bg-sidebar border-border flex h-full flex-col gap-10 border-r px-7 py-8">
      <NavLink to="/dashboard">
        <Logo />
      </NavLink>
      <MainNav />
      <Uploader />
    </aside>
  );
}
