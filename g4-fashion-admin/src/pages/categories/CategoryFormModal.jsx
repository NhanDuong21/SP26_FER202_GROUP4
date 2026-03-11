import { useEffect, useState } from "react";

const initialFormData = {
  name: "",
  slug: "",
  parentId: "",
  productCount: 0,
  status: "active",
  image: "",
};

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  editingCategory,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (editingCategory) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: editingCategory.name || "",
        slug: editingCategory.slug || "",
        parentId: editingCategory.parentId ?? "",
        productCount: editingCategory.productCount || 0,
        status: editingCategory.status || "active",
        image: editingCategory.image || "",
      });
    } else {
      setFormData(initialFormData);
    }

    setFormError("");
  }, [editingCategory, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "productCount"
          ? Number(value)
          : name === "parentId"
            ? value === ""
              ? ""
              : Number(value)
            : value,
    }));
  };

  const handleReset = () => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name || "",
        slug: editingCategory.slug || "",
        parentId: editingCategory.parentId ?? "",
        productCount: editingCategory.productCount || 0,
        status: editingCategory.status || "active",
        image: editingCategory.image || "",
      });
    } else {
      setFormData(initialFormData);
    }

    setFormError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Tên danh mục không được để trống.";
    }

    if (!formData.slug.trim()) {
      return "Slug không được để trống.";
    }

    const isSlugExist = categories.some(
      (item) =>
        item.slug.toLowerCase() === formData.slug.trim().toLowerCase() &&
        item.id !== editingCategory?.id,
    );

    if (isSlugExist) {
      return "Slug đã tồn tại.";
    }

    if (formData.productCount < 0) {
      return "Số sản phẩm không được nhỏ hơn 0.";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = validateForm();
    if (message) {
      setFormError(message);
      return;
    }

    const payload = {
      ...formData,
      parentId: formData.parentId === "" ? null : formData.parentId,
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editingCategory ? "Cập nhật danh mục" : "Thêm danh mục"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Nhập thông tin danh mục sản phẩm
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          {formError && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Tên danh mục
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ví dụ: Áo nam"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="ao-nam"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Danh mục cha
              </label>
              <select
                name="parentId"
                value={formData.parentId}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              >
                <option value="">Danh mục gốc</option>
                {categories
                  .filter((item) => item.id !== editingCategory?.id)
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Số sản phẩm
              </label>
              <input
                type="number"
                name="productCount"
                value={formData.productCount}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Trạng thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Ngưng hoạt động</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Link hình ảnh
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://dummyimage.com/80x80/..."
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {editingCategory ? "Lưu thay đổi" : "Thêm danh mục"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
