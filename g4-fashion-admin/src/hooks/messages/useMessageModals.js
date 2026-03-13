import { useState } from "react";

export function useMessageModals() {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleOpenDetail = (msg) => {
        setSelectedMessage(msg);
        setIsDetailOpen(true);
    };
    const handleCloseDetail = () => setIsDetailOpen(false);

    const handleOpenDelete = (msg) => {
        setSelectedMessage(msg);
        setIsDeleteOpen(true);
    };
    const handleCloseDelete = () => setIsDeleteOpen(false);

    return {
        isDetailOpen,
        isDeleteOpen,
        selectedMessage,
        handleOpenDetail,
        handleCloseDetail,
        handleOpenDelete,
        handleCloseDelete,
    };
}