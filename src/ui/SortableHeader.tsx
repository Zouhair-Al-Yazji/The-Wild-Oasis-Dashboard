import { Button } from "@/components/ui/button";
import type { Cabin } from "@/features/cabins/useCabins";
import type { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

type SortableHeaderProps = {
  column: Column<Cabin>;
  title: string;
  sortKey: string;
};

export default function SortableHeader({
  column,
  title,
  sortKey,
}: SortableHeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get("sortBy");
  const currentSortDirection = searchParams.get("direction");

  function handleSort() {
    // Clicking same column - toggle direction
    // Create a copy of existing searchParams to modify
    const newParams = new URLSearchParams(searchParams);

    // Determine the new direction
    const isSameColumn = currentSort === sortKey;
    const newDirection = isSameColumn
      ? currentSortDirection === "asc"
        ? "desc"
        : "asc"
      : "asc";

    // Update the URL parameters
    newParams.set("sortBy", sortKey);
    newParams.set("direction", newDirection);
    setSearchParams(newParams);

    // Update table sorting
    column.toggleSorting(newDirection === "desc");
  }

  return (
    <Button variant="ghost" onClick={handleSort} className="uppercase">
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
