import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterProps = {
  filterField: string;
  options: { value: string; label: string }[];
};

export default function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0)?.value;

  function handleClick(value: string) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterField, value);

    if (newParams.get("page")) {
      newParams.set("page", "1");
    }

    setSearchParams(newParams);
  }

  return (
    <div className="lg:border-border bg-background flex gap-1 rounded-md border shadow-sm lg:p-1">
      <div className="hidden gap-1 lg:flex">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={option.value === currentFilter ? "default" : "ghost"}
            size="sm"
            className={`rounded-sm px-3 py-1 text-sm font-medium transition-all ${
              option.value === currentFilter
                ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-not-allowed"
                : "hover:bg-primary/10"
            }`}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="w-full lg:hidden">
        <Select value={currentFilter} onValueChange={handleClick}>
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                options.find((o) => o.value === currentFilter)?.label
              }
            />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-sm"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
