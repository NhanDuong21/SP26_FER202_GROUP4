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
        setProducts(data);
      } catch (err) {
        setError("Không thể tải danh sách sản phẩm.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-slate-800">Products Page</h1>

      {loading && <p className="text-slate-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="rounded-lg border border-slate-200 p-3">
              {product.name} - {product.price?.toLocaleString("vi-VN")} đ
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductsPage;