import { getCabins } from "@/services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export type Cabin = {
  id?: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
};

export function useCabins() {
  return useQuery<Cabin[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
}
