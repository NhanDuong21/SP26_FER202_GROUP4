export const countUnread = (messages) => {
    return messages.filter(m => m.status === "Chưa trả lời").length;
};

export const countReplied = (messages) => {
    return messages.filter(m => m.status === "Đã trả lời").length;
};

export const countUrgent = (messages) => {
    return messages.filter(m => m.priority === "Khẩn cấp").length;
};