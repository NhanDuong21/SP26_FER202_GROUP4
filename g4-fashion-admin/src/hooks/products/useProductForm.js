import { useState } from "react";
import {
  generateProductCode,
  getDefaultProductForm,
  validateProductForm,
} from "../../utils/products/productHelpers";

export function useProductForm(
  products = [],
  categories = [],
  brands = [],
) {
  const [formData, setFormData] = useState(getDefaultProductForm());
  const [formErrors, setFormErrors] = useState({});
  const [isAutoSlug, setIsAutoSlug] = useState(true);

  const resetForm = () => {
    setFormData({
      ...getDefaultProductForm(),
      code: generateProductCode(products),
    });
    setFormErrors({});
    setIsAutoSlug(true);
  };

  const fillEditForm = (product) => {
    setFormData({
      id: product.id,
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
    setIsAutoSlug(false);
  };

  const clearErrors = () => {
    setFormErrors({});
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "slug") {
      setIsAutoSlug(false);
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleNameChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: isAutoSlug ? value : prev.slug,
    }));

    setFormErrors((prev) => ({
      ...prev,
      name: "",
      slug: "",
    }));
  };

  const validateForm = (editingProduct = null) => {
    const errors = validateProductForm({
      form: formData,
      products,
      editingProduct,
      categories,
      brands,
    });

    setFormErrors(errors);
    return errors;
  };

  const buildPayload = () => ({
    ...formData,
    categoryId: String(formData.categoryId),
    brandId: String(formData.brandId),
    price: Number(formData.price),
    salePrice: Number(formData.salePrice),
    stock: Number(formData.stock),
  });

  return {
    formData,
    formErrors,
    setFormErrors,
    resetForm,
    fillEditForm,
    clearErrors,
    handleChangeForm,
    handleNameChange,
    validateForm,
    buildPayload,
    isAutoSlug,
    setIsAutoSlug,
  };
}