import { Column } from "@tanstack/react-table";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useSortableColumn<TData>(
  column: Column<TData>,
  sortKey: string,
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get("sortBy");
  const currentSortDirection = searchParams.get("direction");

  const isCurrent = currentSort === sortKey;
  const isAsc = currentSortDirection === "asc";
  const isDesc = currentSortDirection === "desc";

  function toggleSort() {
    // Create a copy of existing searchParams to modify
    const newParams = new URLSearchParams(searchParams);

    // Determine the new direction
    const newDirection = isCurrent && isAsc ? "desc" : "asc";

    // Update the URL parameters
    newParams.set("sortBy", sortKey);
    newParams.set("direction", newDirection);
    setSearchParams(newParams);

    // Update table sorting
    column.toggleSorting(newDirection === "desc");
  }

  return useMemo(
    () => ({
      toggleSort,
      isCurrent,
      isAsc,
      isDesc,
      currentSortDirection,
    }),
    [toggleSort, isCurrent, isAsc, isDesc, currentSortDirection],
  );
}
