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
  onOpenChange: (open: boolean) => void;
  cabinToUpdate?: Cabin;
}) {
  const isUpdateSession = Boolean(cabinToUpdate?.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] !max-w-3xl overflow-hidden">
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
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
          cabinToUpdate={cabinToUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
