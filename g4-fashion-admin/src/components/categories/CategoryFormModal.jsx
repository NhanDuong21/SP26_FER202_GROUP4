import { useEffect, useState } from "react";
import { FolderPlus, Link2, Tag, X } from "lucide-react";
import { slugify } from "../../utils/slugify";
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
} from "../../utils/uiClasses";
import {
  getDefaultCategoryForm,
  validateCategoryForm,
} from "../../utils/categories/categoryHelpers";

const getCategoryFormData = (category) => ({
  name: category?.name || "",
  slug: category?.slug || "",
  parentId: category?.parentId ?? "",
  status: category?.status || "active",
  image: category?.image || "",
});

const getDescendantCategoryIds = (categoryId, categories = []) => {
  const children = categories.filter(
    (item) => String(item.parentId) === String(categoryId),
  );

  const descendantIds = children.flatMap((child) => [
    String(child.id),
    ...getDescendantCategoryIds(child.id, categories),
  ]);

  return descendantIds;
};

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  categories = [],
  editingCategory,
}) {
  const [formData, setFormData] = useState(getDefaultCategoryForm());
  const [errors, setErrors] = useState({});
  const [isAutoSlug, setIsAutoSlug] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setFormData(
      editingCategory
        ? getCategoryFormData(editingCategory)
        : getDefaultCategoryForm(),
    );

    setIsAutoSlug(!editingCategory);
    setErrors({});
  }, [isOpen, editingCategory]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "name") {
        return {
          ...prev,
          name: value,
          slug: isAutoSlug ? slugify(value) : prev.slug,
        };
      }

      return {
        ...prev,
        [name]: name === "parentId" ? (value === "" ? "" : value) : value,
      };
    });

    if (name === "slug") {
      setIsAutoSlug(false);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleGenerateSlug = () => {
    setFormData((prev) => ({
      ...prev,
      slug: slugify(prev.name),
    }));
    setIsAutoSlug(true);

    setErrors((prev) => ({
      ...prev,
      slug: "",
    }));
  };

  const handleReset = () => {
    setFormData(
      editingCategory
        ? getCategoryFormData(editingCategory)
        : getDefaultCategoryForm(),
    );
    setIsAutoSlug(!editingCategory);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateCategoryForm({
      formData,
      categories,
      editingCategory,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formData,
      parentId: formData.parentId === "" ? null : String(formData.parentId),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    onSubmit(payload);
  };

  const excludedParentIds = editingCategory
    ? [
        String(editingCategory.id),
        ...getDescendantCategoryIds(editingCategory.id, categories),
      ]
    : [];

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

          <button
            type="button"
            onClick={onClose}
            className={modalCloseButtonClass}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
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
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
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
              {errors.slug && (
                <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
              )}
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
                  .filter(
                    (item) => !excludedParentIds.includes(String(item.id)),
                  )
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
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
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
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
                  e.currentTarget.style.display = "none";
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
