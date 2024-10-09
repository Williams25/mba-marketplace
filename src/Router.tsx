import { createBrowserRouter, RouteObject } from "react-router-dom";
import { AuthLayout } from "./_layouts/AuthLayout";
import { DefaultLayout } from "./_layouts/DefaultLayout";
import { SignUp } from "./pages/auth/SignUp";
import { SignIn } from "./pages/auth/SignIn";
import { DEFAULT_ROUTES } from "./constants/DefaultRoutes";

import { NotFound } from "./pages/404";
import { Error } from "./pages/Error";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Products } from "./pages/dashboard/Products";

export const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    path: "/",
    errorElement: <Error />,
    children: [
      {
        path: DEFAULT_ROUTES.PRIVATE.HOME,
        element: <Dashboard />
      },
      {
        path: DEFAULT_ROUTES.PRIVATE.PRODUCTS,
        element: <Products />
      }
    ]
  },
  {
    element: <AuthLayout />,
    path: "/",
    errorElement: <Error />,
    children: [
      {
        path: DEFAULT_ROUTES.PUBLIC.SIGN_IN,
        element: <SignIn />
      },
      {
        path: DEFAULT_ROUTES.PUBLIC.SIGN_UP,
        element: <SignUp />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
];

export const router = createBrowserRouter(routes);
