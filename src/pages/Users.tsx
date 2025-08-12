import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserFormDialog from "@/features/authentication/users/UserFormDialog";
import UsersDataTable from "@/features/authentication/users/UsersDataTable";
import { useUsers } from "@/features/authentication/users/useUsers";
import { UserColumns } from "@/features/authentication/users/UserColumns";

export default function Users() {
  const { data, isPending, isError } = useUsers();
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold sm:text-2xl">
          All users
        </h2>

        <Button size={"sm"} onClick={() => setIsCreateUserDialogOpen(true)}>
          Add new user
        </Button>
      </div>

      <UsersDataTable
        columns={UserColumns}
        data={data}
        isLoading={isPending}
        isError={isError}
      />

      <UserFormDialog
        open={isCreateUserDialogOpen}
        onOpenChange={setIsCreateUserDialogOpen}
      />
    </>
  );
}
