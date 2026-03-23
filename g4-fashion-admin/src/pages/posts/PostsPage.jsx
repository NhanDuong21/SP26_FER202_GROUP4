import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  FileText,
  User,
} from "lucide-react";
import { postService } from "../../services/postService";
import { postCategoryService } from "../../services/postCategoryService";
import {
  tableCellClass,
  tableHeaderCellClass,
  iconActionButtonClass,
  inputClass,
  cardClass,
  sectionHeaderClass,
  primaryButtonClass,
} from "../../utils/posts/uiClasses";
import { getPostStatusBadgeClass } from "../../utils/posts/postUi";
import PostFormModal from "./PostFormModal";
import PostDetailModal from "./PostDetailModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function PostsPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [postsRes, catsRes] = await Promise.all([
        postService.getAll(),
        postCategoryService.getAll(),
      ]);

      setPosts(postsRes.data);
      setCategories(catsRes.data);
    } catch (err) {
      console.error("Lỗi lấy bài viết:", err);
      setError("Không thể tải dữ liệu bài viết.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);

  const filtered = posts.filter((p) => {
    const text = [p.title, p.author].join(" ").toLowerCase();
    const matchSearch = text.includes(searchText.toLowerCase());
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleOpenCreate = () => {
    setEditingPost(null);
    setIsFormOpen(true);
  };
  const handleOpenEdit = (post) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };
  const handleCloseForm = () => {
    setEditingPost(null);
    setIsFormOpen(false);
  };
  const handleSubmitForm = async (payload) => {
    try {
      if (editingPost) await postService.update(editingPost.id, payload);
      else await postService.create(payload);
      await fetchData();
      handleCloseForm();
    } catch (err) {
      console.error("Lỗi lưu bài viết:", err);
    }
  };

  const handleOpenDetail = (post) => {
    setSelectedPost(post);
    setIsDetailOpen(true);
  };
  const handleCloseDetail = () => {
    setSelectedPost(null);
    setIsDetailOpen(false);
  };

  const handleOpenDelete = (post) => {
    setDeletingPost(post);
    setIsDeleteOpen(true);
  };
  const handleCloseDelete = () => {
    setDeletingPost(null);
    setIsDeleteOpen(false);
  };
  const handleConfirmDelete = async () => {
    try {
      await postService.remove(deletingPost.id);
      await fetchData();
      handleCloseDelete();
    } catch (err) {
      console.error("Lỗi xóa bài viết:", err);
    }
  };

  const total = posts.length;
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  const statCards = [
    { title: t("Tổng bài viết"), value: total, icon: FileText, iconClass: "bg-sky-100 text-sky-600" },
    { title: t("Đã xuất bản"), value: published, icon: Eye, iconClass: "bg-emerald-100 text-emerald-600" },
    { title: t("Bản nháp"), value: drafts, icon: Pencil, iconClass: "bg-yellow-100 text-yellow-600" },
    { title: t("Tổng lượt xem"), value: totalViews, icon: User, iconClass: "bg-violet-100 text-violet-600" },
  ];

  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || "";

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">{t("Quản lý Bài viết")}</h1>
          <p className="mt-2 text-slate-500">{t("Quản lý nội dung blog")}</p>
        </div>
        <button onClick={handleOpenCreate} className={primaryButtonClass}>
          <FileText size={18} />
          {t("Thêm bài viết")}
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t("Tìm theo tiêu đề hoặc tác giả")}
            value={searchText}
            onChange={handleSearchChange}
            className={`${inputClass} pl-10`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="w-full md:w-48 rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none"
        >
          <option value="">{t("Tất cả trạng thái")}</option>
          <option value="published">{t("Đã xuất bản")}</option>
          <option value="draft">{t("Bản nháp")}</option>
        </select>
      </div>

      <div className={cardClass}>
        <div className={sectionHeaderClass}>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{t("Danh sách bài viết")}</h2>
            <p className="mt-1 text-sm text-slate-500">{t("Quản lý nội dung blog")}</p>
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-slate-500">{t("Đang tải dữ liệu...")}</div>
        ) : error ? (
          <div className="px-6 py-10 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className={tableHeaderCellClass}>{t("Ảnh đại diện")}</th>
                  <th className={tableHeaderCellClass}>{t("Tiêu đề")}</th>
                  <th className={tableHeaderCellClass}>{t("Tác giả")}</th>
                  <th className={tableHeaderCellClass}>{t("Danh mục")}</th>
                  <th className={tableHeaderCellClass}>{t("Trạng thái")}</th>
                  <th className={tableHeaderCellClass}>{t("Lượt xem")}</th>
                  <th className={tableHeaderCellClass}>{t("Ngày xuất bản")}</th>
                  <th className={`${tableHeaderCellClass} text-center`}>{t("Thao tác")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-slate-100 transition hover:bg-slate-50/80">
                    <td className={tableCellClass}>
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="h-14 w-14 rounded-2xl border border-slate-200 object-cover"
                      />
                    </td>
                    <td className={tableCellClass}>
                      <div className="font-semibold text-slate-800">{p.title}</div>
                      <div className="mt-1 text-xs text-slate-500">/{p.slug}</div>
                    </td>
                    <td className={`${tableCellClass} text-slate-600`}>{p.author}</td>
                    <td className={`${tableCellClass} text-slate-600`}>{getCategoryName(p.categoryId)}</td>
                    <td className={tableCellClass}>
                      <span className={getPostStatusBadgeClass(p.status)}>
                        {p.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                      </span>
                    </td>
                    <td className={tableCellClass}>{p.views}</td>
                    <td className={`${tableCellClass} text-slate-600`}>{p.publishDate}</td>
                    <td className={tableCellClass}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(p)}
                          className={`${iconActionButtonClass} bg-sky-50 text-sky-700 hover:bg-sky-100`}
                          title={t("Xem")}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className={`${iconActionButtonClass} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}
                          title={t("Chỉnh sửa")}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(p)}
                          className={`${iconActionButtonClass} bg-rose-50 text-rose-700 hover:bg-rose-100`}
                          title={t("Xóa")}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                      {t("Chưa có bài viết nào.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="px-6 py-4 flex items-center justify-between text-sm text-slate-600">
              <div>{`${t("1-")}${filtered.length}${t(" của ")}${filtered.length}${t(" bài viết")}`}</div>
              <div className="flex items-center gap-2">
                <button className="rounded-full border px-3 py-1">1</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PostFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        categories={categories}
        editingPost={editingPost}
      />
      <PostDetailModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        post={selectedPost}
        categories={categories}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        postTitle={deletingPost?.title}
      />
    </div>
  );
}
