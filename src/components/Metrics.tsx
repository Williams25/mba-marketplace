import { Store, Tag, Users } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export interface IMetricsProps {
  type: "sold" | "store" | "visitors";
  total: string;
  label: string;
  isPending?: boolean;
}

const ICONS = {
  sold: <Tag className="w-10 h-10 text-blue-300" />,
  store: <Store className="w-10 h-10 text-blue-300" />,
  visitors: <Users className="w-10 h-10 text-gray-500" />
};

export const Metrics = ({ label, total, type, isPending }: IMetricsProps) => {
  return (
    <div className="p-3 grid grid-flow-col max-w-[240px] bg-white grid-cols-[90px_auto] rounded-md gap-2 min-h-[120px]">
      {isPending ? (
        <Skeleton className="w-full h-full rounded-md" />
      ) : (
        <div className="bg-blue-300 bg-opacity-30 rounded-md flex items-center justify-center">
          {ICONS[type]}
        </div>
      )}
      <div className="flex flex-col py-2 justify-between">
        {isPending ? (
          <>
            <Skeleton className="w-12 h-12 rounded-md" />
            <Skeleton className="w-full h-6 rounded-md mt-2" />
          </>
        ) : (
          <>
            <span className="font-bold text-4xl text-gray-700">{total}</span>
            <span className="font-medium text-base text-gray-500 leading-4">
              {label}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
