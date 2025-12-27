import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectApi } from "../../services/projectService";
import toast from "react-hot-toast";

export default function useDeleteProject() {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: () => {
      toast.success("پروژه با موفقیت حذف شد");
      // Invalidate and refetch the owner projects query to update the list
      queryClient.invalidateQueries({
        queryKey: ["owner-projects"],
      });
    },
    
    onError: (error) => {
      toast.error(error?.response?.data?.message || "خطا در حذف پروژه");
    },
    
  });

  return { deleteProject, isDeleting: isPending };
}
