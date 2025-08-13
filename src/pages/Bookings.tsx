import BookingsDataTable from "@/features/bookings/BookingsDataTable";
import { useBookings } from "@/features/bookings/useBookings";
import { columns } from "../features/bookings/BookingColumns";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Bookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending, isError } = useBookings();

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    if (!searchParams.get("pageSize")) {
      searchParams.set("pageSize", "5");
    }
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <>
      <h2 className="text-foreground text-xl font-semibold sm:text-2xl">
        All Bookings
      </h2>
      <BookingsDataTable
        columns={columns}
        data={data}
        isLoading={isPending}
        isError={isError}
      />
    </>
  );
}
