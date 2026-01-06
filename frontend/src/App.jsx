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
          style: {
            background: "rgb(var(--color-secondary-0) / 1)",
            color: "rgb(var(--color-secondary-900) / 1)",
            border: "1px solid rgb(var(--color-secondary-200) / 1)",
          },
        }}
      />
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
