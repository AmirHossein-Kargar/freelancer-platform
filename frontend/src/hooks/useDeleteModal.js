import { useState } from "react";

export default function useDeleteModal() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenDeleteModal = (project) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedProject(null);
  };

  return {
    isDeleteOpen,
    selectedProject,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}