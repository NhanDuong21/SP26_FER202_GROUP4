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

export const validateProductForm = ({
  form,
  products = [],
  editingProduct = null,
  categories = [],
  brands = [],
}) => {
  const errors = {};

  const normalizedCode = form.code.trim().toLowerCase();
  const normalizedSlug = form.slug.trim().toLowerCase();

  if (!form.code.trim()) {
    errors.code = "Vui lòng nhập mã sản phẩm";
  } else {
    const isCodeExist = products.some(
      (item) =>
        item.code?.trim().toLowerCase() === normalizedCode &&
        String(item.id) !== String(editingProduct?.id),
    );

    if (isCodeExist) {
      errors.code = "Mã sản phẩm đã tồn tại";
    }
  }

  if (!form.name.trim()) {
    errors.name = "Vui lòng nhập tên sản phẩm";
  } else if (form.name.trim().length < 3) {
    errors.name = "Tên sản phẩm phải từ 3 ký tự";
  }

  if (!form.slug.trim()) {
    errors.slug = "Slug không được để trống";
  } else {
    const isSlugExist = products.some(
      (item) =>
        item.slug?.trim().toLowerCase() === normalizedSlug &&
        String(item.id) !== String(editingProduct?.id),
    );

    if (isSlugExist) {
      errors.slug = "Slug đã tồn tại";
    }
  }

  if (!form.categoryId) {
    errors.categoryId = "Vui lòng chọn danh mục";
  } else {
    const selectedCategory = categories.find(
      (item) => String(item.id) === String(form.categoryId),
    );

    if (!selectedCategory) {
      errors.categoryId = "Danh mục không hợp lệ";
    } else if (selectedCategory.status === "inactive") {
      errors.categoryId = "Không thể chọn danh mục đang ngưng hoạt động";
    }
  }

  if (!form.brandId) {
    errors.brandId = "Vui lòng chọn thương hiệu";
  } else {
    const selectedBrand = brands.find(
      (item) => String(item.id) === String(form.brandId),
    );

    if (!selectedBrand) {
      errors.brandId = "Thương hiệu không hợp lệ";
    } else if (selectedBrand.status === "inactive") {
      errors.brandId = "Không thể chọn thương hiệu đang ngưng hoạt động";
    }
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

  if (Number(form.stock) === 0 && form.status === "selling") {
    errors.status = "Sản phẩm hết hàng không thể ở trạng thái Đang bán";
  }

  if (form.image && !/^https?:\/\/.+/i.test(form.image.trim())) {
    errors.image = "Link ảnh không hợp lệ";
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
