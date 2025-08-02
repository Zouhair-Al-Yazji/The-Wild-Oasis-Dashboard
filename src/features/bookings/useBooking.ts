import { getBooking } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { Cabin } from "../cabins/useCabins";

export type Guest = {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  country: string;
  countryFlag: string;
  nationalID: string;
  nationality: string;
};

export type Booking = {
  id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabins: Cabin;
  guests: Guest;
};

export function useBooking() {
  const { bookingId } = useParams();

  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId ?? ""),
    retry: false,
  });
}
