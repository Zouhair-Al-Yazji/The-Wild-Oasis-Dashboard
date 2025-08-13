import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
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
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClientPagination } from "@/ui/ClientPagination";

type BookingDataTableProps = {
  columns: ColumnDef<Booking, unknown>[];
  data?: Booking[];
  isLoading?: boolean;
  isError?: boolean;
};

export default function BookingsDataTable({
  data = [],
  columns,
  isLoading = false,
  isError = false,
}: BookingDataTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize sorting from URL
  const initialSorting: SortingState = [];
  const urlSort = searchParams.get("sortBy");
  const urlSortDirection = searchParams.get("direction");

  if (urlSort && ["asc", "desc"].includes(urlSortDirection || "")) {
    initialSorting.push({
      id: urlSort,
      desc: urlSortDirection === "desc",
    });
  }

  // Initialize filters from URL
  const initialFilters: ColumnFiltersState = [];
  const guestFilter = searchParams.get("guests");
  const statusFilter = searchParams.get("status");

  if (guestFilter) {
    initialFilters.push({ id: "guests", value: guestFilter });
  }
  if (statusFilter && statusFilter !== "all") {
    initialFilters.push({ id: "status", value: statusFilter });
  }

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialFilters);
  const [pagination, setPagination] = useState({
    pageIndex: Number(searchParams.get("page")) || 0,
    pageSize: Number(searchParams.get("pageSize")) || 5,
  });

  // Sync URL with table state
  useEffect(() => {
    const params = new URLSearchParams();

    // Sorting
    if (sorting.length > 0) {
      params.set("sortBy", sorting[0].id);
      params.set("direction", sorting[0].desc ? "desc" : "asc");
    } else {
      params.delete("sortBy");
      params.delete("direction");
    }

    // Filters
    columnFilters.forEach((filter) => {
      if (filter.id === "guests" && filter.value) {
        params.set("guests", filter.value as string);
      } else if (filter.id === "status" && filter.value !== "all") {
        params.set("status", filter.value as string);
      } else {
        params.delete(filter.id);
      }
    });

    // Pagination
    if (pagination.pageIndex > 0) {
      params.set("page", pagination.pageIndex.toString());
    } else {
      params.delete("page");
    }

    if (pagination.pageSize !== 5) {
      params.set("pageSize", pagination.pageSize.toString());
    } else {
      params.delete("pageSize");
    }

    setSearchParams(params, { replace: true });
  }, [sorting, columnFilters, pagination, setSearchParams]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      <ClientPagination table={table} />
    </div>
  );
}
