import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmedStays } from "./Stats";
import { format, subDays } from "date-fns";

type DurationCategory =
  | "1 night"
  | "2 nights"
  | "3 nights"
  | "4-5 nights"
  | "6-7 nights"
  | "8-14 nights"
  | "15-21 nights"
  | "21+ nights";

type DurationChartProps = {
  confirmedStays: ConfirmedStays[];
  trend: "up" | "down" | "neutral";
  numDays: number;
};

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--color-destructive)",
];

const durationCategories: DurationCategory[] = [
  "1 night",
  "2 nights",
  "3 nights",
  "4-5 nights",
  "6-7 nights",
  "8-14 nights",
  "15-21 nights",
  "21+ nights",
];

function prepareData(stays: ConfirmedStays[]) {
  const data = durationCategories.map((category, index) => ({
    duration: category,
    value: 0,
    fill: chartColors[index],
  }));

  stays.forEach((stay) => {
    const num = stay.numNights;
    let category: DurationCategory = "1 night";

    if (num === 1) category = "1 night";
    else if (num === 2) category = "2 nights";
    else if (num === 3) category = "3 nights";
    else if ([4, 5].includes(num)) category = "4-5 nights";
    else if ([6, 7].includes(num)) category = "6-7 nights";
    else if (num >= 8 && num <= 14) category = "8-14 nights";
    else if (num >= 15 && num <= 21) category = "15-21 nights";
    else if (num >= 21) category = "21+ nights";

    const index = durationCategories.indexOf(category);
    if (index !== -1) data[index].value += 1;
  });

  return data.filter((item) => item.value > 0);
}

export default function DurationChart({
  confirmedStays,
  trend,
  numDays,
}: DurationChartProps) {
  const chartData = prepareData(confirmedStays);
  const fromDate = format(subDays(new Date(), numDays), "MMM dd yyyy");
  const toDate = format(new Date(), "MMM dd yyyy");
  const totalStays = confirmedStays.length;

  if (chartData.length === 0) {
    return (
      <div className="col-span-4 md:col-span-2">
        <Card className="flex h-full flex-col p-6 text-center">
          <CardHeader>
            <CardTitle>Stay Duration Summary</CardTitle>
            <CardDescription>{`${fromDate} - ${toDate}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center">
            <div className="text-muted-foreground">
              <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <TrendingUp className="h-8 w-8" />
              </div>
              <p>No stay data available yet</p>
              <p className="mt-1 text-sm">Confirmed stays will appear here</p>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-center gap-2 text-sm">
            {trend === "up" && <TrendingUp className="text-chart-5 h-4 w-4" />}
            {trend === "down" && (
              <TrendingDown className="text-destructive h-4 w-4" />
            )}
            {trend === "neutral" && (
              <Minus className="text-muted-foreground h-4 w-4" />
            )}
            <span>
              {trend === "up"
                ? "Increasing"
                : trend === "down"
                  ? "Decreasing"
                  : "Stable"}{" "}
              trend
            </span>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="col-span-4 md:col-span-2">
      <Card className="flex h-full flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Stay Duration Summary</CardTitle>
          <CardDescription>{`${fromDate} - ${toDate}`}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || payload.length === 0)
                      return null;
                    const value = Number(payload[0].value);
                    const percent = (value / totalStays) * 100;
                    const color = payload[0].payload.fill;

                    return (
                      <div className="bg-background rounded-lg border p-3 text-sm">
                        <p className="flex items-center font-medium">
                          <span
                            className="mr-2 inline-block h-3 w-3 rounded-full"
                            style={{ backgroundColor: color }}
                          ></span>
                          {payload[0].name}
                        </p>
                        <p className="mt-1">
                          {value} stays • {percent.toFixed(1)}%
                        </p>
                      </div>
                    );
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="duration"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      stroke="var(--color-background)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                ></div>
                <span>{item.duration}</span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            {trend === "up" && (
              <TrendingUp className="h-4 w-4 text-green-500" />
            )}
            {trend === "down" && (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            {trend === "neutral" && <Minus className="h-4 w-4 text-gray-500" />}
            <span>
              {trend === "up"
                ? "Increasing"
                : trend === "down"
                  ? "Decreasing"
                  : "Stable"}{" "}
              trend
            </span>
          </div>
          <div className="text-muted-foreground">
            {totalStays} stays across {chartData.length} duration categories
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
