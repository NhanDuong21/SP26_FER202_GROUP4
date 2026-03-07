import { useEffect, useState } from "react";

function CommentsPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Comments</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Post ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {comments.slice(0, 20).map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.postId}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommentsPage;
