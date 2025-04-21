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
                "group flex items-center gap-3 px-6 py-3 font-medium text-gray-600 transition-all duration-300 hover:rounded-sm hover:bg-gray-50 hover:text-gray-800 active:bg-gray-50",
                isActive && "active bg-gray-50 text-gray-800",
              )
            }
            to="/dashboard"
          >
            <HiOutlineHome className="group-hover:text-primary group-[.active]:text-primary size-6 text-gray-400" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-6 py-3 font-medium text-gray-600 transition-all duration-300 hover:rounded-sm hover:bg-gray-50 hover:text-gray-800 active:bg-gray-50",
                isActive && "active bg-gray-50 text-gray-800",
              )
            }
            to="/bookings"
          >
            <HiOutlineCalendarDays className="group-hover:text-primary group-[.active]:text-primary size-6 text-gray-400" />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-6 py-3 font-medium text-gray-600 transition-all duration-300 hover:rounded-sm hover:bg-gray-50 hover:text-gray-800 active:bg-gray-50",
                isActive && "active bg-gray-50 text-gray-800",
              )
            }
            to="/cabins"
          >
            <HiOutlineHomeModern className="group-hover:text-primary group-[.active]:text-primary size-6 text-gray-400" />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-6 py-3 font-medium text-gray-600 transition-all duration-300 hover:rounded-sm hover:bg-gray-50 hover:text-gray-800 active:bg-gray-50",
                isActive && "active bg-gray-50 text-gray-800",
              )
            }
            to="/users"
          >
            <HiOutlineUsers className="group-hover:text-primary group-[.active]:text-primary size-6 text-gray-400" />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-6 py-3 font-medium text-gray-600 transition-all duration-300 hover:rounded-sm hover:bg-gray-50 hover:text-gray-800 active:bg-gray-50",
                isActive && "active bg-gray-50 text-gray-800",
              )
            }
            to="/settings"
          >
            <HiOutlineCog6Tooth className="group-hover:text-primary group-[.active]:text-primary size-6 text-gray-400" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
