import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cloneElement } from "react";
import {
  HiArrowTrendingDown,
  HiArrowTrendingUp,
  HiMinus,
} from "react-icons/hi2";

type ColorVariant = "blue" | "yellow" | "green" | "indigo" | "red" | "purple";

type StateProps = {
  title: string;
  value: string;
  icon: React.ReactElement<{ className?: string }>;
  color: ColorVariant;
  footerText: string;
  trend: "up" | "down" | "neutral";
  trendPeriod: string;
  trendValue: string;
};

const cardColorMap: Record<ColorVariant, string> = {
  blue: "bg-gradient-to-br from-blue-100 to-blue-50/30 dark:from-blue-900/30 dark:to-blue-900/10",
  yellow:
    "bg-gradient-to-br from-yellow-100 to-yellow-50/30 dark:from-yellow-900/30 dark:to-yellow-900/10",
  green:
    "bg-gradient-to-br from-green-100 to-green-50/30 dark:from-green-900/30 dark:to-green-900/10",
  indigo:
    "bg-gradient-to-br from-indigo-100 to-indigo-50/30 dark:from-indigo-900/30 dark:to-indigo-900/10",
  red: "bg-gradient-to-br from-red-100 to-red-50/30 dark:from-red-900/30 dark:to-red-900/10",
  purple:
    "bg-gradient-to-br from-purple-100 to-purple-50/30 dark:from-purple-900/30 dark:to-purple-900/10",
};

const iconBgMap: Record<ColorVariant, string> = {
  blue: "bg-blue-100/80 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
  yellow:
    "bg-yellow-100/80 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300",
  green:
    "bg-green-100/80 text-green-600 dark:bg-green-900/30 dark:text-green-300",
  indigo:
    "bg-indigo-100/80 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",
  red: "bg-red-100/80 text-red-600 dark:bg-red-900/30 dark:text-red-300",
  purple:
    "bg-purple-100/80 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
};

const trendIcon = {
  up: <HiArrowTrendingUp className="size-4 text-green-500" />,
  down: <HiArrowTrendingDown className="size-4 text-red-500" />,
  neutral: <HiMinus className="size-4 text-gray-500" />,
};

const trendColor = {
  up: "text-green-500",
  down: "text-red-500",
  neutral: "text-gray-500",
};

export default function State({
  title,
  value,
  icon,
  color,
  footerText,
  trend,
  trendValue,
  trendPeriod,
}: StateProps) {
  return (
    <Card
      aria-label={`${title} statistic card`}
      className={`@container/card ${cardColorMap[color]} transition-all hover:shadow-sm`}
    >
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl @sm/card:text-xl">
          {value}
        </CardTitle>
        <CardAction>
          <div
            className={`flex size-11 items-center justify-center rounded-full ${iconBgMap[color]}`}
          >
            {cloneElement(icon, {
              className: `${icon.props.className || ""} size-6`,
            })}
          </div>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex items-center gap-2 font-medium">
          <span className={`${trendColor[trend]} flex items-center gap-1`}>
            {trendValue} {trendIcon[trend]}
          </span>
          <span className="text-muted-foreground">{trendPeriod}</span>
        </div>
        <div className="text-muted-foreground text-xs">{footerText}</div>
      </CardFooter>
    </Card>
  );
}
