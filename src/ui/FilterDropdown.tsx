import { useSearchParams } from "react-router-dom";
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
import { useEffect } from "react";

export default function FilterDropdown({
  filterField,
  table,
  options,
}: {
  filterField: string;
  table: Table<Cabin>;
  options: { label: string; value: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const column = table.getColumn(filterField);

  if (!column || !options.length) return null;

  const currentFilterValue =
    searchParams.get(filterField) || options.at(0)?.value;

  useEffect(
    function () {
      column?.setFilterValue(currentFilterValue);
    },
    [column, currentFilterValue],
  );

  // const filterValue = column.getFilterValue() as string;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
    column?.setFilterValue(value);
  }

  const currentLabel = options.find(
    ({ value }) => value === currentFilterValue,
  )?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-background border py-[17px]" asChild>
        <Button variant="ghost" className="h-8" aria-label="Filter">
          <HiOutlineFunnel />
          Filter {currentLabel}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map(({ label, value }) => (
          <DropdownMenuItem onClick={() => handleClick(value)} key={value}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
