import { useState } from "react";
import {
  generateProductCode,
  getDefaultProductForm,
  validateProductForm,
} from "../../utils/products/productHelpers";

export function useProductForm(products = []) {
  const [formData, setFormData] = useState(getDefaultProductForm());
  const [formErrors, setFormErrors] = useState({});

  const resetForm = () => {
    setFormData({
      ...getDefaultProductForm(),
      code: generateProductCode(products),
    });
    setFormErrors({});
  };

  const fillEditForm = (product) => {
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

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = validateProductForm(formData);
    setFormErrors(errors);
    return errors;
  };

  const buildPayload = () => ({
    ...formData,
    categoryId: Number(formData.categoryId),
    brandId: Number(formData.brandId),
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
    validateForm,
    buildPayload,
  };
}
