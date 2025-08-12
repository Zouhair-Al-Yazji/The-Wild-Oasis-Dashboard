import FilterDropdown from "@/ui/FilterDropdown";
import FilterInput from "@/ui/FilterInput";
import { Table } from "@tanstack/react-table";
import type { Booking } from "./useBooking";

export default function BookingsTableOperations({
  table,
}: {
  table: Table<Booking>;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <FilterInput
        filterField="guests"
        filterPlaceholder="Filter bookings by guest name..."
        table={table}
      />
      <div>
        <FilterDropdown
          filterField="status"
          table={table}
          options={[
            { label: "All", value: "all" },
            { label: "Checked in", value: "checked-in" },
            { label: "Checked out", value: "checked-out" },
            { label: "Unconfirmed", value: "unconfirmed" },
          ]}
        />
      </div>
    </div>
  );
}
