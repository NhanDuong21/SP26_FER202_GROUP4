import { useEffect } from "react";
import {
  Eye,
  User,
  CalendarDays,
  FileText,
  X,
} from "lucide-react";
import {
  modalOverlayClass,
  modalContainerClass,
  modalHeaderClass,
  modalCloseButtonClass,
  infoItemClass,
  secondaryButtonClass,
} from "../../utils/posts/uiClasses";
import { getPostStatusBadgeClass } from "../../utils/posts/postUi";

export default function PostDetailModal({
  isOpen,
  onClose,
  post,
  categories,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const categoryName = categories.find((c) => c.id === post.categoryId)?.name || "";

  return (
    <div onClick={handleOverlayClick} className={modalOverlayClass}>
      <div className={`${modalContainerClass} max-w-2xl`}> 
        <div className={modalHeaderClass}>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <FileText size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Chi tiết bài viết</h2>
              <p className="mt-1 text-sm text-slate-500">Xem thông tin bài viết</p>
            </div>
          </div>
          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 px-6 py-6 md:grid-cols-[140px_1fr]">
          <div>
            <img
              src={post.thumbnail}
              alt={post.title}
              className="h-32 w-32 rounded-3xl border border-slate-200 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={infoItemClass}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <FileText size={16} /> Tiêu đề
              </p>
              <p className="font-semibold text-slate-800">{post.title}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <User size={16} /> Tác giả
              </p>
              <p className="font-semibold text-slate-800">{post.author}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Danh mục</p>
              <p className="font-semibold text-slate-800">{categoryName}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Lượt xem</p>
              <p className="font-semibold text-slate-800">{post.views}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Ngày xuất bản</p>
              <p className="font-semibold text-slate-800">{post.publishDate}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Trạng thái</p>
              <span className={getPostStatusBadgeClass(post.status)}>
                {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4 text-right">
          <button onClick={onClose} className={secondaryButtonClass}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
