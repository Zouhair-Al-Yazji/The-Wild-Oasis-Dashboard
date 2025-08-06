import type { Booking } from "../bookings/useBooking";
import TodayItem from "./TodayItem";

export default function TodayList({ activities }: { activities: Booking[] }) {
  return (
    <ul className="divide-border divide-y">
      {activities.map((activity) => (
        <TodayItem activity={activity} key={activity.id} />
      ))}
    </ul>
  );
}
