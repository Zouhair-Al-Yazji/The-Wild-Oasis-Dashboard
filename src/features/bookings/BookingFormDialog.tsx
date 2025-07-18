import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Booking } from "./useBooking";
import CreateBookingForm from "./CreateBookingForm";

export default function BookingFormDialog({
  open,
  onOpenChange,
  bookingToUpdate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingToUpdate?: Booking;
}) {
  const isUpdateSession = Boolean(bookingToUpdate?.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] !max-w-4xl overflow-hidden">
        <DialogHeader className="px-1">
          <DialogTitle>
            {isUpdateSession ? "Update booking" : "Add Booking"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to
            {isUpdateSession ? "update" : "add a new"} booking.
          </DialogDescription>
        </DialogHeader>

        <CreateBookingForm
          onConfirm={() => onOpenChange(false)}
          bookingToUpdate={bookingToUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
