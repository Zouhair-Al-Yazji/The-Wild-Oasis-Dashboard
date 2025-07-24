import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "@/features/authentication/UpdateUserDataForm";

export default function Account() {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700">
        Update your account
      </h2>

      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-medium text-gray-700">
          Update user data
        </h3>
        <UpdateUserDataForm />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-medium text-gray-700">
          Update password
        </h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
}
