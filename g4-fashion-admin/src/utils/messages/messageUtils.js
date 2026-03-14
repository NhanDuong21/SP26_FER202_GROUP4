export const countUnread = (messages) => {
    return messages.filter(m => m.status === "Chưa đọc").length;
};

export const countReplied = (messages) => {
    return messages.filter(m => m.status === "Đã trả lời").length;
};

export const countUrgent = (messages) => {
    return messages.filter(m => m.priority === "Cao").length;
};