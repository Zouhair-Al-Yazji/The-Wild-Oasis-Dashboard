import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/authentication/useLogout";
import { useUser } from "@/features/authentication/users/useUser";
import { BadgeCheck, ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "./SpinnerMini";

export default function HeaderMenu() {
  const { user } = useUser();
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();

  const userFallback = user?.user_metadata.fullName
    ?.split(" ")
    .map((n: string) => n[0].toUpperCase())
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="hover:bg-sidebar-accent cursor-pointer rounded-sm px-2 py-1.5"
        asChild
      >
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user?.user_metadata.avatar}
              alt={user?.user_metadata.fullName}
              className="border-border h-full w-full border object-cover"
            />
            <AvatarFallback className="rounded-lg">
              {userFallback}
            </AvatarFallback>
          </Avatar>

          <div className="hidden flex-1 flex-col truncate text-left text-sm leading-tight sm:grid">
            <span className="text-foreground truncate font-medium">
              {user?.user_metadata.fullName}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {user?.email}
            </span>
          </div>

          <ChevronsUpDown className="ml-auto h-4 w-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-background mr-2 w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg sm:mr-0"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={user?.user_metadata.avatar}
                alt={user?.user_metadata.fullName}
                loading="lazy"
                className="border-border h-full w-full rounded-lg border object-center"
              />
              <AvatarFallback className="rounded-lg">
                {userFallback}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-foreground truncate font-medium">
                {user?.user_metadata.fullName}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
            onClick={() => navigate("/account")}
          >
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
            onClick={() => navigate("/settings")}
          >
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem
          className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
          onClick={() => logout()}
        >
          {!isPending ? (
            <>
              <LogOut />
              Log out
            </>
          ) : (
            <SpinnerMini label="" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
