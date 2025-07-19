import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import type { SimplifiedUser } from "./useUsers";
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

export const UserColumns: ColumnDef<SimplifiedUser>[] = [
  {
    id: "avatar",
    header: () => <div className="px-2 uppercase">Avatar</div>,
    cell: ({ row }) => {
      const avatarUrl = row.original.avatar;

      return typeof avatarUrl === "string" ? (
        <div className="mx-2 h-11 w-11 overflow-hidden rounded-full border border-gray-200">
          <img
            src={avatarUrl}
            alt={`avatar ${row.original.fullName}`}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="mx-2 h-11 w-11 overflow-hidden rounded-full border border-gray-200">
          <img
            src="/default-user.jpg"
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
      <div className="px-2 font-medium text-gray-700">
        {row.getValue("fullName")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="px-2 uppercase">Email</div>,
    cell: ({ row }) => (
      <div className="px-2 font-medium text-gray-700">
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
          <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-800">
            Male
          </span>
        ) : (
          <span className="rounded-full bg-pink-100 px-2 py-1 text-pink-800">
            Female
          </span>
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
      <div className="px-2 text-sm font-medium text-gray-700">
        {format(new Date(row.getValue("created_at")), "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const { isPending: isDeleting, mutate: deleteUser } = useDeleteUser();
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
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="group cursor-pointer"
                onClick={() => navigate("/account")}
              >
                <HiPencil className="group-hover:text-primary text-gray-600" />
                <span>Update user</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="group cursor-pointer"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <HiTrash className="text-gray-600 group-hover:text-red-600" />
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
