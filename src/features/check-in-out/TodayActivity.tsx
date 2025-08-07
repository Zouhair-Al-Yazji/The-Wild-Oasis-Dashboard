import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "@/ui/Spinner";
import TodayList from "./TodayList";

export default function TodayActivity() {
  const { activities, isPending } = useTodayActivity();

  return (
    <div className="col-span-4 lg:col-span-2">
      <Card className="flex h-full flex-col gap-6">
        <CardHeader>
          <CardTitle>Today's Activities</CardTitle>
          <CardDescription>Check ins & check outs</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          {!isPending ? (
            activities && activities.length > 0 ? (
              <TodayList activities={activities} />
            ) : (
              <p className="text-muted-foreground py-8 text-center">
                No activities scheduled for today
              </p>
            )
          ) : (
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
