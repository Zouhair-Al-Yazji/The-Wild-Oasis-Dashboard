import { Button } from "@/components/ui/button";
import { useSortableColumn } from "@/hooks/useSortableColumn";
import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

type SortableHeaderProps<TData> = {
  column: Column<TData>;
  title: string;
  sortKey: string;
};

export default function SortableHeader<TData>({
  column,
  title,
  sortKey,
}: SortableHeaderProps<TData>) {
  const { toggleSort, isCurrent, isAsc, isDesc, currentSortDirection } =
    useSortableColumn(column, sortKey);

  return (
    <Button
      title={isCurrent ? `sorted ${currentSortDirection}` : `sort by ${title}`}
      variant="ghost"
      onClick={toggleSort}
      className="uppercase"
    >
      {title}

      {!isCurrent && <ArrowUpDown className="ml-2 h-4 w-4" />}

      {isCurrent && isAsc && <ArrowDown className="text-primary h-4 w-4" />}

      {isCurrent && isDesc && <ArrowUp className="text-primary h-4 w-4" />}
    </Button>
  );
}
