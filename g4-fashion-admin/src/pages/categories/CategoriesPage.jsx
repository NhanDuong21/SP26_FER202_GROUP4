import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FolderKanban,
  Tag,
  Package,
  Layers3,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { categoryService } from "../../services/categoryService";
import CategoryFormModal from "./CategoryFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import CategoryDetailModal from "./CategoryDetailModal";
import {
  statCardClass,
  cardClass,
  sectionHeaderClass,
  primaryButtonClass,
  tableHeaderCellClass,
  tableCellClass,
  iconActionButtonClass,
} from "../../utils/categories/uiClasses";
import {
  getActionButtonColorClass,
  getCategoryStatusBadgeClass,
} from "../../utils/categories/categoryUi";

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
      setCategories(res.data);
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

  const totalCategories = categories.length;
  const activeCategories = categories.filter(
    (item) => item.status === "active",
  ).length;
  const totalProducts = categories.reduce(
    (sum, item) => sum + (item.productCount || 0),
    0,
  );
  const rootCategories = categories.filter((item) => !item.parentId).length;

  const statCards = [
    {
      title: "Tổng danh mục",
      value: totalCategories,
      icon: FolderKanban,
      iconClass: "bg-sky-100 text-sky-600",
    },
    {
      title: "Đang hoạt động",
      value: activeCategories,
      icon: Tag,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Tổng sản phẩm",
      value: totalProducts,
      icon: Package,
      iconClass: "bg-violet-100 text-violet-600",
    },
    {
      title: "Danh mục gốc",
      value: rootCategories,
      icon: Layers3,
      iconClass: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.title} className={statCardClass}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>
                  <h3 className="mt-3 text-3xl font-bold text-slate-800">
                    {card.value}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconClass}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className={tableHeaderCellClass}>Hình ảnh</th>
                  <th className={tableHeaderCellClass}>Tên danh mục</th>
                  <th className={tableHeaderCellClass}>Danh mục cha</th>
                  <th className={tableHeaderCellClass}>Số sản phẩm</th>
                  <th className={tableHeaderCellClass}>Trạng thái</th>
                  <th className={tableHeaderCellClass}>Ngày cập nhật</th>
                  <th className={`${tableHeaderCellClass} text-center`}>
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50/80"
                  >
                    <td className={tableCellClass}>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-14 w-14 rounded-2xl border border-slate-200 object-cover"
                      />
                    </td>

                    <td className={tableCellClass}>
                      <div className="font-semibold text-slate-800">
                        {category.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        /{category.slug}
                      </div>
                    </td>

                    <td className={`${tableCellClass} text-slate-600`}>
                      {category.parentId ? (
                        <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                          {getParentName(category.parentId)}
                        </span>
                      ) : (
                        <span className="text-slate-500">Danh mục gốc</span>
                      )}
                    </td>

                    <td className={tableCellClass}>
                      <span className="font-semibold text-blue-600">
                        {category.productCount}
                      </span>
                    </td>

                    <td className={tableCellClass}>
                      <span
                        className={getCategoryStatusBadgeClass(category.status)}
                      >
                        {category.status === "active"
                          ? "Hoạt động"
                          : "Ngưng hoạt động"}
                      </span>
                    </td>

                    <td className={`${tableCellClass} text-slate-600`}>
                      {category.updatedAt}
                    </td>

                    <td className={tableCellClass}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(category)}
                          className={`${iconActionButtonClass} ${getActionButtonColorClass(
                            "view",
                          )}`}
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(category)}
                          className={`${iconActionButtonClass} ${getActionButtonColorClass(
                            "edit",
                          )}`}
                          title="Chỉnh sửa"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleOpenDelete(category)}
                          className={`${iconActionButtonClass} ${getActionButtonColorClass(
                            "delete",
                          )}`}
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      Chưa có danh mục nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CategoryFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        categories={categories}
        editingCategory={editingCategory}
      />

      <DeleteConfirmModal
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
