import { useMemo } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "../../contexts/LanguageContext";
import { Plus } from "lucide-react";
import {
  cardClass,
  sectionHeaderClass,
  primaryButtonClass,
} from "../../utils/uiClasses";
import {
  getCategoryProductCount,
  getCategoryStats,
  hasChildCategories,
  hasProductsInCategory,
} from "../../utils/categories/categoryHelpers";
import { useCategoriesData } from "../../hooks/categories/useCategoriesData";
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
  const {
    categories,
    products,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoriesData();

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

  const { t } = useLanguage();

  const stats = useMemo(
    () => getCategoryStats(categories, products),
    [categories, products],
  );

  const getParentName = (parentId) => {
    if (!parentId) return t("Danh mục gốc");

    const parent = categories.find(
      (item) => String(item.id) === String(parentId),
    );

    return parent ? parent.name : t("Không xác định");
  };

  const getProductCount = (categoryId) => {
    return getCategoryProductCount(categoryId, products);
  };

  const handleSubmitForm = async (payload) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, payload);
        toast.success(t("Cập nhật danh mục thành công"));
      } else {
        await createCategory(payload);
        toast.success(t("Thêm danh mục thành công"));
      }

      await fetchCategories();
      handleCloseForm();
    } catch (err) {
      console.error(t("Lỗi lưu danh mục:"), err);
      toast.error(t("Không thể lưu danh mục"));
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;

    const hasChildren = hasChildCategories(deletingCategory.id, categories);
    const hasProducts = hasProductsInCategory(deletingCategory.id, products);

    if (hasChildren || hasProducts) {
      if (hasChildren && hasProducts) {
        toast.error("Không thể xóa danh mục đang có sản phẩm và danh mục con");
      } else if (hasChildren) {
        toast.error("Không thể xóa danh mục đang có danh mục con");
      } else {
        toast.error("Không thể xóa danh mục đang có sản phẩm");
      }
      return;
    }

    try {
      await deleteCategory(deletingCategory.id);
      toast.success(t("Xóa danh mục thành công"));
      await fetchCategories();
      handleCloseDelete();
    } catch (err) {
      console.error(t("Lỗi xóa danh mục:"), err);
      toast.error(t("Không thể xóa danh mục"));
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            {t("Quản lý Danh mục")}
          </h1>
          <p className="mt-2 text-slate-500">
            {t("Tổ chức và phân loại sản phẩm theo danh mục")}
          </p>
        </div>

        <button onClick={handleOpenCreate} className={primaryButtonClass}>
          <Plus size={18} />
          {t("Thêm danh mục")}
        </button>
      </div>

      <CategoryStats stats={stats} />

      <div className={cardClass}>
        <div className={sectionHeaderClass}>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {t("Danh sách danh mục")}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {t("Quản lý toàn bộ danh mục trong hệ thống")}
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
          <div className="px-6 py-10 text-slate-500">
            {t("Đang tải dữ liệu...")}
          </div>
        ) : error ? (
          <div className="px-6 py-10 text-red-500">{error}</div>
        ) : (
          <>
            <CategoryTable
              categories={paginatedCategories}
              getParentName={getParentName}
              getProductCount={getProductCount}
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
        getProductCount={getProductCount}
      />
    </div>
  );
}
