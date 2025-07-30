import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useLogin } from "@/features/authentication/useLogin";
import SpinnerMini from "@/ui/SpinnerMini";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useDarkMode } from "@/context/DarkModeContext";

type LoginFormData = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, reset, handleSubmit, formState } = useForm<LoginFormData>();
  const { errors } = formState;
  const { login, isPending } = useLogin();
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "logo-dark.png" : "logo-light.png";

  function onSubmit({ email, password }: LoginFormData) {
    login({ email, password }, { onSettled: () => reset() });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-foreground text-2xl font-bold">
                  Welcome back
                </h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Wild Oasis account
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
                  disabled={isPending}
                  placeholder="m@example.com"
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
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground ml-auto text-xs underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pr-8"
                    id="password"
                    autoComplete="current-password"
                    disabled={isPending}
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 8,
                        message: "Password needs a minimum of 8 characters",
                      },
                    })}
                  />
                  <Button
                    variant={"ghost"}
                    type="button"
                    className="text-muted-foreground hover:text-primary absolute top-1/2 right-2 -translate-y-1/2 transform hover:bg-transparent dark:hover:bg-transparent"
                    onClick={() => setShowPassword((show) => !show)}
                    title={showPassword ? "hide password" : "show password"}
                  >
                    {showPassword ? <HiEye /> : <HiEyeSlash />}
                  </Button>
                </div>
                {typeof errors?.password?.message === "string" ? (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                ) : null}
              </div>
              <Button type="submit" className="w-full">
                {isPending ? <SpinnerMini label="Logging" /> : "Login"}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
            </div>
          </form>
          <div className="bg-sidebar relative hidden md:flex md:items-center md:justify-center">
            <img src={src} alt="Image" className="w-60" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
