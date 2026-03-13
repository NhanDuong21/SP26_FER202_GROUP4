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
import CategoryStats from "../../components/categories/CategoryStats";
import CategoryTable from "../../components/categories/CategoryTable";
import CategoryFormModal from "../../components/categories/CategoryFormModal";
import CategoryDetailModal from "../../components/categories/CategoryDetailModal";
import CategoryDeleteModal from "../../components/categories/CategoryDeleteModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const handleOpenDelete = (category) => {
    setDeletingCategory(category);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeletingCategory(null);
    setIsDeleteOpen(false);
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

  const handleOpenDetail = (category) => {
    setSelectedCategory(category);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedCategory(null);
    setIsDetailOpen(false);
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

        {loading ? (
          <div className="px-6 py-10 text-slate-500">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="px-6 py-10 text-red-500">{error}</div>
        ) : (
          <CategoryTable
            categories={categories}
            getParentName={getParentName}
            onView={handleOpenDetail}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
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
