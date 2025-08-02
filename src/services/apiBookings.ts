import type { Booking } from "@/features/bookings/useBooking";
import supabase from "./supabase";
import { getToday } from "@/utils/helpers";

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

export async function getBooking(id: string): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking does not found");
  }

  return data;
}

export async function deleteBooking(id: string): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Booking could not be deleted");
  }

  return data;
}

export async function updateBooking(id: number, obj: Partial<Booking>) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) throw new Error(error.message);

  return data;
}

export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) throw new Error(error.message);

  return data;
}

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,startDate.eq.${getToday()})`,
    )
    .order("created_at");

  if (error) throw new Error(error.message);

  return data;
}
