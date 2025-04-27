import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type FormRowProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
  model?: boolean;
};

export default function FormRow({
  label,
  htmlFor,
  error,
  children,
  className,
  model = false,
}: FormRowProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-6",
        !model && "grid-cols-[15rem_1fr_1.2fr]",
        model && "grid-cols-[13rem_1fr_1fr_1fr]",
        className,
      )}
    >
      <Label htmlFor={htmlFor}>{label}</Label>
      <div className={cn("space-y-2", model && "col-span-2")}>
        {children}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
