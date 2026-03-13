import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 5;

export function useCategoryFilters(categories = []) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCategories = useMemo(() => {
    return categories.filter((item) => {
      const keyword = searchTerm.trim().toLowerCase();

      const matchSearch =
        !keyword ||
        item.name?.toLowerCase().includes(keyword) ||
        item.slug?.toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE) || 1;

  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCategories.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCategories, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    filteredCategories,
    paginatedCategories,
    totalPages,
  };
}
