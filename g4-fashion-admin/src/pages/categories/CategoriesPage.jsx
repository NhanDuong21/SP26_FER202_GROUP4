import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { categoryService } from "../../services/categoryService";
import {
  cardClass,
  sectionHeaderClass,
  primaryButtonClass,
} from "../../utils/uiClasses";
import { getCategoryStats } from "../../utils/categories/categoryHelpers";
import { useCategoryFilters } from "../../hooks/categories/useCategoryFilters";
import { useCategoryModals } from "../../hooks/categories/useCategoryModals";
import CategoryStats from "../../components/categories/CategoryStats";
import CategoryTable from "../../components/categories/CategoryTable";
import CategoryFormModal from "../../components/categories/CategoryFormModal";
import CategoryDetailModal from "../../components/categories/CategoryDetailModal";
import CategoryDeleteModal from "../../components/categories/CategoryDeleteModal";
import CategoryToolbar from "../../components/categories/CategoryToolbar";
import Pagination from "../../components/common/Pagination";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
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
  } = useCategoryModals();

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    paginatedCategories,
    totalPages,
  } = useCategoryFilters(categories);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await categoryService.getAll();
      setCategories(res.data || []);
    } catch (err) {
      console.error("Lỗi lấy danh mục:", err);
      setError("Không thể tải dữ liệu danh mục.");
      toast.error("Tải danh mục thất bại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const stats = useMemo(() => getCategoryStats(categories), [categories]);

  const getParentName = (parentId) => {
    if (!parentId) return "Danh mục gốc";

    const parent = categories.find(
      (item) => Number(item.id) === Number(parentId),
    );

    return parent ? parent.name : "Không xác định";
  };

  const handleSubmitForm = async (payload) => {
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory.id, payload);
        toast.success("Cập nhật danh mục thành công");
      } else {
        await categoryService.create(payload);
        toast.success("Thêm danh mục thành công");
      }

      await fetchCategories();
      handleCloseForm();
    } catch (err) {
      console.error("Lỗi lưu danh mục:", err);
      toast.error("Không thể lưu danh mục");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await categoryService.remove(deletingCategory.id);
      toast.success("Xóa danh mục thành công");
      await fetchCategories();
      handleCloseDelete();
    } catch (err) {
      console.error("Lỗi xóa danh mục:", err);
      toast.error("Không thể xóa danh mục");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Quản lý Danh mục
          </h1>
          <p className="mt-2 text-slate-500">
            Tổ chức và phân loại sản phẩm theo danh mục
          </p>
        </div>

        <button onClick={handleOpenCreate} className={primaryButtonClass}>
          <Plus size={18} />
          Thêm danh mục
        </button>
      </div>

      <CategoryStats stats={stats} />

      <div className={cardClass}>
        <div className={sectionHeaderClass}>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Danh sách danh mục
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quản lý toàn bộ danh mục trong hệ thống
            </p>
          </div>
        </div>

        <CategoryToolbar
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
        />

        {loading ? (
          <div className="px-6 py-10 text-slate-500">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="px-6 py-10 text-red-500">{error}</div>
        ) : (
          <>
            <CategoryTable
              categories={paginatedCategories}
              getParentName={getParentName}
              onView={handleOpenDetail}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <CategoryFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        categories={categories}
        editingCategory={editingCategory}
      />

      <CategoryDeleteModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        categoryName={deletingCategory?.name}
      />

      <CategoryDetailModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        category={selectedCategory}
        getParentName={getParentName}
      />
    </div>
  );
}
