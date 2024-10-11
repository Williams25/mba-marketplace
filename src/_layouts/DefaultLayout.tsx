import { DEFAULT_ROUTES } from "@/constants/DefaultRoutes";
import { STORAGE_KEYS } from "@/constants/StorageKeys";
import { getCookie } from "@/utils/cookie";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LogoHeaderImg from "../assets/logo-header.svg";
import { NavLink } from "@/components/NavLink";
import { ChartNoAxesCombined, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserSettings } from "@/components/UserSettings";

export const DefaultLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authCookie = getCookie(STORAGE_KEYS.AUTH);
    if (!authCookie) navigate(DEFAULT_ROUTES.PUBLIC.SIGN_IN);
  }, []);

  return (
    <>
      <div className="border-2 border-b-gray-200 mb-12 bg-white">
        <header className="py-5 px-6 max-w-[1720px] w-full mx-auto flex justify-between items-center gap-4">
          <img src={LogoHeaderImg} className="w-14 h-10" />
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <NavLink to={DEFAULT_ROUTES.PRIVATE.HOME}>
              <ChartNoAxesCombined className="w-5 h-5" />
              Dashboard
            </NavLink>
            <NavLink to={DEFAULT_ROUTES.PRIVATE.PRODUCTS}>
              <ShoppingBag className="w-5 h-5" />
              Produtos
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4 lg:space-x-6">
            <Button className="flex items-center gap-2 font-medium" asChild>
              <NavLink to={DEFAULT_ROUTES.PRIVATE.PRODUCT_NEW}>
                <Plus className="w-5 h-5" />
                Novo Produto
              </NavLink>
            </Button>

            <UserSettings />
          </div>
        </header>
      </div>
      <div className="max-w-[1400px] w-full mx-auto">
        <Outlet />
      </div>
    </>
  );
};
