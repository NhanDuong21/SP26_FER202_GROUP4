import { useMemo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Plus, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";
import {
  cardClass,
  primaryButtonClass,
  sectionHeaderClass,
  outlineButtonClass,
} from "../../utils/uiClasses";
import { useProductsData } from "../../hooks/products/useProductsData";
import { useProductFilters } from "../../hooks/products/useProductFilters";
import { useProductModals } from "../../hooks/products/useProductModals";
import { useProductForm } from "../../hooks/products/useProductForm";
import { getProductStats } from "../../utils/products/productHelpers";
import ProductStats from "../../components/products/ProductStats";
import ProductTable from "../../components/products/ProductTable";
import ProductFormModal from "../../components/products/ProductFormModal";
import ProductDetailModal from "../../components/products/ProductDetailModal";
import ProductDeleteModal from "../../components/products/ProductDeleteModal";
import ProductToolbar from "../../components/products/ProductToolbar";
import Pagination from "../../components/common/Pagination";

export default function ProductsPage() {
  const {
    products,
    categories,
    brands,
    loading,
    error,
    fetchData,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductsData();

  const {
    isCreateOpen,
    isEditOpen,
    isDetailOpen,
    isDeleteOpen,
    selectedProduct,
    handleOpenCreate,
    handleCloseCreate,
    handleOpenEdit,
    handleCloseEdit,
    handleOpenDetail,
    handleCloseDetail,
    handleOpenDelete,
    handleCloseDelete,
  } = useProductModals();

  const {
    formData,
    formErrors,
    resetForm,
    fillEditForm,
    clearErrors,
    handleChangeForm,
    handleNameChange,
    validateForm,
    buildPayload,
  } = useProductForm(products, categories, brands);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    brandFilter,
    setBrandFilter,
    currentPage,
    setCurrentPage,
    paginatedProducts,
    totalPages,
  } = useProductFilters(products);

  const { t } = useLanguage();
  const stats = useMemo(() => getProductStats(products), [products]);

  const getCategoryName = (categoryId) => {
    const found = categories.find(
      (item) => String(item.id) === String(categoryId),
    );
    return found ? found.name : t("Không xác định");
  };

  const getBrandName = (brandId) => {
    const found = brands.find((item) => String(item.id) === String(brandId));
    return found ? found.name : t("Không xác định");
  };

  const onOpenCreate = () => {
    resetForm();
    handleOpenCreate();
  };

  const onCloseCreate = () => {
    clearErrors();
    handleCloseCreate();
  };

  const onOpenEdit = (product) => {
    fillEditForm(product);
    handleOpenEdit(product);
  };

  const onCloseEdit = () => {
    clearErrors();
    handleCloseEdit();
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const errors = validateForm(null);
    if (Object.keys(errors).length > 0) {
      toast.error(t("Vui lòng kiểm tra lại thông tin."));
      return;
    }

    try {
      const payload = buildPayload();

      await createProduct({
        ...payload,
        createdAt: new Date().toISOString().split("T")[0],
      });

      toast.success(t("Thêm sản phẩm thành công."));
      onCloseCreate();
      await fetchData();
    } catch (err) {
      console.error(t("Lỗi thêm sản phẩm:"), err);
      toast.error(t("Thêm sản phẩm thất bại."));
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const errors = validateForm(selectedProduct);
    if (Object.keys(errors).length > 0) {
      toast.error(t("Vui lòng kiểm tra lại thông tin."));
      return;
    }

    try {
      const payload = buildPayload();

      await updateProduct(selectedProduct.id, {
        ...selectedProduct,
        ...payload,
      });

      toast.success(t("Cập nhật sản phẩm thành công."));
      onCloseEdit();
      await fetchData();
    } catch (err) {
      console.error(t("Lỗi cập nhật sản phẩm:"), err);
      toast.error(t("Cập nhật sản phẩm thất bại."));
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(selectedProduct.id);
      toast.success(t("Xóa sản phẩm thành công."));
      handleCloseDelete();
      await fetchData();
    } catch (err) {
      console.error(t("Lỗi xóa sản phẩm:"), err);
      toast.error(t("Xóa sản phẩm thất bại."));
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {t("Quản lý sản phẩm")}
          </h1>
          <p className="mt-2 text-slate-500">
            {t("Theo dõi danh sách sản phẩm của shop G4 FASHION")}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={fetchData} className={outlineButtonClass}>
            <RefreshCcw size={18} />
            {t("Tải lại")}
          </button>

          <button onClick={onOpenCreate} className={primaryButtonClass}>
            <Plus size={18} />
            {t("Thêm sản phẩm")}
          </button>
        </div>
      </div>

      <ProductStats stats={stats} />

      <div className={cardClass}>
        <div className={sectionHeaderClass}>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {t("Danh sách sản phẩm")}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {t("Hiển thị toàn bộ sản phẩm hiện có trong hệ thống")}
            </p>
          </div>
        </div>

        <ProductToolbar
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          brandFilter={brandFilter}
          categories={categories}
          brands={brands}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onCategoryChange={setCategoryFilter}
          onBrandChange={setBrandFilter}
        />

        {loading ? (
          <div className="p-6 text-slate-500">{t("Đang tải dữ liệu...")}</div>
        ) : error ? (
          <div className="p-6 text-red-500">{error}</div>
        ) : (
          <>
            <ProductTable
              products={paginatedProducts}
              getCategoryName={getCategoryName}
              getBrandName={getBrandName}
              onView={handleOpenDetail}
              onEdit={onOpenEdit}
              onDelete={handleOpenDelete}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <ProductFormModal
        open={isCreateOpen}
        mode="create"
        formData={formData}
        errors={formErrors}
        categories={categories}
        brands={brands}
        onClose={onCloseCreate}
        onChange={handleChangeForm}
        onNameChange={handleNameChange}
        onSubmit={handleCreateProduct}
      />

      <ProductFormModal
        open={isEditOpen}
        mode="edit"
        formData={formData}
        errors={formErrors}
        categories={categories}
        brands={brands}
        onClose={onCloseEdit}
        onChange={handleChangeForm}
        onNameChange={handleNameChange}
        onSubmit={handleUpdateProduct}
      />

      <ProductDetailModal
        open={isDetailOpen}
        product={selectedProduct}
        getCategoryName={getCategoryName}
        getBrandName={getBrandName}
        onClose={handleCloseDetail}
      />

      <ProductDeleteModal
        open={isDeleteOpen}
        product={selectedProduct}
        onClose={handleCloseDelete}
        onConfirm={handleDeleteProduct}
      />
    </div>
  );
}
