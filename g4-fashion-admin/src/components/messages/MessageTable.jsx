import { FaEye, FaPaperPlane, FaTrash } from "react-icons/fa";

export default function MessageTable({ messages, onView, onReply, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b bg-gray-50 text-left">
                        <th className="p-3">Khách hàng</th>
                        <th className="p-3">Tiêu đề</th>
                        <th className="p-3">Danh mục</th>
                        <th className="p-3">Ưu tiên</th>
                        <th className="p-3">Trạng thái</th>
                        <th className="p-3">Thời gian</th>
                        <th className="p-3">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((msg) => (
                        <tr key={msg.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                                <div className="font-medium">{msg.name}</div>
                                <div className="text-sm text-gray-500">{msg.email}</div>
                            </td>
                            <td className="p-3">{msg.title}</td>
                            <td className="p-3">{msg.category}</td>
                            <td className="p-3">{msg.priority}</td>
                            <td className="p-3">{msg.status}</td>
                            <td className="p-3 text-gray-500">{msg.time}</td>
                            <td className="p-3 flex gap-3 text-gray-600">
                                <FaEye className="cursor-pointer hover:text-blue-600" onClick={() => onView(msg)} />
                                <FaPaperPlane className="cursor-pointer hover:text-green-600" onClick={() => onReply(msg)} />
                                <FaTrash className="cursor-pointer hover:text-red-600" onClick={() => onDelete(msg)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}