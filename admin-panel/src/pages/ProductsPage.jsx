import { useEffect, useState } from "react";
import { productService } from "../services/productService";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await productService.getAll();
        console.log("Products data:", data);

        setProducts(data);
      } catch (err) {
        console.error("Fetch products error:", err);
        setError("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Products Page</h1>
        <p className="mt-2 text-slate-500">
          Quản lý danh sách sản phẩm từ json-server.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-slate-500">Đang tải dữ liệu sản phẩm...</p>
        ) : error ? (
          <p className="font-medium text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-slate-500">Chưa có sản phẩm nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    ID
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Tên sản phẩm
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Danh mục
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Thương hiệu
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Giá
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Tồn kho
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Trạng thái
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {product.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {product.brand}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {Number(product.price).toLocaleString("vi-VN")} đ
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
