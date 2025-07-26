import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { HiOutlineFunnel } from "react-icons/hi2";
import { useEffect, useMemo } from "react";

export default function FilterDropdown<TData>({
  filterField,
  table,
  options,
}: {
  filterField: string;
  table?: Table<TData> | undefined;
  options: { label: string; value: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const column = table?.getColumn(filterField);

  const currentFilterValue =
    searchParams.get(filterField) || options.at(0)?.value || "";

  useEffect(
    function () {
      column?.setFilterValue(currentFilterValue);
    },
    [column, currentFilterValue],
  );

  if (!options.length) return null;

  function handleClick(value: string) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterField, value);
    setSearchParams(newParams);
    column?.setFilterValue(value);
  }

  const currentLabel = useMemo(
    () => options.find(({ value }) => value === currentFilterValue),
    [options, currentFilterValue],
  )?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="bg-background border-border border py-[17px]"
        asChild
      >
        <Button
          variant="ghost"
          className="h-8"
          aria-label={`Filter by ${filterField}: ${currentLabel || "All"}`}
        >
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
