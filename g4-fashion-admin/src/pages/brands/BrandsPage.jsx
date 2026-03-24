import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Building2,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Globe,
  Star,
  Package,
} from "lucide-react";
import { brandService } from "../../services/brandService";
import BrandFormModal from "./BrandFormModal";
import DeleteConfirmModalBrand from "./DeleteConfirmModalBrand";
import BrandDetailModal from "./BrandDetailModal";
import {
  statCardClass,
  cardClass,
  sectionHeaderClass,
  primaryButtonClass,
  tableHeaderCellClass,
  tableCellClass,
  iconActionButtonClass,
} from "../../utils/uiClasses";
import { getActionButtonColorClass } from "../../utils/categories/categoryUi";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingBrand, setDeletingBrand] = useState(null);

  const { t } = useLanguage();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await brandService.getAll();
      setBrands(res.data);
    } catch (err) {
      console.error(t("Lỗi lấy thương hiệu:"), err);
      setError(t("Không thể tải dữ liệu thương hiệu."));
      toast.error(t("Tải thương hiệu thất bại"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleOpenCreate = () => {
    setEditingBrand(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (brand) => {
    setEditingBrand(brand);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingBrand(null);
    setIsFormOpen(false);
  };

  const handleSubmitForm = async (payload) => {
    try {
      if (editingBrand) {
        await brandService.update(editingBrand.id, payload);
        toast.success(t("Cập nhật thương hiệu thành công"));
      } else {
        await brandService.create(payload);
        toast.success(t("Thêm thương hiệu thành công"));
      }

      await fetchBrands();
      handleCloseForm();
    } catch (err) {
      console.error(t("Lỗi lưu thương hiệu:"), err);
      toast.error(t("Không thể lưu thương hiệu"));
    }
  };

  const handleOpenDelete = (brand) => {
    setDeletingBrand(brand);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeletingBrand(null);
    setIsDeleteOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await brandService.remove(deletingBrand.id);
      toast.success("Xóa thương hiệu thành công");
      await fetchBrands();
      handleCloseDelete();
    } catch (err) {
      console.error(t("Lỗi xóa thương hiệu:"), err);
      toast.error(t("Không thể xóa thương hiệu"));
    }
  };

  const handleOpenDetail = (brand) => {
    setSelectedBrand(brand);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedBrand(null);
    setIsDetailOpen(false);
  };

  const totalBrands = brands.length;
  const activeBrands = brands.filter((item) => item.status === "active").length;
  const featuredBrands = brands.filter((item) => item.featured).length;
  const totalProducts = brands.reduce(
    (sum, item) => sum + (item.productCount || 0),
    0,
  );

  const statCards = [
    {
      title: "Tổng thương hiệu",
      value: totalBrands,
      icon: Building2,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Đang hoạt động",
      value: activeBrands,
      icon: Globe,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Thương hiệu nổi bật",
      value: featuredBrands,
      icon: Star,
      iconClass: "bg-amber-100 text-amber-600",
    },
    {
      title: "Tổng sản phẩm",
      value: totalProducts,
      icon: Package,
      iconClass: "bg-violet-100 text-violet-600",
    },
  ];

  const getBrandStatusBadgeClass = (status) => {
    return status === "active"
      ? "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
      : "inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700";
  };

  const getFeaturedBadgeClass = (featured) => {
    return featured
      ? "inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
      : "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600";
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            {t("Quản lý Thương hiệu")}
          </h1>
          <p className="mt-2 text-slate-500">
            {t("Quản lý thương hiệu và nhà cung cấp sản phẩm")}
          </p>
        </div>

        <button onClick={handleOpenCreate} className={primaryButtonClass}>
          <Plus size={18} />
          {t("Thêm thương hiệu")}
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.title} className={statCardClass}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>
                  <h3 className="mt-3 text-3xl font-bold text-slate-800">
                    {card.value}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconClass}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={cardClass}>
        <div className={sectionHeaderClass}>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {t("Danh sách thương hiệu")}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {t("Quản lý toàn bộ thương hiệu trong hệ thống")}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-slate-500">{t("Đang tải dữ liệu...")}</div>
        ) : error ? (
          <div className="px-6 py-10 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className={tableHeaderCellClass}>{t("Logo")}</th>
                  <th className={tableHeaderCellClass}>{t("Thương hiệu")}</th>
                  <th className={tableHeaderCellClass}>{t("Quốc gia")}</th>
                  <th className={tableHeaderCellClass}>{t("Số sản phẩm")}</th>
                  <th className={tableHeaderCellClass}>{t("Nổi bật")}</th>
                  <th className={tableHeaderCellClass}>{t("Trạng thái")}</th>
                  <th className={tableHeaderCellClass}>{t("Website")}</th>
                  <th className={`${tableHeaderCellClass} text-center`}>
                    {t("Thao tác")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {brands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50/80"
                  >
                    <td className={tableCellClass}>
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="h-14 w-14 rounded-xl border border-slate-200 object-cover"
                      />
                    </td>

                    <td className={tableCellClass}>
                      <div>
                        <div className="font-semibold text-slate-800">
                          {brand.name}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          /{brand.slug}
                        </div>
                      </div>
                    </td>

                    <td className={`${tableCellClass} text-slate-600`}>
                      <span>{brand.country}</span>
                    </td>

                    <td className={tableCellClass}>
                      <span className="font-semibold text-blue-600">
                        {brand.productCount}
                      </span>
                    </td>

                    <td className={tableCellClass}>
                      <span className={getFeaturedBadgeClass(brand.featured)}>
                        {brand.featured ? "Có" : "Không"}
                      </span>
                    </td>

                    <td className={tableCellClass}>
                      <span className={getBrandStatusBadgeClass(brand.status)}>
                        {brand.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
                      </span>
                    </td>

                    <td className={tableCellClass}>
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate inline-flex"
                      >
                        {brand.website}
                      </a>
                    </td>

                    <td className={tableCellClass}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(brand)}
                          className={`${iconActionButtonClass} ${getActionButtonColorClass(
                            "view",
                          )}`}
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(brand)}
                          className={`${iconActionButtonClass} ${getActionButtonColorClass(
                            "edit",
                          )}`}
                          title="Chỉnh sửa"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleOpenDelete(brand)}
                          className={`${iconActionButtonClass} ${getActionButtonColorClass(
                            "delete",
                          )}`}
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {brands.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      Chưa có thương hiệu nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <BrandFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        brands={brands}
        editingBrand={editingBrand}
      />

      <DeleteConfirmModalBrand
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        brandName={deletingBrand?.name}
      />

      <BrandDetailModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        brand={selectedBrand}
      />
    </div>
  );
}
