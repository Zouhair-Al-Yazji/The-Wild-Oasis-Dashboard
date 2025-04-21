import { getCabins } from "@/services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export type Cabin = {
  id: number;
  created_at: string;
  name: string | null;
  maxCapacity: number | null;
  regularPrice: number | null;
  discount: number | null;
  description: string | null;
  image: string | null;
};

export function useCabins() {
  return useQuery<Cabin[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
}
