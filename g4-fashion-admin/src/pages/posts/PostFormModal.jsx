import { useEffect, useState } from "react";
import { Image, Text, User, X } from "lucide-react";
import { slugify } from "../../utils/categories/slugify";
import {
  inputClass,
  inputWithIconClass,
  modalOverlayClass,
  modalContainerClass,
  modalHeaderClass,
  modalCloseButtonClass,
  secondaryButtonClass,
  primaryButtonClass,
} from "../../utils/posts/uiClasses";

const initialFormData = {
  title: "",
  slug: "",
  author: "",
  categoryId: "",
  status: "draft",
  thumbnail: "",
  publishDate: "",
  views: 0,
};

export default function PostFormModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  editingPost,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");
  const [isAutoSlug, setIsAutoSlug] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const next = editingPost
      ? {
          title: editingPost.title || "",
          slug: editingPost.slug || "",
          author: editingPost.author || "",
          categoryId: editingPost.categoryId ?? "",
          status: editingPost.status || "draft",
          thumbnail: editingPost.thumbnail || "",
          publishDate: editingPost.publishDate || "",
          views: editingPost.views || 0,
        }
      : initialFormData;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(next);
    setIsAutoSlug(!editingPost);
    setFormError("");
  }, [editingPost, isOpen]);

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

    if (name === "title") {
      setFormData((p) => ({
        ...p,
        title: value,
        slug: isAutoSlug ? slugify(value) : p.slug,
      }));
      return;
    }

    if (name === "slug") setIsAutoSlug(false);

    setFormData((p) => ({
      ...p,
      [name]: name === "views" ? Number(value) : value,
    }));
  };

  const handleGenerateSlug = () => {
    setFormData((p) => ({ ...p, slug: slugify(p.title) }));
    setIsAutoSlug(true);
  };

  const validate = () => {
    if (!formData.title.trim()) return "Tiêu đề không được để trống.";
    if (!formData.slug.trim()) return "Slug không được để trống.";
    if (!formData.author.trim()) return "Tác giả không được để trống.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setFormError(msg);
      return;
    }
    const payload = {
      ...formData,
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
              <Text size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {editingPost ? "Cập nhật bài viết" : "Thêm bài viết"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Điền thông tin để lưu bài viết
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
                Tiêu đề
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Slug
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={inputClass}
                />
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
                Tác giả
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={inputWithIconClass}
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Danh mục
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Trạng thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="draft">Bản nháp</option>
                <option value="published">Đã xuất bản</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Ảnh đại diện
              </label>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className={inputClass}
                placeholder="URL ảnh"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Ngày xuất bản
              </label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className={secondaryButtonClass}>
              Hủy
            </button>
            <button type="submit" className={primaryButtonClass}>
              {editingPost ? "Cập nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
