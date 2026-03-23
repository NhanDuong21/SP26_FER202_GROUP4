import { productService } from "../../services/productService";

export const updateProductStockByOrder = async (order, type) => {
  const productsRes = await productService.getAll();
  const currentProducts = productsRes.data || [];

  for (const item of order.items || []) {
    const product = currentProducts.find(
      (p) => String(p.id) === String(item.productId)
    );

    if (!product) {
      throw new Error(`Không tìm thấy sản phẩm ID=${item.productId}`);
    }

    const quantity = Number(item.quantity) || 0;
    const currentStock = Number(product.stock) || 0;

    if (type === "decrease") {
      if (currentStock < quantity) {
        throw new Error(
          `Sản phẩm "${product.name}" không đủ tồn kho. Còn ${currentStock}, cần ${quantity}.`
        );
      }

      await productService.update(product.id, {
        ...product,
        stock: currentStock - quantity,
      });
    }

    if (type === "restore") {
      await productService.update(product.id, {
        ...product,
        stock: currentStock + quantity,
      });
    }
  }

  const refreshedProducts = await productService.getAll();
  return refreshedProducts.data || [];
};

export const buildOrderStatusPayload = (order, newStatus) => {
  return {
    status: newStatus,
    completedAt:
      newStatus === "completed"
        ? new Date().toISOString()
        : order.completedAt || null,
    cancelledAt:
      newStatus === "cancelled"
        ? new Date().toISOString()
        : null,
    paymentStatus:
      newStatus === "completed"
        ? "paid"
        : newStatus === "cancelled"
        ? "unpaid"
        : order.paymentStatus,
  };
};