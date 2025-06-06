import { useState } from "react";
import { CabinsDataTable } from "@/features/cabins/CabinsDataTable";
import { columns } from "@/features/cabins/CabinColumns";
import { useCabins } from "@/features/cabins/useCabins";
import { Button } from "@/components/ui/button";
import CabinFormDialog from "@/features/cabins/CabinFormDialog";

export default function CabinsPage() {
  const { data: cabins, isLoading, isError } = useCabins();
  const [isCreateCabinDialogOpen, setIsCreateCabinDialogOpen] = useState(false);

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700">All cabins</h2>
      <CabinsDataTable
        columns={columns}
        data={cabins}
        isLoading={isLoading}
        isError={isError}
      />

      <div>
        <Button onClick={() => setIsCreateCabinDialogOpen(true)}>
          Add new Cabin
        </Button>
      </div>

      <CabinFormDialog
        open={isCreateCabinDialogOpen}
        onOpenChange={setIsCreateCabinDialogOpen}
      />
    </>
  );
}
