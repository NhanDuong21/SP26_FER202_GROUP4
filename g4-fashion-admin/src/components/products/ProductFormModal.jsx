import { useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import {
  inputClass,
  modalCloseButtonClass,
  modalContainerClass,
  modalHeaderClass,
  modalOverlayClass,
  outlineButtonClass,
  previewBoxClass,
  primaryButtonClass,
} from "../../utils/uiClasses";
import { PRODUCT_STATUS_OPTIONS } from "../../utils/products/productUi";
import { slugify } from "../../utils/slugify";

export default function ProductFormModal({
  open,
  mode,
  formData,
  errors,
  categories,
  brands,
  onClose,
  onChange,
  onSubmit,
}) {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const title = mode === "create" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm";

  return (
    <div className={modalOverlayClass} onClick={onClose}>
      <div
        className={`${modalContainerClass} max-w-5xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalHeaderClass}>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              Nhập đầy đủ thông tin sản phẩm để lưu vào hệ thống
            </p>
          </div>

          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="max-h-[85vh] overflow-y-auto p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Mã sản phẩm *
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={onChange}
                  placeholder="Ví dụ: PRD-007"
                  className={inputClass}
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-500">{errors.code}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange(e);

                    onChange({
                      target: {
                        name: "slug",
                        value: slugify(value),
                      },
                    });
                  }}
                  placeholder="Nhập tên sản phẩm"
                  className={inputClass}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={onChange}
                  placeholder="slug-tu-dong-sinh"
                  className={inputClass}
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Danh mục *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={onChange}
                  className={inputClass}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.categoryId}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Thương hiệu *
                </label>
                <select
                  name="brandId"
                  value={formData.brandId}
                  onChange={onChange}
                  className={inputClass}
                >
                  <option value="">-- Chọn thương hiệu --</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {errors.brandId && (
                  <p className="mt-1 text-sm text-red-500">{errors.brandId}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Trạng thái *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  className={inputClass}
                >
                  {PRODUCT_STATUS_OPTIONS.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-500">{errors.status}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Giá gốc *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={onChange}
                  placeholder="Nhập giá gốc"
                  className={inputClass}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Giá bán *
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={onChange}
                  placeholder="Nhập giá bán"
                  className={inputClass}
                />
                {errors.salePrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.salePrice}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tồn kho *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={onChange}
                  placeholder="Nhập số lượng tồn kho"
                  className={inputClass}
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Link ảnh
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={onChange}
                  placeholder="Dán URL ảnh sản phẩm"
                  className={inputClass}
                />
              </div>

              <div className={previewBoxClass}>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ImagePlus size={18} />
                  Preview ảnh
                </div>

                <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-4">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-h-52 rounded-2xl object-contain"
                    />
                  ) : (
                    <p className="text-sm text-slate-400">
                      Chưa có ảnh để preview
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Mô tả sản phẩm
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows={5}
              placeholder="Nhập mô tả ngắn cho sản phẩm"
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={outlineButtonClass}
            >
              Hủy
            </button>

            <button type="submit" className={primaryButtonClass}>
              {mode === "create" ? "Thêm sản phẩm" : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
