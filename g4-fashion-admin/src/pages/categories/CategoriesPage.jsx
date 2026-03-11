import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý Danh mục</h1>
        <p className="mt-2 text-slate-500">
          Tổ chức và phân loại sản phẩm theo danh mục
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Tổng danh mục</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">
            {totalCategories}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Đang hoạt động</p>
          <h3 className="mt-2 text-3xl font-bold text-emerald-600">
            {activeCategories}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Tổng sản phẩm</p>
          <h3 className="mt-2 text-3xl font-bold text-violet-600">
            {totalProducts}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Danh mục gốc</p>
          <h3 className="mt-2 text-3xl font-bold text-amber-600">
            {rootCategories}
          </h3>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Danh sách danh mục
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quản lý toàn bộ danh mục trong hệ thống
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="rounded-2xl bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            + Thêm danh mục
          </button>
        </div>

        {loading ? (
          <div className="p-6 text-slate-500">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="p-6 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-4 text-left">Hình ảnh</th>
                  <th className="px-4 py-4 text-left">Tên danh mục</th>
                  <th className="px-4 py-4 text-left">Danh mục cha</th>
                  <th className="px-4 py-4 text-left">Số sản phẩm</th>
                  <th className="px-4 py-4 text-left">Trạng thái</th>
                  <th className="px-4 py-4 text-left">Ngày cập nhật</th>
                  <th className="px-4 py-4 text-center">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-14 w-14 rounded-2xl border border-slate-200 object-cover"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-800">
                        {category.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {category.slug}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {category.parentId ? (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {getParentName(category.parentId)}
                        </span>
                      ) : (
                        "Danh mục gốc"
                      )}
                    </td>

                    <td className="px-4 py-4 font-semibold text-blue-600">
                      {category.productCount}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          category.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {category.status === "active"
                          ? "Hoạt động"
                          : "Ngưng hoạt động"}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {category.updatedAt}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(category)}
                          className="rounded-xl bg-sky-50 px-3 py-2 text-sky-700 hover:bg-sky-100"
                        >
                          Xem
                        </button>

                        <button
                          onClick={() => handleOpenEdit(category)}
                          className="rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700 hover:bg-emerald-100"
                        >
                          Sửa
                        </button>

                        <button
                          onClick={() => handleOpenDelete(category)}
                          className="rounded-xl bg-red-50 px-3 py-2 text-red-700 hover:bg-red-100"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-10 text-center text-slate-500"
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
