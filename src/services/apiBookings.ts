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
  pagination: {
    page: number;
    pageSize: number;
  };
};

export async function getBookings({
  filter,
  sortBy,
  pagination,
}: GetBookingsPropsType) {
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

  if (pagination) {
    const from = (pagination.page - 1) * pagination.pageSize;
    const to = from + pagination.pageSize - 1;

    query = (query as any).range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}
