import { useCallback } from "react";
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
  count: number;
};

export function DataTablePagination<TData>({
  count,
}: DataTablePaginationProps<TData>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const pageCount = Math.ceil(count / pageSize);

  const navigateToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const nextPage = useCallback(() => {
    navigateToPage(Math.min(currentPage + 1, pageCount));
  }, [currentPage, navigateToPage, pageCount]);

  const prevPage = useCallback(() => {
    navigateToPage(Math.max(currentPage - 1, 1));
  }, [currentPage, navigateToPage]);

  const goToFirstPage = useCallback(() => {
    navigateToPage(1);
  }, [navigateToPage]);

  const goToLastPage = useCallback(() => {
    navigateToPage(pageCount);
  }, [navigateToPage, pageCount]);

  const handlePageSizeChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("pageSize", value);
      params.set("page", "1"); // Reset to first page when changing page size
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-muted-foreground flex-1 text-sm">
        Total {count} rows
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToFirstPage}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={prevPage}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={nextPage}
            disabled={currentPage >= pageCount}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToLastPage}
            disabled={currentPage >= pageCount}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
