import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Memoize expensive calculations
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    return !pageParam ? 1 : Number(pageParam);
  }, [searchParams]);

  const paginationState = table.getState().pagination;
  const pageCount = table.getPageCount();
  const filteredRowCount = table.getFilteredRowModel().rows.length;

  // Optimized navigation functions with useCallback
  const nextPage = useCallback(() => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", next.toString());
    setSearchParams(params);
    table.nextPage();
  }, [currentPage, pageCount, searchParams, setSearchParams, table]);

  const prevPage = useCallback(() => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", prev.toString());
    setSearchParams(params);
    table.previousPage();
  }, [currentPage, searchParams, setSearchParams, table]);

  const goToFirstPage = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setSearchParams(params);
    table.setPageIndex(0);
  }, [searchParams, setSearchParams, table]);

  const goToLastPage = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageCount.toString());
    setSearchParams(params);
    table.setPageIndex(pageCount - 1);
  }, [pageCount, searchParams, setSearchParams, table]);

  const handlePageSizeChange = useCallback(
    (value: string) => {
      goToFirstPage();
      searchParams.set("pageSize", value);
      setSearchParams(searchParams);
      table.setPageSize(Number(value));
    },
    [table],
  );

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-muted-foreground flex-1 text-sm">
        Total {filteredRowCount} rows
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${paginationState.pageSize}`}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={paginationState.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {paginationState.pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToFirstPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={prevPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={nextPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToLastPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
