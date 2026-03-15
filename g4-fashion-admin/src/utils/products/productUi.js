export const PRODUCT_STATUS_OPTIONS = [
  { value: "selling", label: "Đang bán" },
  { value: "paused", label: "Tạm dừng" },
  { value: "out_of_stock", label: "Hết hàng" },
];

export const getProductStatusInfo = (status) => {
  switch (status) {
    case "selling":
      return {
        label: "Đang bán",
        className: "bg-green-100 text-green-700",
      };
    case "paused":
      return {
        label: "Tạm dừng",
        className: "bg-yellow-100 text-yellow-700",
      };
    case "out_of_stock":
      return {
        label: "Hết hàng",
        className: "bg-red-100 text-red-700",
      };
    default:
      return {
        label: "Không xác định",
        className: "bg-slate-100 text-slate-700",
      };
  }
};
