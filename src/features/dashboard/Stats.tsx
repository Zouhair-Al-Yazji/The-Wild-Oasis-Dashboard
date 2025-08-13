import { formatCurrency } from "@/utils/helpers";
import type { Booking, Guest } from "../bookings/useBooking";
import State from "./State";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { Glow, GlowArea } from "@/ui/Glow";

export type ConfirmedStays = Omit<Booking, "guests"> & {
  guests: Pick<Guest, "fullName">;
};

type StatsProps = {
  cabinsCount: number;
  numDays: number;
  metrics: {
    bookings: {
      current: number;
      previous: number;
      trend: "up" | "down" | "neutral";
      change: string;
    };
    sales: {
      current: number;
      previous: number;
      trend: "up" | "down" | "neutral";
      change: string;
    };
    checkIns: {
      current: number;
      previous: number;
      trend: "up" | "down" | "neutral";
      change: string;
    };
    occupancy: {
      current: number;
      previous: number;
      trend: "up" | "down" | "neutral";
      change: string;
    };
  };
};

export default function Stats({ cabinsCount, numDays, metrics }: StatsProps) {
  const occupancyRate =
    numDays > 0 && cabinsCount > 0
      ? (metrics.occupancy.current / (numDays * cabinsCount)) * 100
      : 0;

  return (
    <div className="col-span-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      <GlowArea>
        <Glow color="blue" className="rounded-xl">
          <State
            title="Bookings"
            value={metrics.bookings.current.toString()}
            icon={<HiOutlineBriefcase />}
            color="blue"
            trend={metrics.bookings.trend}
            trendValue={`${metrics.bookings.change}%`}
            trendPeriod={`last ${numDays} days`}
            footerText={`vs previous ${numDays} days`}
          />
        </Glow>
      </GlowArea>

      <GlowArea>
        <Glow color="green" className="rounded-xl">
          <State
            title="Sales"
            value={formatCurrency(metrics.sales.current)}
            icon={<HiOutlineBanknotes />}
            color="green"
            trend={metrics.sales.trend}
            trendValue={`${metrics.sales.change}%`}
            trendPeriod={`last ${numDays} days`}
            footerText={`vs previous ${numDays} days`}
          />
        </Glow>
      </GlowArea>

      <GlowArea>
        <Glow color="indigo" className="rounded-xl">
          <State
            title="Checked ins"
            value={metrics.checkIns.current.toString()}
            icon={<HiOutlineCalendarDays />}
            color="indigo"
            trend={metrics.checkIns.trend}
            trendValue={`${metrics.checkIns.change}%`}
            trendPeriod={`last ${numDays} days`}
            footerText={`vs previous ${numDays} days`}
          />
        </Glow>
      </GlowArea>

      <GlowArea>
        <Glow color="yellow" className="rounded-xl">
          <State
            title="Occupancy rate"
            value={Math.round(occupancyRate) + "%"}
            icon={<HiOutlineChartBar />}
            color="yellow"
            trend={metrics.occupancy.trend}
            trendValue={`${metrics.occupancy.change}%`}
            trendPeriod={`last ${numDays} days`}
            footerText={`${metrics.occupancy.current} night${
              metrics.occupancy.current !== 1 ? "s" : ""
            } across ${cabinsCount} cabin${cabinsCount !== 1 ? "s" : ""}`}
          />
        </Glow>
      </GlowArea>
    </div>
  );
}
