import BookingsDataTable from "@/features/bookings/BookingsDataTable";
import { useBookings } from "@/features/bookings/useBookings";
import { columns } from "../features/bookings/BookingColumns";

export default function Bookings() {
  const { data, isPending, isError } = useBookings();

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700">All Bookings</h2>
      <BookingsDataTable
        columns={columns}
        data={data}
        isLoading={isPending}
        isError={isError}
      />
    </>
  );
}
