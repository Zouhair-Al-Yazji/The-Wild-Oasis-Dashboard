import Logo from "./Logo";
import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <aside className="row-start-1 -row-end-1 flex flex-col gap-8 border-r border-gray-100 px-7 py-8">
      <Logo />
      <MainNav />
    </aside>
  );
}
