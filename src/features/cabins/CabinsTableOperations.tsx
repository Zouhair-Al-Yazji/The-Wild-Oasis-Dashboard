import type { Cabin } from "@/features/cabins/useCabins";
import FilterDropdown from "@/ui/FilterDropdown";
import FilterInput from "@/ui/FilterInput";
import { Table } from "@tanstack/react-table";

export default function CabinsTableOperations({
  table,
}: {
  table: Table<Cabin>;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <FilterInput
        filterField="name"
        filterPlaceholder="Filter cabins by name..."
        table={table}
      />
      <div>
        <FilterDropdown
          filterField="discount"
          table={table}
          options={[
            { label: "All", value: "all" },
            { label: "With Discount", value: "with" },
            { label: "Without Discount", value: "without" },
          ]}
        />
      </div>
    </div>
  );
}
