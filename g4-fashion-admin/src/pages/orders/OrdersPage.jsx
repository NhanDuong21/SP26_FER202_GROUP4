import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { orderService } from "../../services/orderService";
import { productService } from "../../services/productService";
import {
  buildOrderStatusPayload,
  updateProductStockByOrder,
} from "../../utils/ordersUtils/orderAdminService";
import OrdersFilter from "../../components/orders/OrdersFilter";
import OrdersTable from "../../components/orders/OrdersTable";
import OrdersPagination from "../../components/orders/OrdersPagination";
import OrderDetailModal from "../../components/orders/OrderDetailModal";
import {
  filterOrders,
  canTransitionTo,
  shouldDecreaseStock,
  shouldRestoreStock,
} from "../../utils/ordersUtils/orderHelper";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const getProductById = (productId) => {
    return products.find((p) => String(p.id) === String(productId));
  };

  const getOrderItemsWithProductInfo = (order) => {
    if (!order?.items) return [];

    return order.items.map((item) => {
      const product = getProductById(item.productId);

      return {
        ...item,
        image:
          product?.image ||
          "https://dummyimage.com/80x80/e5e7eb/9ca3af&text=No+Image",
        productCode: product?.code || "",
        stock: product?.stock ?? 0,
        lineTotal: (Number(item.price) || 0) * (Number(item.quantity) || 0),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [ordersRes, productsRes] = await Promise.all([
          orderService.getOrders(),
          productService.getAll(),
        ]);

        setOrders(ordersRes.data || []);
        setProducts(productsRes.data || []);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
        setError("Không thể tải dữ liệu đơn hàng.");
        toast.error("Tải dữ liệu thất bại");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, statusFilter, paymentFilter]);

  const filteredOrders = useMemo(() => {
    const result = filterOrders(orders, keyword, statusFilter, paymentFilter);

    return [...result].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders, keyword, statusFilter, paymentFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  const handleChangeStatus = async (order, newStatus) => {
    try {
      setUpdatingId(order.id);

      const currentStatus = order.status;

      if (!canTransitionTo(currentStatus, newStatus)) {
        toast.error("Không thể chuyển trạng thái theo cách này");
        return;
      }

      if (shouldDecreaseStock(currentStatus, newStatus)) {
        const refreshedProducts = await updateProductStockByOrder(order, "decrease");
        setProducts(refreshedProducts);
      }

      if (shouldRestoreStock(currentStatus, newStatus)) {
        const refreshedProducts = await updateProductStockByOrder(order, "restore");
        setProducts(refreshedProducts);
      }

      const payload = buildOrderStatusPayload(order, newStatus);

      const updatedRes = await orderService.updateOrderStatus(order.id, payload);
      const updatedOrder = updatedRes.data;

      setOrders((prev) =>
        prev.map((item) =>
          item.id === order.id ? { ...item, ...updatedOrder } : item
        )
      );

      if (selectedOrder?.id === order.id) {
        setSelectedOrder((prev) => ({ ...prev, ...updatedOrder }));
      }

      toast.success("Cập nhật trạng thái đơn hàng thành công");
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      toast.error(err?.message || "Cập nhật trạng thái thất bại");
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 text-slate-500 shadow-sm">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-white p-6 text-red-500 shadow-sm">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Quản lý Đơn hàng
          </h1>
          <p className="mt-2 text-slate-500">
            Theo dõi và xử lý đơn hàng của khách hàng
          </p>
        </div>

        <OrdersFilter
          keyword={keyword}
          setKeyword={setKeyword}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          paymentFilter={paymentFilter}
          setPaymentFilter={setPaymentFilter}
        />

        <div className="rounded-3xl bg-white shadow-sm">
          <OrdersTable
            orders={paginatedOrders}
            totalOrders={orders.length}
            updatingId={updatingId}
            onView={setSelectedOrder}
            onChangeStatus={handleChangeStatus}
          />

          {filteredOrders.length > 0 && (
            <OrdersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredOrders.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              onNext={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
              }
            />
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          orderItems={getOrderItemsWithProductInfo(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}