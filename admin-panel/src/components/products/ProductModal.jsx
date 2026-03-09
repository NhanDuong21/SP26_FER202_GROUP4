import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
  status: "active",
  image: "",
};

function ProductModal({ open, onClose, onSubmit, product }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        brand: product.brand || "",
        price: product.price || "",
        stock: product.stock || "",
        status: product.status || "active",
        image: product.image || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [product, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            {product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tên sản phẩm
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Danh mục
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Ví dụ: Blazer"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Thương hiệu
            </label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Ví dụ: G4 Studio"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Giá
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Nhập giá"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tồn kho
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Nhập tồn kho"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Trạng thái
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Link ảnh
            </label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="https://..."
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-600 hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
            >
              {product ? "Lưu thay đổi" : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
