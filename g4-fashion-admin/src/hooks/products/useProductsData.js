import { useCallback, useEffect, useState } from "react";
import { productService } from "../../services/productService";
import { categoryService } from "../../services/categoryService";
import { brandService } from "../../services/brandService";

export function useProductsData() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createProduct = async (payload) => {
    return productService.create(payload);
  };

  const updateProduct = async (id, payload) => {
    return productService.update(id, payload);
  };

  const deleteProduct = async (id) => {
    return productService.remove(id);
  };

  return {
    products,
    categories,
    brands,
    loading,
    error,
    fetchData,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
