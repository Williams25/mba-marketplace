import { QUERY_KEYS } from "@/constants/QueryKeys";
import { metricsService } from "@/services/metricsService";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip
} from "recharts";
import { Calendar, Users } from "lucide-react";
import { getFormatDate } from "@/utils/dateUtils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="shadow-md bg-white px-5 py-4 rounded-sm">
        <p className="text-sm text-gray-600 font-medium">
          {getFormatDate(label, "DD [de] MMMM")}
        </p>
        <p className="flex gap-2 items-center text-gray-500 mt-2 text-sm">
          <Users className="w-4 h-4" /> {payload[0]?.payload?.amount || 0}{" "}
          visitantes
        </p>
      </div>
    );
  }

  return null;
};

export const VisitorsGraph = () => {
  const { data: days, isLoading: isLoadingDays } = useQuery({
    queryKey: [QUERY_KEYS.GET_VISITOS_GRAPHICS],
    queryFn: metricsService.days
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1 flex justify-between items-center w-full">
          <CardTitle className="text-lg font-semibold">Visitantes</CardTitle>
          <CardDescription>
            {days?.viewsPerDay && days?.viewsPerDay?.length > 0 ? (
              <span className="text-base font-medium text-gray-500 flex gap-2 items-center">
                <Calendar className="w-5 h-5 text-blue-400" />
                {getFormatDate(
                  days?.viewsPerDay[0]?.date,
                  "DD [de] MMMM"
                )} -{" "}
                {getFormatDate(
                  days?.viewsPerDay[days?.viewsPerDay?.length - 1]?.date,
                  "DD [de] MMMM"
                )}{" "}
              </span>
            ) : (
              <Skeleton className="mt-2 h-4 w-40" />
            )}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        {days?.viewsPerDay && !isLoadingDays && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={days?.viewsPerDay}>
              <CartesianGrid vertical={false} className="stroke-muted" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => getFormatDate(date, "DD")}
                tickLine={false}
                axisLine={false}
                dy={16}
              />

              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
              />

              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotoneX"
                dataKey="amount"
                strokeWidth={2}
                stroke="#8884d8"
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {isLoadingDays && <Skeleton className="mx-auto h-60 w-full" />}
      </CardContent>
    </Card>
  );
};
