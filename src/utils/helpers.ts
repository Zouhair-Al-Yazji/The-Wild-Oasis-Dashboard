import { formatDistance, parseISO } from "date-fns";

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), { addSuffix: true })
    .replace("about", "")
    .replace("in", "In");

export const getToday = function (options?: { end?: boolean }) {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};

export function calculateTrend(
  current: number,
  prev: number,
): "up" | "down" | "neutral" {
  if (prev === 0) return "neutral";
  const percentageChange = ((current - prev) / prev) * 100;
  return Math.abs(percentageChange) < 5
    ? "neutral"
    : percentageChange > 0
      ? "up"
      : "down";
}

export function calculatePercentageChange(
  current: number,
  previous: number,
): string {
  if (previous === 0) return current === 0 ? "0" : "100";
  return (((current - previous) / previous) * 100).toFixed(1);
}
