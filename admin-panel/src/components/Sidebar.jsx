import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        height: "100vh",
      }}
    >
      <h2>Admin</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>

        <Link to="/users" style={{ color: "white", textDecoration: "none" }}>
          Users
        </Link>

        <Link to="/posts" style={{ color: "white", textDecoration: "none" }}>
          Posts
        </Link>

        <Link to="/comments" style={{ color: "white", textDecoration: "none" }}>
          Comments
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
