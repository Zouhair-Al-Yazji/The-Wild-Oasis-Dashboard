import TodayActivity from "../check-in-out/TodayActivity";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Spinner from "@/ui/Spinner";

export default function DashboardLayout() {
  const { bookings, isPending: isPendingBookings } = useRecentBookings();
  const {
    confirmedStays,
    isPending: isPendingStays,
    numDays,
  } = useRecentStays();
  const { data: cabins, isPending: isPendingCabins } = useCabins();

  if (isPendingBookings || isPendingStays || isPendingCabins)
    return <Spinner />;

  return (
    <div className="grid h-full grid-cols-4 gap-6">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins?.length || 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}
