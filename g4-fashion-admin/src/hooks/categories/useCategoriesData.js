import { useCallback, useEffect, useState } from "react";
import { categoryService } from "../../services/categoryService";
import { productService } from "../../services/productService";

export function useCategoriesData() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [categoriesRes, productsRes] = await Promise.all([
        categoryService.getAll(),
        productService.getAll(),
      ]);

      setCategories(categoriesRes.data || []);
      setProducts(productsRes.data || []);
    } catch (err) {
      console.error("Lỗi lấy danh mục:", err);
      setError("Không thể tải dữ liệu danh mục.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = async (payload) => {
    return categoryService.create(payload);
  };

  const updateCategory = async (id, payload) => {
    return categoryService.update(id, payload);
  };

  const deleteCategory = async (id) => {
    return categoryService.remove(id);
  };

  return {
    categories,
    products,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
