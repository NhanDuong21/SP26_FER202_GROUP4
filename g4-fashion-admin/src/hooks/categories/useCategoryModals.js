import { useState } from "react";

export function useCategoryModals() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingCategory(null);
    setIsFormOpen(false);
  };

  const handleOpenDelete = (category) => {
    setDeletingCategory(category);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeletingCategory(null);
    setIsDeleteOpen(false);
  };

  const handleOpenDetail = (category) => {
    setSelectedCategory(category);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedCategory(null);
    setIsDetailOpen(false);
  };

  return {
    isFormOpen,
    editingCategory,
    isDeleteOpen,
    deletingCategory,
    isDetailOpen,
    selectedCategory,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseForm,
    handleOpenDelete,
    handleCloseDelete,
    handleOpenDetail,
    handleCloseDetail,
  };
}
