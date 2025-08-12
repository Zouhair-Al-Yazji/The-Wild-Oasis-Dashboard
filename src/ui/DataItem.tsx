import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type DataItemProps = {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function DataItem({
  icon,
  label,
  children,
  className,
}: DataItemProps) {
  return (
    <div className={cn("flex items-start gap-4 py-2", className)}>
      <div className="flex items-center gap-2 font-medium">
        <span className="h-5 w-5">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
