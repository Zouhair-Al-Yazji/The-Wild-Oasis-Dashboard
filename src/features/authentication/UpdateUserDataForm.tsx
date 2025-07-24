import { useUser } from "./users/useUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormRow from "../../ui/FormRow";
import AvatarImageUploader from "@/components/AvatarImageUploader";
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
      className="bg-background divide-y divide-gray-200 rounded-md border border-gray-200 px-10 py-6"
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

      <div className="flex justify-end gap-3 pt-3">
        <Button variant="secondary" type="reset" disabled={isUpdating}>
          Cancel
        </Button>
        <Button type="submit">
          {isUpdating ? <SpinnerMini label="Updating" /> : "Update account"}
        </Button>
      </div>
    </form>
  );
}
