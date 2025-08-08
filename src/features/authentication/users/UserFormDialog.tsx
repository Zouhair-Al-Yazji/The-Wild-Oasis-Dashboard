import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateUserForm from "./CreateUserForm";

export default function UserFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg p-4 sm:max-w-[calc(100vw-3rem)] md:sm:max-w-[calc(100vw-4rem)] lg:max-w-4xl">
        <DialogHeader className="px-1">
          <DialogTitle>Create a new user</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new user.
            <br />
            All fields are required.
          </DialogDescription>
        </DialogHeader>

        <CreateUserForm onConfirm={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
