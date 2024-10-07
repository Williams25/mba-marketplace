import { Outlet, useNavigate } from "react-router-dom";
import LayerAuthImage from "../assets/layer-auth.svg";
import LogoImage from "../assets/logo.svg";
import { useEffect } from "react";
import { getCookie } from "@/utils/cookie";
import { STORAGE_KEYS } from "@/constants/StorageKeys";
import { DEFAULT_ROUTES } from "@/constants/DefaultRoutes";

export const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authCookie = getCookie(STORAGE_KEYS.AUTH);
    if (authCookie) navigate(DEFAULT_ROUTES.PRIVATE.HOME);
  }, []);

  return (
    <div className="grid grid-cols-2 max-w-[1400px] mx-auto px-4 py-6 min-h-screen gap-8">
      <div className="flex flex-col justify-between">
        <img src={LogoImage} alt="" className="w-[267px] h-[68px]" />
        <img src={LayerAuthImage} alt="" className="my-auto block" />
      </div>

      <div className="my-auto bg-white rounded-3xl px-16 py-20 max-w-[560px] w-full ml-auto min-h-[720px] h-full">
        <Outlet />
      </div>
    </div>
  );
};
