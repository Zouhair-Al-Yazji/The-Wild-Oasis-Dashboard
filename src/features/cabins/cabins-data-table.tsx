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
import { useState } from "react";
import type { Cabin } from "@/features/cabins/useCabins";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import CabinsTableOperations from "./CabinsTableOperations";
import TableSkeleton from "@/ui/TableSkeleton";
import Error from "@/ui/Error";
import { useSearchParams } from "react-router-dom";

type DataTableProps = {
  columns: ColumnDef<Cabin, unknown>[];
  data?: Cabin[];
  isLoading?: boolean;
  isError?: boolean;
};

export function CabinsDataTable({
  columns,
  data = [],
  isLoading = false,
  isError = false,
}: DataTableProps) {
  const [searchParams] = useSearchParams();
  // Initialize sorting from URL if valid params exist
  const initialSorting: SortingState = [];
  const urlSort = searchParams.get("sortBy");
  const urlSortDirection = searchParams.get("Direction");

  if (urlSort && ["asc", "desc"].includes(urlSortDirection || "")) {
    initialSorting.push({
      id: urlSort,
      desc: urlSortDirection === "desc",
    });
  }

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable<Cabin>({
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
    getRowId: (row) => (typeof row.id !== "undefined" ? row.id.toString() : ""),
  });

  const RenderTable = () => (
    <div className="bg-background rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="group relative">
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
                No cabins found.
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
      <CabinsTableOperations table={table} />
      <RenderTable />
      <DataTablePagination table={table} />
    </div>
  );
}
