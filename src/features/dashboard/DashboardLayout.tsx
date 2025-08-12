import TodayActivity from "../check-in-out/TodayActivity";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Spinner from "@/ui/Spinner";

export default function DashboardLayout() {
  const {
    bookings,
    isPending: isPendingBookings,
    metrics: bookingMetrics,
  } = useRecentBookings();
  const {
    confirmedStays,
    isPending: isPendingStays,
    numDays,
    metrics: stayMetrics,
  } = useRecentStays();
  const { data: cabins, isPending: isPendingCabins } = useCabins();

  if (isPendingBookings || isPendingStays || isPendingCabins)
    return <Spinner />;

  return (
    <div className="grid h-full grid-cols-4 grid-rows-[auto_516px_auto] gap-6">
      <Stats
        numDays={numDays}
        cabinsCount={cabins?.length || 0}
        metrics={{
          bookings: bookingMetrics.bookings,
          sales: bookingMetrics.sales.combined,
          checkIns: stayMetrics.checkIns,
          occupancy: stayMetrics.occupancy,
        }}
      />
      <TodayActivity />
      <DurationChart
        numDays={numDays}
        confirmedStays={confirmedStays}
        trend={stayMetrics.checkIns.trend}
      />
      <SalesChart
        bookings={bookings}
        metric={bookingMetrics.sales.combined}
        numDays={numDays}
      />
    </div>
  );
}
