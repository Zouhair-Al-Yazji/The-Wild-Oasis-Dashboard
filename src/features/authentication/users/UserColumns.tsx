import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import type { ProfileUser } from "./useUsers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import SortableHeader from "@/ui/SortableHeader";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "./useDeleteUser";
import { DeleteConfirmationDialog } from "@/ui/DeleteConfirmationDialog";
import { Badge } from "@/components/ui/badge";
import { useUser } from "./useUser";

export const UserColumns: ColumnDef<ProfileUser>[] = [
  {
    id: "avatar",
    header: () => <div className="px-2 uppercase">Avatar</div>,
    cell: ({ row }) => {
      const avatarUrl = row.original.avatar;

      return typeof avatarUrl === "string" ? (
        <div className="border-border mx-2 h-11 w-11 overflow-hidden rounded-full border">
          <img
            src={avatarUrl}
            alt={`avatar ${row.original.fullName}`}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="border-border mx-2 h-11 w-11 overflow-hidden rounded-full border">
          <img
            src="default-user.jpg"
            alt={`avatar ${row.original.fullName}`}
            className="h-full w-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: () => <div className="px-2 uppercase">Username</div>,
    cell: ({ row }) => (
      <div className="text-foreground px-2 font-medium">
        {row.getValue("fullName")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="px-2 uppercase">Email</div>,
    cell: ({ row }) => (
      <div className="text-foreground px-2 font-medium">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: () => <div className="px-2 uppercase">Gender</div>,
    cell: ({ row }) => (
      <div className="w-fit rounded-full px-2 py-1 text-xs font-medium">
        {row.getValue("gender") === "boy" ? (
          <Badge
            variant="default"
            className="bg-primary text-primary-foreground"
          >
            Male
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className="bg-accent text-accent-foreground"
          >
            Female
          </Badge>
        )}
      </div>
    ),
    filterFn: (row, columnId, filterValue) => {
      if (filterValue === "all") return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <SortableHeader sortKey="created_at" title="created at" column={column} />
    ),
    cell: ({ row }) => (
      <div className="text-foreground px-2 text-sm font-medium">
        {format(new Date(row.getValue("created_at")), "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const { isPending: isDeleting, mutate: deleteUser } = useDeleteUser();
      const { user } = useUser();
      const navigate = useNavigate();

      function handleDeleteUser() {
        deleteUser(row.original.id, {
          onSettled: () => setIsDeleteDialogOpen(false),
        });
      }

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="text-muted-foreground h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {row.original.id === user?.id && (
                <DropdownMenuItem
                  className="group cursor-pointer"
                  onClick={() => navigate("/account")}
                >
                  <HiPencil className="group-hover:text-primary text-muted-foreground" />
                  <span>Update user</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="group cursor-pointer"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <HiTrash className="group-hover:text-destructive text-gray-600" />
                <span>Delete user</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteConfirmationDialog
            onConfirm={handleDeleteUser}
            onOpenChange={setIsDeleteDialogOpen}
            open={isDeleteDialogOpen}
            isLoading={isDeleting}
            resourceName="user"
          />
        </div>
      );
    },
  },
];
