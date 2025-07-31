import ForgotPasswordForm from "@/features/authentication/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
