import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ServerFilterInput({
  filterField,
  filterPlaceholder,
}: {
  filterField: string;
  filterPlaceholder: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get(filterField) || "");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);

    const newParams = new URLSearchParams(searchParams);
    if (newValue) {
      newParams.set(filterField, newValue);
      newParams.set("page", "1");
    } else {
      newParams.delete(filterField);
    }
    setSearchParams(newParams);
  }

  return (
    <Input
      placeholder={filterPlaceholder}
      value={value}
      onChange={handleChange}
      className="max-w-sm bg-white"
    />
  );
}
