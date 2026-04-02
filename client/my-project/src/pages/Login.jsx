import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous error
    setError("");
    
    // Validate inputs
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    // Start loading
    setLoading(true);
    
    try {
      console.log("Attempting login with:", { email });
      
      const res = await login({ email, password });
      console.log("Login response:", res);
      console.log("Response data:", res.data);
      
      // Check if token exists in response
      if (res.data && res.data.token) {
        // Save token to localStorage
        localStorage.setItem("token", res.data.token);
        console.log("Token saved successfully");
        
        // Verify token was saved
        const savedToken = localStorage.getItem("token");
        console.log("Saved token:", savedToken);
        
        // Update parent component state
        setIsLoggedIn(true);
        
        // Redirect to dashboard
        console.log("Redirecting to /dashboard...");
        navigate("/dashboard");
      } else {
        setError("No token received from server");
        console.error("Response missing token:", res.data);
      }
      
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle different error types
      if (err.response) {
        // Server responded with error status
        console.error("Error response:", err.response.data);
        setError(err.response.data?.message || err.response.data?.error || "Login failed");
      } else if (err.request) {
        // Request was made but no response
        setError("Cannot connect to server. Is the backend running?");
      } else {
        // Something else happened
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 w-full rounded-lg transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}