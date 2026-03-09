import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import ConfirmDialog from "../components/products/ConfirmDialog";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getAll();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch products error:", err);
      setError("Không thể tải danh sách sản phẩm.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleOpenAdd() {
    setEditingProduct(null);
    setOpenModal(true);
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setOpenModal(true);
  }

  function handleDelete(product) {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  }

  async function handleSubmitProduct(formData) {
    try {
      if (editingProduct) {
        await productService.update(editingProduct.id, formData);
      } else {
        await productService.create(formData);
      }

      setOpenModal(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Save product error:", err);
      alert("Có lỗi xảy ra khi lưu sản phẩm.");
    }
  }

  async function handleConfirmDelete() {
    try {
      await productService.remove(selectedProduct.id);
      setOpenDeleteDialog(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Delete product error:", err);
      alert("Có lỗi xảy ra khi xóa sản phẩm.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Products Page</h1>
          <p className="mt-2 text-slate-500">
            Quản lý danh sách sản phẩm từ json-server.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
        >
          Add Product
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-slate-500">Đang tải dữ liệu sản phẩm...</p>
        ) : error ? (
          <p className="font-medium text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-slate-500">Chưa có sản phẩm nào.</p>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ProductModal
        key={editingProduct?.id ?? "new"}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmitProduct}
        product={editingProduct}
      />

      <ConfirmDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleConfirmDelete}
        product={selectedProduct}
      />
    </div>
  );
}

export default ProductsPage;
