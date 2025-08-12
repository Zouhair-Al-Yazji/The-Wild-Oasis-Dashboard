import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import type { Booking } from "./useBooking";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import Flag from "@/ui/Flag";
import DataItem from "@/ui/DataItem";

type BookingDataBoxProps = {
  booking: Booking;
};

export default function BookingDataBox({ booking }: BookingDataBoxProps) {
  const {
    created_at,
    numNights,
    startDate,
    endDate,
    numGuests,
    observations,
    hasBreakfast,
    isPaid,
    cabinPrice,
    extrasPrice,
    totalPrice,
    guests: { fullName: guestName, email, countryFlag, country, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section className="border-border bg-sidebar overflow-hidden rounded-lg border shadow-sm">
      <header className="bg-primary text-primary-foreground flex flex-col gap-3 px-5 py-4 sm:px-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 font-semibold">
          <HiOutlineHomeModern className="h-6 w-6 sm:h-8 sm:w-8" />
          <p>
            {numNights} night{numNights > 1 ? "s" : ""} in cabin{" "}
            <span className="text-lg">{cabinName}</span>
          </p>
        </div>
        <p className="text-sm sm:text-base">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) — {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      {/* Guest Info */}
      <section className="px-5 pt-6 pb-3 sm:px-10">
        <div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-3">
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p className="text-foreground font-medium">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={
              <HiOutlineChatBubbleBottomCenterText className="text-primary h-full w-full" />
            }
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem
          icon={<HiOutlineCheckCircle className="text-primary h-full w-full" />}
          label="Breakfast included?"
        >
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        {/* Payment Info */}
        <div
          className={`mt-6 flex flex-col rounded-md px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${
            isPaid ? "bg-chart-5 text-green-800" : "bg-chart-6 text-yellow-800"
          }`}
        >
          <DataItem
            icon={<HiOutlineCurrencyDollar className="h-full w-full" />}
            label="Total Price"
          >
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} + ${formatCurrency(extrasPrice)})`}
          </DataItem>
          <p className="mt-2 text-sm font-semibold uppercase sm:mt-0">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-3 text-right text-xs text-[var(--color-muted-foreground)] sm:px-10">
        Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
      </footer>
    </section>
  );
}
