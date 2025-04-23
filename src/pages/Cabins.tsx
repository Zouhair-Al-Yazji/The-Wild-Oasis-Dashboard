import { DataTable } from "@/features/cabins/cabins-data-table";
import { columns } from "@/features/cabins/cabin-columns";
import { useCabins } from "@/features/cabins/useCabins";
import { Button } from "@/components/ui/button";
import CabinFormDialog from "@/features/cabins/CabinFormDialog";
import { useState } from "react";

export default function CabinsPage() {
  const { data, isLoading, isError } = useCabins();
  const [isCreateCabinDialogOpen, setIsCreateCabinDialogOpen] = useState(false);

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700">All cabins</h2>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
      <Button onClick={() => setIsCreateCabinDialogOpen(true)}>
        Add new Cabin
      </Button>

      <CabinFormDialog
        open={isCreateCabinDialogOpen}
        onOpenChange={setIsCreateCabinDialogOpen}
      />
    </>
  );
}
