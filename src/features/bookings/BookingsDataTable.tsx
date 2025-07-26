import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import type { Booking } from "./useBooking";
import TableSkeleton from "@/ui/TableSkeleton";
import Error from "@/ui/Error";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookingsTableOperations from "./BookingsTableOperations";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ServerPagination } from "@/ui/ServerPagination";

type BookingDataTableProps = {
  columns: ColumnDef<Booking, unknown>[];
  data?: Booking[];
  isError?: boolean;
  isLoading?: boolean;
  count: number;
};

export default function BookingsDataTable({
  data = [],
  columns,
  isLoading = false,
  isError = false,
  count,
}: BookingDataTableProps) {
  const [searchParams] = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    },
    pageCount: Math.ceil(count / pageSize),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  const RenderTable = () => (
    <div className="bg-sidebar border-border rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No bookings found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  if (isLoading) return <TableSkeleton />;
  if (isError) return <Error message="Error loading bookings data" />;

  return (
    <div className="space-y-4">
      <BookingsTableOperations table={table} />
      <RenderTable />
      <ServerPagination count={count} />
    </div>
  );
}
