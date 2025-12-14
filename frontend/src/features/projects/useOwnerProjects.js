import { useQuery } from "@tanstack/react-query";
import getOwnerProjectsApi from "../../services/projectService";

//  Custom hook to fetch and manage owner projects data
export default function useOwnerProjects() {
  // Use React Query to fetch owner projects with caching and loading states
  const { data, isLoading } = useQuery({
    queryKey: ["owner-projects"], // Unique key for caching this query
    queryFn: getOwnerProjectsApi, // API function to fetch the data
  });

  // Extract projects from the response data, defaulting to undefined if no data
  const { projects } = data || {};

  // Return the projects and loading state for components to use
  return { projects, isLoading };
}
