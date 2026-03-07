import { useEffect, useState } from "react";

function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
          </tr>
        </thead>

        <tbody>
          {posts.slice(0, 10).map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostsPage;
