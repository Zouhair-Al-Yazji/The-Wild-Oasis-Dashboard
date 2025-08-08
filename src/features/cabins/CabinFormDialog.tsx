import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Cabin } from "./useCabins";
import CreateCabinForm from "./CreateCabinForm";

export default function CabinFormDialog({
  open,
  onOpenChange,
  cabinToUpdate,
}: {
  open: boolean;
  cabinToUpdate?: Cabin;
  onOpenChange: (open: boolean) => void;
}) {
  const isUpdateSession = Boolean(cabinToUpdate?.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg p-4 sm:max-w-[calc(100vw-3rem)] md:sm:max-w-[calc(100vw-4rem)] lg:max-w-4xl">
        <DialogHeader className="px-1">
          <DialogTitle>
            {isUpdateSession ? "Update Cabin" : "Add Cabin"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to{" "}
            {isUpdateSession ? "update" : "add a new"} cabin{" "}
            {isUpdateSession ? "" : "to your inventory"}.
            <br />
            {isUpdateSession
              ? "All fields except image are required."
              : "All fields are required."}
          </DialogDescription>
        </DialogHeader>

        <CreateCabinForm
          onConfirm={() => onOpenChange(false)}
          cabinToUpdate={cabinToUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
