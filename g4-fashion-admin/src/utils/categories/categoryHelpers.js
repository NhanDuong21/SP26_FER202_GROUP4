export const getCategoryProductCount = (categoryId, products = []) => {
  return products.filter(
    (item) => String(item.categoryId) === String(categoryId),
  ).length;
};

export const getCategoryStats = (categories = [], products = []) => {
  return {
    total: categories.length,
    active: categories.filter((item) => item.status === "active").length,
    totalProducts: products.length,
    root: categories.filter((item) => !item.parentId).length,
  };
};

export const getDefaultCategoryForm = () => ({
  name: "",
  slug: "",
  parentId: "",
  status: "active",
  image: "",
});

export const hasChildCategories = (categoryId, categories = []) => {
  return categories.some(
    (item) => String(item.parentId) === String(categoryId),
  );
};

export const hasProductsInCategory = (categoryId, products = []) => {
  return products.some(
    (item) => String(item.categoryId) === String(categoryId),
  );
};

export const validateCategoryForm = ({
  formData,
  categories,
  editingCategory,
}) => {
  const errors = {};

  const normalizedName = formData.name.trim().toLowerCase();
  const normalizedSlug = formData.slug.trim().toLowerCase();

  if (!formData.name.trim()) {
    errors.name = "Tên danh mục không được để trống";
  }

  const isNameExist = categories.some(
    (item) =>
      item.name?.trim().toLowerCase() === normalizedName &&
      String(item.id) !== String(editingCategory?.id),
  );

  if (isNameExist) {
    errors.name = "Tên danh mục đã tồn tại";
  }

  if (!formData.slug.trim()) {
    errors.slug = "Slug không được để trống";
  }

  const isSlugExist = categories.some(
    (item) =>
      item.slug?.trim().toLowerCase() === normalizedSlug &&
      String(item.id) !== String(editingCategory?.id),
  );

  if (isSlugExist) {
    errors.slug = "Slug đã tồn tại";
  }

  if (formData.image && !/^https?:\/\/.+/i.test(formData.image.trim())) {
    errors.image = "Link hình ảnh không hợp lệ";
  }

  return errors;
};
