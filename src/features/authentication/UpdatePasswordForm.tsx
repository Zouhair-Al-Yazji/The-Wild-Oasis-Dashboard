import { Input } from "@/components/ui/input";
import FormRow from "../../ui/FormRow";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./users/useUpdateUser";
import SpinnerMini from "@/ui/SpinnerMini";

type Password = {
  password: string;
  passwordConfirm?: string;
};

export default function UpdatePasswordForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { handleSubmit, reset, getValues, formState, register } =
    useForm<Password>();
  const { errors } = formState;

  function onSubmit({ password }: Password) {
    updateUser(
      { password },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <form
      className="bg-sidebar border-border divide-y rounded-md border px-10 py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        label="Password (min 8 chars)"
        htmlFor="password"
        className="py-3"
        error={
          typeof errors?.password?.message === "string"
            ? errors.password.message
            : undefined
        }
      >
        <Input
          type="password"
          disabled={isUpdating}
          placeholder="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        htmlFor="passwordConfirm"
        className="py-3"
        error={
          typeof errors?.passwordConfirm?.message === "string"
            ? errors.passwordConfirm.message
            : undefined
        }
      >
        <Input
          type="password"
          placeholder="confirm password"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues()?.password || "Password need to match",
          })}
        />
      </FormRow>

      <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" type="reset" disabled={isUpdating}>
          Cancel
        </Button>
        <Button type="submit">
          {isUpdating ? <SpinnerMini label="Updating" /> : "Update password"}
        </Button>
      </div>
    </form>
  );
}
