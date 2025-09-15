import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UploadModalProvider } from "./contexts/UploadModalContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UploadModalProvider>
        <App />
      </UploadModalProvider>
    </AuthProvider>
  </StrictMode>
);
