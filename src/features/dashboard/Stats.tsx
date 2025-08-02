import { formatCurrency } from "@/utils/helpers";
import type { Booking, Guest } from "../bookings/useBooking";
import State from "./State";

export type ConfirmedStays = Omit<Booking, "guests"> & {
  guests: Pick<Guest, "fullName">;
};

type StatsProps = {
  bookings: { created_at: string; totalPrice: number; extrasPrice: number }[];
  confirmedStays: ConfirmedStays[];
  cabinsCount: number;
  numDays: number;
};

export default function Stats({
  bookings,
  cabinsCount,
  numDays,
  confirmedStays,
}: StatsProps) {
  const numBookings = bookings.length + "";
  const sales = bookings.reduce((acc, booking) => booking.totalPrice + acc, 0);
  const checkIns = confirmedStays.length + "";
  const occupancyRate =
    (confirmedStays.reduce((acc, booking) => booking.numNights + acc, 0) /
      (numDays * cabinsCount)) *
    100;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card col-span-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-2 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <State title="Bookings" value={numBookings} />
      <State title="Sales" value={formatCurrency(sales)} />
      <State title="Checked ins" value={checkIns} />
      <State title="Occupancy rate" value={Math.round(occupancyRate) + "%"} />
    </div>
  );
}
