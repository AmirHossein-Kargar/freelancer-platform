import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import Badge from "./ui/Badge";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          className:
            "dark:!bg-secondary-800 dark:!text-secondary-100 dark:!border-secondary-700",
        }}
      />
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
