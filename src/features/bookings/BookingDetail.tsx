import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { STATUS } from "./BookingColumns";
import { useMoveBack } from "@/hooks/useMoveBack";
import Spinner from "@/ui/Spinner";
import Error from "@/ui/Error";
import { ArrowLeft } from "lucide-react";
import type { StatusType } from "./BookingColumns";
import { Button } from "@/components/ui/button";
import BookingDataBox from "./BookingDataBox";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { DeleteConfirmationDialog } from "@/ui/DeleteConfirmationDialog";
import { useDeleteBooking } from "./useDeleteBooking";
import { useState } from "react";
import { useCheckout } from "../check-in-out/useCheckout";

export default function BookingDetail() {
  const [isDeleteBookingDialogOpen, setIsDeleteBookingDialogOpen] =
    useState(false);
  const { data: booking, isPending, isError, error } = useBooking();
  const { mutate: deleteBooking, isPending: isDeletingBooking } =
    useDeleteBooking();
  const { mutate: checkout } = useCheckout();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { id: bookingId, status } = booking ?? {};

  function handleDelete() {
    deleteBooking(bookingId ?? "", {
      onSettled: () => {
        setIsDeleteBookingDialogOpen(false);
        navigate(-1);
      },
    });
  }

  if (isPending) return <Spinner />;
  if (isError) return <Error message={error.message} />;

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-foreground] text-2xl font-semibold">
            Booking #{bookingId}
          </h3>
          <span
            className={`${STATUS[status as StatusType]} rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase`}
          >
            {status?.replace("-", "")}
          </span>
        </div>

        <Button
          variant="outline"
          className="text-foreground flex items-center gap-2"
          onClick={moveBack}
        >
          <ArrowLeft size={18} />
          Back
        </Button>
      </div>

      <BookingDataBox booking={booking} />

      <div className="flex flex-wrap justify-end gap-3">
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            <HiArrowDownOnSquare className="mr-1" />
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={() => checkout(Number(bookingId))}>
            <HiArrowUpOnSquare className="mr-1" />
            Check out
          </Button>
        )}
        <Button
          variant="destructive"
          onClick={() => setIsDeleteBookingDialogOpen(true)}
        >
          Delete Booking
        </Button>
        <Button variant="outline" onClick={moveBack}>
          Back
        </Button>
      </div>

      <DeleteConfirmationDialog
        isLoading={isDeletingBooking}
        onOpenChange={setIsDeleteBookingDialogOpen}
        open={isDeleteBookingDialogOpen}
        onConfirm={handleDelete}
        resourceName="booking"
      />
    </div>
  );
}
