import { getStaysTodayActivity } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivity() {
  const { data: activities, isPending } = useQuery({
    queryKey: ["today-activities"],
    queryFn: getStaysTodayActivity,
  });

  return { activities, isPending };
}
