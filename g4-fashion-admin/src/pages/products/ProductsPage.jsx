import { useEffect, useMemo, useState } from "react";
import { Plus, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";
import { productService } from "../../services/productService";
import { categoryService } from "../../services/categoryService";
import { brandService } from "../../services/brandService";
import {
  cardClass,
  primaryButtonClass,
  sectionHeaderClass,
  outlineButtonClass,
} from "../../utils/uiClasses";
import ProductStats from "../../components/products/ProductStats";
import ProductTable from "../../components/products/ProductTable";
import ProductFormModal from "../../components/products/ProductFormModal";
import ProductDetailModal from "../../components/products/ProductDetailModal";
import ProductDeleteModal from "../../components/products/ProductDeleteModal";
import ProductToolbar from "../../components/products/ProductToolbar";
import Pagination from "../../components/common/Pagination";
import {
  generateProductCode,
  getDefaultProductForm,
  getProductStats,
  validateProductForm,
} from "../../utils/products/productHelpers";

const ITEMS_PER_PAGE = 5;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState(getDefaultProductForm());
  const [formErrors, setFormErrors] = useState({});

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
        brandService.getAll(),
      ]);

      setProducts(productsRes.data || []);
      setCategories(categoriesRes.data || []);
      setBrands(brandsRes.data || []);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu sản phẩm:", err);
      setError("Không thể tải dữ liệu sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = useMemo(() => getProductStats(products), [products]);

  const getCategoryName = (categoryId) => {
    const found = categories.find(
      (item) => String(item.id) === String(categoryId),
    );
    return found ? found.name : "Không xác định";
  };

  const getBrandName = (brandId) => {
    const found = brands.find((item) => String(item.id) === String(brandId));
    return found ? found.name : "Không xác định";
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const keyword = searchTerm.trim().toLowerCase();

      const matchSearch =
        !keyword ||
        item.name?.toLowerCase().includes(keyword) ||
        item.code?.toLowerCase().includes(keyword) ||
        item.slug?.toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;

      const matchCategory =
        categoryFilter === "all" ||
        String(item.categoryId) === String(categoryFilter);

      const matchBrand =
        brandFilter === "all" || String(item.brandId) === String(brandFilter);

      return matchSearch && matchStatus && matchCategory && matchBrand;
    });
  }, [products, searchTerm, statusFilter, categoryFilter, brandFilter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, brandFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const resetForm = () => {
    setFormData({
      ...getDefaultProductForm(),
      code: generateProductCode(products),
    });
    setFormErrors({});
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
    setFormErrors({});
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      code: product.code || "",
      name: product.name || "",
      slug: product.slug || "",
      categoryId: String(product.categoryId || ""),
      brandId: String(product.brandId || ""),
      price: product.price ?? "",
      salePrice: product.salePrice ?? "",
      stock: product.stock ?? "",
      status: product.status || "selling",
      image: product.image || "",
      description: product.description || "",
      createdAt: product.createdAt || new Date().toISOString().split("T")[0],
    });
    setFormErrors({});
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedProduct(null);
    setFormErrors({});
  };

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setSelectedProduct(null);
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const buildPayload = () => ({
    ...formData,
    categoryId: Number(formData.categoryId),
    brandId: Number(formData.brandId),
    price: Number(formData.price),
    salePrice: Number(formData.salePrice),
    stock: Number(formData.stock),
  });

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const errors = validateProductForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Vui lòng kiểm tra lại thông tin.");
      return;
    }

    try {
      const payload = buildPayload();

      await productService.create({
        ...payload,
        createdAt: new Date().toISOString().split("T")[0],
      });

      toast.success("Thêm sản phẩm thành công.");
      handleCloseCreate();
      fetchData();
    } catch (err) {
      console.error("Lỗi thêm sản phẩm:", err);
      toast.error("Thêm sản phẩm thất bại.");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const errors = validateProductForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Vui lòng kiểm tra lại thông tin.");
      return;
    }

    try {
      const payload = buildPayload();

      await productService.update(selectedProduct.id, {
        ...selectedProduct,
        ...payload,
      });

      toast.success("Cập nhật sản phẩm thành công.");
      handleCloseEdit();
      fetchData();
    } catch (err) {
      console.error("Lỗi cập nhật sản phẩm:", err);
      toast.error("Cập nhật sản phẩm thất bại.");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await productService.remove(selectedProduct.id);
      toast.success("Xóa sản phẩm thành công.");
      handleCloseDelete();
      fetchData();
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
      toast.error("Xóa sản phẩm thất bại.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Quản lý sản phẩm
          </h1>
          <p className="mt-2 text-slate-500">
            Theo dõi danh sách sản phẩm của shop G4 FASHION
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={fetchData} className={outlineButtonClass}>
            <RefreshCcw size={18} />
            Tải lại
          </button>

          <button onClick={handleOpenCreate} className={primaryButtonClass}>
            <Plus size={18} />
            Thêm sản phẩm
          </button>
        </div>
      </div>

      <ProductStats stats={stats} />

      <div className={cardClass}>
        <div className={sectionHeaderClass}>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Danh sách sản phẩm
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Hiển thị toàn bộ sản phẩm hiện có trong hệ thống
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
          <div className="p-6 text-slate-500">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="p-6 text-red-500">{error}</div>
        ) : (
          <>
            <ProductTable
              products={paginatedProducts}
              getCategoryName={getCategoryName}
              getBrandName={getBrandName}
              onView={handleOpenDetail}
              onEdit={handleOpenEdit}
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
        onClose={handleCloseCreate}
        onChange={handleChangeForm}
        onSubmit={handleCreateProduct}
      />

      <ProductFormModal
        open={isEditOpen}
        mode="edit"
        formData={formData}
        errors={formErrors}
        categories={categories}
        brands={brands}
        onClose={handleCloseEdit}
        onChange={handleChangeForm}
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
