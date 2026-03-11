import { useEffect, useState } from "react";
import { FolderPlus, Link2, Tag, X } from "lucide-react";
import { slugify } from "../../utils/slugify";

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
  const [isAutoSlug, setIsAutoSlug] = useState(true);

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
      setIsAutoSlug(false);
    } else {
      setFormData(initialFormData);
      setIsAutoSlug(true);
    }

    setFormError("");
  }, [editingCategory, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: isAutoSlug ? slugify(value) : prev.slug,
      }));
      return;
    }

    if (name === "slug") {
      setIsAutoSlug(false);
    }

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
      setIsAutoSlug(false);
    } else {
      setFormData(initialFormData);
      setIsAutoSlug(true);
    }

    setFormError("");
  };

  const handleGenerateSlug = () => {
    setFormData((prev) => ({
      ...prev,
      slug: slugify(prev.name),
    }));
    setIsAutoSlug(true);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Tên danh mục không được để trống.";
    if (!formData.slug.trim()) return "Slug không được để trống.";

    const isSlugExist = categories.some(
      (item) =>
        item.slug.toLowerCase() === formData.slug.trim().toLowerCase() &&
        item.id !== editingCategory?.id,
    );

    if (isSlugExist) return "Slug đã tồn tại.";
    if (formData.productCount < 0) return "Số sản phẩm không được nhỏ hơn 0.";

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
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <FolderPlus size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {editingCategory ? "Cập nhật danh mục" : "Thêm danh mục"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Điền thông tin để lưu danh mục sản phẩm
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          {formError && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Tên danh mục
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ví dụ: Áo nam"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Slug
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="ao-nam"
                    className="w-full rounded-2xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Tạo slug
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Danh mục cha
              </label>
              <select
                name="parentId"
                value={formData.parentId}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Số sản phẩm
              </label>
              <input
                type="number"
                name="productCount"
                value={formData.productCount}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Trạng thái
              </label>
              <div className="relative">
                <Tag
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-2xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Ngưng hoạt động</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Link hình ảnh
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://dummyimage.com/80x80/..."
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {formData.image && (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-medium text-slate-700">
                Xem trước hình ảnh
              </p>
              <img
                src={formData.image}
                alt="Preview"
                className="h-24 w-24 rounded-2xl border border-slate-200 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-2xl border border-slate-300 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-slate-200 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-300"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm hover:bg-blue-700"
            >
              {editingCategory ? "Lưu thay đổi" : "Thêm danh mục"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
