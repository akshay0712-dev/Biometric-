import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
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

  const fetchUsers = async () => {
    console.log("Fetching users...");

    try {
      const response = await axios.post("http://localhost:8000/api/v1/admin/users");
      setAllUsers(response.data.data);
      console.log("Fetched users:", response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const departments = [
    { name: "Computer Science Students", code: 245 },
    { name: "Computer Science AI & ML Students", code: 246 },
    { name: "Civil Students", code: 241 },
    { name: "Mechanical Students", code: 242 },
    { name: "Electrical Students", code: 243 },
    { name: "ECE Students", code: 244 },
  ];

  const StudentTable = ({ title, filterCode }) => {
    const filteredUsers = allUsers.filter((user) => Math.floor(user.rollNo / 100) === filterCode);

    return (
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 hidden md:block border">Email</th>
                <th className="py-2 px-4 border">Total Present Day</th>
                <th className="py-2 px-4 border">Total Working Day</th>
                <th className="py-2 px-4 border">Attendance Percentage</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{user.rollNo}</td>
                    <td className="py-2 px-4 border uppercase">{user.fullName}</td>
                    <td className="py-2 px-4 border hidden md:block lowercase">{user.email}</td>
                    <td className="py-2 px-4 border">{user.totalPresentDay}</td>
                    <td className="py-2 px-4 border">{user.totalWorkingDay}</td>
                    <td className="py-2 px-4 border">
                      {user.totalWorkingDay > 0
                        ? `${Math.floor((user.totalPresentDay * 100) / user.totalWorkingDay)}%`
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-8 h-full justify-center">
      <div className="bg-white shadow-lg mb-7 rounded-lg text-2xl p-4">
        <h1 className="mb-4 font-semibold">Admin Panel</h1>

        {/* File Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
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

      {/* Display Student Tables */}
      <div>
        {departments.map((dept) => (
          <StudentTable key={dept.code} title={dept.name} filterCode={dept.code} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
