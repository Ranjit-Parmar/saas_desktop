import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple auth check: if password is 'test123'
    if (password === "test123") {
      // Extract name from email
      const username = email.split("@")[0];
      const userData = {
        name: username.charAt(0).toUpperCase() + username.slice(1),
        email: email,
        avatar: "/profile.jpg", // Placeholder image
      };

      // Simulate login: save token and user, redirect
      localStorage.setItem("token", "mock-jwt-token-1234567890");
      login(userData);
      navigate("/dashboard");
    } else {
      alert("Invalid password. Please use 'test123'.");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-gray-900">
      {/* Left: Login Form */}
      <div className="flex flex-col justify-center w-full px-6 py-12 sm:max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password *
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // toggle visibility
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              {/* Show/Hide password button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded-lg"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Right: Branding Section (Only on large screens) */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-black">
        <h3 className="text-4xl font-semibold text-white">SaaS Dashboard</h3>
      </div>
    </div>
  );
};

export default Login;
