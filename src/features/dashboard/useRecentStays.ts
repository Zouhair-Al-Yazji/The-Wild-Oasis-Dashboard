import { getStaysAfterDate } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams ? 7 : Number(searchParams.get("last"));
  const queryDays = subDays(new Date(), numDays).toISOString();

  const { data: stays = [], isPending } = useQuery({
    queryKey: [`stays, last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDays),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return { stays, isPending, confirmedStays, numDays };
}
