import supabase from "./supabase";

type FilterMethod =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "like"
  | "ilike"
  | "in"
  | "contains";

type GetBookingsPropsType = {
  filter: {
    field: string;
    method: FilterMethod;
    value: string | string[];
  } | null;
  sortBy: {
    field: string;
    direction: string;
  };
};

export async function getBookings({ filter, sortBy }: GetBookingsPropsType) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, status, cabins(name), guests(fullName, email)",
      { count: "exact" },
    );

  if (filter) {
    query = (query as any)[filter.method](filter.field, filter.value);
  }

  if (sortBy) {
    query = (query as any).order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}
