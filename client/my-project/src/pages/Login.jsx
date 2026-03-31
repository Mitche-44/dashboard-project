import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!email || !password) return alert("Please fill all fields");
    try {
      const res = await login({ email, password });
      // Make sure your backend returns { token: "..." }
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      alert("Login failed! Check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 w-full rounded-lg transition-all"
          >
            Login
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