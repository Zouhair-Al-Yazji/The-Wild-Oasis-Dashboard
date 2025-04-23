import { BiLoaderAlt } from "react-icons/bi";

export default function SpinnerMini({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <BiLoaderAlt className="size-5 animate-spin" />
      {label}
    </div>
  );
}
