import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { ChangeEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function FilterInput<TData>({
  filterField,
  filterPlaceholder,
  table,
}: {
  filterField: string;
  filterPlaceholder: string;
  table?: Table<TData>;
}) {
  const column = table?.getColumn(filterField);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchValue = searchParams.get(filterField) || "";

  useEffect(function () {
    if (currentSearchValue) {
      column?.setFilterValue(currentSearchValue);
    }
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    column?.setFilterValue(value);

    if (value) {
      searchParams.set(filterField, value);
    } else {
      searchParams.delete(filterField);
    }
    setSearchParams(searchParams);
  }

  return (
    <Input
      placeholder={filterPlaceholder}
      value={(column?.getFilterValue() as string) ?? ""}
      onChange={handleChange}
      className="max-w-sm bg-white"
    />
  );
}
