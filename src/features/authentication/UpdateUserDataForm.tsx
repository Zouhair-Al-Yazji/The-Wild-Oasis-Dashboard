import { useUser } from "./users/useUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormRow from "../../ui/FormRow";
import AvatarImageUploader from "@/ui/AvatarImageUploader";
import { useUpdateUser } from "./users/useUpdateUser";
import { useForm } from "react-hook-form";
import SpinnerMini from "@/ui/SpinnerMini";
import { useState } from "react";

type UpdateUserFormType = {
  fullName?: string;
  avatar?: string;
};

export default function UpdateUserDataForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user } = useUser();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { handleSubmit, formState, register } = useForm<UpdateUserFormType>({
    defaultValues: {
      fullName: user?.user_metadata.fullName,
      avatar: user?.user_metadata.avatar,
    },
  });
  const { errors } = formState;

  function onSubmit({ fullName }: UpdateUserFormType) {
    updateUser({
      fullName,
      avatar: avatarFile || undefined,
    });
  }

  return (
    <form
      className="bg-sidebar border-border divide-y rounded-md border px-6 py-4 shadow-sm sm:px-10 sm:py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Email address" htmlFor="email" className="py-3">
        <Input value={user?.email} disabled />
      </FormRow>

      <FormRow
        label="Full name"
        htmlFor="fullName"
        className="py-3"
        error={
          typeof errors?.fullName?.message === "string"
            ? errors.fullName.message
            : undefined
        }
      >
        <Input
          type="text"
          disabled={isUpdating}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Avatar image" htmlFor="avatar" className="py-3">
        <AvatarImageUploader
          onFileChange={setAvatarFile}
          initialAvatar={user?.user_metadata.avatar}
        />
      </FormRow>

      <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
        <Button
          variant="secondary"
          type="reset"
          className="w-full sm:w-auto"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button type="submit">
          {isUpdating ? <SpinnerMini label="Updating" /> : "Update account"}
        </Button>
      </div>
    </form>
  );
}
