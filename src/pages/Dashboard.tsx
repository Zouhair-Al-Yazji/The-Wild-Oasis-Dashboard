import DashboardFilter from "@/features/dashboard/DashboardFilter";
import DashboardLayout from "@/features/dashboard/DashboardLayout";

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-foreground text-2xl font-semibold">Dashboard</h2>
        <DashboardFilter />
      </div>

      <DashboardLayout />
    </>
  );
}
