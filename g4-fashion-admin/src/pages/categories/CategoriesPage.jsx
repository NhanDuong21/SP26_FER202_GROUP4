import { useEffect, useState } from "react";
import { categoryService } from "../../services/categoryService";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await categoryService.getAll();
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh mục:", err);
      setError("Không thể tải dữ liệu danh mục.");
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý danh mục</h1>
        <p className="text-slate-500 mt-2">
          Danh sách tất cả danh mục trong hệ thống
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 text-slate-500">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="p-6 text-red-500">{error}</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Hình</th>
                <th className="px-4 py-3 text-left">Tên danh mục</th>
                <th className="px-4 py-3 text-left">Slug</th>
                <th className="px-4 py-3 text-left">Danh mục cha</th>
                <th className="px-4 py-3 text-left">Số SP</th>
                <th className="px-4 py-3 text-left">Trạng thái</th>
                <th className="px-4 py-3 text-left">Cập nhật</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-800">
                    {category.name}
                  </td>

                  <td className="px-4 py-3 text-slate-600">{category.slug}</td>

                  <td className="px-4 py-3 text-slate-600">
                    {getParentName(category.parentId)}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {category.productCount}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                  <td className="px-4 py-3 text-slate-600">
                    {category.updatedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
