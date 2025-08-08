import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ServerPaginationProps = {
  count: number;
};

export function ServerPagination({ count }: ServerPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;

  const pageCount = Math.ceil(count / pageSize);

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  const handlePageSizeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", value);
    params.set("page", "1");
    setSearchParams(params);
  };

  // Mobile pagination UI
  const MobilePagination = () => (
    <div className="flex w-full items-center justify-between sm:hidden">
      <Button
        variant="outline"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="text-sm font-medium">
        Page <span className="font-semibold">{currentPage}</span> /{" "}
        <span className="font-semibold">{pageCount}</span>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage >= pageCount}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-3 px-2 py-1 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-muted-foreground text-center text-sm sm:text-left">
        Showing{" "}
        <span className="text-foreground font-medium">
          {(currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, count)}
        </span>{" "}
        of <span className="text-foreground font-medium">{count}</span> rows
      </div>

      <MobilePagination />

      <div className="hidden items-center gap-4 sm:flex sm:gap-3 md:gap-4">
        <div className="flex items-center gap-2">
          <p className="hidden text-sm font-medium whitespace-nowrap md:block">
            Rows per page
          </p>
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

        <div className="flex min-w-[100px] items-center justify-center text-sm font-medium whitespace-nowrap">
          Page <span className="mx-1 font-semibold">{currentPage}</span> of{" "}
          <span className="ml-1 font-semibold">{pageCount}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigateToPage(1)}
            disabled={currentPage <= 1}
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigateToPage(currentPage + 1)}
            disabled={currentPage >= pageCount}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigateToPage(pageCount)}
            disabled={currentPage >= pageCount}
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
