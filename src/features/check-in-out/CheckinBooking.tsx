import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "../bookings/BookingDataBox";
import { useBooking } from "../bookings/useBooking";
import Spinner from "@/ui/Spinner";
import Error from "@/ui/Error";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/helpers";
import { useSettings } from "../settings/useSettings";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import SpinnerMini from "@/ui/SpinnerMini";

export default function CheckinBooking() {
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);

  const {
    data: booking,
    isPending: isPendingBooking,
    error,
    isError,
  } = useBooking();
  const { data: settings, isPending: isPendingSettings } = useSettings();
  const {
    id: bookingId,
    hasBreakfast,
    numGuests,
    numNights,
    guests,
    totalPrice,
    isPaid,
  } = booking || {};
  const moveBack = useMoveBack();
  const { mutate: checkin, isPending: isCheckingIn } = useCheckin();

  useEffect(
    function () {
      setConfirmPaid(isPaid ?? false);
    },
    [booking],
  );

  const optionalBreakfastPrice = settings?.breakfastPrice
    ? settings?.breakfastPrice * (numGuests ?? 0) * (numNights ?? 0)
    : 0;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId: Number(bookingId),
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: (totalPrice ?? 0) + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId: Number(bookingId), breakfast: {} });
    }
  }

  if (isPendingBooking || isPendingSettings) return <Spinner />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-700">
          Check in booking #{bookingId}
        </h3>
        <Button
          variant={"ghost"}
          className="text-primary hover:text-primary"
          onClick={moveBack}
        >
          <ArrowLeft /> Back
        </Button>
      </div>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <div className="bg-background flex items-center gap-3 rounded-sm border px-10 py-6">
          <Checkbox
            checked={addBreakfast}
            onCheckedChange={() => {
              setAddBreakfast((checked) => !checked);
              setConfirmPaid(false);
            }}
            id="addBreakfast"
          />
          <Label htmlFor="addBreakfast">
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Label>
        </div>
      )}

      <div className="bg-background flex items-center gap-3 rounded-md border px-10 py-6">
        <Checkbox
          checked={confirmPaid}
          onCheckedChange={() => {
            setConfirmPaid((checked) => !checked);
          }}
          disabled={confirmPaid}
          id="confirmPaid"
        />
        <Label htmlFor="confirmPaid">
          I confirm that{" "}
          <span className="font-semibold">{guests?.fullName}</span> has paid the
          total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice ?? 0)
            : `${formatCurrency((totalPrice ?? 0) + optionalBreakfastPrice)} (${formatCurrency(totalPrice ?? 0)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          {isCheckingIn && <SpinnerMini label={``} />}
          Check in booking #{bookingId}
        </Button>
        <Button variant={"outline"} onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );
}
