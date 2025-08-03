import { calculatePercentageChange, formatCurrency } from "@/utils/helpers";
import type { Booking, Guest } from "../bookings/useBooking";
import State from "./State";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

export type ConfirmedStays = Omit<Booking, "guests"> & {
  guests: Pick<Guest, "fullName">;
};

type StatsProps = {
  bookings: { created_at: string; totalPrice: number; extrasPrice: number }[];
  confirmedStays: ConfirmedStays[];
  cabinsCount: number;
  numDays: number;
  metrics: {
    bookings: {
      current: number;
      previous: number;
      trend: "up" | "down" | "neutral";
    };
    sales: {
      current: number;
      previous: number;
      trend: "up" | "down" | "neutral";
    };
    checkIns: {
      current: number;
      previous: number;
      trend: "up" | "down" | "neutral";
    };
    occupancy: {
      current: number;
      previous: number;
      trend: "up" | "down" | "neutral";
    };
  };
};

export default function Stats({
  bookings,
  cabinsCount,
  numDays,
  confirmedStays,
  metrics,
}: StatsProps) {
  const occupancyRate =
    numDays > 0 && cabinsCount > 0
      ? (metrics.occupancy.current / (numDays * cabinsCount)) * 100
      : 0;
  const bookingChange = calculatePercentageChange(
    metrics.bookings.current,
    metrics.bookings.previous,
  );
  const salesChange = calculatePercentageChange(
    metrics.sales.current,
    metrics.sales.previous,
  );
  const checkInChange = calculatePercentageChange(
    metrics.checkIns.current,
    metrics.checkIns.previous,
  );
  const occupancyChange = calculatePercentageChange(
    metrics.occupancy.current,
    metrics.occupancy.previous,
  );

  return (
    <div className="col-span-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <State
        title="Bookings"
        value={metrics.bookings.current.toString()}
        icon={<HiOutlineBriefcase />}
        color="blue"
        trend={metrics.bookings.trend}
        trendValue={`${bookingChange}%`}
        trendPeriod={`last ${numDays} days`}
        footerText={`vs previous ${numDays} days`}
      />
      <State
        title="Sales"
        value={formatCurrency(metrics.sales.current)}
        icon={<HiOutlineBanknotes />}
        color="green"
        trend={metrics.sales.trend}
        trendValue={`${salesChange}%`}
        trendPeriod={`last ${numDays} days`}
        footerText={`vs previous ${numDays} days`}
      />
      <State
        title="Checked ins"
        value={metrics.checkIns.current.toString()}
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        trend={metrics.checkIns.trend}
        trendValue={`${checkInChange}%`}
        trendPeriod={`last ${numDays} days`}
        footerText={`vs previous ${numDays} days`}
      />
      <State
        title="Occupancy rate"
        value={Math.round(occupancyRate) + "%"}
        icon={<HiOutlineChartBar />}
        color="yellow"
        trend={metrics.occupancy.trend}
        trendValue={`${occupancyChange}%`}
        trendPeriod={`last ${numDays} days`}
        footerText={`${metrics.occupancy.current} night${
          metrics.occupancy.current !== 1 ? "s" : ""
        } across ${cabinsCount} cabin${cabinsCount !== 1 ? "s" : ""}`}
      />
    </div>
  );
}
