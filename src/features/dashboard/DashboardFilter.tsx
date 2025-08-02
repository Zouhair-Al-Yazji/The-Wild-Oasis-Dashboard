import TabsFilter from "@/ui/TabsFilter";

export default function DashboardFilter() {
  return (
    <TabsFilter
      options={[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 3 months" },
      ]}
      filterField="last"
    />
  );
}
