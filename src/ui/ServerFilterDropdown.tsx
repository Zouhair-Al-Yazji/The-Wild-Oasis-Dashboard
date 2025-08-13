import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { HiOutlineFunnel } from "react-icons/hi2";
import { useMemo } from "react";

export default function ServerFilterDropdown({
  filterField,
  options,
}: {
  filterField: string;
  options: { label: string; value: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilterValue =
    searchParams.get(filterField) || options.at(0)?.value || "";

  function handleClick(value: string) {
    const newParams = new URLSearchParams(searchParams);
    if (value === options[0].value) {
      newParams.delete(filterField);
    } else {
      newParams.set(filterField, value);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  }

  const currentLabel = useMemo(
    () => options.find(({ value }) => value === currentFilterValue),
    [options, currentFilterValue],
  )?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="bg-background border-border border py-[17px]"
        asChild
      >
        <Button
          variant="ghost"
          className="h-8"
          aria-label={`Filter by ${filterField}: ${currentLabel || "All"}`}
        >
          <HiOutlineFunnel />
          Filter {currentLabel}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map(({ label, value }) => (
          <DropdownMenuItem onClick={() => handleClick(value)} key={value}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
