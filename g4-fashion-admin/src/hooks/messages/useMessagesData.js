import { useState } from "react";

export function useMessagesData() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setError("Không tải được dữ liệu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await fetch(`http://localhost:3001/messages/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return { messages, loading, error, fetchData, deleteMessage };
}