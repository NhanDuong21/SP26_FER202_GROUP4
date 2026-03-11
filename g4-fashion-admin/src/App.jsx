import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "12px",
            background: "#fff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
          },
        }}
      />
    </>
  );
}

export default App;
