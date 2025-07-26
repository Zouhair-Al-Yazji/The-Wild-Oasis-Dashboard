import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";

export default function Settings() {
  return (
    <div className="space-y-4">
      <h2 className="text-foreground text-2xl font-semibold">
        Update hotel settings
      </h2>
      <UpdateSettingsForm />
    </div>
  );
}
