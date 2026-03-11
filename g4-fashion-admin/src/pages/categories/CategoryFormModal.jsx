import { useEffect, useState } from "react";
import { FolderPlus, Link2, Tag, X } from "lucide-react";
import { slugify } from "../../utils/categories/slugify";
import {
  inputClass,
  inputWithIconClass,
  modalOverlayClass,
  modalContainerClass,
  modalHeaderClass,
  modalCloseButtonClass,
  outlineButtonClass,
  secondaryButtonClass,
  primaryButtonClass,
  previewBoxClass,
} from "../../utils/categories/uiClasses";

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

    const nextFormData = editingCategory
      ? {
          name: editingCategory.name || "",
          slug: editingCategory.slug || "",
          parentId: editingCategory.parentId ?? "",
          productCount: editingCategory.productCount || 0,
          status: editingCategory.status || "active",
          image: editingCategory.image || "",
        }
      : initialFormData;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(nextFormData);
    setIsAutoSlug(!editingCategory);
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
    const resetData = editingCategory
      ? {
          name: editingCategory.name || "",
          slug: editingCategory.slug || "",
          parentId: editingCategory.parentId ?? "",
          productCount: editingCategory.productCount || 0,
          status: editingCategory.status || "active",
          image: editingCategory.image || "",
        }
      : initialFormData;

    setFormData(resetData);
    setIsAutoSlug(!editingCategory);
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
    <div onClick={handleOverlayClick} className={modalOverlayClass}>
      <div className={`${modalContainerClass} max-w-2xl`}>
        <div className={modalHeaderClass}>
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

          <button onClick={onClose} className={modalCloseButtonClass}>
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
                className={inputClass}
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
                    className={inputWithIconClass}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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
                className={inputClass}
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
                className={inputClass}
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
                  className={inputWithIconClass}
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
                className={inputClass}
              />
            </div>
          </div>

          {formData.image && (
            <div className={previewBoxClass}>
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
              className={outlineButtonClass}
            >
              Reset
            </button>

            <button
              type="button"
              onClick={onClose}
              className={secondaryButtonClass}
            >
              Hủy
            </button>

            <button type="submit" className={primaryButtonClass}>
              {editingCategory ? "Lưu thay đổi" : "Thêm danh mục"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
