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
    
    // Set timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Request timed out. Please try again.");
      }
    }, 10000);
    
    try {
      const res = await login({ email, password });
      
      clearTimeout(timeoutId);
      
      // Check if token exists in response
      if (res.data && res.data.token) {
        // Save token to localStorage
        localStorage.setItem("token", res.data.token);
        
        // Update parent component state
        setIsLoggedIn(true);
        
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError("No token received from server");
      }
      
    } catch (err) {
      clearTimeout(timeoutId);
      
      // Handle different error types with user-friendly messages
      if (err.code === "ECONNABORTED") {
        setError("Connection timeout. Please try again.");
      } else if (err.response) {
        // Server responded with error status
        if (err.response.status === 401) {
          setError("Invalid email or password");
        } else if (err.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(err.response.data?.message || err.response.data?.error || "Login failed");
        }
      } else if (err.request) {
        // Request was made but no response
        setError("Cannot connect to server. Please check your connection.");
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
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 w-full rounded-lg transition-all flex items-center justify-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
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