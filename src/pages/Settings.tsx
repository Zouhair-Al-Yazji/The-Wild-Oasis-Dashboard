import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";

export default function Settings() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">
        Update hotel settings
      </h2>
      <UpdateSettingsForm />
    </div>
  );
}
