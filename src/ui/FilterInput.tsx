import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { ChangeEvent, useEffect, useState } from "react";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get(filterField) || "");

  const column = table?.getColumn(filterField);

  useEffect(() => {
    column?.setFilterValue(value);
  }, [column, value]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);

    const newParams = new URLSearchParams(searchParams);
    if (newValue) {
      newParams.set(filterField, newValue);
      // Reset to first page when filtering
      newParams.set("page", "0");
    } else {
      newParams.delete(filterField);
    }
    setSearchParams(newParams);
  }

  return (
    <Input
      placeholder={filterPlaceholder}
      value={value}
      onChange={handleChange}
      className="max-w-sm bg-white"
    />
  );
}
