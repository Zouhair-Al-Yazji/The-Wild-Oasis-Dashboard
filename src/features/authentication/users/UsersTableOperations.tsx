import FilterInput from "@/ui/FilterInput";
import FilterDropdown from "@/ui/FilterDropdown";
import type { Table } from "@tanstack/react-table";
import type { SimplifiedUser } from "./useUsers";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "boy", label: "Male" },
  { value: "girl", label: "Female" },
];

export default function UsersTableOperations({
  table,
}: {
  table: Table<SimplifiedUser>;
}) {
  return (
    <div className="flex items-center gap-4">
      <FilterInput
        filterField="fullName"
        filterPlaceholder="Filter users by username..."
        table={table}
      />
      <FilterDropdown
        filterField="gender"
        table={table}
        options={filterOptions}
      />
    </div>
  );
}
