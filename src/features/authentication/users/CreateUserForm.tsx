import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import FormRow from "@/ui/FormRow";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { User } from "./useUser";
import { useSignup } from "../useSignup";
import SpinnerMini from "@/ui/SpinnerMini";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function CreateUserForm({
  onConfirm,
}: {
  onConfirm: () => void;
}) {
  const { handleSubmit, register, reset, formState, getValues, control } =
    useForm<User>({
      defaultValues: {
        fullName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        gender: "boy",
      },
    });
  const { errors } = formState;
  const { mutate: signup, isPending: isSigningUp } = useSignup();

  function onSubmit({ fullName, email, password, gender }: User) {
    signup(
      { fullName, email, password, gender },
      {
        onSuccess: () => {
          reset();
          onConfirm();
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-h-[calc(90vh-180px)] overflow-y-auto px-1"
    >
      <div className="space-y-6 py-4">
        <FormRow
          label="Full name"
          htmlFor="fullName"
          model={true}
          error={
            typeof errors?.fullName?.message === "string"
              ? errors.fullName.message
              : undefined
          }
        >
          <Input
            type="text"
            id="fullName"
            placeholder="John doe"
            className="text-accent-foreground"
            disabled={isSigningUp}
            {...register("fullName", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Full name needs a minimum of 3 characters",
              },
            })}
          />
        </FormRow>
      </div>

      <div className="space-y-6 py-4">
        <FormRow
          label="Email address"
          htmlFor="email"
          model={true}
          error={
            typeof errors?.email?.message === "string"
              ? errors.email.message
              : undefined
          }
        >
          <Input
            type="email"
            id="email"
            disabled={isSigningUp}
            placeholder="you@example.com"
            className="text-accent-foreground"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </FormRow>
      </div>

      <div className="space-y-6 py-4">
        <FormRow
          label="Password (8 min chars)"
          htmlFor="password"
          model={true}
          error={
            typeof errors?.password?.message === "string"
              ? errors.password.message
              : undefined
          }
        >
          <Input
            type="password"
            id="password"
            placeholder="password"
            className="text-accent-foreground"
            disabled={isSigningUp}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </FormRow>
      </div>

      <div className="space-y-6 py-4">
        <FormRow
          label="Repeat password"
          htmlFor="passwordConfirm"
          model={true}
          error={
            typeof errors?.passwordConfirm?.message === "string"
              ? errors.passwordConfirm.message
              : undefined
          }
        >
          <Input
            type="password"
            id="passwordConfirm"
            placeholder="repeat password"
            className="text-accent-foreground"
            disabled={isSigningUp}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues()?.password || "Passwords need to match",
            })}
          />
        </FormRow>
      </div>

      <div className="space-y-6 py-4">
        <FormRow
          label="Gender"
          htmlFor="gender"
          model={true}
          error={
            typeof errors?.gender?.message === "string"
              ? errors.gender.message
              : undefined
          }
        >
          <Controller
            name="gender"
            control={control}
            rules={{ required: "This Field is required" }}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex items-center space-x-3"
                disabled={isSigningUp}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="boy" id="boy" />
                  <Label htmlFor="boy">Male</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="girl" id="girl" />
                  <Label htmlFor="girl">Female</Label>
                </div>
              </RadioGroup>
            )}
          />
        </FormRow>
      </div>

      <DialogFooter className="bg-background sticky bottom-0 mt-4 border-t pt-6">
        <Button variant="outline" type="reset" onClick={onConfirm}>
          Cancel
        </Button>
        <Button type="submit">
          {isSigningUp ? <SpinnerMini label="Creating user" /> : "Create User"}
        </Button>
      </DialogFooter>
    </form>
  );
}
