import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { Cabin } from "@/features/cabins/useCabins";
import type { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { HiOutlineFunnel } from "react-icons/hi2";

export default function FilterDropdown({
  filterField,
  table,
  options,
}: {
  filterField: string;
  table: Table<Cabin>;
  options: { label: string; value: string }[];
}) {
  const column = table.getColumn(filterField);

  if (!column) return null;

  const filterValue = column.getFilterValue() as string;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-background border py-[17px]" asChild>
        <Button variant="ghost" className="h-8">
          <HiOutlineFunnel />
          Filter {options.find(({ value }) => value === filterValue)?.label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map(({ label, value }) => (
          <DropdownMenuItem onClick={() => column.setFilterValue(value)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
