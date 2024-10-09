import { useQueryClient } from "@tanstack/react-query";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { ISellersResponse } from "@/types/sellers";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { Skeleton } from "./ui/skeleton";

export const StoreProfileDialog = () => {
  const queryClient = useQueryClient();
  const cached = queryClient.getQueryData<ISellersResponse>([
    QUERY_KEYS.GET_PROFILE
  ]);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <div className="flex gap-6 items-start">
        {cached ? (
          <>
            {cached?.seller?.avatar ? (
              <img
                src={cached?.seller?.avatar?.url}
                className="w-28 h-28 min-w-28 min-h-28 rounded-full object-cover"
              />
            ) : (
              <span className="text-5xl bg-orange-500 font-semibold text-white w-28 h-28 min-w-28 min-h-28  rounded-full object-cover flex items-center justify-center">
                {cached?.seller?.name?.split("")[0]}
              </span>
            )}
          </>
        ) : (
          <Skeleton className="w-28 h-28 min-w-28 min-h-28 rounded-full" />
        )}
        {cached ? (
          <div className="w-full flex flex-col">
            <span className="font-bold text-lg text-gray-700">
              {cached?.seller.name}
            </span>
            <span className="font-medium text-sm text-gray-600">
              {cached?.seller.email}
            </span>
            <span className="font-medium text-sm text-gray-600">
              {cached?.seller.phone}
            </span>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <Skeleton className="mt-2 h-4 w-40" />
            <Skeleton className="mt-2 h-4 w-40" />
            <Skeleton className="mt-2 h-4 w-40" />
          </div>
        )}
      </div>
    </DialogContent>
  );
};
