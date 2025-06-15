import { ColumnDef } from "@tanstack/react-table";
import type { Booking } from "./useBooking";
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
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import { format, isToday } from "date-fns";
import SortableHeader from "@/ui/SortableHeader";
import { DeleteConfirmationDialog } from "@/ui/DeleteConfirmationDialog";
import { useState } from "react";
import { useDeleteBooking } from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";

export type StatusType = "unconfirmed" | "checked-in" | "checked-out";

export const STATUS = {
  unconfirmed: "bg-blue-100  text-blue-700",
  "checked-in": "bg-green-100 text-green-700",
  "checked-out": "bg-gray-200 text-gray-700",
};

export const columns: ColumnDef<Booking, unknown>[] = [
  {
    accessorKey: "cabins",
    header: () => <p className="px-2 uppercase">CABIN</p>,
    cell: ({ row }) => {
      const cabins = row.getValue("cabins") as { name: string };

      return <div className="px-2 font-medium">{cabins?.name}</div>;
    },
  },
  {
    accessorKey: "guests",
    header: "GUESTS",
    cell: ({ row }) => {
      const guests = row.getValue("guests") as {
        fullName: string;
        email: string;
      };

      return (
        <div className="flex flex-col gap-0.5">
          <p className="font-medium">{guests?.fullName}</p>
          <p className="text-xs text-gray-600">{guests?.email}</p>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const guests = row.getValue(id) as { fullName: string; email: string };
      if (!guests) return false;

      const searchValue = value.toLowerCase();
      const fullName = guests.fullName.toLowerCase();
      const email = guests.email.toLowerCase();

      return fullName.includes(searchValue) || email.includes(searchValue);
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <SortableHeader sortKey="startDate" column={column} title="dates" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5 px-2">
        <p className="font-medium">
          {isToday(new Date(row.original.startDate))
            ? "Today"
            : formatDistanceFromNow(row.original.startDate)}{" "}
          &rarr; {row.original.numNights}{" "}
          {row.original.numNights > 1 ? "nights" : "night"} stay
        </p>
        <p className="text-xs text-gray-600">
          {format(new Date(row.original.startDate), "LLL dd yyyy")} &mdash;{" "}
          {format(new Date(row.original.endDate), "LLL dd yyyy")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <p className="px-2 uppercase">STATUS</p>,
    cell: ({ row }) => (
      <span
        className={`${STATUS[row.original.status as StatusType]} rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase`}
      >
        {row.original.status.replace("-", " ")}
      </span>
    ),
    filterFn: (row, id, value) => {
      if (value === "all") return true;
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <SortableHeader sortKey="totalPrice" column={column} title="amount" />
    ),
    cell: ({ row }) => (
      <div className="px-2 font-medium">
        <p>{formatCurrency(row.original.totalPrice)}</p>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const { mutate: deleteBooking, isPending: isDeleting } =
        useDeleteBooking();
      const { mutate: checkout, isPending: isCheckingOut } = useCheckout();

      function handleDelete() {
        deleteBooking(row.original.id, {
          onSettled: () => setIsDeleteDialogOpen(false),
        });
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="group-hover:text-primary h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="group-hover:text-primary h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate(`/bookings/${row.original.id}`)}
                className="group"
              >
                <HiEye className="group-hover:text-primary text-gray-600" />
                <span>See details</span>
              </DropdownMenuItem>
              {row.original.status === "unconfirmed" && (
                <DropdownMenuItem
                  className="group"
                  onClick={() => navigate(`/checkin/${row.original.id}`)}
                >
                  <HiArrowDownOnSquare className="group-hover:text-primary text-gray-600" />
                  <span>Checked in</span>
                </DropdownMenuItem>
              )}

              {row.original.status === "checked-in" && (
                <DropdownMenuItem
                  className="group"
                  disabled={isCheckingOut}
                  onClick={() => checkout(Number(row.original.id))}
                >
                  <HiArrowUpOnSquare className="group-hover:text-primary text-gray-600" />
                  <span>Checked out</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="group"
              >
                <HiTrash className="text-gray-600 group-hover:text-red-600" />
                <span className="group-hover:text-red-600">Delete booking</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteConfirmationDialog
            onOpenChange={setIsDeleteDialogOpen}
            open={isDeleteDialogOpen}
            onConfirm={handleDelete}
            isLoading={isDeleting}
          />
        </>
      );
    },
  },
];
