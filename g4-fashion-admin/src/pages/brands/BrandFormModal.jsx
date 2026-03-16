import { useEffect, useState } from "react";
import { Building2, Link2, X } from "lucide-react";
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

const initialFormData = {
  name: "",
  slug: "",
  country: "",
  productCount: 0,
  featured: false,
  status: "active",
  website: "",
  logo: "",
};

export default function BrandFormModal({
  isOpen,
  onClose,
  onSubmit,
  brands,
  editingBrand,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");
  const [isAutoSlug, setIsAutoSlug] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const nextFormData = editingBrand
      ? {
          name: editingBrand.name || "",
          slug: editingBrand.slug || "",
          country: editingBrand.country || "",
          productCount: editingBrand.productCount || 0,
          featured: editingBrand.featured || false,
          status: editingBrand.status || "active",
          website: editingBrand.website || "",
          logo: editingBrand.logo || "",
        }
      : initialFormData;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(nextFormData);
    setIsAutoSlug(!editingBrand);
    setFormError("");
  }, [editingBrand, isOpen]);

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
    const { name, value, type, checked } = e.target;

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
        type === "checkbox"
          ? checked
          : name === "productCount"
            ? Number(value)
            : value,
    }));
  };

  const handleReset = () => {
    const resetData = editingBrand
      ? {
          name: editingBrand.name || "",
          slug: editingBrand.slug || "",
          country: editingBrand.country || "",
          productCount: editingBrand.productCount || 0,
          featured: editingBrand.featured || false,
          status: editingBrand.status || "active",
          website: editingBrand.website || "",
          logo: editingBrand.logo || "",
        }
      : initialFormData;

    setFormData(resetData);
    setIsAutoSlug(!editingBrand);
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
    if (!formData.name.trim()) return "Tên thương hiệu không được để trống.";
    if (!formData.slug.trim()) return "Slug không được để trống.";
    if (!formData.country.trim()) return "Quốc gia không được để trống.";

    const isSlugExist = brands.some(
      (item) =>
        item.slug.toLowerCase() === formData.slug.trim().toLowerCase() &&
        item.id !== editingBrand?.id,
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

    onSubmit(formData);
  };

  return (
    <div onClick={handleOverlayClick} className={modalOverlayClass}>
      <div className={`${modalContainerClass} max-w-2xl`}>
        <div className={modalHeaderClass}>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Building2 size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {editingBrand ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu mới"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {editingBrand
                  ? "Cập nhật thông tin thương hiệu"
                  : "Nhập thông tin thương hiệu mới"}
              </p>
            </div>
          </div>

          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
          {formError && (
            <div className="mb-4 rounded-2xl bg-red-50 p-4 text-red-700">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Tên thương hiệu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ví dụ: Louis Vuitton"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Slug <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="louis-vuitton"
                  className={inputWithIconClass}
                />
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className={outlineButtonClass}
                  title="Tạo slug tự động"
                >
                  <Link2 size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Quốc gia <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Ví dụ: Pháp"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Số sản phẩm
              </label>
              <input
                type="number"
                name="productCount"
                value={formData.productCount}
                onChange={handleChange}
                min="0"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Logo URL
              </label>
              <input
                type="url"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Trạng thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Ngưng hoạt động</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-5 w-5 rounded-lg border-slate-300"
              />
              <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                Thương hiệu nổi bật
              </label>
            </div>
          </div>

          {formData.logo && (
            <div className={previewBoxClass}>
              <p className="mb-3 text-sm font-medium text-slate-600">
                Xem trước Logo
              </p>
              <img
                src={formData.logo}
                alt="Preview"
                className="h-16 w-16 rounded-2xl border border-slate-300 object-cover"
              />
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button type="button" onClick={handleReset} className={secondaryButtonClass}>
              Đặt lại
            </button>

            <button type="submit" className={primaryButtonClass}>
              {editingBrand ? "Cập nhật" : "Thêm thương hiệu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
