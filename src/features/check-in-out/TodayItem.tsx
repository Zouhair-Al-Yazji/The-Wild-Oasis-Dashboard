import { Badge } from "@/components/ui/badge";
import { Booking } from "../bookings/useBooking";
import Flag from "@/ui/Flag";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "./useCheckout";
import SpinnerMini from "@/ui/SpinnerMini";

export default function TodayItem({ activity }: { activity: Booking }) {
  const { id, guests, status, numNights } = activity;
  const navigate = useNavigate();
  const { mutate: checkout, isPending } = useCheckout();

  return (
    <div className="grid grid-cols-[auto_1.5rem_1fr_auto_auto] items-center gap-4 py-3">
      {status === "unconfirmed" && (
        <Badge className="bg-chart-5 hover:bg-chart-5/80">Arriving</Badge>
      )}
      {status === "checked-in" && (
        <Badge className="bg-chart-2 hover:bg-chart-2/80">Departing</Badge>
      )}
      <Flag src={guests.countryFlag} alt={guests.country} />
      <div className="truncate font-medium">{guests.fullName}</div>
      <div className="text-muted-foreground">{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button size={"sm"} onClick={() => navigate(`/checkin/${id}`)}>
          Check in
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          size={"sm"}
          onClick={() => checkout(Number(id))}
          disabled={isPending}
        >
          {isPending ? <SpinnerMini label="Checking out" /> : "Check out"}
        </Button>
      )}
    </div>
  );
}
