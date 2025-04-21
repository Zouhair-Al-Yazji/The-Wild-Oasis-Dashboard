import { DataTable } from "@/features/cabins/cabins-data-table";
import { columns } from "@/features/cabins/cabin-columns";
import { useCabins } from "@/features/cabins/useCabins";
import { Button } from "@/components/ui/button";

export default function CabinsPage() {
  const { data, isLoading, isError } = useCabins();

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700">All cabins</h2>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
      <Button>Add new Cabin</Button>
    </>
  );
}
