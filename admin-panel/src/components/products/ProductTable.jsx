function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="px-4 py-3 text-sm font-semibold text-slate-700">
              ID
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-700">
              Ảnh
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-700">
              Tên sản phẩm
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-700">
              Danh mục
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-700">
              Thương hiệu
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-700">
              Giá
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-700">
              Tồn kho
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-700">
              Trạng thái
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-700">
              Hành động
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-slate-100 hover:bg-slate-50"
            >
              <td className="px-4 py-3 text-sm text-slate-600">{product.id}</td>

              <td className="px-4 py-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-14 w-14 rounded-lg object-cover border border-slate-200"
                />
              </td>

              <td className="px-4 py-3 font-medium text-slate-800">
                {product.name}
              </td>

              <td className="px-4 py-3 text-sm text-slate-600">
                {product.category}
              </td>

              <td className="px-4 py-3 text-sm text-slate-600">
                {product.brand}
              </td>

              <td className="px-4 py-3 text-sm text-slate-600">
                {Number(product.price).toLocaleString("vi-VN")} đ
              </td>

              <td className="px-4 py-3 text-sm text-slate-600">
                {product.stock}
              </td>

              <td className="px-4 py-3 text-sm">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    product.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {product.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
