import React, { useState } from "react";
import axios from "axios"; // Import Axios

const Admin = () => {
  const [attendance, setAttendance] = useState({
    attendanceData: null,
  });
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttendance({ ...attendance, attendanceData: file });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!attendance.attendanceData) {
      alert("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", attendance.attendanceData);

    try {
        console.log("Submitting file to:", "http://localhost:8000/api/v1/biometric/upload");
      const response = await axios.post("http://localhost:8000/api/v1/biometric/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("File uploaded successfully!");

      console.log(response.data);
    } catch (error) {
        setMessage(error.response?.data?.message || "Registration failed!");
      console.error("Error uploading xlxs file:", error);
    }
  };

  return (
    <div className="bg-black text-white text-2xl p-4">
      <h1 className="mb-4">Admin Panel</h1>

      {/* File Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
          className="w-full p-2 border rounded bg-gray-800 text-white"
        />

        {attendance.attendanceData && (
          <p className="mt-2 text-lg text-green-400">
            Selected File: {attendance.attendanceData.name}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-600 rounded text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Admin;
