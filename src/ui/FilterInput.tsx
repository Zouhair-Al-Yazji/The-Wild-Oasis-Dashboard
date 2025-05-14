import { Input } from "@/components/ui/input";
import type { Cabin } from "@/features/cabins/useCabins";
import { Table } from "@tanstack/react-table";

export default function FilterInput({
  filterField,
  filterPlaceholder,
  table,
}: {
  filterField: string;
  filterPlaceholder: string;
  table: Table<Cabin>;
}) {
  return (
    <Input
      placeholder={filterPlaceholder}
      value={(table.getColumn(filterField)?.getFilterValue() as string) ?? ""}
      onChange={(e) =>
        table.getColumn(filterField)?.setFilterValue(e.target.value)
      }
      className="max-w-sm bg-white"
    />
  );
}
