import { useParams } from "react-router-dom";

export default function CheckinBooking() {
  const { bookingId } = useParams();
  console.log(bookingId);

  return <div>CheckinBooking#{bookingId}</div>;
}
