import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getPaginationRowModel,
} from "@tanstack/react-table";
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
import type { SimplifiedUser } from "./useUsers";
import UsersTableOperations from "./UsersTableOperations";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClientPagination } from "@/ui/ClientPagination";

type UserDataTableProps = {
  columns: ColumnDef<SimplifiedUser, unknown>[];
  data?: SimplifiedUser[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
};

export default function UsersDataTable({
  columns,
  data = [],
  isLoading = false,
  isError = false,
  error,
}: UserDataTableProps) {
  const [searchParams] = useSearchParams();

  // Initialize sorting from URL if valid params exist
  const initialSorting: SortingState = [];
  const urlSort = searchParams.get("sortBy");
  const urlSortDirection = searchParams.get("direction");

  if (urlSort && ["asc", "desc"].includes(urlSortDirection || "")) {
    initialSorting.push({
      id: urlSort,
      desc: urlSortDirection === "desc",
    });
  }

  // Initial pagination from URL or use defaults
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: pageSize ? pageSize : 5,
  });

  const table = useReactTable<SimplifiedUser>({
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
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const RenderTable = () => (
    <div className="bg-sidebar rounded-md border">
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
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  if (isLoading) return <TableSkeleton />;
  if (isError) return <Error message={error || ""} />;

  return (
    <div className="space-y-4">
      <UsersTableOperations table={table} />
      <RenderTable />
      <ClientPagination table={table} />
    </div>
  );
}
