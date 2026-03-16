export const getDefaultProductForm = () => ({
  code: "",
  name: "",
  slug: "",
  categoryId: "",
  brandId: "",
  price: "",
  salePrice: "",
  stock: "",
  status: "selling",
  image: "",
  description: "",
  createdAt: new Date().toISOString().split("T")[0],
});

export const generateProductCode = (products = []) => {
  const numbers = products
    .map((item) => Number(String(item.code || "").replace("PRD-", "")))
    .filter((num) => !Number.isNaN(num));

  const nextNumber = numbers.length ? Math.max(...numbers) + 1 : 1;

  return `PRD-${String(nextNumber).padStart(3, "0")}`;
};

export const validateProductForm = (form) => {
  const errors = {};

  if (!form.code.trim()) {
    errors.code = "Vui lòng nhập mã sản phẩm";
  }

  if (!form.name.trim()) {
    errors.name = "Vui lòng nhập tên sản phẩm";
  } else if (form.name.trim().length < 3) {
    errors.name = "Tên sản phẩm phải từ 3 ký tự";
  }

  if (!form.slug.trim()) {
    errors.slug = "Slug không được để trống";
  }

  if (!form.categoryId) {
    errors.categoryId = "Vui lòng chọn danh mục";
  }

  if (!form.brandId) {
    errors.brandId = "Vui lòng chọn thương hiệu";
  }

  if (form.price === "" || Number(form.price) < 0) {
    errors.price = "Giá gốc phải lớn hơn hoặc bằng 0";
  }

  if (form.salePrice === "" || Number(form.salePrice) < 0) {
    errors.salePrice = "Giá bán phải lớn hơn hoặc bằng 0";
  }

  if (Number(form.salePrice) > Number(form.price)) {
    errors.salePrice = "Giá bán không được lớn hơn giá gốc";
  }

  if (
    form.stock === "" ||
    Number(form.stock) < 0 ||
    !Number.isInteger(Number(form.stock))
  ) {
    errors.stock = "Tồn kho phải là số nguyên lớn hơn hoặc bằng 0";
  }

  if (!form.status) {
    errors.status = "Vui lòng chọn trạng thái";
  }

  return errors;
};

export const getProductStats = (products = []) => {
  return {
    total: products.length,
    selling: products.filter((item) => item.status === "selling").length,
    paused: products.filter((item) => item.status === "paused").length,
    outOfStock: products.filter((item) => item.status === "out_of_stock")
      .length,
  };
};
