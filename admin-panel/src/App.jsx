import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>
        <p>Welcome to admin panel</p>
      </div>
    </div>
  );
}

export default App;
