import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";

const chartConfig = {
  totalSales: {
    label: "Total sales",
    color: "var(--chart-1)",
  },
  extrasSales: {
    label: "Extras sales",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

type SalesChartProps = {
  bookings: { created_at: string; totalPrice: number; extrasPrice: number }[];
  numDays: number;
  metric: { current: number; previous: number; trend: string; change: string };
};

export default function SalesChart({
  bookings,
  numDays,
  metric,
}: SalesChartProps) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const chartData = allDates.map((date) => ({
    label: format(date, "MMM dd"),
    totalSales: bookings
      .filter((booking) => isSameDay(date, new Date(booking.created_at)))
      .reduce((acc, cur) => acc + cur.totalPrice, 0),
    extrasSales: bookings
      .filter((booking) => isSameDay(date, new Date(booking.created_at)))
      .reduce((acc, cur) => acc + cur.extrasPrice, 0),
  }));

  const totalRevenue = chartData.reduce((sum, day) => sum + day.totalSales, 0);
  const extrasRevenue = chartData.reduce(
    (sum, day) => sum + day.extrasSales,
    0,
  );

  return (
    <div className="col-span-4">
      <Card className="@container/card overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg">
        <CardHeader className="from-card to-accent/10 bg-gradient-to-r pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <span>Sales Performance</span>
                <TrendingUp className="text-primary h-5 w-5" />
              </CardTitle>
              <CardDescription className="mt-1 text-sm sm:text-base">
                {numDays} days revenue overview
              </CardDescription>
            </div>

            <div className="text-right">
              <div className="text-primary text-lg font-bold sm:text-xl">
                {formatCurrency(metric.current)}
              </div>
              <div
                className={`flex items-center justify-end gap-1 text-xs sm:text-sm ${
                  metric.trend === "up"
                    ? "text-chart-5"
                    : metric.trend === "down"
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : metric.trend === "down" ? (
                  <TrendingDown className="h-3 w-3" />
                ) : (
                  <Minus className="h-3 w-3" />
                )}
                {metric.change}% from last period
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-3 pt-4 sm:px-5 sm:pt-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <div className="flex items-center transition-opacity hover:opacity-80">
              <div className="mr-2 h-3 w-3 rounded-full bg-[var(--chart-1)]"></div>
              <span className="text-sm font-medium">Total Sales:</span>
              <span className="ml-2 font-semibold">
                {formatCurrency(totalRevenue)}
              </span>
            </div>
            <div className="flex items-center transition-opacity hover:opacity-80">
              <div className="mr-2 h-3 w-3 rounded-full bg-[var(--chart-5)]"></div>
              <span className="text-sm font-medium">Extras:</span>
              <span className="ml-2 font-semibold">
                {formatCurrency(extrasRevenue)}
              </span>
            </div>
          </div>

          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[220px] w-full sm:h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillExtras" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--chart-5)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--chart-5)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={24}
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  tickFormatter={(value) => `$${value / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontSize: 12,
                  }}
                  width={40}
                />

                <ChartTooltip
                  cursor={{
                    stroke: "var(--border)",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => String(value)}
                      formatter={(value, name) => [
                        formatCurrency(Number(value)),
                        name === "totalSales" ? "Total Sales" : "Extras Sales",
                      ]}
                      indicator="dot"
                      labelClassName="text-xs text-muted-foreground"
                    />
                  }
                />

                <Area
                  dataKey="totalSales"
                  type="monotone"
                  fill="url(#fillTotal)"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                    stroke: "var(--background)",
                    strokeWidth: 2,
                    fill: "var(--chart-1)",
                  }}
                />

                <Area
                  dataKey="extrasSales"
                  type="monotone"
                  fill="url(#fillExtras)"
                  stroke="var(--chart-5)"
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                    stroke: "var(--background)",
                    strokeWidth: 2,
                    fill: "var(--chart-5)",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="text-muted-foreground mt-4 text-center text-xs sm:text-sm">
            Daily revenue performance over time
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
