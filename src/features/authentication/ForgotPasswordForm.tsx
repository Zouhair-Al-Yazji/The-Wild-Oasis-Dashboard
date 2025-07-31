import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import SpinnerMini from "@/ui/SpinnerMini";
import { useDarkMode } from "@/context/DarkModeContext";
import { Link } from "react-router-dom";
import { useForgotPassword } from "./useForgotPassword";

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit, formState } =
    useForm<ForgotPasswordFormData>();
  const { errors } = formState;
  const { isDarkMode } = useDarkMode();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const src = isDarkMode ? "logo-dark.png" : "logo-light.png";

  function onSubmit({ email }: ForgotPasswordFormData) {
    if (isPending) return;

    forgotPassword(email);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <h1 className="text-foreground text-2xl font-bold">
                  Forgot your password?
                </h1>
                <p className="text-muted-foreground">
                  Type in your email and we'll send you a login link to reset
                  your password
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  className="remove-autofill"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  disabled={isPending}
                  autoComplete="email"
                  {...register("email", {
                    required: "This Field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide a valid email address",
                    },
                  })}
                />
                {typeof errors?.email?.message === "string" ? (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>
              <Button type="submit" className="w-full">
                {isPending ? (
                  <SpinnerMini label="Sending" />
                ) : (
                  "Send reset link"
                )}
              </Button>
            </div>
            <p className="text-muted-foreground mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-foreground hover:text-muted-foreground underline"
              >
                Sign In
              </Link>
            </p>
          </form>
          <div className="bg-sidebar relative hidden md:flex md:items-center md:justify-center">
            <img src={src} alt="Image" className="w-60" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
