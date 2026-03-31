import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) return alert("Please fill all fields");
    try {
      await signup({ email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed! Try a different email.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSignup}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 w-full rounded-lg transition-all"
        >
          Sign Up
        </button>
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}