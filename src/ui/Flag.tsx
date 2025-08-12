import { cn } from "@/lib/utils";

export default function Flag({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("border-border block h-5 w-5 rounded-xs border", className)}
    />
  );
}
