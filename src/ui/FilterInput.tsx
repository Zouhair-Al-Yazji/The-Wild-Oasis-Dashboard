import { Input } from "@/components/ui/input";
import type { Cabin } from "@/features/cabins/useCabins";
import { Table } from "@tanstack/react-table";
import { ChangeEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function FilterInput({
  filterField,
  filterPlaceholder,
  table,
}: {
  filterField: string;
  filterPlaceholder: string;
  table: Table<Cabin>;
}) {
  const column = table.getColumn(filterField);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearchValue = searchParams.get(filterField) || "";

  useEffect(
    function () {
      column?.setFilterValue(currentSearchValue);
    },
    [currentSearchValue, column, filterField],
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (value) {
      searchParams.set(filterField, value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(filterField);
      setSearchParams(searchParams);
    }

    column?.setFilterValue(e.target.value);
  }

  return (
    <Input
      placeholder={filterPlaceholder}
      value={(table.getColumn(filterField)?.getFilterValue() as string) ?? ""}
      onChange={handleChange}
      className="max-w-sm bg-white"
    />
  );
}
