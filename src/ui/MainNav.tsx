import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { cn } from "@/lib/utils";

export default function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-6 py-3 font-medium transition-all duration-300 hover:rounded-sm",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent",
                isActive &&
                  "active bg-sidebar-accent text-sidebar-accent-foreground rounded-sm",
              )
            }
            to="/dashboard"
          >
            <HiOutlineHome className="group-hover:text-primary group-[.active]:text-primary text-sidebar-foreground/70 size-6 transition-colors duration-300" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-6 py-3 font-medium transition-all duration-300 hover:rounded-sm",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent",
                isActive &&
                  "active bg-sidebar-accent text-sidebar-accent-foreground rounded-sm",
              )
            }
            to="/bookings"
          >
            <HiOutlineCalendarDays className="group-hover:text-primary group-[.active]:text-primary text-sidebar-foreground/70 size-6 transition-colors duration-300" />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-6 py-3 font-medium transition-all duration-300 hover:rounded-sm",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent",
                isActive &&
                  "active bg-sidebar-accent text-sidebar-accent-foreground rounded-sm",
              )
            }
            to="/cabins"
          >
            <HiOutlineHomeModern className="group-hover:text-primary group-[.active]:text-primary text-sidebar-foreground/70 size-6 transition-colors duration-300" />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-6 py-3 font-medium transition-all duration-300 hover:rounded-sm",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent",
                isActive &&
                  "active bg-sidebar-accent text-sidebar-accent-foreground rounded-sm",
              )
            }
            to="/users"
          >
            <HiOutlineUsers className="group-hover:text-primary group-[.active]:text-primary text-sidebar-foreground/70 size-6 transition-colors duration-300" />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-6 py-3 font-medium transition-all duration-300 hover:rounded-sm",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent",
                isActive &&
                  "active bg-sidebar-accent text-sidebar-accent-foreground rounded-sm",
              )
            }
            to="/settings"
          >
            <HiOutlineCog6Tooth className="group-hover:text-primary group-[.active]:text-primary text-sidebar-foreground/70 size-6 transition-colors duration-300" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
