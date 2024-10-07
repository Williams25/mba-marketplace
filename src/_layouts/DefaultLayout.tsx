import { DEFAULT_ROUTES } from "@/constants/DefaultRoutes";
import { STORAGE_KEYS } from "@/constants/StorageKeys";
import { getCookie } from "@/utils/cookie";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const DefaultLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authCookie = getCookie(STORAGE_KEYS.AUTH);
    if (!authCookie) navigate(DEFAULT_ROUTES.PUBLIC.SIGN_IN);
  }, []);

  return (
    <div>
      DefaultLayout
      <div>
        <Outlet />
      </div>
    </div>
  );
};
