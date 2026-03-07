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
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-3xl font-bold mt-2">{users.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Posts</h2>
          <p className="text-3xl font-bold mt-2">{posts.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Comments</h2>
          <p className="text-3xl font-bold mt-2">{comments.length}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
