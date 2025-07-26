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
    <section className="bg-sidebar border-border overflow-hidden rounded-md border">
      <header className="bg-primary text-primary-foreground flex items-center justify-between px-10 py-5 font-medium">
        <div className="flex items-center gap-4 font-semibold">
          <HiOutlineHomeModern className="h-8 w-8" />
          <p>
            {numNights} night{numNights > 1 ? "s" : ""} in cabin{" "}
            <span className="text-lg">{cabinName}</span>
          </p>
        </div>
        <div>
          <p>
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>
        </div>
      </header>
      <section className="px-10 pt-8 pb-3">
        <div className="text-muted-foreground mb-4 flex items-center gap-3">
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p className="text-foreground font-medium">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National Id {nationalID}</p>
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

        <div
          className={`mt-6 flex items-center justify-between rounded-sm px-8 py-4 ${isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
        >
          <DataItem
            icon={<HiOutlineCurrencyDollar className="h-full w-full" />}
            label="Total Price"
          >
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} + ${formatCurrency(extrasPrice)})`}
          </DataItem>

          <p className="text-sm font-semibold uppercase">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>

      <footer className="text-muted-foreground px-10 py-4 text-right text-xs">
        Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
      </footer>
    </section>
  );
}
