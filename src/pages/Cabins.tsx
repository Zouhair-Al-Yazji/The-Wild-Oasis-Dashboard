import { useState } from "react";
import { CabinsDataTable } from "@/features/cabins/CabinsDataTable";
import { columns } from "@/features/cabins/CabinColumns";
import { useCabins } from "@/features/cabins/useCabins";
import { Button } from "@/components/ui/button";
import CabinFormDialog from "@/features/cabins/CabinFormDialog";

export default function CabinsPage() {
  const { data: cabins, isPending, isError } = useCabins();
  const [isCreateCabinDialogOpen, setIsCreateCabinDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-foreground text-xl font-semibold sm:text-2xl">
          All cabins
        </h2>

        <Button
          onClick={() => setIsCreateCabinDialogOpen(true)}
          className=""
          size={"sm"}
        >
          Add new Cabin
        </Button>
      </div>

      <CabinsDataTable
        columns={columns}
        data={cabins}
        isLoading={isPending}
        isError={isError}
      />

      <CabinFormDialog
        open={isCreateCabinDialogOpen}
        onOpenChange={setIsCreateCabinDialogOpen}
      />
    </>
  );
}
