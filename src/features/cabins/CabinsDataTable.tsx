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
import { useState, useEffect } from "react";
import type { Cabin } from "@/features/cabins/useCabins";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CabinsTableOperations from "./CabinsTableOperations";
import TableSkeleton from "@/ui/TableSkeleton";
import Error from "@/ui/Error";
import { useSearchParams } from "react-router-dom";
import { ClientPagination } from "@/ui/ClientPagination";

type CabinsDataTableProps = {
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
}: CabinsDataTableProps) {
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
  const nameFilter = searchParams.get("name");
  const discountFilter = searchParams.get("discount");

  if (nameFilter) {
    initialFilters.push({ id: "name", value: nameFilter });
  }
  if (discountFilter && discountFilter !== "all") {
    initialFilters.push({ id: "discount", value: discountFilter });
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
      if (filter.id === "name" && filter.value) {
        params.set("name", filter.value as string);
      } else if (filter.id === "discount" && filter.value !== "all") {
        params.set("discount", filter.value as string);
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
    <div className="bg-sidebar border-border rounded-md border">
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
      <ClientPagination table={table} />
    </div>
  );
}
