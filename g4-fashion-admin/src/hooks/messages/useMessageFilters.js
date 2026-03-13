import { useState, useMemo } from "react";

export function useMessageFilters(messages) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredMessages = useMemo(() => {
        return messages.filter((msg) => {
            return (
                (msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    msg.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (statusFilter ? msg.status === statusFilter : true) &&
                (priorityFilter ? msg.priority === priorityFilter : true)
            );
        });
    }, [messages, searchTerm, statusFilter, priorityFilter]);

    const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

    const paginatedMessages = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredMessages.slice(start, start + itemsPerPage);
    }, [filteredMessages, currentPage]);

    return {
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        priorityFilter,
        setPriorityFilter,
        currentPage,
        setCurrentPage,
        paginatedMessages,
        totalPages,
    };
}