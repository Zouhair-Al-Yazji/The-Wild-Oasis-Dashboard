import { ReactNode } from "react";

type DataItemPropsType = {
  label: string;
  icon: ReactNode;
  children: ReactNode;
};

export default function DataItem({ icon, label, children }: DataItemPropsType) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex items-center gap-2 font-medium">
        <span className="h-5 w-5">{icon}</span>
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
