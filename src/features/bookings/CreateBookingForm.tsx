import { useForm } from "react-hook-form";
import type { Booking } from "./useBooking";

export default function CreateBookingForm({
  onConfirm,
  bookingToUpdate,
}: {
  onConfirm: () => void;
  bookingToUpdate?: Booking;
}) {
  const { id: bookingId, ...updateValues } = bookingToUpdate || {};

  const isUpdateSession = Boolean(bookingId);
  const form = useForm<Booking>({
    defaultValues: isUpdateSession ? bookingToUpdate : {},
  });
  const { formState, handleSubmit, register, reset, getValues } = form;
  const { errors } = formState;

  function onSubmit(data: Booking) {}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-h-[calc(90vh-180px)] divide-y divide-gray-200 overflow-y-auto px-1"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </form>
  );
}
