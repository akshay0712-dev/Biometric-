import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchUser from "./searchUser";


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
      console.log("Submitting file to:", "http://localhost:8000/api/v1/admin/upload");
      const response = await axios.post("http://localhost:8000/api/v1/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("File uploaded successfully!");
      console.log(response.data);
      fetchUsers(); // Refresh users after upload
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed!");
      console.error("Error uploading file:", error);
    }
  };



 

  return (
    <div className="flex flex-col p-8 h-full justify-center ">
      <div className="bg-white shadow-lg mb-7 rounded-lg text-2xl p-4">
        <h1 className="mb-4 font-semibold">Admin Panel</h1>

        {/* File Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
            placeholder="Username"
            className="w-full p-2 border cursor-pointer bg-white shadow-lg rounded-lg"
          />

          {attendance.attendanceData && (
            <p className="mt-2 text-lg text-green-400">
              Selected File: {attendance.attendanceData.name}
            </p>
          )}

          <button type="submit" className="mt-4 p-2 bg-red-500 rounded text-white hover:bg-red-600">
            Submit
          </button>
        </form>

        {message && <p className="mt-4 text-lg text-yellow-400">{message}</p>}
      </div>
      <SearchUser />

      
    </div>
  );
};

export default Admin;
