import { useState } from "react";
import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        formData
      );
      localStorage.setItem("user", JSON.stringify(response.data.data)); // Save user data
      // console.log(response);

      onLogin(response.data); // Update state in App.jsx
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-[100vw] min-h-[100vh]" >
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <FaSignInAlt className="text-blue-500" /> Login
        </h2>
        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Username"
            value={formData.identifier}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => (window.location.href = "/register")}
            className="text-blue-500 hover:underline"
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
