import { useEffect, useState } from "react";
import { productService } from "../../services/productService";
import { categoryService } from "../../services/categoryService";
import { brandService } from "../../services/brandService";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
        brandService.getAll(),
      ]);

      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu sản phẩm:", error);
      setError("Không thể kết nối json-server. Hãy kiểm tra port 3000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((item) => item.id === categoryId);
    return category ? category.name : "Không xác định";
  };

  const getBrandName = (brandId) => {
    const brand = brands.find((item) => item.id === brandId);
    return brand ? brand.name : "Không xác định";
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "selling":
        return {
          text: "Đang bán",
          className: "bg-green-100 text-green-700",
        };
      case "paused":
        return {
          text: "Tạm dừng",
          className: "bg-yellow-100 text-yellow-700",
        };
      case "out_of_stock":
        return {
          text: "Hết hàng",
          className: "bg-red-100 text-red-700",
        };
      default:
        return {
          text: "Không rõ",
          className: "bg-gray-100 text-gray-700",
        };
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
        <p className="text-sm text-gray-500 mt-1">
          Danh sách tất cả sản phẩm trong hệ thống
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-500">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="p-6 text-red-500">{error}</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Hình</th>
                <th className="px-4 py-3 text-left">Mã SP</th>
                <th className="px-4 py-3 text-left">Tên sản phẩm</th>
                <th className="px-4 py-3 text-left">Danh mục</th>
                <th className="px-4 py-3 text-left">Thương hiệu</th>
                <th className="px-4 py-3 text-left">Giá</th>
                <th className="px-4 py-3 text-left">Tồn kho</th>
                <th className="px-4 py-3 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const statusInfo = getStatusLabel(product.status);

                return (
                  <tr key={product.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover border"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.code}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {product.slug}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {getCategoryName(product.categoryId)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {getBrandName(product.brandId)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div>{formatCurrency(product.salePrice)}</div>
                      {product.salePrice < product.price && (
                        <div className="text-xs text-gray-400 line-through">
                          {formatCurrency(product.price)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}
                      >
                        {statusInfo.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
