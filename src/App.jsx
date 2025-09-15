import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ContractDetail from "./pages/ContractDetail";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (only accessible if authenticated) */}
        <Route element={<PrivateRoute />}>
          {/* Main layout for dashboard-related pages */}
          <Route path="/dashboard" element={<Layout />}>
            {/* Default child route of /dashboard shows Dashboard page */}
            <Route index element={<Dashboard />} />

            {/* Contract detail route inside dashboard layout */}
            <Route path="contracts/:id" element={<ContractDetail />} />
          </Route>
        </Route>

        {/* Fallback for unmatched routes (404) */}
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
