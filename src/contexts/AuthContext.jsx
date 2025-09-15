import { createContext, useContext, useState, useEffect } from "react";

// Create a context to share authentication data across components
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the logged-in user's data

  // On page refresh, load user data from localStorage (if available)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the stored user
    }
  }, []);

  // Login function: saves user data to state and localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function: clears user data from state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    // Provide the user, login, and logout functions to all children components
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext values (user, login, logout)
export const useAuth = () => useContext(AuthContext);
