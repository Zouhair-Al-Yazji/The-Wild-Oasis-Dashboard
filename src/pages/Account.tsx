import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "@/features/authentication/UpdateUserDataForm";

export default function Account() {
  return (
    <>
      <h2 className="text-foreground text-2xl font-semibold">
        Update your account
      </h2>

      <div className="flex flex-col gap-4">
        <h3 className="text-foreground text-base font-medium">
          Update user data
        </h3>
        <UpdateUserDataForm />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-foreground text-base font-medium">
          Update password
        </h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
}
