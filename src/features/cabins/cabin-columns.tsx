import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Cabin } from "./useCabins";
import { Badge } from "@/components/ui/badge";
import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";
import { formatCurrency } from "@/utils/helpers";
import { useDeleteCabin } from "./useCabinMutations";
import { useState } from "react";
import { DeleteConfirmationDialog } from "@/ui/DeleteConfirmationDialog";

export const columns: ColumnDef<Cabin>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const imageUrl = row.original.image;

      return imageUrl ? (
        <img
          src={imageUrl}
          alt={`Cabin ${row.original.name || "Unnamed Cabin"}`}
          className="w-20 object-cover"
        />
      ) : (
        <div className="flex h-12 w-20 items-center justify-center bg-gray-100">
          <span className="text-xs text-gray-500">No image</span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="uppercase"
        >
          Cabin Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-2 font-medium">
        {row.getValue("name") || "Unnamed Cabin"}
      </div>
    ),
  },
  {
    accessorKey: "maxCapacity",
    header: () => <div className="text-left uppercase">Capacity</div>,
    cell: ({ row }) => {
      const capacity = row.getValue("maxCapacity") as number;
      return (
        <div className="text-left font-medium">
          {capacity ? `Fits up ${capacity} guests` : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "regularPrice",
    header: () => <div className="text-left uppercase">Regular Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("regularPrice"));
      return (
        <div className="text-left font-semibold">
          {amount ? formatCurrency(amount) : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: () => <div className="text-left uppercase">Discount</div>,
    cell: ({ row }) => {
      const discount = parseFloat(row.getValue("discount"));
      return (
        <Badge
          variant={discount ? "default" : "secondary"}
          className="float-left"
        >
          {discount ? formatCurrency(discount) : "None"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "CREATED AT",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return date.toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const cabin = row.original;
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const { mutate: deleteCabin, isPending: isDeleting } = useDeleteCabin();

      function handleDelete() {
        deleteCabin(cabin.id, {
          onSettled: () => setIsDeleteDialogOpen(false),
        });
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <HiSquare2Stack />
                <span>Duplicate cabin</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HiPencil />
                <span>Update cabin</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="group"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <HiTrash className="group-hover:text-red-600" />
                <span className="group-hover:text-red-600">Delete cabin</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteConfirmationDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={handleDelete}
            isLoading={isDeleting}
          />
        </>
      );
    },
  },
];
