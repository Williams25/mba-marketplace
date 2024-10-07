import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Marketplace" />
      <QueryClientProvider client={queryClient}>
        <Toaster richColors closeButton />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
