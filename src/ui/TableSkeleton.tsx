import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="bg-primary/10 h-10 w-[300px]" />
        <Skeleton className="bg-primary/10 h-10 w-[150px]" />
      </div>
      <Skeleton className="bg-primary/10 h-[400px] w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="bg-primary/10 h-8 w-[200px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="bg-primary/10 h-8 w-24" />
          <Skeleton className="bg-primary/10 h-8 w-24" />
          <Skeleton className="bg-primary/10 h-8 w-8" />
          <Skeleton className="bg-primary/10 h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
