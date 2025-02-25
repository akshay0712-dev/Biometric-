import { useState } from "react";
import React from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackgroundLines } from "./ui/bgAnimation.jsx"

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "Computer Science Engineering",
    registationNo: "",
    rollNo: "",
    password: "",
    avatar: null, // Store file instead of URL
    role: "user",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });

    // Generate image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("registationNo", formData.registationNo);
    formDataToSend.append("rollNo", formData.rollNo);
    formDataToSend.append("role", formData.role);
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Registration successful!");

      // ✅ Redirect to /login after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <BackgroundLines className="flex items-center justify-center absolute z-[-2] w-full flex-col px-4 min-h-[100vh] min-w-[100vw]">
    </BackgroundLines >
      <div className="max-w-md mx-auto mt-10 p-6 bg-[#ffffff00] shadow-lg rounded-lg ">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <FaUser className="text-blue-500" /> Register
        </h2>
        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="Number"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="Number"
            name="registationNo"
            placeholder="Registation Number"
            value={formData.registationNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="Number"
            name="rollNo"
            placeholder="Roll Number"
            value={formData.rollNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Computer Science Engineering">
              Computer Science Engineering
            </option>
            <option value="CSE in Artificial Intelligence and Machine Learning">
              CSE in Artificial Intelligence and Machine Learning
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Electronics and Communication Engineering">
              Electronics and Communication Engineering
            </option>
          </select>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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

          {/* File Upload Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="Avatar Preview"
              className="w-24 h-24 object-cover mt-2 rounded-full mx-auto"
            />
          )}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
            // onClick={() => window.location.href = "/"}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
