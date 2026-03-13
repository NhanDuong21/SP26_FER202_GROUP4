export default function MessageStats({ stats }) {
    return (
        <div className="mb-6 grid grid-cols-4 gap-4">
            <div className="flex items-center gap-3 rounded-lg border p-4">
                <div>
                    <p className="text-sm text-gray-500">Tổng tin nhắn</p>
                    <h2 className="text-xl font-bold">{stats.total}</h2>
                </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
                <div>
                    <p className="text-sm text-gray-500">Chưa đọc</p>
                    <h2 className="text-xl font-bold">{stats.unread}</h2>
                </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
                <div>
                    <p className="text-sm text-gray-500">Đã trả lời</p>
                    <h2 className="text-xl font-bold">{stats.replied}</h2>
                </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
                <div>
                    <p className="text-sm text-gray-500">Khẩn cấp</p>
                    <h2 className="text-xl font-bold">{stats.urgent}</h2>
                </div>
            </div>
        </div>
    );
}