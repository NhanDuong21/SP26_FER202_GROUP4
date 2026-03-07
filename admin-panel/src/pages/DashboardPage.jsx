import { useEffect, useState } from "react";

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ padding: "20px", background: "#e2e8f0" }}>
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div style={{ padding: "20px", background: "#e2e8f0" }}>
          <h3>Total Posts</h3>
          <p>{posts.length}</p>
        </div>

        <div style={{ padding: "20px", background: "#e2e8f0" }}>
          <h3>Total Comments</h3>
          <p>{comments.length}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
