import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/authService";

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { user, isLoading, isAuthenticated: !!user };
}
