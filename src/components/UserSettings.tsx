import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import { Building, LogOut } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { sessionService } from "@/services/session";
import { DEFAULT_ROUTES } from "@/constants/DefaultRoutes";
import { sellersService } from "@/services/sellersService";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { StoreProfileDialog } from "./StoreProfileDialog";

export const UserSettings = () => {
  const navigate = useNavigate();

  const {
    data: profile,
    isFetching,
    isLoading
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PROFILE],
    queryFn: sellersService.getProfile
  });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: sessionService.signOut,
    onSuccess() {
      navigate(DEFAULT_ROUTES.PUBLIC.SIGN_IN, { replace: true });
    }
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          {!isFetching || !isLoading ? (
            <>
              {profile?.seller?.avatar ? (
                <img
                  src={profile?.seller?.avatar?.url}
                  className="w-9 h-9 min-w-9 min-h-9 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl bg-orange-500 font-semibold text-white w-9 h-9 min-w-9 min-h-9  rounded-full object-cover flex items-center justify-center">
                  {profile?.seller?.name?.split("")[0]}
                </span>
              )}
            </>
          ) : (
            <Skeleton className="w-9 h-9 rounded-full" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex flex-col">
            <span>
              {!isFetching || !isLoading ? (
                profile?.seller?.name
              ) : (
                <Skeleton className="h-4 w-40" />
              )}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {!isFetching || !isLoading ? (
                profile?.seller?.email
              ) : (
                <Skeleton className="mt-2 h-4 w-40" />
              )}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DialogTrigger asChild className="cursor-pointer">
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400 cursor-pointer"
            disabled={isSigningOut}
          >
            <button onClick={() => signOutFn()} className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <StoreProfileDialog />
    </Dialog>
  );
};
