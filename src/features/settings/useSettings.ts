import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export type Settings = {
  id?: number;
  created_at?: string;
  minBookingLength?: number;
  maxBookingLength?: number;
  maxGuestsPerBooking?: number;
  breakfastPrice?: number;
};

export function useSettings() {
  return useQuery<Settings>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
}
