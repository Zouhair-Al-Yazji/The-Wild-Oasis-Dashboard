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
import { DataTablePagination } from "@/ui/DataTablePagination";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type BookingDataTableProps = {
  columns: ColumnDef<Booking, unknown>[];
  data?: Booking[];
  isError?: boolean;
  isLoading?: boolean;
};

export default function BookingsDataTable({
  data = [],
  columns,
  isLoading = false,
  isError = false,
}: BookingDataTableProps) {
  const [searchParams] = useSearchParams();

  // Initialize sorting from URL if valid params exist
  const initialSorting: SortingState = [];
  const urlSort = searchParams.get("sortBy");
  const urlSortDirection = searchParams.get("direction");

  const paramPage = Number(searchParams.get("page"));
  const paramPageSize = Number(searchParams.get("pageSize"));

  if (urlSort && ["asc", "desc"].includes(urlSortDirection || "")) {
    initialSorting.push({
      id: urlSort,
      desc: urlSortDirection === "desc",
    });
  }

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [pagination, setPagination] = useState({
    pageIndex: paramPage ? paramPage - 1 : 0,
    pageSize: paramPageSize ? paramPageSize : 5,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const RenderTable = () => (
    <div className="bg-background rounded-md border">
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
  if (isError) return <Error message="Error loading cabins data" />;

  return (
    <div className="space-y-4">
      <BookingsTableOperations table={table} />
      <RenderTable />
      <DataTablePagination table={table} />
    </div>
  );
}
