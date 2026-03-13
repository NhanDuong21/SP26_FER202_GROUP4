export const getCategoryStats = (categories = []) => {
  return {
    total: categories.length,
    active: categories.filter((item) => item.status === "active").length,
    totalProducts: categories.reduce(
      (sum, item) => sum + (item.productCount || 0),
      0,
    ),
    root: categories.filter((item) => !item.parentId).length,
  };
};

export const getDefaultCategoryForm = () => ({
  name: "",
  slug: "",
  parentId: "",
  productCount: 0,
  status: "active",
  image: "",
});

export const validateCategoryForm = ({
  formData,
  categories,
  editingCategory,
}) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Tên danh mục không được để trống";
  }

  if (!formData.slug.trim()) {
    errors.slug = "Slug không được để trống";
  }

  const isSlugExist = categories.some(
    (item) =>
      item.slug?.toLowerCase() === formData.slug.trim().toLowerCase() &&
      item.id !== editingCategory?.id,
  );

  if (isSlugExist) {
    errors.slug = "Slug đã tồn tại";
  }

  if (Number(formData.productCount) < 0) {
    errors.productCount = "Số sản phẩm không được nhỏ hơn 0";
  }

  return errors;
};
