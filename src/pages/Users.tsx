import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserFormDialog from "@/features/authentication/users/UserFormDialog";
import UsersDataTable from "@/features/authentication/users/UsersDataTable";
import { useUsers } from "@/features/authentication/users/useUsers";
import { UserColumns } from "@/features/authentication/users/UserColumns";

export default function Users() {
  const { simplifiedUsers, isPending, isError } = useUsers();
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700">All users</h2>
      <UsersDataTable
        columns={UserColumns}
        data={simplifiedUsers}
        isLoading={isPending}
        isError={isError}
      />
      <div>
        <Button onClick={() => setIsCreateUserDialogOpen(true)}>
          Add new user
        </Button>
      </div>

      <UserFormDialog
        open={isCreateUserDialogOpen}
        onOpenChange={setIsCreateUserDialogOpen}
      />
    </>
  );
}
