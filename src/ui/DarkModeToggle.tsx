import { Button } from "@/components/ui/button";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

export default function DarkModeToggle() {
  return (
    <Button variant={"ghost"}>
      <HiOutlineMoon />
    </Button>
  );
}
