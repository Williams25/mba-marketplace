import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <Card className="w-80">
      <CardHeader className="p-2">
        <Skeleton className="max-w-80 w-full h-36 rounded-md" />

        <CardTitle className="flex justify-between items-center px-4 pt-3 font-semibold text-lg text-gray-800">
          <Skeleton className="w-48 h-6 rounded-md mr-5" />
          <span>
            <Skeleton className="w-20 h-6 rounded-md" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="font-medium text-gray-500 text-base leading-5">
          <Skeleton className="w-full h-6 rounded-md mt-2" />
          <Skeleton className="w-full h-6 rounded-md mt-1" />
          <Skeleton className="w-full h-6 rounded-md mt-1" />
        </CardDescription>
      </CardContent>
    </Card>
  );
};
