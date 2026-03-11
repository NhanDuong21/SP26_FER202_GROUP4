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
    const parent = categories.find((item) => item.id === parentId);
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

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Thêm danh mục
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
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

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
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
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Hình ảnh
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Tên danh mục
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Danh mục cha
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Số sản phẩm
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Ngày cập nhật
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
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
                    <td className="px-6 py-4">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-14 w-14 rounded-2xl border border-slate-200 object-cover"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">
                        {category.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        /{category.slug}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {category.parentId ? (
                        <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                          {getParentName(category.parentId)}
                        </span>
                      ) : (
                        <span className="text-slate-500">Danh mục gốc</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-semibold text-blue-600">
                        {category.productCount}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          category.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {category.status === "active"
                          ? "Hoạt động"
                          : "Ngưng hoạt động"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {category.updatedAt}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(category)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition hover:bg-sky-100"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(category)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleOpenDelete(category)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700 transition hover:bg-rose-100"
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
