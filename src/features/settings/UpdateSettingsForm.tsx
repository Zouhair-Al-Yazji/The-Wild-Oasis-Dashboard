import { Input } from "@/components/ui/input";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import FormRow from "@/ui/FormRow";
import Spinner from "@/ui/Spinner";
import { FocusEvent } from "react";
import toast from "react-hot-toast";
import Error from "@/ui/Error";

export default function UpdateSettingsForm() {
  const { mutate: updateSetting, isPending: isUpdating } = useUpdateSetting();
  const { data: settings, isPending, isError, error } = useSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  function handleUpdate(e: FocusEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;

    if (!value || isUpdating) return;

    const numValue = Number(value);
    if (isNaN(numValue)) {
      toast.error("Please enter a valid number");
      return;
    }

    const numericFields = [
      "minBookingLength",
      "maxBookingLength",
      "maxGuestsPerBooking",
      "breakfastPrice",
    ];

    const updatedValue = numericFields.includes(field) ? Number(value) : value;

    // Update with current settings plus the new value
    updateSetting({
      ...settings,
      [field]: updatedValue,
    });
  }

  if (isError) return <Error message={error.message} />;

  if (isPending) return <Spinner />;

  return (
    <form className="bg-sidebar border-border text-foreground divide-y rounded-md border px-10 py-6">
      <div className="pb-4">
        <FormRow label="Minimum nights/booking" htmlFor="min-nights">
          <Input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            min={1}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "minBookingLength")}
            className="bg-card"
          />
        </FormRow>
      </div>

      <div className="py-4">
        <FormRow label="Maximum nights/booking" htmlFor="max-nights">
          <Input
            type="number"
            id="max-nights"
            defaultValue={maxBookingLength}
            className="bg-card"
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          />
        </FormRow>
      </div>

      <div className="py-4">
        <FormRow label="Maximum guests/booking" htmlFor="max-guests">
          <Input
            type="number"
            id="max-guests"
            className="bg-card"
            defaultValue={maxGuestsPerBooking}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          />
        </FormRow>
      </div>

      <div className="pt-4">
        <FormRow label="Breakfast price" htmlFor="breakfast-price">
          <Input
            type="number"
            className="bg-card"
            id="breakfast-price"
            min={1}
            defaultValue={breakfastPrice}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          />
        </FormRow>
      </div>
    </form>
  );
}
